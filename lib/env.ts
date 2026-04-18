const API_URL = process.env.API_URL as string;
const API_KEY = process.env.API_KEY as string;

if (!API_URL) {
  throw new Error("Missing environment variable: API_URL");
}

if (!API_KEY) {
  throw new Error("Missing environment variable: API_KEY");
}

export { API_URL, API_KEY };
