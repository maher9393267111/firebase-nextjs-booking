import React from "react";
import { useState, useRef,useEffect } from "react";
import { db, storage } from "../../firebase";
import {Select} from '@chakra-ui/react'
import {
  addDoc,
  collection,
  doc,
 
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadString,
  getStorage,
  uploadBytes,
} from "firebase/storage";

import { useAuth } from "../../context/index";

const CreateProducts = () => {
  const [productinfo, setProductinfo] = useState("");
  const [productname, setProductname] = useState("");
  const [productprice, setProductprice] = useState("");
  const [productTitle, setProductTitle] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat similique dicta nulla praesentium deserunt. Corporis repellendus deleniti dolores eligendi.");
  const [productBrand, setProductBrand] = useState("");

  const [productimagesurl, setproductimagesurl] = useState("");
  const [childtcategory, setchildcategory] = useState([]);
  const [selectedcategory, setselectedcategory] = useState("");
  const [fileurl, setfileurl] = useState("");
  const [images, setImages] = useState([]);
  const [imageColor,setImagecolor] = useState("");
  const [productsize, setProductsize] = useState([]);
  const [success, setSuccess] = useState(false);
  const [guests, setGuests] = useState(0);
  const [internet, setInternet] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [ Conditioned, setConditioned] = useState(false);
    const [smoking, setSmoking] = useState(false);
    const [cleaning, setCleaning] = useState(false);
    const [beds, setBeds] = useState(0);
    const [location, setLocation] = useState("");
  
const {userinfo} = useAuth();


// if  userinfo role is admin then only he can create product else redirect to home page

// useEffect(() => {
//   console.log("userinfo",userinfo.role);

//   if(userinfo.role == "user"){
//     console.log("userinfo",userinfo.role);
//     window.location.href = "/";
//   }
// }
// ,[userinfo]);




  const handleimages = async (e) => {




  console.log("imageColor is not empty");


    const file = e.target.files[0];
    console.log(file);
    // generate a random string
   

    const testRef = ref(storage, `rooms/${userinfo?.name}/${file.name}`);

    await uploadBytes(testRef, file).then((snapshot) => {
      console.log("Uploaded image to storage success!");
    });

    // get image url from storage and set into state
    const down = await getDownloadURL(testRef);
    //setproductimage(down);

    setImages([...images, { image: down, color:imageColor }]);
 
  
  }
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      location: location,
      price: productprice,
      images: images,
      title: productTitle,
       category: selectedcategory,
       guests: guests,
         internet: internet,
            breakfast: breakfast,
            conditioned: Conditioned,
            smoking: smoking,
            cleaning: cleaning,
            beds: beds,
            createdAt:Date.now(),
        //    reviews: [],

    };


    console.log("product------>",product);

     await addDoc(collection(db, "rooms",), product).then(() => {
setSuccess(true);
document.getElementById("product-form").reset();
setImages([]);
     }
      ).catch((error) => {

        setSuccess(false);
      }
      );
        //  reset all the state





  


    
    }
  

 
  




  



  const updateproduct= async (e) => {
    e.preventDefault();

    const product = {
      name: 'maher update',
    
    };



    await updateDoc(doc(db, "products", 'mAQUarQSsvFMmqOz34sR'), {
      username: 'maher',
      title: 'maher update'
  }).then(() => {
      console.log("Document successfully updated!");
  }
  ).catch(error => {

      console.log("Error updating document: ", error);
  }
  );


  }




  return (
    <div className=" boorder2  mb-16 shadow-2xl   text-center  laptop:w-[420px]  h-auto mx-auto mt-12  font-bold">
    
    <form id='product-form' className="form-control" onSubmit={handleSubmit}>

   
      <div>
        <h1>Location</h1>
        <input onChange={(e) => setLocation(e.target.value)} type="text" />
      </div>

      <div>
        <h1>price/night</h1>
        <input
          onChange={(e) => setProductprice(e.target.value)}
          type="number"
        />
      </div>

      <div className="my-12">
        <h1>product category</h1>
        {/* <input onChange={(e) => setselectedcategory(e.target.value)} type="text" /> */}

        <Select placeholder='Select option'
        onChange={(e) => setselectedcategory(e.target.value)}
        
        >
  <option value='king'>king</option>
  <option value='single'>single</option>
  <option value='double'>double</option>
</Select>



      </div>


{/* -beds number---- */}
<div className="my-12">
        <h1>Guests Number</h1>
        {/* <input onChange={(e) => setselectedcategory(e.target.value)} type="text" /> */}

        <Select placeholder='Select option'
        onChange={(e) => setGuests(e.target.value)}
        
        >
  <option value='1'>1</option>
  <option value='2'>2</option>
  <option value='3'>3</option>
  <option value='4'>4</option>
  <option value='5'>5</option>
  <option value='6'>6</option>
</Select>



      </div>



      <div className="my-12">
        <h1>Beds Number</h1>
        {/* <input onChange={(e) => setselectedcategory(e.target.value)} type="text" /> */}

        <Select placeholder='Select option'
        onChange={(e) => setBeds(e.target.value)}
        
        >
  <option value='1'>1</option>
  <option value='2'>2</option>
  <option value='3'>3</option>
  <option value='4'>4</option>
  <option value='5'>5</option>
  <option value='6'>6</option>
</Select>



      </div>



      <div className="my-12">
        <h1>breakfast</h1>
        {/* <input onChange={(e) => setselectedcategory(e.target.value)} type="text" /> */}

        <Select placeholder='Select option'
        onChange={(e) =>setBreakfast(e.target.value)}
        
        >
  <option value='true'>true</option>
  <option value='false'>false</option>
 
</Select>



      </div>




      <div className="my-12">
        <h1>Smoking</h1>
        {/* <input onChange={(e) => setselectedcategory(e.target.value)} type="text" /> */}

        <Select placeholder='Select option'
        onChange={(e) =>setConditioned(e.target.value)}
        
        >
  <option value='true'>true</option>
  <option value='false'>false</option>
 
</Select>



      </div>



      <div className="my-12">
        <h1>Room Cleaning</h1>
        {/* <input onChange={(e) => setselectedcategory(e.target.value)} type="text" /> */}

        <Select placeholder='Select option'
        onChange={(e) =>setCleaning(e.target.value)}
        
        >
  <option value='true'>true</option>
  <option value='false'>false</option>
 
</Select>



      </div>



      <div className="my-12">
        <h1>Internet</h1>
        {/* <input onChange={(e) => setselectedcategory(e.target.value)} type="text" /> */}

        <Select placeholder='Select option'
        onChange={(e) =>setInternet(e.target.value)}
        
        >
  <option value='true'>true</option>
  <option value='false'>false</option>
 
</Select>



      </div>







      <input onChange={handleimages} type="file" multiple={true} />

<div>
  <h1>image color  { imageColor}</h1>
</div>
      <input
      
      onChange={(e) => setImagecolor(e.target.value)}
      
      type="text"  />

      {images.length}

      {/* <button

onClick={uploadImages}
>upoad images</button> */}

      <div>
        images
        <div className=" flex  gap-9">
          {images.map((image, index) => {
            return (
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={image.image}
                alt=""
              />
            );
          })}
        </div>
      </div>

      <div>

      <button
      //  onClick={handleSubmit}
      type="submit"
      
       class="focus:outline-none mt-6 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create</button>

        
      </div>

</form>

  </div>



    
  );
};

export default CreateProducts;