"use client"

import { useEffect, useState } from 'react'
import FullSummary from './FullSummary'
import { useRouter } from 'next/navigation'
import { summaryState } from '@/types'

const Split = ({ tripId }: { tripId: string }) => {

  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState<summaryState>({
    memberNames: [],
    memberExpenses: {},
    totalBill: 0
  })

  useEffect(() => {
    const trip = localStorage.getItem('trip')
    if (!trip) {
      router.push('/new')
    }
    else {
      const tripData = JSON.parse(trip)[tripId]
      setDetails({
        memberNames: tripData.memberNames,
        memberExpenses: tripData.memberExpenses,
        totalBill: tripData.totalBill
      })
      setLoading(false)
    }
  }, [])

  return (loading ? <div>Loading...</div> : <div className='h-full w-full grid grid-cols-2 gap-x-8'>
    <FullSummary data={details} />
    <div>Split</div>
  </div>
  )
}

export default Split