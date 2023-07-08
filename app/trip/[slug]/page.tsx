import { Dashboard } from "@/components"



const OfflineSplitDash = ({ params }: { params: { slug: string } }) => {

    const tripId = params.slug
    return (
        <main>
            <Dashboard tripId={tripId} />
        </main>
    )
}

export default OfflineSplitDash