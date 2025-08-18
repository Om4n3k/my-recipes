'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import Difficulty from '../[id]/Difficulty';
import StepsInput from './StepsInput';
import IngredientsInput from './IngredientsInput';
import { createRecipeAction } from '@/lib/actions/recipe';

const ingredientScheme = z.object({
    name: z.string().min(1, 'Ingredient name is required'),
    count: z.string().min(1, 'Quantity is required'),
    unit: z.string().optional()
})

const stepScheme = z.object({
    description: z.string().min(1, 'Step description is required'),
    image: z.instanceof(File)
})

const scheme = z.object({
    // Step 1 = Recipe information
    name: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    time: z.coerce.number().min(1, 'Time must be greater than 0'),
    difficulty: z.coerce.number().int().min(1, 'Difficulty must be between 1 and 3').max(3),
    image: z.instanceof(File),

    // Step 2 = Ingredients
    ingredients: z.array(ingredientScheme).nonempty('At least one ingredient is required'),

    // Step 3 = Steps
    steps: z.array(stepScheme).nonempty('At least one step is required')
})

type SchemeType = z.infer<typeof scheme>;

const NewRecipeForm = () => {
    const form = useForm<SchemeType>({
        resolver: zodResolver(scheme),
        defaultValues: {
            name: '',
            description: '',
            time: 0,
            difficulty: 1,
            image: new File([], ''),
            ingredients: [{ name: '', count: '', unit: '' }],
            steps: [{ description: '', image: new File([], ''), }]
        }
    })
    const [step, setStep] = useState(1);

    const onSubmit: SubmitHandler<SchemeType> = async (data) => {
        console.log('Form submitted:', data);
        // Here you would handle the form submission, e.g., send data to the server
        // For example, you could use fetch or axios to post the data to your API endpoint

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('time', data.time.toString());
        formData.append('difficulty', data.difficulty.toString());
        formData.append('image', data.image);
        data.ingredients.forEach((ingredient, idx) => {
            formData.append(`ingredients[${idx}][name]`, ingredient.name);
            formData.append(`ingredients[${idx}][count]`, ingredient.count);
            if (ingredient.unit) {
                formData.append(`ingredients[${idx}][unit]`, ingredient.unit);
            }
        });
        data.steps.forEach((step, idx) => {
            formData.append(`steps[${idx}][description]`, step.description);
            if (step.image) {
                formData.append(`steps[${idx}][image]`, step.image);
            }
        });

        await createRecipeAction(formData);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <div>Step {step} from 3</div>
                {step === 1 && (
                    <>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipe Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Enter recipe name' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder='Describe your recipe' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='items-start gap-4 grid grid-cols-3'>
                            <FormField
                                control={form.control}
                                name='difficulty'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Difficulty</FormLabel>
                                        <FormControl>
                                            <Select {...field} onValueChange={e => field.onChange(Number(e))} value={field.value.toString()}>
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
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='time'
                                render={({ field }) => (
                                    <FormItem className='col-span-2'>
                                        <FormLabel>Preperation time</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='Enter approx. recipe preparation time' type='number' />
                                        </FormControl>
                                        <FormDescription>In minutes</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name='image'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipe Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='file'
                                            onChange={e => {
                                                const file = e.target.files?.[0];
                                                field.onChange(file);
                                            }}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                {step === 2 && (
                    <IngredientsInput
                        control={form.control}
                        name='ingredients'
                    />
                )}

                {step === 3 && (
                    <StepsInput
                        control={form.control}
                        name="steps"
                    />
                )}

                <div className='flex justify-between items-center'>
                    {step > 1 && (
                        <Button
                            type='button'
                            onClick={() => setStep(step - 1)}
                            variant='secondary'
                            size='sm'
                        >Back</Button>
                    )}
                    {step < 3 ? (
                        <Button
                            type='button'
                            size='sm'
                            variant='default'
                            className='ml-auto'
                            onClick={() => setStep(step + 1)}
                        >Next</Button>
                    ) : (
                        <Button type='submit' size='sm'>Submit</Button>
                    )}
                </div>
            </form>
        </Form>
    )
}

export default NewRecipeForm