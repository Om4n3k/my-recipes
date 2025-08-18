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
        <div className='relative -m-8 h-[300px]'>
            <div className='flex justify-between items-center bg-transparent p-8'>
                <Button>
                    <CgChevronLeft />
                </Button>
                <Button className='place-items-center grid bg-black/50 shadow backdrop-blur-md border border-white/50 rounded-2xl w-16 aspect-square text-white text-2xl'>
                    <CgHeart />
                </Button>
            </div>
            <Image
                className='top-0 left-0 -z-10 absolute rounded-b-[60px] w-full h-[300px] object-cover'
                src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt='Greek Salad'
                width={430}
                height={645}
            />
        </div>
    )
}

export default HeaderButtons