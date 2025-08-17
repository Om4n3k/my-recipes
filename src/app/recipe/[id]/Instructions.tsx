import { CloudImage } from '@/components/CloudImage';
import { RecipeStep } from '@/generated/prisma';
import { Footprints } from 'lucide-react';
import React, { FC } from 'react'

interface Props {
    instructions: RecipeStep[]
}

const Instructions: FC<Props> = ({ instructions }) => {
    return (
        <div className="space-y-5">
            <h2 className='flex items-center gap-2 font-bold text-xl'>
                <Footprints className='text-rose-600' />
                <span className='flex-1'>Cooking instruction</span>
            </h2>
            {instructions.map((el, idx) => (
                <div key={el.description} className='bg-rose-300/20 p-4 rounded-2xl'>
                    <h3 className='font-bold text-rose-500'>Step {idx + 1}</h3>
                    {el.image && (
                        <CloudImage
                            src={el.image}
                            alt={`Step ${idx + 1} image`}
                            className='mb-2 rounded-lg w-full object-scale-down'
                            height={100}
                            width={800}
                        />
                    )}
                    <p>
                        {el.description}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Instructions