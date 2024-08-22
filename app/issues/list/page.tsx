import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import IssueStatusBadge from '../../components/IssueStatusBadge'
import Link from '../../components/Link'
import NextLink from 'next/link';
import IssuesActions from './IssuesActions'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

interface Props {
  searchParams: { status: Status, orderBy: keyof Issue, page: string }
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const where = {
    status
  }

  const columns: { label: string, value: keyof Issue, className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },

  ];

  const orderBy = columns.map(col => col.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issuesFromDB = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  }
  );

  const issueCount = await prisma.issue.count({ where })

  return (
    <div>
      <IssuesActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink href={{
                  query: { ...searchParams, orderBy: column.value }
                }}>{column.label}</NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
              </Table.ColumnHeaderCell>)
            )}
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
      <div className='mt-3'>
        <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
      </div>
    </div>
  )
}

export default IssuesPage