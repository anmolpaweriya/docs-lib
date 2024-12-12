"use client"

import Loading from '@/components/Loading/Loading'
import RichTextEditor from '@/components/RichTextEditor/RichTextEditor'
import langListJSON from '@/data/topics.json'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'





// types 

// set type to langList
let langList: {
    [index: string]: {
        name: string
    }
} = langListJSON










export default function Create() {

    const pageData = useRef("Intro")
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const searchParams = useSearchParams();

    const [loadingEnabled, setLoadingEnabled] = useState(false)



    async function sendCreateRequest(event: { preventDefault: () => void }) {
        event.preventDefault();
        if (!formRef.current) {
            router.refresh();
            return;
        }

        const formData = new FormData(formRef.current)
        formData.append("pageData", pageData.current);



        setLoadingEnabled(true)



        const data = await fetch("/api/create", {
            method: "PUT",
            body: formData
        }).then(res => res.json());


        setLoadingEnabled(false)

        if (data.err != undefined) {
            alert("Something went Wrong")
            return
        }
        const topicName = formData.get('topicName')
        const pageName = `${formData.get('pageName')}`.replaceAll(" ", "-")
        router.replace(`/${topicName}/${pageName}`);

    }








    return <>
        {loadingEnabled
            &&
            <Loading />
        }

        <div className="lg:px-[10%] px-5 box-border h-full w-full pt-5 overflow-y-scroll">

            <form ref={formRef} className='flex flex-col gap-5   w-full box-border'>
                <div className='flex justify-between'>

                    <h1 className='text-4xl max-sm:text-3xl'>
                        Create Page
                    </h1>
                    <button
                        onClick={sendCreateRequest}
                        className='px-5 rounded-md bg-lime-600 text-black'
                    >Save</button>
                </div>


                <div className='flex flex-col w-full gap-2'>

                    <h2 className='text-xl max-sm:text-xl'>Topic</h2>
                    <select
                        name='topicName'
                        className='w-[95%] self-center bg-[#151515] box-border outline-none p-3 rounded text-xl'
                        defaultValue={searchParams.get('topic') || ""}
                    >
                        {Object.keys(langList).map(e => <option
                            key={e}
                            value={e}>{langList[e].name}</option>
                        )}
                    </select>

                </div>
                <div className='flex flex-col w-full gap-2'>

                    <h2 className='text-xl max-sm:text-xl'>Page Name</h2>
                    <input
                        required
                        type="text"
                        name='pageName'
                        className='w-[95%] self-center bg-[#151515] box-border outline-none p-3 rounded text-xl placeholder:text-[#333]'
                        placeholder='Enter page name'
                    />

                </div>
                <div className='flex flex-col w-full gap-2'>

                    <h2 className='text-xl max-sm:text-xl'>Page Data</h2>
                    <RichTextEditor
                        pageData={pageData}
                        topic={searchParams.get('topic') || ""}
                    />

                </div>





            </form>
        </div>

    </>
}