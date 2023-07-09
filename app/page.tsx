import { FirstColumn, Header, LastColumn, MiddleColumn } from "@/components";

export default function Home() {
	return (
		<main>
			<div className="grid grid-cols-1 gap-5 px-5 pb-5 md:grid-cols-2 md:px-8 md:pb-5 lg:grid-cols-3 lg:px-8 lg:pb-5">
				<FirstColumn />
				<MiddleColumn />
				<LastColumn />
			</div>
		</main>
	)
}
