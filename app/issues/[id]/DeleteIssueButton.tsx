'use client'

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
    id: number
}

const DeleteIssueButton = ({ id }: Props) => {
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
                        <Button color='lime'>OK</Button>
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