import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { CgChevronLeft, CgHeart } from 'react-icons/cg'
import IngredientsList from './IngredientsList'
import Instructions from './Instructions'
import RecipeHeader from './RecipeHeader'

function Page() {
    return (
        <div className='space-y-5 p-8'>
            <div className='relative -m-8 h-[300px]'>
                <div className='flex justify-between items-center bg-transparent p-8'>
                    <Button url={'..'}>
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

            <RecipeHeader
                difficulty={1}
                name='Greek Salad'
                timeEstimate={30}
            />

            <IngredientsList ingredients={
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
            }/>
            <hr/>
            <Instructions instructions={
                [
                    "Bring well-salted water to a boil in a large pot. Add the pasta and cook until al dente, about 8 minutes. Drain and rinse under cold water.",
                    "In a large bowl, combine the pasta, tomatoes, cucumber, olives, and feta. Drizzle with olive oil and season with salt and pepper. Toss to combine."
                ]
            }/>
        </div>
    )
}

export default Page;