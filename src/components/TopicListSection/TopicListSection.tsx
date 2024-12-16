"use client"

// prisma model types
import Link from 'next/link'
import { useState } from 'react'


// icons 
import { RxHamburgerMenu } from "react-icons/rx";



type TopicListPropType = {
    pages: { name: string, id: string }[],
    topic: string,
    selectedPage: string,
    isAdmin: boolean
}


export default function TopicListSection(props: TopicListPropType) {
    const [menuOpen, setMenuOpen] = useState(props.selectedPage === "")


    return <div
        className={"h-[90vh]  max-sm:fixed w-full  transition-all duration-200 max-sm:grid max-sm:grid-cols-[80%_auto] "
            +
            (menuOpen ? "left-[0%] " : "left-[-100%] ")
        }>

        <ul className="flex relative flex-col items-center overflow-y-scroll max-sm:bg-[#181818] gap-1 h-full w-full box-border px-2 pt-3 pb-2  bg-red ">


            {
                props.pages.map((page, index) => {
                    return <Link
                        href={`/${props.topic}/${page.name.replaceAll(' ', '-')}`}
                        key={index}

                        className={"rounded font-medium text-sm text-[#777] transition-all   p-2 w-[95%] bg-[#111] box-border    " +
                            (props.selectedPage == page.name.toLowerCase() ? "bg-blue-400 bg-opacity-10 font-semibold text-blue-500 " : "hover:bg-[#222] hover:text-[#ccc]")
                        }
                    >{page.name}</Link>
                })
            }



            {props.isAdmin &&
                <Link href={`/content/create?topic=${props.topic}`} className='bg-[#222] sticky bottom-2 mt-20  transition-all text-[#999] w-[90%] p-2 rounded text-center   hover:bg-[#ccc] hover:text-[#000] '>+ create</Link>
            }

        </ul>

        {menuOpen ?
            <button className='sm:hidden h-full bg-black opacity-65'
                onClick={() => setMenuOpen(false)}
            ></button>

            :
            <button
                className='sm:hidden fixed left-3 bottom-2 bg-[#ccc] text-black text-3xl p-2 rounded-full'
                onClick={() => setMenuOpen(true)}
            >
                <RxHamburgerMenu />
            </button>
        }
    </div>
} 