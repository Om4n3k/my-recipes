'use client'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, useFieldArray } from 'react-hook-form'
import { CgAdd, CgRemove } from 'react-icons/cg'

interface IngredientsInputProps {
    control: Control<any>
    name: string
}

const IngredientsInput = ({ control, name }: IngredientsInputProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name
    })

    return (
        <>
            <FormLabel className="text-md">Add ingredients<span className='text-rose-500'> for your recipe</span></FormLabel>
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-2">
                    <FormField
                        control={control}
                        name={`${name}.${index}.name`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Ingredient name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`${name}.${index}.count`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Quantity" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`${name}.${index}.unit`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder="Unit (optional)" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {fields.length > 1 && (
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() => remove(index)}
                            size="icon"
                        >
                            <CgRemove />
                        </Button>
                    )}
                </div>
            ))}
            <Button
                type="button"
                onClick={() => append({ name: '', count: '', unit: '' })}
                size="sm"
                className="w-full"
            >
                <CgAdd className="mr-2" /> Add ingredient
            </Button>
        </>
    )
}

export default IngredientsInput