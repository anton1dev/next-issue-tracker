'use client'

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const NavBar = () => {


    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Container>

                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href='/'><AiFillBug /></Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>


            </Container>
        </nav>
    )
}
export default NavBar

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === 'loading') return <Skeleton  width='3rem'/>;

    if (status === 'unauthenticated') return (<Link href='/api/auth/signin'>Sign In</Link>);

    return (<Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar
                    src={session!.user!.image!}
                    fallback='?'
                    size='2'
                    radius='full'
                    className='cursor-pointer'
                    referrerPolicy='no-referrer'
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text size='2'>
                        {session!.user!.email!}
                    </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Sign Out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Box>)
}

const NavLinks = () => {
    const currentPath = usePathname()

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' },
    ]
    return (
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

    )
}