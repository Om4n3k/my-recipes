import { CloudImage } from '@/components/CloudImage';
import { getRecipes } from '@/lib/db';
import Link from 'next/link';
import { CgTime } from 'react-icons/cg';
import Difficulty from './recipe/[id]/Difficulty';

export default async function Home() {
    const recipes = await getRecipes();
    console.log(recipes);

    return (
        <>
            <h2 className='font-bold text-2xl'>
                <span className='text-rose-600'>Explore</span> our ideas
            </h2>
            <section className='gap-4 grid grid-cols-2'>
                {recipes.map(recipe => (
                    <Link href={`/recipe/${recipe.id}`} key={recipe.id} className='relative flex justify-center items-end shadow rounded-xl aspect-square overflow-hidden'>
                        {recipe.image && (
                            <CloudImage
                                className='top-0 left-0 -z-10 absolute object-cover aspect-square'
                                src={recipe.image}
                                alt={recipe.title}
                                width={300}
                                height={300}
                            />
                        )}
                        <div
                            className='-z-10 absolute bg-black blur-xl w-full h-1/3 rotate-6'
                        />
                        <div className='flex flex-col shadow-2xl px-4 py-2 w-full text-white'>
                            <h3 className='font-bold text-xl'>
                                {recipe.title}
                            </h3>
                            <div className='flex justify-between items-center w-full'>
                                <span className='inline-flex items-center gap-1.5 font-thin text-sm'>
                                    <CgTime className='text-xl' /> {recipe.time}min
                                </span>
                                <Difficulty
                                    size='small'
                                    difficulty={recipe.difficulty}
                                    maxDiffuculty={3}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        </>
    )
}