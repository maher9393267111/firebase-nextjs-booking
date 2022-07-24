
import Stripe from 'stripe';
import absoluteUrl from 'next-absolute-url'
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// shipping id = shr_1Ks2YaF5haJ9Do96oUbDC6uF

export default async function handler(req, res) {
    if (req.method === 'POST') {
 

try {

    const {roomid} = req.query;
    console.log('query Room ID 🔘🔘🔘🔘' , roomid);

 // Get origin
 const { origin } = absoluteUrl(req);

 const {useremail, roomId,  totalprice, daysOfStay,  userid,   checkInDate, checkOutDate, paymentType,roomName,   roomImages} = req.body;

 console.log(req.body);

  // Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${origin}/`,
    cancel_url: `${origin}/room/${roomId}`,
    customer_email: useremail,
    client_reference_id: roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
        {
            name: roomName,
            images: [`${roomImages[0].image}`],
            amount: totalprice * 100,
            currency: 'usd',
            quantity: 1
        }
    ]
})





res.status(200).json(session);



} catch (error) {
    res.status(500).json({message: error.message});

}








    }}
     
     






// import Stripe from 'stripe';
// import {db} from '../../../firebase'
// import {collection,addDoc} from 'firebase/firestore'
// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// export default async (req, res) => {
//   const { dataroom } = req.body;
//   const { id } = req.query;
//   console.log(req.body.useremail);

// const {useremail, roomid,  totalprice, daysOfStay,  userid,   checkInDate, checkOutDate, paymentType} = req.body;

// console.log(req.body);





// //   const charge = await stripe.charges.create({
// //   amount:  totalprice * 100,
// //     submit_type: 'pay',
// //     mode: 'payment',
// //     payment_method_types: ['card'],
// //     billing_address_collection: 'auto',
// //     currency: 'usd',
// //     customer: useremail,
// //   //  source: token.id,
// //     description: 'Hotel booking',
// //   });

// //   const booking = await addDoc(collection(db, "bookings"), {
// //     roomid: roomid,
// //     userid: userid,
// //     totalprice: totalprice,
// //     currency: 'usd',
// //   //  chargeid: charge.id,
// //     status: 'paid',
// //   });





//   res.status(200).json({message: "success" });
// }