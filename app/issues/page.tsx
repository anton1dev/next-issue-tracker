import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from 'delay'
import Link from '../components/Link'
import IssuesActions from './IssuesActions'

const IssuesPage = async () => {
  const issuesFromDB = await prisma.issue.findMany();
  await delay(2000);

  return (
    <div>
      <IssuesActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issuesFromDB.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'><IssueStatusBadge status={issue.status} /></div>
              </Table.Cell>
              <Table.Cell><IssueStatusBadge status={issue.status} /></Table.Cell>
              <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage