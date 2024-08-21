'use client'

import Spinner from '@/app/components/Spinner'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
    id: number
}

const DeleteIssueButton = ({ id }: Props) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteIssue = async () => {
        try {
            await axios.delete(`/api/issues/${id}`)
            router.push('/issues/list')
            router.refresh()
        } catch (error) {
            setError(true)
        }
    }

    return (
        <><AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red' disabled={isDeleting}>
                    Delete Issue
                    {isDeleting && <Spinner />}
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion?</AlertDialog.Title>
                <AlertDialog.Description>You're deleting this issue, is it okay?</AlertDialog.Description>
                <Flex direction='row' gap='2' mt='2'>
                    <AlertDialog.Action>
                        <Button color='lime' onClick={deleteIssue}>OK</Button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>
                        <Button color='cyan'>Cancel</Button>
                    </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This issue can't be deleted</AlertDialog.Description>
                    <Button color='gray' variant='soft' mt='2' onClick={() => setError(false)}>OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>

    )
}

export default DeleteIssueButton