import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from './components/IssueStatusBadge'

const LatestIssues = async () => {
    const issuesFromDB = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            assignedToUser: true
        }
    })
    return (
        <Card>
            <Heading size='4' mb='4'>Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issuesFromDB.map(is => <Table.Row key={is.id}>
                        <Table.Cell>
                            <Flex justify='between'>
                                <Flex direction='column' align='start' gap='2'>
                                    <Link href={`/issues/${is.id}`}>{is.title}</Link>
                                    <IssueStatusBadge status={is.status} />
                                </Flex>
                                {is.assignedToUserId && (
                                    <Avatar src={is.assignedToUser?.image!} fallback='?' radius='full' />
                                )}
                            </Flex>
                        </Table.Cell>
                    </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssues