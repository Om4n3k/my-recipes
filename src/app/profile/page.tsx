import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import React from 'react'
import Image from 'next/image';

const ProfilePage = async () => {
    const session = await auth();
    if (!session?.user) {
        return redirect('/auth');
    }

    return (
        <div>
            <h2 className='border-r-4 border-rose-600 font-bold text-2xl'>
                <span className='text-rose-600'>Welcome</span> {session.user.name}
            </h2>
            <p className='mt-4'>This is your profile page.</p>
            <p className='mt-2'>You can manage your account settings here.</p>
            <p className='mt-2'>For now you can only sign out :)</p>
            <p className='mt-2'>Your email: {session.user.email}</p>
            <p className='mt-2'>Your ID: {session.user.id}</p>
            {session.user.image && (
                <Image
                    src={session.user.image}
                    alt={session.user.name || 'User Avatar'}
                    width={100}
                    height={100}
                    className='mt-4 rounded-full'
                />
            )}
            <form
                className='flex flex-col items-center space-y-4'
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <Button type="submit" className='mt-6'>
                    Sign out
                </Button>
            </form>
        </div>
    )
}

export default ProfilePage