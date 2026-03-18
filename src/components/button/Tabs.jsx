import React from 'react'

const Tabs = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
     <div className="flex justify-center">
               <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-2 flex border border-[#DCD2C0]/30">
                 {tabs.map(({ key, icon: Icon, label }) => (
                   <button
                     key={key}
                     onClick={() => setActiveTab(key)}
                     className={`px-6 py-3 rounded-xl flex items-center transition-all duration-300 font-medium ${
                       activeTab === key
                         ? 'bg-gradient-to-r from-[#7A2E1D] to-[#9B7A2F] text-white shadow-lg'
                         : 'text-[#3E2C1B] hover:bg-[#F5EFE6]'
                     }`}
                   >
                     <Icon className="mr-2 w-4 h-4" />
                     <span className="hidden sm:inline">{label}</span>
                   </button>
                 ))}
               </div>
             </div>
  )
}

export default Tabs;
