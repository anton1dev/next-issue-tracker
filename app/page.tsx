import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const openedIssuesCount = await prisma.issue.count({
    where: {
      status: 'OPEN'
    }
  })

  const inProgressIssuesCount = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS'
    }
  })

  const closedIssuesCount = await prisma.issue.count({
    where: {
      status: 'CLOSED'
    }
  })

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={openedIssuesCount} inProgress={inProgressIssuesCount} closed={closedIssuesCount} />
        <IssueChart open={openedIssuesCount} inProgress={inProgressIssuesCount} closed={closedIssuesCount} />
      </Flex>
      <LatestIssues />
    </Grid>
    // <IssueChart open={openedIssuesCount} inProgress={inProgressIssuesCount} closed={closedIssuesCount}/>
  );
}
