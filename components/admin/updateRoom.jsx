import React from 'react';
import {useEffect ,useState} from 'react'

import {
    getDownloadURL,
    ref,
    uploadString,
    getStorage,
    uploadBytes,
  } from "firebase/storage";
import {db,storage} from '../../firebase'
import { updateRoom} from '../../utils/db'
const UpdateRoom = ({room,roomid }) => {

const [name,setName] = useState('')
const [location,setLocation] = useState('')
const [images,setImages] = useState([])
const [internet,setInternet] = useState('')
const [breackfast,setBreakfast] = useState('')
const [Smooking,setSmooking] = useState('')
const [Category,setCategory] = useState('')




const handleimages = async (e) => {




    console.log("imageColor is not empty");
  
  
      const file = e.target.files[0];
      console.log(file);
      // generate a random string
     
  
      const testRef = ref(storage, `rooms/${file.name}`);
  
      await uploadBytes(testRef, file).then((snapshot) => {
        console.log("Uploaded image to storage success!");
      });
  
      // get image url from storage and set into state
      const down = await getDownloadURL(testRef);
      //setproductimage(down);
  
      setImages([...images, { image: down, name: file.name }]);
   console.log('📍📍📍📍',images);
    
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
          name : location + 'Hotel',
          location: location,
          price:room?.price,
          images: images,
          desc: room?.desc,
           category: Category,
           guests: room?.guests,
             internet: internet,
                breakfast: breackfast,
                conditioned: room?.Conditioned || false,
                smoking:  Smooking,
                cleaning: room?.cleaning,
                beds: room?.beds,
                createdAt:Date.now(),
            //    reviews: [],
    
        };
    
    
       
        await updateRoom(roomid, data);
    
        
        }
      








    return (
        <div className='w-full mb-12'>

{/* <input placeholder={room?.name} onChange={(e) => setName(e.target.value)}  type="text" /> */}

<div className=' flex gap-12 mb-12 '>


{room?.images?.map((image,index) => (

<div>
    <img className='phone:w-[140px] object-cover rounded-full laptop:w-[200px]' src={image?.image} alt="" />
</div>

))}
</div>


{/* -----form items----- */}


<form className=' w-2/3 mx-auto'>
  <div className="relative  z-0 mb-6 w-[80%] group">
      <input type="text" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={room?.name} required=""/>
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Room Name</label>
  </div>
  <div className="relative z-0 mb-6 w-full group">
      <input
      onChange={(e) => setLocation(e.target.value)}
      
      type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder={room?.lacation} required=""/>
      <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Room Location</label>
  </div>


  <div class="relative z-0 mb-6 w-full group">
     
     <label for="underline_select" className="sr-only">Underline select</label>
   <select
   onChange={(e) => setCategory(e.target.value)}
   
   id="underline_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
       <option selected>Choose Category</option>
       <option value="king">king</option>
       <option value="single">single</option>
       <option value="double">double</option>
       
   </select>
   
   
   
     </div>






  <div className="relative z-0 mb-6 w-full group">
     
  <label for="underline_select" className="sr-only">Underline select</label>
<select
onChange={(e) => setInternet(e.target.value)}

id="underline_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
    <option selected>Choose internet</option>
    <option value="true">true</option>
    <option value="false">false</option>
    
</select>



  </div>


  <div class="relative z-0 mb-6 w-full group">
     
     <label for="underline_select" className="sr-only">Underline select</label>
   <select
   onChange={(e) => setBreakfast(e.target.value)}
   
   id="underline_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
       <option selected>Choose breackfast</option>
       <option value="true">true</option>
       <option value="false">false</option>
       
   </select>
   

   
     </div>


     <div class="relative z-0 mb-6 w-full group">
     
     <label for="underline_select" className="sr-only">Underline select</label>
   <select
   onChange={(e) => setSmooking(e.target.value)}
   
   id="underline_select" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
       <option selected>Choose Smooking</option>
       <option value="true">true</option>
       <option value="false">false</option>
       
   </select>
   
   
   
     </div>


     {/* ----images upload---- */}


     <div className="flex justify-center items-center w-full">
    <label for="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800  hover:bg-gray-100   dark:hover:bg-gray-600">
        <div className="flex flex-col justify-center items-center pt-5 pb-6">
            <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input
        onChange={handleimages} type="file" multiple={true}
        id="dropzone-file" 
     
        className="hidden"/>
    </label>
</div> 






  
  <button
  
  onClick={handleSubmit}
  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
</form>

{images?.length}

{roomid}

            
        </div>
    );
}

export default UpdateRoom;
