import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

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

    const { title, description, status, createdAt, id } = foundedIssue;

    return (
        <Grid columns={{initial: '1', md: '2'}} gap='5'>
            <Box>
                <IssueDetails issue={foundedIssue} />
            </Box>
            <Box>
                <EditIssueButton id={id}/>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage