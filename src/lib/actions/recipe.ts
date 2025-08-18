'use server'
import { PrismaClient, RecipeStep } from "@/generated/prisma"
import z from "zod"
import { CloudinaryPreset, uploadFile } from "../cloudinary"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

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

function formDataToObject(formData: FormData) {
    const result: any = {
        ingredients: [],
        steps: []
    };
    
    // Convert FormData entries to an object
    for (const [key, value] of formData.entries()) {
        // Handle base fields
        if (!key.includes('[')) {
            result[key] = value;
            continue;
        }

        // Handle arrays (ingredients and steps)
        const matches = key.match(/(\w+)\[(\d+)\]\[(\w+)\]/);
        if (matches) {
            const [, arrayName, index, field] = matches;
            if (!result[arrayName][index]) {
                result[arrayName][index] = {};
            }
            result[arrayName][index][field] = value;
        }
    }

    // Clean up the arrays (remove any holes)
    result.ingredients = result.ingredients.filter(Boolean);
    result.steps = result.steps.filter(Boolean);

    return result;
}

export const createRecipeAction = async (formData: FormData) => {
    // Here you would handle the form submission, e.g., save the recipe to a database
    console.log('Steps', formData.getAll('steps[]') as string[])

    const session = await auth();
    if (!session?.user) {
        throw new Error('User not authenticated');
    }

    try {
        const parsedData = scheme.parse(formDataToObject(formData));
        console.log('Parsed data:', parsedData);

        let fileId: string | null = null;
        if (parsedData.image && parsedData.image.size > 0) {
            const res = await uploadFile(parsedData.image, CloudinaryPreset.RECIPE_IMAGE);
            res?.public_id && (fileId = res.public_id);
            console.log('Uploaded image to Cloudinary:', res);
        }

        const stepsWithImages: RecipeStep[] = await Promise.all(
            parsedData.steps.map(async (step) => {
                const file = step.image;
                if (file && file.size > 0) {
                    const res = await uploadFile(file, CloudinaryPreset.RECIPE_IMAGE);
                    return {
                        description: step.description,
                        image: res?.public_id ?? null
                    };
                }
                return {
                    description: step.description,
                    image: null
                };
            })
        );

        const prisma = new PrismaClient();
        const recipe = await prisma.recipe.create({
            data: {
                name: parsedData.name,
                description: parsedData.description,
                time: parsedData.time,
                difficulty: parsedData.difficulty,
                image: fileId,
                steps: stepsWithImages,
                ingredients: {
                    category: 'default',
                    items: parsedData.ingredients.map(ingredient => ({
                        count: +ingredient.count,
                        name: ingredient.name,
                        unit: ingredient.unit || null
                    }))
                },
                creatorId: session.user.id
            }
        })

        console.log('Recipe created:', recipe);

        return redirect(`/recipe/${recipe.id}`);
    } catch (error) {
        console.error('Validation error:', error);
        // Handle validation errors, e.g., return an error message to the user
    }
}