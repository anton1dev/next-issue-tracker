import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    if (typeof parseInt(params.id) !== 'number') notFound();

    const foundedIssue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!foundedIssue) {
        notFound()
    }

    const { title, description, status, createdAt } = foundedIssue;

    return (
        <div>
            <Heading>{title}</Heading>
            <Flex className='space-x-3' my='2'>
                <IssueStatusBadge status={status} />
                <Text>{description}</Text>
            </Flex>
            <Card>

                <p>{createdAt.toDateString()}</p>
            </Card>
        </div>
    )
}

export default IssueDetailPage