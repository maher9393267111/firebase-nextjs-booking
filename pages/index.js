import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/global/Layout'
import {RoomsFilter,ALLRooms} from '../utils/db'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAuth} from '../context'
import AllRoomsComp  from '../components/home/AllRooms'
export default function Home() {

const router = useRouter()
const {category,location,guests} = router.query
console.log("router.query",router.query)
  const [rooms, setRooms] = useState([])

const {sessioniDate } = useAuth()
console.log("sessioniDate",sessioniDate)


useEffect(() => {

if ( category && location && guests) {
  RoomsFilter(category,location,guests).then((rooms) => {
    console.log("rooms in Home Filter is",rooms)
    setRooms(rooms)
    console.log("rooms in Home is STATE______>",rooms)
  }
  )

}

else {
  ALLRooms().then((rooms) => {
    setRooms(rooms)
  }
  )
}



}, [category,location,guests])





  return (
    <Layout className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="HomePage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <div>

{sessioniDate?.id}


 {rooms?.length > 0 ? 


(
<div>

  <AllRoomsComp rooms={rooms}/>

</div>)
:

 (<h1 >No Rooms</h1> )}





     </div>




    </Layout>
  )
}
