import { HiMenuAlt3 } from "react-icons/hi";
import { FaSignInAlt, FaArrowCircleRight } from "react-icons/fa";
import Logo from "../Logo";

const OfflineHeader = () => {
  return (
    <div className="flex flex-row items-end justify-between px-3 pb-8 pt-4 lg:p-8 lg:pt-5 md:p-8 md:pt-5">
      <div>
        <Logo />
      </div>
      <div className="flex flex-row items-center justify-between gap-x-4 text-stroke font-bold">
        <div className="hidden p-3 cursor-pointer bg-primary shadow-custom rounded-md items-center lg:flex md:flex">
          <FaArrowCircleRight className="mr-2" />
          Register
        </div>
        <div className="hidden p-3 cursor-pointer bg-secondary shadow-custom rounded-md items-center lg:flex md:flex">
          <FaSignInAlt className="mr-2" />
          Login
        </div>
        <div className="p-2 bg-primary shadow-custom rounded-[0.3rem] lg:hidden md:hidden">
          <HiMenuAlt3 size={30} />
        </div>
      </div>
    </div>
  );
};

export default OfflineHeader;
