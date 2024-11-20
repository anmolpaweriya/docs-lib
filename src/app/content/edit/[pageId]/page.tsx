
import prisma from '@/lib/prismaClient'
import FormComponent from './FormComponent'







async function getPageData(pageId: string) {
    const data = await prisma.page.findUnique({
        where: {
            id: pageId
        },
        select: {
            name: true,
            data: true
        }
    })
    return data
}






export default async function EditContent({ params: { pageId } }: { params: { pageId: string } }) {




    const pageData = await getPageData(pageId)
    if (!pageData)
        return <>
            <h1 className='text-5xl max-sm:text-3xl text-center mt-10'>403 | Forbidden Access</h1>
        </>







    return <div className="lg:px-[10%] px-5 box-border h-full w-full pt-5 overflow-y-scroll">
        <FormComponent
            pageId={pageId}
            pageName={pageData.name}
            data={pageData.data}
        />

    </div>
}