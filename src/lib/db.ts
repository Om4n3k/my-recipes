import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export const getRecipes = async () => {
    try {
        return prisma.recipe.findMany();
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
}

export const getRecipe = async (id: string) => {
    try {
        return prisma.recipe.findUnique({
            where: { id }
        });
    } catch (error) {
        console.error("Error fetching recipe:", error);
        throw error;
    }
}