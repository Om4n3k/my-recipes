import React, { FC, JSX } from 'react'
import { CgChevronLeft, CgHeart } from 'react-icons/cg'
import { Button } from './button'
import Image from 'next/image'

interface Props {
    left?: JSX.Element
    right?: JSX.Element
    backgroundUrl?: string
    backgroundAlt?: string
}

const HeaderButtons: FC<Props> = (
    {backgroundAlt, backgroundUrl, left, right}
) => {
    return (
        <div className='-m-8 relative h-[300px]'>
            <div className='bg-transparent p-8 flex justify-between items-center'>
                <Button>
                    <CgChevronLeft />
                </Button>
                <Button className='backdrop-blur-md bg-black/50 text-white aspect-square w-16 rounded-2xl shadow border border-white/50 grid place-items-center text-2xl'>
                    <CgHeart />
                </Button>
            </div>
            <Image
                className='absolute top-0 left-0 -z-10 h-[300px] w-full object-cover rounded-b-[60px]'
                src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt='Greek Salad'
                width={430}
                height={645}
            />
        </div>
    )
}

export default HeaderButtons