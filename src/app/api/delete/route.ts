import prisma from "@/lib/prismaClient";


export async function DELETE(req: Request) {

    if (!Boolean(process.env.IS_ADMIN === 'true'))
        return new Response(JSON.stringify({ err: "Access Denied" }), { status: 403 })

    try {
        const { pageId: id } = await req.json();




        await prisma.page.delete({
            where: {
                id
            }
        })


    } catch (err) {
        return new Response(JSON.stringify({ err }))

    }

    return new Response(JSON.stringify({ success: "Page is Deleted Successfully" }))
}