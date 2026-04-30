import { viteHostedUrl } from "./env";

export function controllerLink({
  roomCode,
}: {
  roomCode: string | null | undefined;
}) {
  return `${viteHostedUrl}/join/${roomCode}`;
}
