import Link from "next/link";

export default function NavBar() {

    return <>
        <header className="box-border h-full ">

            <nav className="box-border h-full  w-full border-b-[#333] lg:px-[10%] px-5 border-b  flex items-center justify-between">
                <h1 className="text-xl font-medium">
                    <Link href={'/'}>
                        Docs
                    </Link>
                </h1>

                <div className="flex gap-2 h-[85%] items-center text-sm ">


                    <div className="h-[70%] gap-4 flex items-center pr-10">
                        <input type="text" className=" h-full rounded-md bg-[#222] outline-none px-3 text-[#aaa] placeholder:text-[#aaaaaa95]  " placeholder="Search documentation" />
                    </div>

                    {/* Todo */}
                    {/* 
                <button className="bg-[#ddd] rounded px-3 py-1.5 text-black font-medium">Login</button>
                <button className=" rounded px-3 py-1.5 border-[#ddd] border box-border font-medium ">Sign up</button> */}

                    <a href="https://github.com/anmolpaweriya/" className=" pr-5" target="_blank">
                        <img src="/img/git.png" alt="" width="30" />
                    </a>
                </div>

            </nav>
        </header>

    </>
}