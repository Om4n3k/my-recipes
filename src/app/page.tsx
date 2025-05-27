import Image from 'next/image';
import Difficulty from './recipe/[id]/Difficulty';
import { CgTime } from 'react-icons/cg';
import { Recipe } from '@/generated/prisma';
import Link from 'next/link';

const recipes: Recipe[] = [
    {
        id: '1',
        difficulty: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        time: 30,
        description: 'A refreshing Greek salad with tomatoes, cucumbers, olives, and feta cheese.',
        ingredients: [
            {
                category: 'For Salad',
                items: [
                    { count: 1, unit: null, name: 'tomato' },
                    { count: 200, unit: 'gr', name: 'white cheese' },
                    { count: 0.5, unit: null, name: 'onion' }
                ]
            },
            {
                category: 'For Dressing',
                items: [
                    { count: 0.5, unit: 'cup', name: 'olive oil' },
                    { count: 0.25, unit: 'cup', name: 'vinegar' },
                    { count: 1, unit: 'tsp', name: 'salt' }
                ]
            }
        ],
        steps: [
            "Bring well-salted water to a boil in a large pot. Add the pasta and cook until al dente, about 8 minutes. Drain and rinse under cold water.",
            "In a large bowl, combine the pasta, tomatoes, cucumber, olives, and feta. Drizzle with olive oil and season with salt and pepper. Toss to combine."
        ],
        title: 'Greek Salad',
    },
    {
        id: '2',
        difficulty: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        time: 30,
        description: 'A refreshing Greek salad with tomatoes, cucumbers, olives, and feta cheese.',
        ingredients: [
            {
                category: 'For Salad',
                items: [
                    { count: 1, unit: null, name: 'tomato' },
                    { count: 200, unit: 'gr', name: 'white cheese' },
                    { count: 0.5, unit: null, name: 'onion' }
                ]
            },
            {
                category: 'For Dressing',
                items: [
                    { count: 0.5, unit: 'cup', name: 'olive oil' },
                    { count: 0.25, unit: 'cup', name: 'vinegar' },
                    { count: 1, unit: 'tsp', name: 'salt' }
                ]
            }
        ],
        steps: [
            "Bring well-salted water to a boil in a large pot. Add the pasta and cook until al dente, about 8 minutes. Drain and rinse under cold water.",
            "In a large bowl, combine the pasta, tomatoes, cucumber, olives, and feta. Drizzle with olive oil and season with salt and pepper. Toss to combine."
        ],
        title: 'Greek Salad',
    },
    {
        id: '3',
        difficulty: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        time: 30,
        description: 'A refreshing Greek salad with tomatoes, cucumbers, olives, and feta cheese.',
        ingredients: [
            {
                category: 'For Salad',
                items: [
                    { count: 1, unit: null, name: 'tomato' },
                    { count: 200, unit: 'gr', name: 'white cheese' },
                    { count: 0.5, unit: null, name: 'onion' }
                ]
            },
            {
                category: 'For Dressing',
                items: [
                    { count: 0.5, unit: 'cup', name: 'olive oil' },
                    { count: 0.25, unit: 'cup', name: 'vinegar' },
                    { count: 1, unit: 'tsp', name: 'salt' }
                ]
            }
        ],
        steps: [
            "Bring well-salted water to a boil in a large pot. Add the pasta and cook until al dente, about 8 minutes. Drain and rinse under cold water.",
            "In a large bowl, combine the pasta, tomatoes, cucumber, olives, and feta. Drizzle with olive oil and season with salt and pepper. Toss to combine."
        ],
        title: 'Greek Salad',
    }
];

export default function Home() {
    return (
        <main className='space-y-3 p-4'>
            <h2 className='font-bold text-2xl'>
                <span className='text-rose-600'>Explore</span> our ideas
            </h2>
            <section className='gap-4 grid grid-cols-2'>
                {recipes.map(recipe => (
                    <Link href={`/recipe/${recipe.id}`} key={recipe.id} className='relative flex justify-center items-end shadow rounded-xl aspect-square overflow-hidden'>
                        <Image
                            className='top-0 left-0 -z-10 absolute w-full object-cover'
                            src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt={recipe.title}
                            width={300}
                            height={300}
                        />
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
        </main>
    )
}