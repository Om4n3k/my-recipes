import React, { FC } from 'react'
import { CgTime } from 'react-icons/cg'
import { HiMiniFire } from 'react-icons/hi2'
import Difficulty from './Difficulty'
import { User } from '@/generated/prisma';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Props {
    name: string;
    difficulty: number;
    /** In minutes */
    timeEstimate: number;
    creator: User | null;
}

const RecipeHeader: FC<Props> = (props) => {
    const { name, difficulty, timeEstimate } = props;

    return (
        <div className='bg-white shadow-xl -mb-2 p-4 lg:py-16 rounded-2xl lg:rounded-t-none w-full text-center -translate-y-1/4'>
            <div className='flex items-center'>
                <div className='text-left'>
                    <h1 className='font-bold text-3xl'>{name}</h1>
                    <h3 className='font-thin text-neutral-700'>6 ingredients</h3>
                </div>
                {props.creator && (
                    <div className='flex items-center gap-2 ml-auto'>
                        <Avatar>
                            {props.creator.image && <AvatarImage
                                src={props.creator.image}
                                alt={props.creator.name || 'User Avatar'}
                            />}
                            <AvatarFallback>
                                {props.creator.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <span className='font-semibold text-sm'>{props.creator.name}</span>
                    </div>
                )}
            </div>
            <div className='flex justify-between items-center mt-4 font-thin text-neutral-700'>
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