import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/global/Layout'
import {RoomsFilter} from '../utils/db'
import {useState, useEffect} from 'react'
export default function Home() {

const searchfilter =async (category,location,guests) => {

RoomsFilter('king','iz',2).then((rooms) => {

  console.log("rooms in Home is",rooms)

})

}




  return (
    <Layout className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="HomePage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <div>


<div>
  <button type='submit'
  onClick={searchfilter}
  >seacrch</button>
</div>



     </div>




    </Layout>
  )
}
