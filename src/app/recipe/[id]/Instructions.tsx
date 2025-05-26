import React, { FC } from 'react'
import { BiFork } from 'react-icons/bi';

interface Props {
    instructions: string[];
}

const Instructions: FC<Props> = ({ instructions }) => {
    return (
        <div className="space-y-5">
            <h2 className='font-bold text-xl flex gap-2 items-center'>
                <BiFork className='text-rose-600' />
                <span className='flex-1'>Cooking instruction</span>
            </h2>
            {instructions.map((el, idx) => (
                <div key={el} className='bg-rose-300/20 rounded-2xl p-4'>
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