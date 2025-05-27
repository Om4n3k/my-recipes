import React, { FC } from 'react'
import { HiMiniFire } from 'react-icons/hi2';

interface Props {
    size?: 'small' | 'normal';
    maxDiffuculty?: number;
    difficulty: number;
}

const Difficulty: FC<Props> = ({
    size = 'normal',
    maxDiffuculty = 3,
    difficulty
}) => {
    const sizeClass = size === 'normal' ? 'text-xl' : 'text-lg';

    if (difficulty < 1 || difficulty > maxDiffuculty) {
        console.error(`Invalid difficulty level: ${difficulty}. It should be between 1 and ${maxDiffuculty}.`);
        return null;
    }
    const difficultyIcons = Array.from({ length: maxDiffuculty }, (_, index) => (
        <HiMiniFire key={index} className={`${sizeClass} ${(index + 1) <= difficulty ? 'text-rose-600' : ''}`} />
    ));

    return (
        <span className='inline-flex items-center gap-1'>
            {difficultyIcons}
        </span>
    )
}

export default Difficulty