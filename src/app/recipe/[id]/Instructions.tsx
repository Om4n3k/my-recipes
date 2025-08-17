import { Footprints } from 'lucide-react';
import React, { FC } from 'react'

interface Props {
    instructions: string[];
}

const Instructions: FC<Props> = ({ instructions }) => {
    return (
        <div className="space-y-5">
            <h2 className='flex items-center gap-2 font-bold text-xl'>
                <Footprints className='text-rose-600' />
                <span className='flex-1'>Cooking instruction</span>
            </h2>
            {instructions.map((el, idx) => (
                <div key={el} className='bg-rose-300/20 p-4 rounded-2xl'>
                    <h3 className='font-bold text-rose-500'>Step {idx + 1}</h3>
                    <p>
                        {el}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Instructions