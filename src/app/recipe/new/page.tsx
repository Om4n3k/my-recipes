import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import Difficulty from '../[id]/Difficulty'
import { Button } from '@/components/ui/button'
import StepsInput from './StepsInput'
import z from 'zod/v4'

const scheme = z.object({
    
})

const Page = () => {
    const createRecipeAction = async (formData: FormData) => {
        'use server'
        // Here you would handle the form submission, e.g., save the recipe to a database
        console.log('Form data:', Object.fromEntries(formData.entries()))
        console.log('Steps', formData.getAll('steps[]') as string[])
    }

    return (
        <form action={createRecipeAction} className='space-y-3'>
            <h2 className='font-bold text-2xl'>
                <span className='text-rose-600'>Create</span> a new recipe
            </h2>
            <div className="flex flex-col">
                <Label htmlFor="title" className='text-md'>Recipe name</Label>
                <Input name='title' />
            </div>
            <div className="flex flex-col">
                <Label htmlFor="description" className='text-md'>Recipe description</Label>
                <Textarea name='description' />
            </div>
            <div className='gap-3 grid grid-cols-2'>
                <div className="flex flex-col">
                    <Label htmlFor="time" className='text-md'>Preparation time</Label>
                    <Input name='time' type='number' placeholder='30' />
                </div>
                <div className="flex flex-col">
                    <Label htmlFor="difficulty" className='text-md'>Difficulty</Label>
                    <Select name='difficulty'>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select difficulty' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='1'>
                                <Difficulty difficulty={1} />
                            </SelectItem>
                            <SelectItem value='2'>
                                <Difficulty difficulty={2} />
                            </SelectItem>
                            <SelectItem value='3'>
                                <Difficulty difficulty={3} />
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <StepsInput />
            <div className="flex flex-col">
                <Label htmlFor="image" className='text-md'>Recipe image</Label>
                <Input name='image' type='file' accept='image/*'/>
            </div>
            <Button variant='outline' type='submit' size='sm'>
                Create Recipe
            </Button>
        </form>
    )
}

export default Page