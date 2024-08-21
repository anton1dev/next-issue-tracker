import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
    id: number
}

const DeleteIssueButton = ({id}: Props) => {
    return (
        <Button color='red'>
            <Pencil2Icon  />
            <Link href={`/issues/${id}/delete`}>Delete Issue</Link>
        </Button>
    )
}

export default DeleteIssueButton