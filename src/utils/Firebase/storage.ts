import { storage } from "utils/Firebase/config";

export const uploader = (ref: string, file: File) =>
  storage.ref().child(ref).put(file);

export const downloader = (ref: string) =>
  storage.ref().child(ref).getDownloadURL();