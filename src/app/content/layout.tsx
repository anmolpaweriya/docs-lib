



export default function EditLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    // admin check (TODO) 
    if (!Boolean(process.env.IS_ADMIN === 'true'))
        return <>
            <h1 className='text-5xl max-sm:text-3xl text-center mt-10'>403 | Forbidden Access</h1>
        </>


    return (<>
        {children}
    </>
    );
}
