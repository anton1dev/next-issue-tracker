import React from 'react'
import IssueForm from '../../components/IssueForm'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
    params: {id: string}
}

const EditIssuePage = async ({params}: Props) => {
    const {id} = params;

    const IssueToRender = await prisma.issue.findUnique({
        where:{
            id: parseInt(id)
        }
    })

    if (!IssueToRender) notFound();

  return (
    <IssueForm />
  )
}

export default EditIssuePage