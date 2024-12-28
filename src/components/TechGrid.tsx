'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import Link from 'next/link'

type Technology = {
    name: string
    type: string
    image: string
}

type TechnologiesProps = {
    [key: string]: Technology
}

export default function TechGrid({ technologies }: { technologies: TechnologiesProps }) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredTechnologies = Object.entries(technologies).filter(([key, tech]) =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.type.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const groupedTechnologies = filteredTechnologies.reduce((acc, [key, tech]) => {
        if (!acc[tech.type]) {
            acc[tech.type] = []
        }
        acc[tech.type].push({ key, ...tech })
        return acc
    }, {} as Record<string, (Technology & { key: string })[]>)

    return (
        <div>
            <Input
                type="text"
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                className="mb-8 border-gray-800 py-5 px-7 focus:border-gray-500"
            />
            {Object.entries(groupedTechnologies).map(([type, techs]) => (
                <div key={type} className="mb-8  ">
                    <h2 className="text-2xl font-semibold mb-4 capitalize">{type}s</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {techs.map((tech) => (
                            <Link href={`./${tech.key}`} key={tech.key} className="border rounded-lg p-4 flex flex-col items-center duration-200 border-gray-800  hover:border-gray-500 transition-all hover:bg-[#181818]">
                                <Image src={tech.image} alt={tech.name} width={64} height={64} className="mb-2" />
                                <h3 className="text-lg font-medium">{tech.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}