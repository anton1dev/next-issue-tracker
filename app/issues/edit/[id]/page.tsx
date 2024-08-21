import React from 'react'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(
    () => import('@/app/issues/components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    }
)
interface Props {
    params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {
    const { id } = params;

    const issueToRender = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (!issueToRender) notFound();

    return (
        <IssueForm issue={issueToRender} />
    )
}

export default EditIssuePage