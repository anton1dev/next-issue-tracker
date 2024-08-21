import React from 'react'
import IssueForm from '../../components/IssueForm'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
    params: {id: string}
}

const EditIssuePage = async ({params}: Props) => {
    const {id} = params;

    const issueToRender = await prisma.issue.findUnique({
        where:{
            id: parseInt(id)
        }
    })

    if (!issueToRender) notFound();

  return (
    <IssueForm issue={issueToRender} />
  )
}

export default EditIssuePage