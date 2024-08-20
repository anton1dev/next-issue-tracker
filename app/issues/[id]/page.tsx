import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: {id: string}
}

const IssueDetailPage = async ({params}: Props) => {
    if (typeof params.id !== 'number') notFound();

    const foundedIssue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!foundedIssue) {
        notFound()
    }

    const {title, description, status, createdAt } = foundedIssue;

  return (
    <div>
        <p>{title}</p>
        <p>{description}</p>
        <p>{status}</p>
        <p>{createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage