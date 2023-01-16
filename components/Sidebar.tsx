import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
  CircleStackIcon,
  EnvelopeIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/24/solid';
import SidebarRow from "./SidebarRow";
import { signIn, signOut, useSession } from "next-auth/react"

function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="col-span-2 flex flex-col items-center md:items-start px-4 pt-2">
      <img className="h-10 w-10 m-3" src="../twitter3.svg" alt="" />

      <SidebarRow Icon={HomeIcon} title="Home"  />
      <SidebarRow Icon={HashtagIcon} title="Explore"  />
      <SidebarRow Icon={BellIcon} title="Notifications"  />
      <SidebarRow Icon={EnvelopeIcon} title="Messages"  />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks"  />
      <SidebarRow Icon={CircleStackIcon} title="Lists"  />
      <SidebarRow
       Icon={UserIcon} 
       onClick={session ? signOut : signIn}
       title={session ? 'Sign Out' : 'Sign In'}  
       />
      <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More"  />

    </div>
  )
}

export default Sidebar