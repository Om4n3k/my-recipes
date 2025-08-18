import { Button } from '@/components/ui/button'
import { NextPage } from 'next'
import React from 'react'
import { CgChevronLeft, CgHeart } from 'react-icons/cg'
import IngredientsList from './IngredientsList'
import Instructions from './Instructions'
import RecipeHeader from './RecipeHeader'
import { CloudImage } from '@/components/CloudImage'
import { getRecipe } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const RecipePage: NextPage<{
    params: Promise<{ id: string }>
}> = async ({ params }) => {
    const { id } = await params;
    const recipe = await getRecipe(id);

    if (!recipe) {
        return notFound();
    }

    return (
        <div className='space-y-5 p-4'>
            <div className='relative -m-8 h-[300px]'>
                <div className='flex justify-between items-center bg-transparent p-8'>
                    <Link href={'..'} passHref>
                        <Button className='place-items-center grid bg-black/50 shadow backdrop-blur-md border border-white/50 rounded-2xl w-16 h-16 text-white text-2xl'>
                            <CgChevronLeft />
                        </Button>
                    </Link>
                    <Button className='place-items-center grid bg-black/50 shadow backdrop-blur-md border border-white/50 rounded-2xl w-16 h-16 text-white text-2xl'>
                        <CgHeart />
                    </Button>
                </div>
                <CloudImage
                    className='top-0 left-0 -z-10 absolute rounded-b-[60px] w-full h-[300px] object-cover'
                    src={recipe.image!}
                    alt={recipe.name}
                    width={430}
                    height={645}
                />
            </div>

            <RecipeHeader
                difficulty={recipe.difficulty}
                name={recipe.name}
                timeEstimate={recipe.time}
                creator={recipe.creator}
            />

            {/* <IngredientsList ingredients={
                [
                    {
                        category: 'For Salat',
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
                ]
            } /> */}
            <IngredientsList ingredients={recipe.ingredients} />
            <hr />
            <Instructions instructions={recipe.steps} />
        </div>
    )
}

export default RecipePage