import Link from "next/link";

// data
import langListJSON from '@/data/topics.json'
import { Fragment } from "react";




// set type to langList
let langList: {
  [index: string]: {
    name: string,
    type: string,
    image: string
  }
} = langListJSON


function getTopicTypes() {
  const types: string[] = []

  Object.values(langList).forEach((element: { type: string }) => {
    if (!types.includes(element.type))
      types.push(element.type)
  })
  return types;
}




// main funciton 
export default function Home() {


  const types = getTopicTypes();


  return (
    <div
      className="w-full lg:px-[10%] px-4  box-border h-full  pb-20"
    >

      {

        types.map((typeName, index) => {
          return <Fragment key={index}>
            <h1 className="text-4xl mt-10">
              {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
            </h1>

            <div className="grid justify-between	 gap-4 mt-5 px-5"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(90px, 150px))"
              }}>
              {
                Object.keys(langList).map(e => {
                  if (langList[e].type === typeName)
                    return <Link
                      className="border-2 rounded-xl h-[130px] border-[#888] py-2 px-5 hover:bg-[#888] hover:text-black transition-all grid grid-rows-[auto_2em] "
                      href={`./${e}`}
                      key={e}
                    >

                      <div
                        className="flex h-full w-full justify-center items-center"
                      >

                        <img src={langList[e].image} className="w-full h-[50px] object-contain " alt=""
                          style={{
                            filter: "drop-shadow(0 0 10px #444)"
                          }}
                        />
                      </div>

                      <p className="text-center">

                        {langList[e].name}
                      </p>

                    </Link>
                })
              }


            </div>
          </Fragment>
        })
      }




    </div>
  );
}
