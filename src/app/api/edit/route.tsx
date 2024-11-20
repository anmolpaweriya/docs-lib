import prisma from "@/lib/prismaClient";


export async function PUT(req: Request) {

    if (!Boolean(process.env.IS_ADMIN === 'true'))
        return new Response(JSON.stringify({ err: "Access Denied" }))

    try {
        const formData = await req.formData();

        const pageId: string = String(formData.get("pageId"))
        const pageData: string = String(formData.get("pageData"))


        if (pageId == null || pageData == null)
            return new Response(JSON.stringify({ err: " Something is missing" }), { status: 404 })





        await prisma.page.update(
            {
                where: { id: pageId },
                data: {
                    data: pageData
                }
            })


    } catch (err) {
        return new Response(JSON.stringify({ err }))

    }

    return new Response(JSON.stringify({ success: "Page Updated Successfully" }))
}