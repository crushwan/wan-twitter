import { Comments, CommentBody, Tweet } from "../typings"
import TimeAgo from 'react-timeago'
import { ChatBubbleLeftIcon ,HeartIcon, ArrowPathRoundedSquareIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import { fetchComments } from "../utils/fetchComments"
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import toast from 'react-hot-toast'

interface Props {
  tweet: Tweet
}

function Tweet({tweet}: Props) {
  const [comments, setComments] = useState<Comments[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comments[] = await fetchComments(tweet._id)
    setComments(comments);
  }
  
  useEffect(() => {
    refreshComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToast = toast.loading('Posting Comments...')

    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || 'Anonymous',
      profileImg: session?.user?.image || "../images.png",
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: "POST",
    })

    // console.log('Success add comment', result)
    toast.success('Comment Posted', {
      id: commentToast,
    })

    setInput('')
    setCommentBoxVisible(false)
    refreshComments()

  }
  
  // console.log(comments)
  
  return (
    <div className="flex flex-col space-x-3 border-y border-y-slate-500 p-5"> 
      <div className="flex space-x-3">
        <img 
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg} 
          alt=""
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}{' '}
            <img className="h-4 w-4 inline" src="verified.svg" alt="" />
            </p>
            <p className="hidden text-sm text-gray-500 sm:inline ">@{tweet.username.replace(/\s+/g,'').toLowerCase()} • </p>
            <TimeAgo 
              className="text-sm text-gray-400"
              date={tweet._createdAt} 
              />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <img 
              className="m-5 ml-0 mb-1 h-auto rounded-lg object-cover shadow-sm"
              src={tweet.image}
              alt="" 
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-around">
        <div
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)} 
          className="flex cursor-pointer items-center space-x-3 text-gray-300"
        >
          <ChatBubbleLeftIcon            
            className="h-[18px] w-[18px]"
          />
          <p className="-mt-1">{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-300">
          <ArrowPathRoundedSquareIcon className="h-[18px] w-[18px]"/>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-300">
          <HeartIcon className="h-[18px] w-[18px]"/>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-300">
          <ArrowUpTrayIcon className="h-[18px] w-[18px]"/>
        </div>
      </div>

      {/* comment logic */}
      {commentBoxVisible && (
        <form 
          onSubmit={handleSubmit}
          className="mt-3 flex space-x-3"
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 rounded-lg p-2 bg-[#fdfdfd] text-gray-700 outline-none"
            type="text"     
            placeholder="Write a comment..."    
          />
          <button
            disabled={!input}
            type="submit"            
            className="text-twitter disabled:text-gray-500"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll scrollbar-hide border-t
        border-slate-800 p-5">
          {comments.map((comment) => (
            <div
              className="relative flex space-x-2" 
              key={comment._id}
            > 
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30 " />
              <img
                className="mt-2 h-7 w-7 object-cover rounded-full" 
                src={comment.profileImg} 
                alt=""
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">@{comment.username.replace(/\s+/g, '').toLowerCase()} • </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />                  
                </div>

                <p>{comment.comment}</p>
                
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet