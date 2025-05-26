import { Ingredient } from '@/generated/prisma'
import React, { FC } from 'react'
import { BiCart, BiFork } from 'react-icons/bi';

interface Props {
    ingredients: Ingredient[];
}

const IngredientsList: FC<Props> = ({ ingredients }) => {
    return (
        <div className='space-y-5'>
            <h2 className='font-bold text-xl flex gap-2 items-center'><BiCart className='text-rose-600'/> Ingredients</h2>
            {ingredients.length > 0 && ingredients.map(el => (
                <div key={el.category} className='space-y-3'>
                    <div>
                        <h3 className='font-bold'>{el.category}</h3>
                        <ul className='list-disc list-inside'>
                            {el.items.map(item => (
                                <li key={item.name}>
                                    {item.count} {item.unit ? item.unit + ' ' : ''}{item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default IngredientsList