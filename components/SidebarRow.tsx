import { SVGProps } from "react"

interface Props {
  Icon: (props: SVGProps<SVGSVGElement> ) => JSX.Element
  title: string
  onClick?: () => {}
}

function SidebarRow({Icon, title, onClick} : Props) {
  return (
    <div 
      onClick={onClick}
      className="flex max-w-fit items-center space-x-4 px-4 py-3 cursor-pointer rounded-full hover:bg-[#181818]
      hover:translate-x-[1px] transition-all duration-200 ease-out group"
    >
      <Icon className="h-6 w-6" />
      <p className="hidden md:inline-flex group-hover:text-twitter
      text-base lg:text-lg font-light">{title}</p>
    </div>
  )
}

export default SidebarRow