const serverUrl = import.meta.env.VITE_SERVER_APP_URL;
const serverApiKey = import.meta.env.VITE_SERVER_API_KEY;

export { default as viewDB } from "./viewDB";
export { default as cloudGenerate, type GenerateProps } from "./generate";
export { serverUrl, serverApiKey };