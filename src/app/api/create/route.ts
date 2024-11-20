import prisma from "@/lib/prismaClient";


export async function PUT(req: Request) {



    if (!Boolean(process.env.IS_ADMIN === 'true'))
        return new Response(JSON.stringify({ err: "Access Denied" }))

    try {
        const formData = await req.formData();

        const topicName: string = String(formData.get("topicName"))
        const pageName: string = String(formData.get("pageName"))
        const pageData: string = String(formData.get("pageData"))


        if (topicName == null || pageName == null || pageData == null)
            return new Response(JSON.stringify({ err: " Something is missing" }))


        const topicData: { id: string } | null = await prisma.topic.findFirst({
            where: {
                name: topicName
            }
        })
        if (!topicData)
            throw new Error("Topic is missing")



        const data = await prisma.page.create({
            data: {
                name: pageName,
                topicId: topicData.id,
                data: pageData
            }
        })
    } catch (err) {
        return new Response(JSON.stringify({ err }))

    }

    return new Response(JSON.stringify({ success: "Page Created Successfully" }))
}