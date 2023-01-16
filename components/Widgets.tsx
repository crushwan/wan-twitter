import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TwitterTimelineEmbed } from "react-twitter-embed"

function Widgets() {
  return (
    <div className="hidden lg:inline col-span-3 px-4 mt-5 space-y-5">
      <div className="flex items-center space-x-2 bg-[#fdfdfd] p-3 rounded-2xl mt-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-900"/>
        <input 
          type="text" 
          placeholder="Search Twitter" 
          className="bg-transparent flex-1 outline-none text-gray-900 placeholder:text-" 
        />
      </div>

      <TwitterTimelineEmbed 
        sourceType="profile"
        screenName="twitter"
        options={{height: 1000}}
        theme="dark"
        noScrollbar
        transparent
      />

    </div>
  )
}

export default Widgets