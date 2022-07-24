import React from 'react';
import {useRouter} from 'next/router';
import {db} from '../firebase'
import {useState, useEffect} from 'react';
import { addDoc,setDoc,collection } from 'firebase/firestore';
import { useCollection } from "react-firebase-hooks/firestore";
import { makeBooking } from '../utils/db';
import { message } from 'antd';
const PaymentSuccess = () => {

    const [snapshot] = useCollection(collection(db, "bookings"));
    const bookings = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));



const router = useRouter();

const { userid ,roomid ,checkInDate, checkOutDate, paymentType,roomName, roomImages} = router.query

console.log(userid,roomid,checkInDate, checkOutDate, paymentType,roomName, roomImages);


useEffect(() => {

// save data to db then redirect to home page after 2 seconds

 const data = {
    userid,
    roomid,
    checkInDate,
    checkOutDate,
    paymentType,
    roomName,
    roomImages
    }


// if user come from payment page only save data to db else redirect to home page and dotn save data to db

console.log(origin.from);

      makeBooking(data)
      .then((res) => {



        router.push('/');


        message.success("Booking Successful");
      })
      .catch((err) => {
        message.error(err.message);
      });


}, [])





    return (
        <div>

            payment is success
            
        </div>
    );
}

export default PaymentSuccess;
