// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';



// import { useState, useRef } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';


// const apiUrl = import.meta.env.VITE_BACKEND_URL;


// // Validation schema
// const emailSchema = Yup.object().shape({
//     subject: Yup.string()
//         .min(3, 'Subject must be at least 3 characters')
//         .max(200, 'Subject must be less than 200 characters')
//         .required('Subject is required'),
//     emailBody: Yup.string()
//         .min(10, 'Email body must be at least 10 characters')
//         .required('Email body is required'),
//     recipientType: Yup.string()
//         .oneOf(['all', 'active', 'inactive'], 'Please select a valid recipient type')
//         .required('Recipient type is required')
// });

// const AdminBulkEmail = () => {
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const editorRef = useRef(null);

//     // Rich text editor functions
//     const formatText = (command, value = null) => {
//         document.execCommand(command, false, value);
//         editorRef.current?.focus();
//     };

//     const handleEditorInput = (setFieldValue) => {
//         const content = editorRef.current?.innerHTML || '';
//         setFieldValue('emailBody', content);
//     };

//     const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {

//         // setIsLoading(true);
//         try {

//             const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
//             const response = await axios.post(
//                 `${apiUrl}/api/admin/send/bulk-email`,
//                 values,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${adminToken}`,
//                         'Content-Type': 'application/json'
//                     },
//                 }
//             );

//             //   // Replace with your API endpoint
//             //   const response = await fetch('/api/send-bulk-email', {
//             //     method: 'POST',
//             //     headers: {
//             //       'Content-Type': 'application/json',
//             //       // Add authorization header if needed
//             //       // 'Authorization': `Bearer ${token}`
//             //     },
//             //     body: JSON.stringify({
//             //       subject: values.subject,
//             //       emailBody: values.emailBody,
//             //       recipientType: values.recipientType
//             //     })
//             //   });

//             if (response.status === 200) {
//                 // const result = await response.json();
//                 // setStatus({ type: 'success', message: response.data.message });
//                 resetForm();
//                 // setIsLoading(false);
//                 setIsFormVisible(false);
//                 // Clear editor content
//                 if (editorRef.current) {
//                     editorRef.current.innerHTML = '';
//                 }
//             } else {
//                 const error = await response.json();
//                 setStatus({ type: 'error', message: error.message || 'Failed to send bulk email' });
//             }
//         } catch (error) {
//             setStatus({ type: 'error', message: 'Network error. Please try again.' });
//         } finally {
//             // setIsLoading(false);     
//             setSubmitting(false);
//         }
//     };


//     return (
//         <div className="w-full max-w-4xl mx-auto p-4">
//             {/* Send Bulk Email Button */}
//             <motion.button
//                 onClick={() => setIsFormVisible(true)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 transition-colors duration-200"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//             >
//                 <FaEnvelope className="text-lg" />
//                 Send Bulk Email
//             </motion.button>

//             {/* Form Modal */}
//             <AnimatePresence>
//                 {isFormVisible && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//                         onClick={(e) => e.target === e.currentTarget && setIsFormVisible(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.95, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             exit={{ scale: 0.95, opacity: 0 }}
//                             className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
//                         >
//                             {/* Header */}
//                             <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                                 <h2 className="text-2xl font-bold text-gray-800">Send Bulk Email</h2>
//                                 <button
//                                     onClick={() => setIsFormVisible(false)}
//                                     className="text-gray-500 hover:text-gray-700 transition-colors"
//                                 >
//                                     <FaTimes className="text-xl" />
//                                 </button>
//                             </div>

//                             {/* Form */}
//                             <Formik
//                                 initialValues={{
//                                     subject: '',
//                                     emailBody: '',
//                                     recipientType: 'all'
//                                 }}
//                                 validationSchema={emailSchema}
//                                 onSubmit={handleSubmit}
//                             >
//                                 {({ setFieldValue, values, status, isSubmitting }) => (
//                                     <Form>
//                                         <div className="p-6 space-y-6">
//                                             {/* Status Message */}
//                                             {status && (
//                                                 <motion.div
//                                                     initial={{ opacity: 0, y: -10 }}
//                                                     animate={{ opacity: 1, y: 0 }}
//                                                     className={`p-4 rounded-lg ${status.type === 'success'
//                                                         ? 'bg-green-100 text-green-700 border border-green-300'
//                                                         : 'bg-red-100 text-red-700 border border-red-300'
//                                                         }`}
//                                                 >
//                                                     {status.message}
//                                                 </motion.div>
//                                             )}

//                                             {/* Recipient Type */}
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                     Send to:
//                                                 </label>
//                                                 <Field
//                                                     as="select"
//                                                     name="recipientType"
//                                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                                 >
//                                                     <option value="all">All Users</option>
//                                                     <option value="active">Active Users</option>
//                                                     <option value="inactive">Inactive Users</option>
//                                                 </Field>
//                                                 <ErrorMessage name="recipientType" component="div" className="text-red-500 text-sm mt-1" />
//                                             </div>

//                                             {/* Subject */}
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                     Subject:
//                                                 </label>
//                                                 <Field
//                                                     type="text"
//                                                     name="subject"
//                                                     placeholder="Enter email subject..."
//                                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                                 />
//                                                 <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1" />
//                                             </div>

//                                             {/* Rich Text Editor */}
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                     Email Body:
//                                                 </label>

//                                                 {/* Editor Toolbar */}
//                                                 <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-2">
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => formatText('bold')}
//                                                         className="p-2 rounded hover:bg-gray-200 transition-colors"
//                                                         title="Bold"
//                                                     >
//                                                         <FaBold />
//                                                     </button>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => formatText('italic')}
//                                                         className="p-2 rounded hover:bg-gray-200 transition-colors"
//                                                         title="Italic"
//                                                     >
//                                                         <FaItalic />
//                                                     </button>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => formatText('underline')}
//                                                         className="p-2 rounded hover:bg-gray-200 transition-colors"
//                                                         title="Underline"
//                                                     >
//                                                         <FaUnderline />
//                                                     </button>
//                                                     <div className="w-px bg-gray-300 mx-1"></div>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => formatText('insertUnorderedList')}
//                                                         className="p-2 rounded hover:bg-gray-200 transition-colors"
//                                                         title="Bullet List"
//                                                     >
//                                                         <FaListUl />
//                                                     </button>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => formatText('insertOrderedList')}
//                                                         className="p-2 rounded hover:bg-gray-200 transition-colors"
//                                                         title="Numbered List"
//                                                     >
//                                                         <FaListOl />
//                                                     </button>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => {
//                                                             const url = prompt('Enter URL:');
//                                                             if (url) formatText('createLink', url);
//                                                         }}
//                                                         className="p-2 rounded hover:bg-gray-200 transition-colors"
//                                                         title="Add Link"
//                                                     >
//                                                         <FaLink />
//                                                     </button>
//                                                 </div>

//                                                 {/* Editor Content Area */}
//                                                 <div
//                                                     ref={editorRef}
//                                                     contentEditable
//                                                     onInput={() => handleEditorInput(setFieldValue)}
//                                                     className="w-full min-h-[200px] p-4 border-x border-b border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                                                     style={{ wordWrap: 'break-word' }}
//                                                     placeholder="Type your email content here..."
//                                                     suppressContentEditableWarning={true}
//                                                 />
//                                                 <ErrorMessage name="emailBody" component="div" className="text-red-500 text-sm mt-1" />
//                                             </div>

//                                             {/* Action Buttons */}
//                                             <div className="flex justify-end gap-4 pt-4">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => setIsFormVisible(false)}
//                                                     className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                                                     disabled={isSubmitting}
//                                                 >
//                                                     Cancel
//                                                 </button>
//                                                 <motion.button
//                                                     type="submit"
//                                                     // onClick={() => handleSubmit(values, { setSubmitting: () => setIsLoading(true), resetForm: () => { }, setStatus: () => { } })}
//                                                     // disabled={isSubmitting || isLoading}
//                                                     disabled={isSubmitting}
//                                                     className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                                                     whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
//                                                     whileTap={{ scale: 0.98 }}
//                                                 >
//                                                     {isSubmitting ? (
//                                                         <>
//                                                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                                                             Sending...
//                                                         </>
//                                                     ) : (
//                                                         <>
//                                                             <FaEnvelope />
//                                                             Send Bulk Email
//                                                         </>
//                                                     )}
//                                                 </motion.button>
//                                             </div>
//                                         </div>
//                                     </Form>
//                                 )}
//                             </Formik>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default AdminBulkEmail;