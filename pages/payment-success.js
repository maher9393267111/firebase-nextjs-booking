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
 //   const bookings = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));



const router = useRouter();

// const { userid ,roomid ,checkInDate, checkOutDate, paymentType,roomName, roomImages} = router.query

// console.log(userid,roomid,checkInDate, checkOutDate, paymentType,roomName, roomImages);


useEffect(() => {


   message.success('Payment Successful')

    setTimeout(() => {
        router.push('/')
    } , 3000)
    

}, [])





    return (
        <div>

            payment is success
            
        </div>
    );
}

export default PaymentSuccess;
