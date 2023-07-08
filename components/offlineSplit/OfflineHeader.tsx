import { HiMenuAlt3 } from "react-icons/hi"

const OfflineHeader = () => {
    return (
        <div className="flex flex-row items-center justify-between p-5 pb-8 lg:p-8 md:p-8">
            <div className="text-stroke font-black lg:text-4xl md:text-4xl text-[1.7rem]">Bill Splitter</div>
            <div className="flex flex-row items-center justify-between gap-x-4 text-stroke font-bold">
                <div className="hidden p-3 bg-primary shadow-custom rounded-md lg:block md:block">
                    Register
                </div>
                <div className="hidden p-3 bg-secondary shadow-custom rounded-md lg:block md:block">
                    Login
                </div>
                <div className="p-2 bg-primary shadow-custom rounded-[0.3rem] lg:hidden md:hidden">
                    <HiMenuAlt3 size={30} />
                </div>
            </div>
        </div>
    )
}

export default OfflineHeader