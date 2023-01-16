import { PhotoIcon, MagnifyingGlassCircleIcon, CalendarIcon, MapIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { useSession } from "next-auth/react"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { Tweet, TweetBody } from "../typings"
import { fetchTweets } from "../utils/fetchTweet"
import toast from "react-hot-toast"

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({setTweets}: Props) {
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')

  const imageInputRef = useRef<HTMLInputElement>(null)

  const { data: session } = useSession();
  const [imageUploadOpen, setImageUploadOpen] = useState<boolean>(false); 

  const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = '';
    setImageUploadOpen(false);
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Anonymous',
      profileImg: session?.user?.image || "../images.png",
      image: image,
    }

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast('Tweet Posted', {
      icon: '🚀'
    })

    return json;
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    postTweet()

    setInput('')
    setImage('')
    setImageUploadOpen(false)
  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="mt-4 h-14 w-14 rounded-full object-cover"
        src={ session?.user?.image || "../images.png"}
        alt=""
      />

      <div className="flex flex-1 items-center pl-0 md:pl-2 scale-90 md:scale-100">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="h-24 w-full text-xl outline-none bg-transparent"
            type="text" 
            placeholder="What's Happening?" 
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-1 md:space-x-4 text-twitter">
              <PhotoIcon 
                onClick={() => setImageUploadOpen(!imageUploadOpen)}
                className="h-6 w-6 cursor-pointer transition-all duration-100
                ease-out hover:scale-125"
              />
              <MagnifyingGlassCircleIcon className="h-6 w-6"/>
              <FaceSmileIcon className="h-6 w-6"/>
              <CalendarIcon className="h-6 w-6"/>
              <MapIcon className="h-6 w-6"/>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!input || !session} 
              className="rounded-full bg-twitter px-5 py-2 scale-90 md:scale-100 font-bold text-white
              disabled:opacity-70"
            >
              Tweet
            </button>
          </div>

          {imageUploadOpen && (
            <form className="rounded-lg mt-5 flex flex-col items-start md:items-center md:flex-row bg-twitter/70 py-2 px-4">
              <input
                ref={imageInputRef}
                className="outline-none flex-1 md:p-2 text-white placeholder:text-[#fdfdfd] bg-transparent"
                type="text" 
                placeholder="Enter Image URL ..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Upload Image
              </button>
            </form>
          )}

          {image && (
            <img className="mt-10 h-40 w-full rounded-lg object-contain" src={image} alt="" />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox