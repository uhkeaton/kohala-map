export const slideFadeOutClasses = "transition-opacity duration-1000";
export const slideFadeInClasses = "transition-opacity delay-500 duration-2500";

export type VisibleFeatureState = {
  queue: [string, string, string, string, string];
  visibleId: string;
  animationKeys: { [id: string]: string };
  recentlyVisibleIds: { [id: string]: boolean };
};

export const initialVisibilityState: VisibleFeatureState = {
  visibleId: "",
  queue: ["", "", "", "", ""],
  // trigger animations
  animationKeys: {},
  // keep some media visible so it fades out
  recentlyVisibleIds: {},
};
export type Queue = VisibleFeatureState["queue"];
export function dispatchVisibleFeatureId(id: string) {
  // push the new id to the front of the line
  // and only keep the most recent n items
  // (for fading between features)
  return function (prev: VisibleFeatureState): VisibleFeatureState {
    // bail if its already first
    if (prev.queue[0] === id) return prev;
    // add to beginning
    const newQueue: Queue = [
      id,
      // everything shifts down
      prev.queue[0] ?? "",
      prev.queue[1] ?? "",
      prev.queue[2] ?? "",
      prev.queue[3] ?? "",
    ];

    return {
      visibleId: id,
      queue: newQueue,
      animationKeys: {
        ...prev.animationKeys,
        [id]: `${id}-${Date.now().toString()}`,
      },
      recentlyVisibleIds: Object.fromEntries(
        newQueue
          .map((id) => [id, true])
          .slice(
            0,
            5, // take the most recent
          ),
      ),
    };
  };
}

export function findZIndex(id: string, queue: Queue) {
  let idx = queue.indexOf(id);
  // unknown items go last
  if (idx == -1) idx = 999;
  return 999 - idx;
}
