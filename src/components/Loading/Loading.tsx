import '@/assets/loading.css'

export default function Loading() {

    return <div className="flex justify-center items-center w-full h-full absolute bg-[#181818] z-50">

        <div className="loadingAnimation">
            <span className='animationSphere dot-1'></span>
            <span className='animationSphere dot-2'></span>
            <span className='animationSphere dot-3'></span>
            <span className='animationSphere dot-4'></span>
            <span className='animationSphere dot-5'></span>

        </div>
    </div>
}