
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
 console.log('origin 🔘🔘🔘🔘' , origin);

 const {useremail, roomId,  totalprice, daysOfStay,  userid,   checkInDate, checkOutDate, paymentType,roomName,   roomImages} = req.body;

 //console.log(req.body);

  // Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
   // success_url: `${origin}/`,
     success_url: `${origin}/payment-success?userid=${userid} `,
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


// if user make paid save payment to db





res.status(200).json(session);



} catch (error) {
    res.status(500).json({message: error.message});

}








    }}
     
     




