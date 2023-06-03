import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default async function uploadImage(file: File) {
  const path = "images/";
  const fileNm = file.name;
  // 파일 경로 설정
  const storageRef = ref(storage, path + fileNm);
  const result = await uploadBytes(storageRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref)
    .then((url: string) => {
      return url;
    });
  });

  return result;
};
