import { DataSource } from "./data/dataSource";

//  Hosted Url
export const viteWelcomeTitle = import.meta.env.VITE_WELCOME_TITLE;
export const viteHostedUrl = import.meta.env.VITE_HOSTED_URL;

export const viteDataSources: DataSource[] = (() => {
  try {
    const str = import.meta.env.VITE_DATA_SOURCES;
    return JSON.parse(str ?? "[]");
  } catch {
    return [];
  }
})();

// function isTrue(str: string | undefined) {
//   return (str || "").toLowerCase() === "true";
// }
