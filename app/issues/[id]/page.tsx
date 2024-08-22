import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    if (typeof parseInt(params.id) !== 'number') notFound();

    const session = await getServerSession(authOptions);

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
        <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={foundedIssue} />
            </Box>
            {session &&  (<Box>
                <Flex gap='3' direction='column'>
                    <AssigneeSelect issue={foundedIssue}/>
                    <EditIssueButton id={id} />
                    <DeleteIssueButton id={id} />
                </Flex>
            </Box>)}
        </Grid>
    )
}

export default IssueDetailPage