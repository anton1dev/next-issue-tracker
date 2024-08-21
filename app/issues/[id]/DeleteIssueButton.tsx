'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Props {
    id: number
}

const DeleteIssueButton = ({ id }: Props) => {
    const router = useRouter();

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>
                    Delete Issue
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion?</AlertDialog.Title>
                <AlertDialog.Description>You're deleting this issue, is it okay?</AlertDialog.Description>
                <Flex direction='row' gap='2' mt='2'>
                    <AlertDialog.Action>
                        <Button color='lime' onClick={async () => {
                            await axios.delete(`/api/issues/${id}`);
                            router.push('/issues');
                            router.refresh();
                        }}>OK</Button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>
                        <Button color='cyan'>Cancel</Button>
                    </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>

    )
}

export default DeleteIssueButton