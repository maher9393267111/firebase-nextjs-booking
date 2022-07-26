import React from "react";
import ImageSlider from "./slider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../context";
import axios from 'axios'
import { message } from "antd";
import moment from 'moment';
import getStripe from '../../getStripe';
import { dateAvaliability, makeBooking ,checkBookedDatesOfRoom  } from "../../utils/db";
const RoomDetail = ({ room,roomId }) => {
  const { userinfo,setSessioniDate,sessioniDate } = useAuth();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [avaliable, setAvaliable] = useState(false);
  const [execludes, setExecludedDates] = useState([]);

  const onChange = (dates) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);


    if (checkInDate && checkOutDate) {
  
      console.log('✒✒✒',checkInDate, checkOutDate);

      const days = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
      );

   

      setDaysOfStay(days);
  

      dateAvaliability(roomId, checkInDate.toISOString(), checkOutDate.toISOString()).then((res) => {
        console.log("resIN details ", res.data);
        setAvaliable(res);
        console.log('avaliable in details :::: ',avaliable)
      });

   
    }
  };

  // make booking and payment

  const onBooking = async(e) => {
    e.preventDefault();
    const stripe = await getStripe();

 const   dataRoom = {
      roomId: roomId,
      checkInDate:checkInDate,
      checkOutDate: checkOutDate,
      daysOfStay: daysOfStay,
      userid: userinfo?.id,
      userName: userinfo?.name,
      roomName: room?.name,
      roomImages: room?.images,
      
      useremail: userinfo?.email,
      paymentType: "Stripe",
      totalprice: room.price * daysOfStay,
      paymentStatus: "Pending",
    };
//console.log("data :::: ", data);


const {res} = axios.post(`/api/room/${roomId}`, dataRoom).then((res) => {

    console.log("response data🔵🔵🔵--->  ", res.data);
    setSessioniDate(res.data);
    console.log("session-------------> date :::: ", sessioniDate);
     stripe.redirectToCheckout({ sessionId: res.data.id }); // redirect to stripe buy page
}).catch((err) => {
    message.error(err.message);
})



//console.log("dataResponse in Client  ", res);

// const data = res
// console.log("data   ☀️  ☀️  ☀️  ☀️  ", data);
// stripe.redirectToCheckout({ sessionId: data.id });



    // makeBooking(data)
    //   .then((res) => {
    //     message.success("Booking Successful");
    //   })
    //   .catch((err) => {
    //     message.error(err.message);
    //   });
  };


    useEffect(() => {
        checkBookedDatesOfRoom(roomId).then((res) => {
          
            console.log("res EXECLUDE 🌟🌟----> details :::: ", res);
           // console.log(new Date())
            setExecludedDates(res);
            console.log("execludedDatesn IN state hooks 🌟🌟🌟 :::: ", execludes);
        })

    }, [roomId]);






  return (
    <div className=" mx-24 mt-14 pb-24">
      <div>
        <div>
          <p className=" text-3xl font-semibold">{room?.name} </p>

          {/* ---ratings-- */}
          <div className="mt-4  flex gap-2">
            <div>
              <img
                className="w-8 h-8"
                src="https://cdn0.iconfinder.com/data/icons/interface-line-4/48/Favorite_star_rate-256.png"
                alt=""
              />
            </div>

            <div>
              <img
                className="w-8 h-8"
                src="https://cdn0.iconfinder.com/data/icons/interface-line-4/48/Favorite_star_rate-256.png"
                alt=""
              />
            </div>

            <div>
              <img
                className="w-8 h-8"
                src="https://cdn0.iconfinder.com/data/icons/interface-line-4/48/Favorite_star_rate-256.png"
                alt=""
              />
            </div>

            <div>
              <img
                className="w-8 h-8"
                src="https://cdn0.iconfinder.com/data/icons/interface-line-4/48/Favorite_star_rate-256.png"
                alt=""
              />
            </div>

            <div>
              <img
                className="w-8 h-8"
                src="https://cdn0.iconfinder.com/data/icons/interface-line-4/48/Favorite_star_rate-256.png"
                alt=""
              />
            </div>
          </div>

          <div>
            <p className=" ml-4 mt-4 font-semibold hovtxt">(0 Reviews)</p>
          </div>
        </div>
      </div>

      {/* ------slider---- */}

      <div>
        <ImageSlider room={room} />
      </div>

      {/* ---- grid d room details  and datapicker----  */}

      <div className=" grid grid-cols-12">
        <div className=" phone:col-span-12 mb-10 laptop:col-span-8">
          <div>
            <h3 className=" text-2xl font-bold ml-6">Description</h3>

            <p className="ml-6 font-md w-[94%] text-[19px] mt-6">
              {room?.desc}
            </p>

            {/* ----features---- */}
            <div>
              <div className=" mt-12">
                <h2 className="ml-6 text-3xl font-bold">Features:</h2>

                <ul className="my-4">
                  <li className="text-xl my-2 font-semibold">
                    {" "}
                    <span>
                      {" "}
                      <img
                        className="w-8 h-8 rounded-full inline-block mr-3"
                        src="https://cdn3.iconfinder.com/data/icons/basic-ui-1-glyph/64/1_3_friend_friends_group_people_peoples_team-256.png"
                        alt=""
                      />{" "}
                    </span>{" "}
                    Guests {room?.guests}{" "}
                  </li>

                  <li className="text-xl my-2 font-semibold">
                    {" "}
                    <span>
                      {" "}
                      <img
                        className="w-8 h-8 rounded-full inline-block mr-3"
                        src="https://cdn2.iconfinder.com/data/icons/maps-and-locations/12/hotel-256.png"
                        alt=""
                      />{" "}
                    </span>{" "}
                    Beds {room?.beds}{" "}
                  </li>

                  <li className="text-xl my-2 font-semibold">
                    {" "}
                    <span>
                      {room?.breakfast ? (
                        <img
                          className="w-8 h-8 rounded-full inline-block mr-3"
                          src="https://cdn3.iconfinder.com/data/icons/flat-ui/500/50-256.png"
                          alt=""
                        />
                      ) : (
                        <img
                          src=" https://cdn1.iconfinder.com/data/icons/basic-ui-126/32/no-reject-incorrect-false-ban-cross-close-256.png"
                          className="w-8- h-8 rounded-full inline-block mr-3"
                          alt=""
                        />
                      )}
                    </span>{" "}
                    Breakfast{" "}
                  </li>

                  <li className="text-xl my-2 font-semibold">
                    {" "}
                    <span>
                      {room?.smooking ? (
                        <img
                          className="w-8 h-8 rounded-full inline-block mr-3"
                          src="https://cdn3.iconfinder.com/data/icons/flat-ui/500/50-256.png"
                          alt=""
                        />
                      ) : (
                        <img
                          src=" https://cdn1.iconfinder.com/data/icons/basic-ui-126/32/no-reject-incorrect-false-ban-cross-close-256.png"
                          className="w-8- h-8 rounded-full inline-block mr-3"
                          alt=""
                        />
                      )}
                    </span>{" "}
                    Smooking{" "}
                  </li>

                  <li className="text-xl my-2 font-semibold">
                    {" "}
                    <span>
                      {room?.cleaning ? (
                        <img
                          className="w-8 h-8 rounded-full inline-block mr-3"
                          src="https://cdn3.iconfinder.com/data/icons/flat-ui/500/50-256.png"
                          alt=""
                        />
                      ) : (
                        <img
                          src=" https://cdn1.iconfinder.com/data/icons/basic-ui-126/32/no-reject-incorrect-false-ban-cross-close-256.png"
                          className="w-8- h-8 rounded-full inline-block mr-3"
                          alt=""
                        />
                      )}
                    </span>{" "}
                    Room Cleaning{" "}
                  </li>

                  <li className="text-xl my-2 font-semibold">
                    {" "}
                    <span>
                      {room?.conditioned ? (
                        <img
                          className="w-8 h-8 rounded-full inline-block mr-3"
                          src="https://cdn3.iconfinder.com/data/icons/flat-ui/500/50-256.png"
                          alt=""
                        />
                      ) : (
                        <img
                          src=" https://cdn1.iconfinder.com/data/icons/basic-ui-126/32/no-reject-incorrect-false-ban-cross-close-256.png"
                          className="w-8- h-8 rounded-full inline-block mr-3"
                          alt=""
                        />
                      )}
                    </span>{" "}
                    {execludes?.length}
                    Condetioned{" "}
                  </li>

                  <li className="text-xl my-2 font-semibold">
                    {" "}
                    <span>
                      {room?.internet ? (
                        <img
                          className="w-8 h-8 rounded-full inline-block mr-3"
                          src="https://cdn3.iconfinder.com/data/icons/flat-ui/500/50-256.png"
                          alt=""
                        />
                      ) : (
                        <img
                          src=" https://cdn1.iconfinder.com/data/icons/basic-ui-126/32/no-reject-incorrect-false-ban-cross-close-256.png"
                          className="w-8- h-8 rounded-full inline-block mr-3"
                          alt=""
                        />
                      )}
                    </span>{" "}
                    Internet{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ----data picker---- */}

        <div className="phone:col-span-12 laptop:col-span-4">
          <div className=" w-[90%] min-h-[300px] border-2 bg-white">
            <div className="ml-6">
              <p className=" hovtxt font-bold text-xl my-6 ml-4">
                {room?.price}$/night
              </p>
            </div>

            <div className="ml-6">
              <DatePicker
                className="w-100"
                selected={checkInDate}
                onChange={onChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
               
maxDate = {moment().add(22, "days").toDate()}
             excludeDates = { execludes }
                selectsRange
                inline
              />
            </div>


<div>

<h1>{avaliable ? 'This Date is avaliable' : 'This Date Is Not Avaliable'}</h1>

</div>


            {/* --totla price-- */}

            <div>
              <p className=" text-center font-bold my-4 text-xl text-red-500">
                Total Price: {daysOfStay * Number(room?.price)}
              </p>
            </div>

            {userinfo?.id && (
              <div>
                <button
                type="submit"
                onClick ={onBooking}
                
                className=" bg-red-500 hovtext text-white font-bold inline-block w-2/3 p-2 rounded-full mx-auto text-center ml-10">
                  Buy Now
                </button>
              </div>
            )}

            {!userinfo?.id && (
              <div>
                <button className=" bg-red-500 hovtext text-white font-bold inline-block w-2/3 p-2 rounded-full mx-auto text-center ml-10">
                  Login or signup to Buy
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
