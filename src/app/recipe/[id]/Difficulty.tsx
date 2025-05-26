import React, { FC } from 'react'
import { HiMiniFire } from 'react-icons/hi2';

interface Props {
    maxDiffuculty?: number;
    difficulty: number;
}

const Difficulty: FC<Props> = ({
    maxDiffuculty = 3,
    difficulty
}) => {
    if (difficulty < 1 || difficulty > maxDiffuculty) {
        console.error(`Invalid difficulty level: ${difficulty}. It should be between 1 and ${maxDiffuculty}.`);
        return null;
    }
    const difficultyIcons = Array.from({ length: maxDiffuculty }, (_, index) => (
        <HiMiniFire key={index} className={`text-xl ${(index + 1) <= difficulty ? 'text-rose-600' : ''}`} />
    ));

    return (
        <span className='inline-flex items-center gap-1'>
            {difficultyIcons}
        </span>
    )
}

export default Difficulty