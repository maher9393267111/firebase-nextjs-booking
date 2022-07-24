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
import moment from 'moment';

import { extendMoment } from 'moment-range';

const Moment = extendMoment(moment)

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
  



// date avaliability check in booking collection

export const dateAvaliability2 = async (checkin,checkout, roomId) => {


  checkin = new Date(checkin);
   checkout = new Date(checkout);
  const rooms = await getDocs( collection(db, "bookings") , 
  //where("checkin", "<=", checkout) ,
  //where("checkout", ">=", checkin) ,
  where("roomid", "==", '1212'
  //roomId
  ) 
  

   );

   let isavaliable = []
    rooms.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      isavaliable.push({ id: doc.id, ...doc.data() });
    } 
    );

    if(isavaliable?.length > 0){
    //  console.log("isavaliable",isavaliable);
      return false
    }

    return true




}



export const dateAvaliability = async ( roomId,checkin,checkout) => {



 var checkIN = moment(checkin, 'YYYY/MM/DD');

 var checkinAfter = checkIN.format('D');
console.log(" CHECKIN AFTER____>",checkinAfter);

 
var checkOut = moment(checkout, 'YYYY/MM/DD');

var checkOutAfter = checkOut.format('D');
console.log(" CHECKOUT AFTER____>",checkOutAfter);



 const bookings = await getDocs( collection(db, "bookings")  )




const roomArr = []
  bookings.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
  //  console.log(doc.id, " => ", doc.data());
    roomArr.push({ id: doc.id, ...doc.data() });
  });

 // filter bookings by roomId and checkin and checkout

  const filterBookings = roomArr.filter((booking) => {
  


    var checkinbooking = moment(new Date(booking.checkInDate.seconds*1000), 'YYYY/MM/DD');
    var checkinbookingAfter = checkinbooking.format('D');
    console.log("chekinBooking After",checkinbookingAfter);


    var checkoutbooking = moment(new Date(booking.checkOutDate.seconds*1000), 'YYYY/MM/DD');
    var checkinbookoutgAfter = checkoutbooking.format('D');
    console.log("chekinBooking After",checkinbookoutgAfter);



   // console.log("bookingIN",booking.checkInDate, checkin,'-----',);
    return booking.roomid === roomId 
  && checkinbookingAfter <= checkOutAfter
  && checkinbookoutgAfter >= checkinAfter
  })

  console.log("filterBookings",filterBookings);

if (filterBookings.length > 0  ) {
  console.log("LENGTH > 0",filterBookings.length);
  return false
}


  if ( filterBookings.length === 0){
    console.log("LENGTH === 0",filterBookings.length);
    return true
  }



  //return filterBookings;



  





}














// make booking

export const makeBooking = async (data) => {
//console.log("data🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩",data);

  const booking = await addDoc(collection(db, "bookings"), data);

  return booking;

}


export const checkBookedDatesOfRoom = async (roomId) => {

// find booking with room id
const bookings = await getDocs( collection(db, "bookings") , where("roomid", "==", roomId) );

const roomArr = []
  bookings.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
  //  console.log(doc.id, " => ", doc.data());
    roomArr.push({ id: doc.id, ...doc.data() });
  });


  let bookedDates = [];

 

  

  roomArr.forEach((booking) => {

bookedDates.push(booking.checkInDate);
bookedDates.push(booking.checkOutDate);

//var checkIN = moment(, 'YYYY/MM/DD');



  })

  

  //console.log("ExecludesDates---->",bookedDates);

  const ExecludesDates = bookedDates.map((date) => {
    //return moment(date.seconds*1000).format('YYYY/MM/DD'); normal date gosterir yerar month day 

   // return moment(date.seconds*1000).utcOffset(timeDiffernece).format('YYYY/MM/DD');   // utc offset ile gosterir
   return new Date(date.seconds*1000);
  })

console.log("ExecludesDates---->",ExecludesDates);

  return ExecludesDates;









//console.log("bookings",bookings);





}