"use client"

import Loading from '@/components/Loading/Loading'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'




export default function FormComponent(props: {
    pageId: string,
    pageName: string,
    data: string
}) {


    const pageData = useRef(props.data)
    const router = useRouter();

    const [loadingEnabled, setLoadingEnabled] = useState(false)
    console.log(props.data)


    async function sendEditRequest(event: { preventDefault: () => void }) {
        event.preventDefault();

        const formData = new FormData();


        formData.append("pageId", props.pageId)
        formData.append("pageData", pageData.current)


        setLoadingEnabled(true)

        const data = await fetch("/api/edit", {
            method: "PUT",
            body: formData
        }).then(res => res.json());
        setLoadingEnabled(false)



        if (data.err != undefined) {
            alert("Something went Wrong")
            return
        }

        router.back();
        router.refresh();

    }


    return <>
        {loadingEnabled
            &&
            <Loading />
        }



        <form className='flex flex-col gap-5   w-full box-border'>
            <div className='flex mb-10 justify-between'>

                <h1 className='text-4xl max-sm:text-3xl'>
                    Create Page
                </h1>
                <button
                    className='px-5 rounded-md bg-lime-600 text-black'
                    onClick={sendEditRequest}
                >Save</button>
            </div>




            <div className='flex flex-col w-full gap-2'>

                <h2 className='text-xl max-sm:text-xl'>Page Name</h2>
                <input readOnly
                    name='topicName'
                    className='w-[95%] text-[#777] self-center bg-[#151515] box-border outline-none p-3 rounded text-xl'
                    value={props.pageName}
                />

            </div>


            <div className='flex flex-col w-full gap-2'>

                <h2 className='text-xl max-sm:text-xl'>Page Data</h2>

                <RichTextEditor
                    pageData={pageData}
                    topic={""}
                />

            </div>





        </form>
    </>
}