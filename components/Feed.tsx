import { ArrowPathIcon } from '@heroicons/react/24/outline'
import TweetBox from "./TweetBox"
import { Tweet } from "../typings"
import TweetComponent from "./Tweet"
import { fetchTweets } from "../utils/fetchTweet"
import { useState } from "react"
import toast from "react-hot-toast"

interface Props {
  tweets: Tweet[]
}

function Feed({tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  // console.log(tweets);
  
  
  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...')

    const tweets = await fetchTweets();
    setTweets(tweets);

    toast.success('Feed Updated!', {
      id: refreshToast
    })
  }

  return (
    <div className="relative max-h-screen overflow-y-scroll scrollbar-hide col-span-8 lg:col-span-5 border-x border-x-slate-500">
      <div className="z-20 sticky top-0 mx-0 bg-[#181818] opacity-90 backdrop-blur-sm flex justify-between items-end py-3 px-7">
        <h1 className="pb-0 text-xl font-bold">Home</h1>
        <ArrowPathIcon
          onClick={handleRefresh}
          className="h-7 w-7 cursor-pointer text-twitter hover:rotate-180 
          active:scale-105 transition-all duration-500 ease-in-out" 
        />
      </div>

      <div>
        <TweetBox setTweets={setTweets} />
      </div>

      <div>
        {tweets.map(tweet => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>

    </div>
  )
}

export default Feed