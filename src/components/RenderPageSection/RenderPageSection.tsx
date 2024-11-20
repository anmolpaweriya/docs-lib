"use client"

import Prism from 'prismjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';




//icons
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";


//css 
import './RenderPageSection.css'
import "prismjs/components/prism-typescript";
import '@/assets/prism.css'; // Import Prism CSS


// langs [undefined, 'core', 'prism-okaidia', 'markup', 'css', 'clike', 'javascript', 'apacheconf', 'bash', 'c', 'cpp', 'css-extras', 'django', 'docker', 'fortran', 'linker-script', 'go', 'go-module', 'graphql', 'http', 'hpkp', 'hsts', 'ignore', 'java', 'json', 'json5', 'markup-templating', 'mongodb', 'nginx', 'php', 'plsql', 'powerquery', 'powershell', 'pug', 'python', 'r', 'sql', 'typescript', 'uri', 'toolbar', 'copy-to-clipboard']
import '@/assets/prism'
import Loading from '../Loading/Loading';






export default function (props: {
    data: string,
    pageId: string,
    isAdmin: boolean
}) {


    const router = useRouter();
    const [loadingEnabled, setLoadingEnabled] = useState(false)



    async function deletePage() {

        setLoadingEnabled(true)
        const data = await fetch('/api/delete', {
            method: "DELETE",
            body: JSON.stringify({ pageId: props.pageId })
        }).then(res => res.json())


        setLoadingEnabled(false)
        if (data.success)
            router.refresh();
        else if (data.err) {
            alert(data.err)
        }


    }

    useEffect(() => {
        Prism.highlightAll(); // Highlight all code blocks after the component mounts
    }, []);


    return <>
        {loadingEnabled
            &&
            <Loading />
        }
        <div className='w-full h-full overflow-y-scroll pb-20 pt-7 px-3 '>
            <div className="pb-20 overflow-y-scroll RenderPageSection  ">

                <div dangerouslySetInnerHTML={{ __html: props.data }} />
            </div>


            {props.isAdmin &&

                <>

                    <br /><br />
                    <hr />
                    <div className='flex flex-row justify-end gap-2 w-full box-border pr-10 mt-10'>
                        <Link
                            href={`/content/edit/${props.pageId}`}
                            className='px-3 py-2 bg-lime-600 rounded flex gap-2 items-center text-black'
                        ><CiEdit /> Edit</Link>
                        <button
                            onClick={deletePage}
                            className='px-3 py-2 bg-red-600 rounded flex gap-2 items-center '><MdDelete /> Delete</button>
                    </div>
                </>}

        </div>
    </>
}