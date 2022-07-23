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

export const updateRoom = async (roomId, data,room) => {
  // delete room old images  from storage
console.log("roomId",roomId);
  if (room.images.length > 0) {
    room.images.forEach(async (image) => {
      console.log("imageMAps", image?.name);
    //  deleteObject(ref(storage, image.)),
  await  deleteObject(ref(storage, 'rooms/' + image?.name)).then(() => {
      message.success("Room images deleted successfully");
    }).catch((err) => {
      message.error(err.message);
    })



    });
  }


console.log("data🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩",data);
    await   updateDoc(doc(db, "rooms", `${roomId}` ), data) 
    .then(() => {
      message.success("Room Updated Successfully");
    })
    .catch((error) => {
      message.error(error.message);
    })
   
};



// Delete Room

export const deleteRoom = async (roomId,room) => {

console.log("roomId",roomId,room)

// delete room old images  from storage
  //const room = await getDoc(doc(db, "rooms", roomId));
  if (room?.images?.length > 0) {



    room.images.forEach(async (image) => {
console.log("imageMAps", image?.name);
      console.log("imageMAps", image?.name);
    //  deleteObject(ref(storage, image.)),
    deleteObject(ref(storage, 'rooms/' + image?.name)).then(() => {
      deleteDoc(doc(db, "rooms", roomId)).then(() => {
        message.success("Room deleted successfully");}).catch((err) => {
          message.error(err.message);
        })
      message.success("Room images deleted successfully");
    }).catch((err) => {
      message.error(err.message);
    })
  }
  );
}



}


// rooms by category and location and guests


export const RoomsFilter = async (
  category,
  location,
  guests
) => {

  const rooms = await getDocs( collection(db, "rooms") , where("category", "==", category) , 
  //where("location", "==", location) ,
   where("guests", "==", guests) );




const roomArr = []
  rooms.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    roomArr.push({ id: doc.id, ...doc.data() });
  });

 

  
  const regex = new RegExp(location, "i");




  const filterRooms= roomArr.filter((room) => {
    return room.location.match(regex);
  });



console.log("filterRooms  🛢️ 🛢️ 🛢️ 🛢️ 🛢️ 🛢️ ",filterRooms);

  return filterRooms;
}
  
 



export const  ALLRooms = async (
 
) => {

  const rooms = await getDocs( collection(db, "rooms")  )




const roomArr = []
  rooms.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    roomArr.push({ id: doc.id, ...doc.data() });
  });

 
  return roomArr;
}
  