import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/global/Layout'
export default function Home() {
  return (
    <Layout className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="HomePage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <div>


Home page

     </div>




    </Layout>
  )
}
