export const slideFadeOutClasses = "transition-opacity duration-1000";
export const slideFadeInClasses = "transition-opacity delay-500 duration-2500";

export type VisibleFeatureState = {
  queue: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
  visibleId: string;
  animationKeys: { [id: string]: string };
};

export const initialVisibilityState: VisibleFeatureState = {
  visibleId: "",
  queue: ["", "", "", "", "", "", "", "", "", ""],
  animationKeys: {},
};
export type VisibleFeatureQueue = VisibleFeatureState["queue"];
export function dispatchVisibleFeatureId(id: string) {
  // push the new id to the front of the line
  // and only keep the most recent n items
  // (for fading between features)
  return function (prev: VisibleFeatureState): VisibleFeatureState {
    // bail if its already first
    if (prev.queue[0] === id) return prev;
    // add to beginning
    return {
      visibleId: id,
      queue: [
        id,
        // everything shifts down
        prev.queue[0] ?? "",
        prev.queue[1] ?? "",
        prev.queue[2] ?? "",
        prev.queue[3] ?? "",
        prev.queue[4] ?? "",
        prev.queue[5] ?? "",
        prev.queue[6] ?? "",
        prev.queue[7] ?? "",
        prev.queue[8] ?? "",
      ],
      animationKeys: {
        ...prev.animationKeys,
        [id]: `${id}-${Date.now().toString()}`,
      },
    };
  };
}

export function findZIndex(id: string, queue: VisibleFeatureQueue) {
  let idx = queue.indexOf(id);
  // unknown items go last
  if (idx == -1) idx = 999;
  return 999 - idx;
}
