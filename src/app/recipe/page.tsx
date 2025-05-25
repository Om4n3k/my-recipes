import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { CgChevronLeft, CgHeart, CgTime } from 'react-icons/cg'
import { HiMiniFire } from 'react-icons/hi2'

function Page() {
    return (
        <div className='p-8 space-y-5'>
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

            <div className='w-full p-4 bg-white shadow-xl rounded-2xl -translate-y-1/4 text-center -mb-2'>
                <h1 className='font-bold text-3xl'>Greek Salad</h1>
                <h3 className='font-thin text-neutral-700'>6 ingredients</h3>
                <div className='flex justify-between items-center text-neutral-700 font-thin mt-4'>
                    <span className='inline-flex items-center gap-1.5'><CgTime className='text-xl'/> 30min</span>
                    <span className='inline-flex items-center gap-1'><HiMiniFire className='text-xl text-rose-600'/><HiMiniFire className='text-xl'/><HiMiniFire className='text-xl'/></span>
                </div>
            </div>

            <div className='space-y-5'>
                <h2 className='font-bold text-xl'>Ingredients</h2>
                <div className='space-y-3'>
                    <div>
                        <h3 className='font-bold'>For Salat</h3>
                        <ul className='list-disc list-inside'>
                            <li>1 tomato</li>
                            <li>200 gr white cheese</li>
                            <li>1/2 onion</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-bold'>
                            For Dressing
                        </h3>
                        <ul className='list-disc list-inside'>
                            <li>1/2 cup olive oil</li>
                            <li>1/4 cup vinegar</li>
                            <li>1 tsp salt</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="space-y-5">
                <h2 className='font-bold text-xl'>Cooking instruction</h2>
                <div className='bg-rose-300/20 rounded-2xl p-4'>
                    <h3 className='font-bold text-rose-500'>Step 1</h3>
                    <p>
                        Bring well-salted water to a boil in a large pot. Add the pasta and cook until al dente, about 8 minutes. Drain and rinse under cold water.
                    </p>
                </div>
                <div className='bg-rose-300/20 rounded-2xl p-4'>
                    <h3 className='font-bold text-rose-500'>Step 2</h3>
                    <p>
                        In a large bowl, combine the pasta, tomatoes, cucumber, olives, and feta. Drizzle with olive oil and season with salt and pepper. Toss to combine.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Page