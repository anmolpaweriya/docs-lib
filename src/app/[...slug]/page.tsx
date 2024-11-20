import type { Topic } from '@prisma/client'


// data
import langList from '@/data/topics.json'




// components
import TopicListSection from "@/components/TopicListSection/TopicListSection";



// lib
import prisma from '@/lib/prismaClient';
import RenderPageSection from '@/components/RenderPageSection/RenderPageSection';







// functions 
async function getTopic(topicName: string) {
    const data: Topic = await prisma.topic.upsert({
        where: { name: topicName },
        create: {
            name: topicName
        },
        update: {}
    });

    return data

}

async function getPagesOfTopic(topicId: string) {

    const data = await prisma.topic.findUnique({
        where: {
            id: topicId
        },
        select: {
            pages: {
                select: {
                    name: true,
                    id: true,
                    createdAt: true
                }
            }
        }
    })

    return data?.pages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) || []

}

async function getPageData(pageName: string | undefined, topicId: string) {
    if (!pageName) return null
    const pageData = await prisma.page.findFirst({
        where: {
            name: pageName,
            topicId
        },
        select: {
            id: true,
            data: true
        }
    })

    return pageData
}





export default async function MainDocPage({ params }: { params: { slug: string[] } }) {

    const { slug } = params


    // checking if topic is existed or not
    if (!Object.keys(langList).includes(slug[0]))
        return <h1 className=' text-5xl text-center mt-10'>
            404 | Not Found
        </h1>





    const { id: topicId } = await getTopic(slug[0])
    const pages: { name: string, id: string }[] = await getPagesOfTopic(topicId)
    const pageName: string = slug[1] == undefined ? (pages.length ? pages[0].name : "") : slug[1].replaceAll("-", " ");
    const pageData: { data: string, id: string } | null = await getPageData(pageName, topicId);



    return <>
        <div className="grid grid-cols-[16em_auto]  max-sm:grid-cols-1 w-full h-full overflow-hidden  box-border lg:px-[10%] gap-3">




            <TopicListSection
                pages={pages}
                topic={slug[0]}
                selectedPage={pageName.toLowerCase()}
                isAdmin={Boolean(process.env.IS_ADMIN === 'true')}
            />

            {pageData &&
                <RenderPageSection
                    data={pageData.data}
                    pageId={pageData.id}
                    isAdmin={Boolean(process.env.IS_ADMIN === 'true')}
                />
            }
        </div> </>
}