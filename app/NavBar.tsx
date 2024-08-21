'use client'

import { Box } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'

const NavBar = () => {
    const currentPath = usePathname()
    const { status, data: session } = useSession();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' },
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href='/'><AiFillBug /></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <li
                        key={link.label}
                    >
                        <Link
                            href={link.href}
                            className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
                        >
                            {link.label}
                        </Link>
                    </li>
                )}
            </ul>
            <Box>
                {status === 'authenticated' && (<Link href='/api/auth/signout'>Sign Out</Link>)}
                {status === 'unauthenticated' && (<Link href='/api/auth/signin'>Sign In</Link>)}
            </Box>
        </nav>
    )
}
export default NavBar