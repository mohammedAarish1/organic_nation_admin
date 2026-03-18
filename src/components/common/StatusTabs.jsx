import { ChevronDown, Box } from 'lucide-react';


const StatusTabs = ({
  isActive,
  count,
  label,
  onClick,
  borderColor,
  iconBgColor,
  iconColor,
  shadowColor
}) => (
  <div
    className={`${isActive && `border-${borderColor} border-[1px]`} 
      flex justify-start items-center xs:gap-3 rounded-lg max-w-max 
      sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer 
      shadow-sm shadow-${shadowColor} transition-all duration-500 
      hover:bg-white`}
    onClick={onClick}
  >
    <div className={`sm:block hidden bg-${iconBgColor} md:p-4 p-2 rounded-full`}>
      <Box color={iconColor} size={24} />
    </div>
    <div>
      <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>{count}</p>
      <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>{label}</p>
    </div>
    <div className={`sm:hidden block bg-${iconBgColor} md:p-5 xs:p-2 rounded-full`}>
      <ChevronDown size={20} />
    </div>
  </div>
);

export default StatusTabs;