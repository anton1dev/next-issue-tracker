'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
        staleTime: 60 * 1000,
        retry: 3
    });

    if (isLoading) return <Skeleton />

    return (
        <>
        <Select.Root
            defaultValue={issue.assignedToUserId || ''}
            onValueChange={async (userId) => {
                try {
                    await axios.patch('/api/issues/' + issue.id, { assignedToUserId: userId || null })
                    console.log(issue.id, userId);
                } catch (error) {
                    toast.error('Changes weren\'t saved!')
                }
            }}>
            <Select.Trigger />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value=''>Unassigned</Select.Item>
                    {users?.map(user => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Toaster />
        </>
    )
}

export default AssigneeSelect