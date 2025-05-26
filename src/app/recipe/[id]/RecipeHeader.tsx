import React, { FC } from 'react'
import { CgTime } from 'react-icons/cg'
import { HiMiniFire } from 'react-icons/hi2'
import Difficulty from './Difficulty'

interface Props {
    name: string;
    difficulty: number;
    /** In minutes */
    timeEstimate: number;
}

const RecipeHeader: FC<Props> = (props) => {
    const { name, difficulty, timeEstimate } = props;

    return (
        <div className='w-full p-4 bg-white shadow-xl rounded-2xl -translate-y-1/4 text-center -mb-2'>
            <h1 className='font-bold text-3xl'>{name}</h1>
            <h3 className='font-thin text-neutral-700'>6 ingredients</h3>
            <div className='flex justify-between items-center text-neutral-700 font-thin mt-4'>
                <span className='inline-flex items-center gap-1.5'><CgTime className='text-xl' /> {timeEstimate}min</span>
                <Difficulty
                    difficulty={difficulty}
                    maxDiffuculty={3}
                />
            </div>
        </div>
    )
}

export default RecipeHeader