import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  orderBy,
  limit,
  query,
  where,
  FieldPath,
  updateDoc,
  arrayUnion,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  getDownloadURL,
  ref,
  uploadString,
  getStorage,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

import { db, storage } from "../firebase";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";
import { message } from "antd";

// update Room

export const updateRoom = async (roomId, data) => {
  // delete room old images  from storage

  if (data.images.length > 0) {
    data.images.forEach(async (image) => {
      
    //  deleteObject(ref(storage, image.)),
    deleteObject(ref(storage, 'rooms/' +   image?.name));



    });
  }

  await updateDoc(doc(db, "products", roomId), data)
    .then(() => {
      message.success("Room Updated Successfully");
    })
    .catch((error) => {
      message.error(error.message);
    });
};
