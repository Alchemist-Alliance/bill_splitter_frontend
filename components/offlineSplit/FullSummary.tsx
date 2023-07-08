import { summaryState } from "@/types"
import { userBillPaid } from "@/utils"
import DetailProgressBar from "./DetailProgressBar"


const FullSummary = ({ data }: { data: summaryState }) => {

    return (
        <div className="flex flex-col justify-between shadow-custom bg-primary text-stroke rounded-2xl p-7">
            <p className="text-2xl font-bold mb-5">Total Expense</p>
            <div className='mb-7 flex flex-col'>
                {data.memberNames.map((user, index) => (
                    <DetailProgressBar key={index} index={index} name={user} money={userBillPaid(data["memberExpenses"][user])} total={data.totalBill} memberExpense={data["memberExpenses"][user]} />
                ))}
            </div>
        </div>
    )
}

export default FullSummary