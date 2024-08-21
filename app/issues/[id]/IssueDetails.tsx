import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

interface Props {
    issue: Issue
}

const IssueDetails = ({ issue }: Props) => {
    const { status, createdAt, description, id, title } = issue;

    return (
        <><Heading>{title}</Heading><Flex className='space-x-3' my='2'>
            <IssueStatusBadge status={status} />
            <p>{createdAt.toDateString()}</p>
        </Flex><Card className='prose' mt='4'>
                <ReactMarkdown>
                    {description}
                </ReactMarkdown>
            </Card></>
    )
}

export default IssueDetails