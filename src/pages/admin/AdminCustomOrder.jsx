import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { X, ShoppingCart, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createCustomOrder, getList } from "../../features/admin/adminData";
import { states } from "../../helper/stateList";
import { toast } from "react-toastify";
import SubmitButton from "../../components/button/SubmitButton";
const AdminCustomOrder = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { loading, totalProducts:products } = useSelector((state) => state.adminData);
//   const { products } = useSelector((state) => state.filterData);


  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required"),
    pinCode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .required("City is required"),
    state: Yup.string().required("State is required"),
    products: Yup.array()
      .of(
        Yup.object({
          productName: Yup.string().required("Product name is required"),
          quantity: Yup.number()
            .min(1, "Quantity must be at least 1")
            .required("Quantity is required"),
          // price: Yup.number()
          //   .min(0, "Price cannot be negative")
          //   .required("Price is required"),
          discount: Yup.number()
            .min(0, "Discount cannot be negative")
            .max(100, "Discount cannot exceed 100%")
            .required("Discount is required"),
        })
      )
      .min(1, "At least one product is required"),

    shippingFee: Yup.number()
      .min(0, "Shipping fee cannot be negative")
      .required("Shipping fee is required"),
    CODCharge: Yup.number()
      .min(0, "COD Charge cannot be negative")
      .required("COD Charge is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
    paymentStatus: Yup.string().required("Payment status is required"),
  });

  const initialValues = {
    email: "",
    name: "",
    phoneNumber: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
    products: [
      {
        productName: "",
        quantity: 1,
        // price: 0,
        discount: 0,
      },
    ],
    shippingFee: 0,
    CODCharge: 0,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "pending",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {

      dispatch(createCustomOrder(values)).then((result) => {
        if (result.payload.success) {
          resetForm();
          setIsOpen(false);
          toast.info(result.payload.message);
        }
      });
    } catch (error) {
      alert("Failed to submit order");
    } finally {
      setSubmitting(false);
    }
  };
 useEffect(() => {
        if(products.length===0){
            dispatch(getList('products'));
        }
    }, []);

    if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
      >
        <ShoppingCart size={20} />
        Create Order
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10 rounded-t-xl">
              <h2 className="text-2xl font-bold text-gray-800">
                Create New Order
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, touched, errors, values }) => (
                  <Form className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Customer Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Full Name *
                          </label>
                          <Field
                            id="name"
                            name="name"
                            type="text"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                              touched.name && errors.name
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="John Doe"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email *
                          </label>
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                              touched.email && errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="john@example.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Phone Number *
                          </label>
                          <Field
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                              touched.phoneNumber && errors.phoneNumber
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="9876543210"
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Shipping Address
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Address *
                          </label>
                          <Field
                            id="address"
                            name="address"
                            as="textarea"
                            rows="3"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
                              touched.address && errors.address
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Street address, apartment, suite, etc."
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              City *
                            </label>
                            <Field
                              id="city"
                              name="city"
                              type="text"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                touched.city && errors.city
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="Mumbai"
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="state"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              State *
                            </label>
                            <Field
                              id="state"
                              name="state"
                              as="select"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                touched.state && errors.state
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <option value="">Select State</option>
                              {states.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="state"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="pinCode"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Pincode *
                            </label>
                            <Field
                              id="pinCode"
                              name="pinCode"
                              type="text"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                touched.pinCode && errors.pinCode
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                              placeholder="400001"
                            />
                            <ErrorMessage
                              name="pinCode"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                          Products *
                        </h3>
                      </div>
                      <FieldArray name="products">
                        {({ push, remove }) => (
                          <div className="space-y-4">
                            {values.products.map((product, index) => (
                              <div
                                key={index}
                                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-medium text-gray-700">
                                    Product {index + 1}
                                  </h4>
                                  {values.products.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label
                                      htmlFor={`products.${index}.productName`}
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Product Name *
                                    </label>
                                    {/* <Field
                                      id={`products.${index}.productName`}
                                      name={`products.${index}.productName`}
                                      type="text"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                      placeholder="Product name"
                                    /> */}

                                    <Field
                                      as="select"
                                      id={`products.${index}.productName`}
                                      name={`products.${index}.productName`}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                    >
                                      <option value="">Select a product</option>
                                      {products?.map((item) => (
                                        <option
                                          key={item._id || item.id || item.name}
                                          value={item.name}
                                        >
                                          {item.name}
                                        </option>
                                      ))}
                                    </Field>

                                    <ErrorMessage
                                      name={`products.${index}.productName`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>

                                  <div>
                                    <label
                                      htmlFor={`products.${index}.quantity`}
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Quantity *
                                    </label>
                                    <Field
                                      id={`products.${index}.quantity`}
                                      name={`products.${index}.quantity`}
                                      type="number"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                      placeholder="1"
                                    />
                                    <ErrorMessage
                                      name={`products.${index}.quantity`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>

                                  {/* <div>
                                    <label
                                      htmlFor={`products.${index}.price`}
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Price (₹) *
                                    </label>
                                    <Field
                                      id={`products.${index}.price`}
                                      name={`products.${index}.price`}
                                      type="number"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                      placeholder="0"
                                    />
                                    <ErrorMessage
                                      name={`products.${index}.price`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div> */}

                                  <div>
                                    <label
                                      htmlFor={`products.${index}.discount`}
                                      className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                      Discount *
                                    </label>
                                    <Field
                                      id={`products.${index}.discount`}
                                      name={`products.${index}.discount`}
                                      type="text"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                      placeholder="0"
                                    />
                                    <ErrorMessage
                                      name={`products.${index}.discount`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                push({
                                  productName: "",
                                  quantity: 1,
                                  // price: 0,
                                  discount: 0,
                                })
                              }
                              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                              <Plus size={18} />
                              Add Another Product
                            </button>
                            {typeof errors.products === "string" && (
                              <div className="text-red-500 text-sm">
                                {errors.products}
                              </div>
                            )}
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Order Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="shippingFee"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Shipping Fee (₹) *
                          </label>
                          <Field
                            id="shippingFee"
                            name="shippingFee"
                            type="number"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                              touched.shippingFee && errors.shippingFee
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="0"
                          />
                          <ErrorMessage
                            name="shippingFee"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                         <div>
                          <label
                            htmlFor="shippingFee"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            COD Charges (₹) *
                          </label>
                          <Field
                            id="CODCharge"
                            name="CODCharge"
                            type="number"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                              touched.CODCharge && errors.CODCharge
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="0"
                          />
                          <ErrorMessage
                            name="CODCharge"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Payment Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="paymentMethod"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Payment Method *
                          </label>
                          <Field
                            id="paymentMethod"
                            name="paymentMethod"
                            as="select"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                              touched.paymentMethod && errors.paymentMethod
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="">Select Payment Method</option>
                            <option value="cash_on_delivery">
                              Cash on Delivery
                            </option>
                            <option value="online_payment">
                              Online Payment
                            </option>
                          </Field>
                          <ErrorMessage
                            name="paymentMethod"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="paymentStatus"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Payment Status *
                          </label>
                          <Field
                            id="paymentStatus"
                            name="paymentStatus"
                            as="select"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                              touched.paymentStatus && errors.paymentStatus
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="">Select Payment Status</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                          </Field>
                          <ErrorMessage
                            name="paymentStatus"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 border-t">
                      <SubmitButton
                        id="customOrdercreation"
                        isSubmitting={isSubmitting}
                        text={'Create Order'}
                      />
                      {/* <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Order"}
                      </button> */}
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomOrder;
