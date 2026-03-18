import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { adminLogin, fetchAdminData } from '../../features/admin/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import { toast } from 'react-toastify';

// Constants
const BACKGROUND_IMAGE_URL = 'https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-56228.jpg?t=st=1724734255~exp=1724737855~hmac=b261b59d1919bd74a703e91e6d3311f4d8059c0a2c82e8f31ace4351a71b0202&w=1060';

const INITIAL_VALUES = {
  username: '',
  password: '',
  secretKey: '',
};

const VALIDATION_SCHEMA = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  secretKey: Yup.string().required('Secret key is required'),
});

const FORM_FIELDS = [
  { name: 'username', type: 'text', label: 'Username' },
  { name: 'password', type: 'password', label: 'Password' },
  { name: 'secretKey', type: 'text', label: 'Secret Key' },
];

// Custom hook for admin token
const useAdminToken = () => {
  try {
    return JSON.parse(sessionStorage.getItem('adminToken'));
  } catch {
    return null;
  }
};

// Reusable Form Field Component
const FormField = ({ field, className = "" }) => (
  <div className={`mb-4 ${className}`}>
    <label
      htmlFor={field.name}
      className="block text-sm mb-1 uppercase tracking-widest"
    >
      {field.label}
    </label>
    <Field
      type={field.type}
      id={field.name}
      name={field.name}
      className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
    />
    <ErrorMessage
      name={field.name}
      component="div"
      className="text-red-400 text-sm mt-1"
    />
  </div>
);

// Background Container Component
const BackgroundContainer = ({ children }) => (
  <div
    className="relative min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg" />
    {children}
  </div>
);

// Main Admin Login Component
const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminToken = useAdminToken();

  const handleFormSubmission = (values, { setSubmitting }) => {
    try {
      dispatch(adminLogin(values))
        .then(result => {
          if (result.payload.success) {
            const { token, message } = result.payload;
            sessionStorage.setItem("adminToken", JSON.stringify(token));
            dispatch(fetchAdminData(token));
            navigate('/dashboard');
            toast.success(message || 'Login successful');
          } else {
            toast.error(result.payload?.message || 'Login failed');
          }
        })
    } catch (error) {
      toast.error('Network error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  // useEffect(() => {
  //   if (adminToken) {
  //     navigate('/admin/dashboard');
  //   }
  // }, [navigate, adminToken]);

  return (
    <>

      <BackgroundContainer>
        <div className="z-50 fixed top-10 left-10">
          <Logo />
        </div>

        <div className="relative z-10 p-8 text-white rounded-lg shadow-2xl w-full max-w-md mx-4">
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={VALIDATION_SCHEMA}
            onSubmit={handleFormSubmission}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <h1 className="text-3xl font-bold mb-8 text-center">
                  Admin Login
                </h1>

                {FORM_FIELDS.map((field, index) => (
                  <FormField
                    key={field.name}
                    field={field}
                    className={index === FORM_FIELDS.length - 1 ? "mb-6" : ""}
                  />
                ))}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-3 px-4 font-semibold rounded-md shadow-sm 
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                    } text-white
                  `}
                >
                  {isSubmitting ? 'Signing in...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </BackgroundContainer>
    </>
  );
};

export default AdminLogin;