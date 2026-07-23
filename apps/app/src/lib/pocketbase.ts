import PocketBase from "pocketbase";

const url = import.meta.env.VITE_POCKETBASE_URL;

if (!url) {
  throw new Error("VITE_POCKETBASE_URL saknas");
}

const pb = new PocketBase(url);

export default pb;