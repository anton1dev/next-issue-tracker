import prisma from '@/prisma/client'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge'

const IssuesPage = async () => {
  const issuesFromDB = await prisma.issue.findMany();
  return (
    <div>
      <div className='mb-5'>
        <Button>
          <Link href='/issues/new'>
            New Issue
          </Link>
        </Button>
      </div>
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
                {issue.title}
                <div className='block md:hidden'><IssueStatusBadge status={issue.status}/></div>
              </Table.Cell>
              <Table.Cell><IssueStatusBadge status={issue.status}/></Table.Cell>
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