import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import Widgets from "../components/Widgets"
import { fetchTweets } from "../utils/fetchTweet"
import { Tweet } from "../typings"
import { Toaster } from "react-hot-toast"

interface Props {
  tweets: Tweet[]
}

const Home: NextPage<Props> = ({tweets}: Props) => {
  

  return (
    <div className="xl:max-w-[80rem] max-h-screen overflow-hidden mx-auto bg-[#181818] text-[#fdfdfd]">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/twitter.2.ico" />
      </Head>
      <Toaster />

      <main className="grid grid-cols-10">

        <Sidebar/>

        <Feed tweets={tweets} />

        <Widgets />

      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    }
  }
}
