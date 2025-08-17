import { PrismaClient } from "@/generated/prisma"
import z from "zod"
import { CloudinaryPreset, uploadFile } from "../cloudinary"

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

export const createRecipeAction = async (formData: FormData) => {
    'use server'
    // Here you would handle the form submission, e.g., save the recipe to a database
    console.log('Form data:', Object.fromEntries(formData.entries()))
    console.log('Steps', formData.getAll('steps[]') as string[])

    try {
        const parsedData = scheme.parse({
            title: formData.get('title'),
            description: formData.get('description'),
            time: formData.get('time'),
            difficulty: formData.get('difficulty'),
            image: formData.get('image'),
            steps: formData.getAll('steps[]'),
            stepsImages: formData.getAll('stepImage[]')
        });

        let fileId: string | null = null;
        if (parsedData.image && parsedData.image.size > 0) {
            const res = await uploadFile(parsedData.image, CloudinaryPreset.RECIPE_IMAGE);
            res?.public_id && (fileId = res.public_id);
            console.log('Uploaded image to Cloudinary:', res);
        }

        const stepsWithImages = await Promise.all(
            parsedData.steps.map(async (step, idx) => {
                const file = parsedData.stepsImages[idx];
                if (file && file.size > 0) {
                    const res = await uploadFile(file, CloudinaryPreset.RECIPE_IMAGE);
                    return {
                        description: step,
                        image: res?.public_id ?? null
                    };
                }
                return {
                    description: step,
                    image: null
                };
            })
        );

        const prisma = new PrismaClient();
        const recipe = await prisma.recipe.create({
            data: {
                name: parsedData.title,
                description: parsedData.description,
                time: parsedData.time,
                difficulty: parsedData.difficulty,
                image: fileId,
                steps: stepsWithImages,
                ingredients: formData.getAll('ingredients[]').map(ingredient => ({
                    items: ingredient,
                    category: 'default' // Assuming a default category, adjust as needed
                }))
            }
        })

        console.log('Recipe created:', recipe);
    } catch (error) {
        console.error('Validation error:', error);
        // Handle validation errors, e.g., return an error message to the user
    }
}