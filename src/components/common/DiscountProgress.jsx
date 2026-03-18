// import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { formatPrice } from "../../helper/helperFunctions";
// import confetti from "canvas-confetti";
// import {
//   ChevronDown,
//   Flame,
//   Gift,
//   GripVertical,
//   Star,
//   Tags,
//   Trophy,
//   X,
// } from "lucide-react";

// // Constants
// const DISCOUNT_TIERS = [
//   { threshold: 199, discount: "10% OFF", type: "10%" },
//   { threshold: 499, discount: "20% OFF", type: "20%" },
//   { threshold: 1999, discount: "30% OFF", type: "30%" },
// ];

// const HIDDEN_PAGES = [
//   "/checkout",
//   "/blogs",
//   "/about",
//   "/contact",
//   "/login",
//   "/register",
// ];
// const ELIGIBLE_ITEMS = ["Pickles", "Honey", "Chutney", "Jam", "Oats", "Chaap"];

// const DiscountProgress = () => {
//   const { couponCodeApplied } = useSelector((state) => state.cart);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [lastDiscountAmount, setLastDiscountAmount] = useState(0);

//   const componentRef = useRef(null);
//   const location = useLocation();

//   const { discountProgress, totalCartItems, totalCartAmount } = useSelector(
//     (state) => state.cart
//   );

//   // Memoized calculations
//   const progressData = useMemo(() => {
//     if (!discountProgress?.progressInfo) return null;

//     const { currentEligibleAmount, currentCartAmount } =
//       discountProgress.progressInfo;
//     const { discountAmount, discountType, currentDiscount } = discountProgress;

//     let progressPercentage = 0;
//     let currentAmount = 0;
//     let targetAmount = 0;
//     let nextDiscount = "";
//     let remainingAmount = 0;
//     let currentTier = "";

//     if (currentCartAmount >= 1999) {
//       progressPercentage = 100;
//       currentAmount = currentCartAmount;
//       targetAmount = 1999;
//       nextDiscount = "30% OFF";
//       remainingAmount = 0;
//       currentTier = "30% OFF";
//     } else if (currentEligibleAmount >= 499) {
//       progressPercentage = Math.min((currentCartAmount / 1999) * 100, 100);
//       currentAmount = currentCartAmount;
//       targetAmount = 1999;
//       nextDiscount = "30% OFF";
//       remainingAmount = 1999 - currentCartAmount;
//       currentTier = "20% OFF";
//     } else if (currentEligibleAmount >= 199) {
//       progressPercentage = Math.min((currentEligibleAmount / 499) * 100, 100);
//       currentAmount = currentEligibleAmount;
//       targetAmount = 499;
//       nextDiscount = "20% OFF";
//       remainingAmount = 499 - currentEligibleAmount;
//       currentTier = "10% OFF";
//     } else {
//       progressPercentage = Math.min((currentEligibleAmount / 199) * 100, 100);
//       currentAmount = currentEligibleAmount;
//       targetAmount = 199;
//       nextDiscount = "10% OFF";
//       remainingAmount = 199 - currentEligibleAmount;
//       currentTier = "None";
//     }

//     return {
//       progressPercentage,
//       currentAmount,
//       targetAmount,
//       nextDiscount,
//       remainingAmount,
//       currentTier,
//       discountAmount,
//       discountType,
//       isDiscountActive: currentDiscount !== "0%",
//       currentEligibleAmount,
//       currentCartAmount,
//     };
//   }, [discountProgress]);

//   // Check if should show component
//   const shouldShow = useMemo(() => {
//     const pathname = location.pathname;
//     const isHiddenPage = HIDDEN_PAGES.some((page) => pathname.includes(page));
//     return totalCartItems > 0 && !isHiddenPage && isVisible;
//   }, [totalCartItems, location.pathname, isVisible]);

//   // Celebration effect
//   const triggerCelebration = useCallback(() => {
//     const duration = 2000;
//     const animationEnd = Date.now() + duration;

//     const interval = setInterval(() => {
//       const timeLeft = animationEnd - Date.now();
//       if (timeLeft <= 0) {
//         clearInterval(interval);
//         return;
//       }

//       confetti({
//         particleCount: 30 * (timeLeft / duration),
//         startVelocity: 25,
//         spread: 360,
//         ticks: 50,
//         origin: { x: Math.random() * 0.4 + 0.3, y: Math.random() - 0.2 },
//         colors: ["#7A2E1D", "#9B7A2F", "#6B8E23", "#D87C45"],
//       });
//     }, 200);
//   }, []);

//   // Effects
//   useEffect(() => {
//     if (
//       progressData?.discountAmount > lastDiscountAmount &&
//       lastDiscountAmount > 0
//     ) {
//       triggerCelebration();
//     }
//     setLastDiscountAmount(progressData?.discountAmount || 0);
//   }, [progressData?.discountAmount, lastDiscountAmount, triggerCelebration]);

//   useEffect(() => {
//     if (totalCartItems > 0 && !isVisible) {
//       setIsVisible(true);
//     }
//   }, [totalCartItems]);
//   // Drag handlers
//   const handleDragStart = useCallback((e) => {
//     const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
//     const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

//     if (e.target.closest(".drag-handle")) {
//       setIsDragging(true);
//       const rect = componentRef.current.getBoundingClientRect();
//       setDragOffset({
//         x: clientX - rect.left,
//         y: clientY - rect.top,
//       });
//       e.preventDefault();
//     }
//   }, []);

//   const handleDragMove = useCallback(
//     (e) => {
//       if (!isDragging) return;

//       const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
//       const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

//       const newX = clientX - dragOffset.x;
//       const newY = clientY - dragOffset.y;

//       const maxX = window.innerWidth - (componentRef.current?.offsetWidth || 0);
//       const maxY =
//         window.innerHeight - (componentRef.current?.offsetHeight || 0);

//       setPosition({
//         x: Math.max(0, Math.min(newX, maxX)),
//         y: Math.max(0, Math.min(newY, maxY)),
//       });

//       e.preventDefault();
//     },
//     [isDragging, dragOffset]
//   );

//   const handleDragEnd = useCallback(() => {
//     setIsDragging(false);
//   }, []);

//   useEffect(() => {
//     if (!isDragging) return;

//     const events = [
//       ["mousemove", handleDragMove],
//       ["mouseup", handleDragEnd],
//       ["touchmove", handleDragMove, { passive: false }],
//       ["touchend", handleDragEnd],
//     ];

//     events.forEach(([event, handler, options]) => {
//       document.addEventListener(event, handler, options);
//     });

//     return () => {
//       events.forEach(([event, handler]) => {
//         document.removeEventListener(event, handler);
//       });
//     };
//   }, [isDragging, handleDragMove, handleDragEnd]);

//   if (!shouldShow || !progressData || couponCodeApplied.length > 0) return null;

//   const {
//     progressPercentage,
//     currentAmount,
//     targetAmount,
//     nextDiscount,
//     remainingAmount,
//     discountAmount,
//     discountType,
//     isDiscountActive,
//     currentEligibleAmount,
//     currentCartAmount,
//   } = progressData;

//   const positionStyles =
//     isDragging || position.x !== 0 || position.y !== 0
//       ? {
//           position: "fixed",
//           left: `${position.x}px`,
//           top: `${position.y}px`,
//           zIndex: 9999,
//           maxWidth: "320px",
//           width: "90vw",
//         }
//       : {
//           position: "fixed",
//           top: "64px",
//           left: "8px",
//           right: "8px",
//           zIndex: 40,
//           margin: "0 auto",
//           maxWidth: "400px",
//         };
//   return (
//     <motion.div
//       id="discount-progress-popup"
//       ref={componentRef}
//       initial={{ opacity: 0, y: -20, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       exit={{ opacity: 0, y: -20, scale: 0.95 }}
//       className={`${isDragging ? "cursor-grabbing" : ""} touch-none`}
//       style={positionStyles}
//       onMouseDown={handleDragStart}
//       onTouchStart={handleDragStart}
//     >
//       <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative backdrop-blur-sm border border-white/20">
//         {/* Compact Header */}
//         <div className="flex items-center justify-between px-3 py-1 bg-gradient-to-r from-amber-600 via-amber-700 to-orange-600 text-white relative overflow-hidden">
//           {/* Background Pattern */}
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.3)_0%,_transparent_50%)]" />
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]" />
//           </div>

//           <div className="flex items-center gap-3 flex-1 relative z-10">
//             <div className="drag-handle cursor-grab hover:cursor-grabbing p-2 rounded-lg hover:bg-white/20 transition-all duration-200 active:scale-95">
//               <GripVertical size={20} className="text-sm opacity-70" />
//             </div>

//             <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
//               <Gift size={18} className="text-amber-100" />
//             </div>

//             <div className="font-bold text-ssm flex-1 min-w-0">
//               {isDiscountActive ? (
//                 <motion.span
//                   className="flex items-center gap-2"
//                   initial={{ scale: 0.8 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring", stiffness: 200 }}
//                 >
//                   <Flame size={22} className="text-orange-300 animate-pulse" />
//                   <span className="truncate">
//                     ₹{Math.round(discountAmount)} Saved!
//                   </span>
//                 </motion.span>
//               ) : (
//                 <span className="truncate flex items-center gap-2">
//                   <Star size={18} className="text-yellow-300" />
//                   Unlock Discounts
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center gap-2 relative z-10">
//             <motion.button
//               onClick={() => setIsExpanded(!isExpanded)}
//               className="flex items-center gap-2 text-sm px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-sm font-medium"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {/* <FaPercentage className="text-xs" /> */}
//               Details
//               <motion.div
//                 animate={{ rotate: isExpanded ? 180 : 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <ChevronDown size={18} />
//               </motion.div>
//             </motion.button>

//             <motion.button
//               onClick={() => setIsVisible(false)}
//               className="p-1 hover:bg-white/20 rounded-lg transition-all duration-200"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               title="Close"
//             >
//               <X size={20} />
//             </motion.button>
//           </div>
//         </div>

//         {/* Encouraging Message Bar */}
//         <div className="px-4 py-1 relative overflow-hidden">
//           <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] animate-pulse" />

//           <div className="flex items-center justify-between relative z-10">
//             <div className="flex items-center gap-3 flex-1 min-w-0">
//               <div className="bg-white/20 p-2 rounded-lg">
//                 <Tags size={20} />
//               </div>

//               <div className="flex-1 min-w-0">
//                 <motion.div
//                   className="text-sm  truncate"
//                   key={remainingAmount}
//                   initial={{ y: 10, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {remainingAmount > 0 ? (
//                     <>
//                       You are Just{" "}
//                       <span className="text-[var(--themeColor)] text-lg font-bold">
//                         ₹{Math.round(remainingAmount)}
//                       </span>{" "}
//                       away from FLAT{" "}
//                       <span className=" text-[var(--themeColor)] font-bold py-1 text-lg rounded-md">
//                         {nextDiscount}
//                       </span>
//                     </>
//                   ) : (
//                     <span className="flex items-center gap-2">
//                       <Trophy size={14} className="text-yellow-300" />
//                       Maximum Discount Applied! 🎉
//                     </span>
//                   )}
//                 </motion.div>

//                 {/* <div className="text-xs opacity-90 mt-1">
//                   {totalCartItems} items • ₹{formatPrice(totalCartAmount)} total
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Expanded Details */}
//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               className="border-t border-gray-100"
//             >
//               <div className="p-4 bg-gradient-to-br from-gray-50 to-white space-y-4">
//                 {/* Progress Bar */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="font-medium text-gray-700">Progress</span>
//                     <span className="text-amber-600 font-bold">
//                       {Math.round(progressPercentage)}%
//                     </span>
//                   </div>

//                   <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                     <motion.div
//                       className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full relative"
//                       initial={{ width: 0 }}
//                       animate={{ width: `${progressPercentage}%` }}
//                       transition={{ duration: 1, ease: "easeOut" }}
//                     >
//                       <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
//                     </motion.div>
//                   </div>

//                   <div className="flex justify-between text-xs text-gray-600">
//                     <span>₹{Math.round(currentAmount)}</span>
//                     <span>₹{targetAmount}</span>
//                   </div>
//                 </div>

//                 {/* Current Status */}
//                 <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <h3 className="font-semibold text-gray-800 mb-1">
//                         Current Status
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         {totalCartItems} items • ₹{formatPrice(totalCartAmount)}{" "}
//                         total
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <div
//                         className={`text-sm font-bold ${
//                           isDiscountActive ? "text-green-600" : "text-gray-500"
//                         }`}
//                       >
//                         {isDiscountActive
//                           ? `${discountType} Applied`
//                           : "No Discount Yet"}
//                       </div>
//                       {isDiscountActive && (
//                         <div className="text-xs text-green-500 mt-1">
//                           You saved ₹{Math.round(discountAmount)}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Discount Tiers */}
//                 <div className="space-y-3">
//                   <h3 className="font-semibold text-gray-800">
//                     Discount Tiers
//                   </h3>
//                   <div className="grid grid-cols-3 gap-2">
//                     {DISCOUNT_TIERS.map((tier, index) => {
//                       const isUnlocked =
//                         (tier.threshold === 1999
//                           ? currentCartAmount
//                           : currentEligibleAmount) >= tier.threshold;

//                       return (
//                         <motion.div
//                           key={index}
//                           className={`text-center p-1 rounded-xl border-2 transition-all duration-200 ${
//                             isUnlocked
//                               ? "border-green-400 bg-green-50 shadow-md"
//                               : "border-gray-200 bg-gray-50 hover:border-gray-300"
//                           }`}
//                           whileHover={{ scale: 1.02 }}
//                           animate={isUnlocked ? { scale: [1, 1.05, 1] } : {}}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <div
//                             className={`font-bold text-sm ${
//                               isUnlocked ? "text-green-700" : "text-gray-600"
//                             }`}
//                           >
//                             {tier.discount}
//                           </div>
//                           <div className="text-xs text-gray-500 mt-1">
//                             ₹{tier.threshold}+
//                             {tier.threshold === 1999 && (
//                               <div className="text-[10px] text-gray-400">
//                                 (Any Item)
//                               </div>
//                             )}
//                           </div>
//                           {isUnlocked && (
//                             <motion.div
//                               className="text-green-600 text-xs mt-2 flex items-center justify-center gap-1"
//                               initial={{ scale: 0 }}
//                               animate={{ scale: 1 }}
//                               transition={{ delay: 0.2 }}
//                             >
//                               <Trophy size={12} />
//                               Unlocked
//                             </motion.div>
//                           )}
//                         </motion.div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Motivation Message */}
//                 {/* <motion.div 
//                   className="text-center p-4 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200"
//                   animate={{ 
//                     boxShadow: remainingAmount > 0 ? [
//                       '0 0 0 0 rgba(245, 158, 11, 0.4)',
//                       '0 0 0 8px rgba(245, 158, 11, 0)',
//                     ] : '0 0 0 0 rgba(245, 158, 11, 0)'
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: remainingAmount > 0 ? Infinity : 0,
//                     repeatType: "loop"
//                   }}
//                 >
//                   <div className="text-base font-bold text-amber-800 mb-2">
//                     {remainingAmount > 0 ? (
//                       <>🎯 Just ₹{formatPrice(remainingAmount)} away from {nextDiscount}!</>
//                     ) : (
//                       <>🏆 You've unlocked the maximum discount!</>
//                     )}
//                   </div>
//                   <div className="text-sm text-amber-700">
//                     {remainingAmount > 0 
//                       ? 'Add eligible items to save more' 
//                       : 'Keep shopping to maximize your savings!'
//                     }
//                   </div>
//                 </motion.div> */}

//                 {/* Eligible Items */}
//                 <div className="bg-white p-4 rounded-xl border border-gray-100">
//                   <h4 className="text-sm font-semibold text-gray-800 mb-3 text-center">
//                     Eligible Items for Discount
//                   </h4>
//                   <div className="flex flex-wrap gap-2 justify-center">
//                     {ELIGIBLE_ITEMS.map((item, index) => (
//                       <motion.span
//                         key={item}
//                         className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-xs font-medium border border-amber-200"
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         whileHover={{ scale: 1.05 }}
//                       >
//                         {item}
//                       </motion.span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// };

// export default DiscountProgress;
