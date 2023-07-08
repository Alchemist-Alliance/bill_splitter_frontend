import { Split } from "@/components"

const Summary = ({ params }: { params: { slug: string } }) => {

    return (
        <main className="h-full w-full p-4 pt-0">
            <Split tripId={params.slug} />
        </main>
    )
}

export default Summary