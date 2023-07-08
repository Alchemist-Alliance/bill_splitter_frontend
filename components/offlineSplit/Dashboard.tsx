"use client"

import { useEffect, useReducer, useRef } from 'react'
import OfflineFirstColumn from './OfflineFirstColumn'
import OfflineMiddleColumn from './OfflineMiddleColumn'
import OfflineLastColumn from './OfflineLastColumn'
import { useRouter } from 'next/navigation'
import { reducer } from '@/utils'
import OfflineBottomColumn from './OfflineBottomColumn'
import SnackBar from './SnackBar'

const Dashboard = ({ tripId }: { tripId: string }) => {
    const router = useRouter()

    const initialState = {
        memberNames: [],
        memberExpenses: {},
        tripName: '',
        creationDate: 0,
        loading: true,
        selectedUser: '',
        totalBill: 0
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const snackbarRef = useRef<any>(null);

    useEffect(() => {
        const trip = localStorage.getItem('trip')
        if (!trip) {
            router.push('/new')
        }
        else {
            const tripData = JSON.parse(trip)[tripId]
            if (!tripData) {
                router.push('/new')
            }
            localStorage.currentTripId = tripId
            dispatch({ type: 'setInitData', payload: { data: tripData, loading: false } })
        }
    }, [])

    return (state.loading ?
        <div className='flex items-center justify-center'>Loading...</div> :
        <div className="grid grid-cols-1 gap-5 px-5 pb-5 md:grid-cols-2 md:px-8 md:pb-5 lg:grid-cols-3 lg:px-8 lg:pb-5">
            <SnackBar ref={snackbarRef} />
            <OfflineFirstColumn data={state} dispatch={dispatch} />
            <OfflineMiddleColumn state={state} dispatch={dispatch} snackbar={snackbarRef} />
            <OfflineLastColumn data={state} dispatch={dispatch} />
            <OfflineBottomColumn state={state} dispatch={dispatch} snackbar={snackbarRef} />
        </div>
    )
}

export default Dashboard