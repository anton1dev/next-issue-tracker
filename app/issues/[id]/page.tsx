import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

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
                <p>{createdAt.toDateString()}</p>
            </Flex>
            <Card className='prose' mt='4'>
                <ReactMarkdown>
                    {description}
                </ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetailPage