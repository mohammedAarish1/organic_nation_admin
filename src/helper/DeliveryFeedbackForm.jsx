import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addDeliveryFeedback } from '../features/reviews/reviews';
import { toast } from 'react-toastify';
import SubmitButton from '../components/button/SubmitButton';

const DeliveryFeedbackForm = ({ invoiceNumber, setShowDeliveryFeedbackForm }) => {

  const dispatch = useDispatch()

  const options = [
    { id: '1', label: 'Satisfied' },
    { id: '2', label: 'Very Satisfied' },
    { id: '3', label: 'Neutral' },
    { id: '4', label: 'Unsatisfied' },
    { id: '5', label: 'Very Unsatisfied' },
  ];

  const validationSchema = Yup.object().shape({
    selectedOption: Yup.string().required('Please select an option'),
    comments: Yup.string(),
  });


  const handleFormSubmission = (values, { setSubmitting, resetForm }, action) => {
    const payload = { ...values, invoiceNumber }
    try {
      dispatch(addDeliveryFeedback(payload))
        .then(() => {
          setShowDeliveryFeedbackForm(false)
          toast.info('Submitted Successfully')
        })
    } catch (error) {

    }
    setSubmitting(false);
    resetForm()

  }

  return (
    <div className="max-w-md py-2  rounded-lg shadow-md font-serif">
      <Formik
        initialValues={{
          selectedOption: '',
          comments: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmission}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-1">
            <div>
              <h2 className="text-lg font-semibold mb-3">Select an option:</h2>
              <div className="space-y-2">
                {options.map((option) => (
                  <label key={option.id} className="flex items-center space-x-2">
                    <Field
                      type="radio"
                      name="selectedOption"
                      value={option.label}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="">{option.label}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="selectedOption"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="comments" className="block text-lg font-semibold mb-2">
                Additional Comments (Optional):
              </label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                rows="4"
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your comments here..."
              />
            </div>

            <SubmitButton
              id='feedbackSubmitBtn'
              isSubmitting={isSubmitting}
              text='Submit'
            />
            {/* <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:bg-green-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeliveryFeedbackForm;

