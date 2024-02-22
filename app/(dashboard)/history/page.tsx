import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkID()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analyses.reduce((all, curr) => all + curr.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)

  return { analyses, avg }
}

const History = async () => {
  const { analyses, avg } = await getData()

  console.log('Analyses: ', analyses)

  return (
    <div className="w-full h-full">
      <div>{`Avg. Sentiment: ${avg}`}</div>
      <div className="w-full h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History
