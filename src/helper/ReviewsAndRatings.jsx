// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useDispatch, useSelector } from 'react-redux';
// import { addReviews } from '../features/reviews/reviews';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { CheckCircle, Edit, Send, Star } from 'lucide-react';

// const ReviewsAndRatings = ({ productName, insideProductDetails = false }) => {
//     const initialValues = {
//         rating: 0,
//         review: '',
//     };

//     const validationSchema = Yup.object({
//         rating: Yup.number().min(1, 'Please select a rating').required('Rating is required'),
//         review: Yup.string()
//             .min(10, 'Review must be at least 10 characters')
//             .max(500, 'Review must be less than 500 characters')
//             .required('Review is required'),
//     });

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { user } = useSelector(state => state.auth);

//     const handleSubmit = (values, { resetForm, setSubmitting }) => {
//         setTimeout(() => {
//             if (user) {
//                 dispatch(addReviews({ productName, ...values }));
//                 toast.success("Review submitted successfully", {
//                     style: {
//                         background: '#F5EFE6',
//                         color: '#3E2C1B',
//                         border: '1px solid #9B7A2F'
//                     }
//                 });
//             } else {
//                 sessionStorage.setItem('reviews&rating', JSON.stringify({ productName, ...values }));
//                 navigate('/register');
//             }
//             resetForm();
//             setSubmitting(false);
//         }, 1000);
//     };

//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.5,
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, x: -20 },
//         visible: { opacity: 1, x: 0 }
//     };

//     return (
//         <motion.div
//             className={`${insideProductDetails 
//                 ? 'p-6 rounded-2xl shadow-lg' 
//                 : 'max-w-2xl mx-auto p-8 rounded-3xl shadow-xl'
//             }`}
//             style={{ backgroundColor: '#FFFFFF' }}
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//         >
//             {/* Header */}
//             <motion.div 
//                 className="mb-8 text-center"
//                 variants={itemVariants}
//             >
//                 <h2 
//                     className={`${insideProductDetails ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}
//                     style={{ color: '#3E2C1B' }}
//                 >
//                     Share Your Experience
//                 </h2>
//                 <p 
//                     className="text-sm"
//                     style={{ color: '#7A2E1D' }}
//                 >
//                     Help others make informed decisions with your honest review
//                 </p>
//             </motion.div>

//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {({ values, setFieldValue, isSubmitting, errors, touched }) => (
//                     <Form>
//                         <motion.div 
//                             className="space-y-8"
//                             variants={containerVariants}
//                         >
//                             {/* Rating Section */}
//                             <motion.div 
//                                 className="space-y-4"
//                                 variants={itemVariants}
//                             >
//                                 <label 
//                                     className="block text-lg font-semibold tracking-wide"
//                                     style={{ color: '#7A2E1D' }}
//                                 >
//                                     How would you rate this product?
//                                 </label>
                                
//                                 <div className="flex items-center justify-center gap-3 p-6 rounded-2xl" style={{ backgroundColor: '#F5EFE6' }}>
//                                     {[...Array(5)].map((star, index) => {
//                                         const ratingValue = index + 1;
//                                         return (
//                                             <motion.label 
//                                                 key={index}
//                                                 whileHover={{ scale: 1.2, rotate: 10 }}
//                                                 whileTap={{ scale: 0.9 }}
//                                                 className="cursor-pointer"
//                                             >
//                                                 <input
//                                                     type="radio"
//                                                     name="rating"
//                                                     value={ratingValue}
//                                                     onClick={() => setFieldValue('rating', ratingValue)}
//                                                     className="hidden"
//                                                 />
//                                                 <motion.div
//                                                     initial={{ scale: 0 }}
//                                                     animate={{ scale: 1 }}
//                                                     transition={{ delay: index * 0.1 }}
//                                                 >
//                                                     <Star
//                                                         size={32}
//                                                         style={{
//                                                             color: ratingValue <= values.rating ? '#9B7A2F' : '#DCD2C0',
//                                                             filter: ratingValue <= values.rating 
//                                                                 ? "drop-shadow(0 2px 4px rgba(155, 122, 47, 0.3))" 
//                                                                 : "none",
//                                                             transition: 'all 0.2s ease'
//                                                         }}
//                                                     />
//                                                 </motion.div>
//                                             </motion.label>
//                                         );
//                                     })}
//                                 </div>

//                                 {/* Rating Text */}
//                                 <AnimatePresence>
//                                     {values.rating > 0 && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: -10 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             exit={{ opacity: 0, y: -10 }}
//                                             className="text-center"
//                                         >
//                                             <span 
//                                                 className="text-lg font-semibold"
//                                                 style={{ color: '#9B7A2F' }}
//                                             >
//                                                 {values.rating === 1 && "Poor"}
//                                                 {values.rating === 2 && "Fair"}
//                                                 {values.rating === 3 && "Good"}
//                                                 {values.rating === 4 && "Very Good"}
//                                                 {values.rating === 5 && "Excellent"}
//                                             </span>
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>

//                                 <ErrorMessage 
//                                     name="rating" 
//                                     component={motion.div}
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     className="text-red-500 text-sm text-center font-medium"
//                                 />
//                             </motion.div>

//                             {/* Review Section */}
//                             <motion.div 
//                                 className="space-y-4"
//                                 variants={itemVariants}
//                             >
//                                 <label 
//                                     htmlFor="review" 
//                                     className="text-lg font-semibold tracking-wide flex items-center gap-2"
//                                     style={{ color: '#7A2E1D' }}
//                                 >
//                                     <Edit />
//                                     Tell us about your experience
//                                 </label>
                                
//                                 <motion.div
//                                     whileFocus={{ scale: 1.02 }}
//                                     className="relative"
//                                 >
//                                     <Field name="review">
//                                         {({ field }) => (
//                                             <textarea
//                                                 {...field}
//                                                 id="review"
//                                                 className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 resize-none focus:outline-none text-base leading-relaxed ${
//                                                     errors.review && touched.review
//                                                         ? 'border-red-400 focus:border-red-500'
//                                                         : 'focus:border-opacity-100'
//                                                 }`}
//                                                 style={{
//                                                     backgroundColor: '#F5EFE6',
//                                                     borderColor: errors.review && touched.review ? '#ef4444' : '#DCD2C0',
//                                                     color: '#3E2C1B'
//                                                 }}
//                                                 placeholder="Share your thoughts about this product. What did you like? How was the quality? Would you recommend it to others?"
//                                                 rows={insideProductDetails ? 4 : 6}
//                                                 maxLength={500}
//                                             />
//                                         )}
//                                     </Field>
                                    
//                                     {/* Character Counter */}
//                                     <div 
//                                         className="absolute bottom-3 right-4 text-xs font-medium"
//                                         style={{ color: '#7A2E1D' }}
//                                     >
//                                         {values.review.length}/500
//                                     </div>
//                                 </motion.div>

//                                 <ErrorMessage 
//                                     name="review" 
//                                     component={motion.div}
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     className="text-red-500 text-sm font-medium"
//                                 />
//                             </motion.div>

//                             {/* Submit Button */}
//                             <motion.div 
//                                 className="flex justify-center pt-4"
//                                 variants={itemVariants}
//                             >
//                                 <motion.button
//                                     type="submit"
//                                     disabled={isSubmitting}
//                                     className={`${insideProductDetails 
//                                         ? 'px-8 py-3 text-base' 
//                                         : 'px-12 py-4 text-lg'
//                                     } font-bold text-white rounded-2xl shadow-lg flex items-center gap-3 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
//                                     style={{ backgroundColor: '#7A2E1D' }}
//                                     whileHover={!isSubmitting ? { 
//                                         scale: 1.05, 
//                                         backgroundColor: '#9B7A2F',
//                                         boxShadow: "0 10px 30px rgba(122, 46, 29, 0.3)"
//                                     } : {}}
//                                     whileTap={!isSubmitting ? { scale: 0.98 } : {}}
//                                 >
//                                     <AnimatePresence mode="wait">
//                                         {isSubmitting ? (
//                                             <motion.div
//                                                 key="loading"
//                                                 initial={{ opacity: 0 }}
//                                                 animate={{ opacity: 1 }}
//                                                 exit={{ opacity: 0 }}
//                                                 className="flex items-center gap-3"
//                                             >
//                                                 <motion.div
//                                                     animate={{ rotate: 360 }}
//                                                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                                                     className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                                                 />
//                                                 <span>Submitting...</span>
//                                             </motion.div>
//                                         ) : (
//                                             <motion.div
//                                                 key="submit"
//                                                 initial={{ opacity: 0 }}
//                                                 animate={{ opacity: 1 }}
//                                                 exit={{ opacity: 0 }}
//                                                 className="flex items-center gap-3"
//                                             >
//                                                 <Send  />
//                                                 <span>Submit Review</span>
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </motion.button>
//                             </motion.div>

//                             {/* Trust Badge */}
//                             <motion.div
//                                 className="flex items-center justify-center gap-2 pt-4 text-sm"
//                                 style={{ color: '#7A2E1D' }}
//                                 variants={itemVariants}
//                             >
//                                 <CheckCircle style={{ color: '#6B8E23' }} />
//                                 <span>Your review helps build trust in our community</span>
//                             </motion.div>
//                         </motion.div>
//                     </Form>
//                 )}
//             </Formik>
//         </motion.div>
//     );
// };

// export default ReviewsAndRatings;