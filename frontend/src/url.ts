import { viteHostedUrl } from "./env";

export function controllerLink({
  roomCode,
  searchParams,
}: {
  roomCode: string | null | undefined;
  searchParams: URLSearchParams;
}) {
  const next = new URLSearchParams(searchParams);
  next.set("code", roomCode ?? "");
  return `${viteHostedUrl}/controller?${next.toString()}`;
}
