import { auth, signIn } from '@/auth'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import React from 'react'
import { CgGoogle } from 'react-icons/cg'

const AuthPage = async () => {
    const session = await auth();
    if(session?.user) {
        return redirect('/');
    }

    return (
        <div className='space-y-5'>
            <h2 className='border-rose-600 border-l-4 font-bold text-2xl text-right'>
                <span className='text-rose-600'>Sign in</span> to explore the world of kitchen creativity
            </h2>
            <form
                className='flex flex-col items-center space-y-4'
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <Button type="submit">
                    <CgGoogle/> Signin with Google
                </Button>
            </form>
        </div>
    )
}

export default AuthPage