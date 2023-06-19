import {MiddleColumn} from "@/components";

export default function Home() {
	return (
		<main className="h-full w-full p-4 pt-0">
			<div className="h-full w-full grid grid-cols-3 gap-x-8">
				<div className="bg-amber-300 rounded-xl">TODO: @lulu</div>
				<MiddleColumn/>
				<div className="bg-amber-300 rounded-xl">TODO: @lulu</div>
			</div>
		</main>
	)
}
