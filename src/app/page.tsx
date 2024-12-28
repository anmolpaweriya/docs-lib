
// data
import technologies from '@/data/topics.json'
import TechGrid from "@/components/TechGrid";






// main funciton 
export default function Home() {


  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">DocsLib</h1>
      <p className="text-xl text-center mb-8">
        Your one-stop resource for various programming languages, frameworks, libraries, and tools.
      </p>
      <TechGrid technologies={technologies} />
    </main>
    // <div
    //   className="w-full lg:px-[10%] px-4  box-border h-full  pb-20"
    // >

    //   {

    //     types.map((typeName, index) => {
    //       return <Fragment key={index}>
    //         <h1 className="text-4xl mt-10">
    //           {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
    //         </h1>

    //         <div className="grid 	 gap-4 mt-5 px-5"
    //           style={{
    //             gridTemplateColumns: "repeat(auto-fit, minmax(90px, 150px))"
    //           }}>
    //           {
    //             Object.keys(langList).map(e => {
    //               if (langList[e].type === typeName)
    //                 return <Link
    //                   className="border-2 rounded-xl h-[130px] border-[#888] py-2 px-5 hover:bg-[#888] hover:text-black transition-all grid grid-rows-[auto_2em] "
    //                   href={`./${e}`}
    //                   key={e}
    //                 >

    //                   <div
    //                     className="flex h-full w-full justify-center items-center"
    //                   >

    //                     <img src={langList[e].image} className="w-full h-[50px] object-contain " alt=""
    //                       style={{
    //                         filter: "drop-shadow(0 0 10px #444)"
    //                       }}
    //                     />
    //                   </div>

    //                   <p className="text-center">

    //                     {langList[e].name}
    //                   </p>

    //                 </Link>
    //             })
    //           }


    //         </div>
    //       </Fragment>
    //     })
    //   }




    // </div>
  );
}
