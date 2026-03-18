import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { addNewBannerInDatabase } from '../../../../features/admin/adminData';
import { toast } from 'react-toastify';


const AdminBannerForm = () => {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null); // Store the banner being edited

    // Validation Schema with Yup
    const validationSchema = Yup.object({
        title: Yup.string(),
        description: Yup.string(),
        image: Yup.mixed().required("Image is required").test("fileSize", "File is too large", value => value && value.size <= 2000000), // max 2MB image size
        redirectionUrl: Yup.string().required("Redirection URL is required"),
        order: Yup.number().required("Order is required").positive("Order must be a positive number").integer("Order must be an integer"),
    });

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingBanner(null);
    };

    const handleSaveBanner = (values, { resetForm }) => {


        // Create FormData for uploading the image with other banner data
        const formData = new FormData();
        formData.append('image', values.image);
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('redirectionUrl', values.redirectionUrl);
        formData.append('order', values.order);

        if (editingBanner) {
            // Editing existing banner
            setBannersList(
                bannersList.map((banner) =>
                    banner.id === editingBanner.id ? { ...editingBanner, ...values, image: URL.createObjectURL(values.image) } : banner
                )
            );
        } else {
            // Adding new banner

            dispatch(addNewBannerInDatabase(formData))
                // .unwrap()
                .then(result => {
                    if (result.error?.message === 'Rejected') {
                        toast.error(result.payload)
                    } else {
                        toast.success(result.payload?.message);
                    }
                })

            // setBannersList([newBanner, ...bannersList]);
        }
        resetForm();
        handleModalClose();
    };

    return (
        <div>
            <button
                className='flex justify-center items-center gap-2 shadow-md shadow-green-500 px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white '
                onClick={() => setIsModalOpen(true)}
            >
                Add New Banner
            </button>
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10"
                    onClick={handleModalClose}
                >
                    <div
                        className="bg-white rounded-lg p-6 w-full max-w-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3
                            className="text-xl font-semibold mb-4"
                        >
                            {editingBanner ? "Edit Banner" : "Add New Banner"}
                        </h3>

                        <Formik
                            initialValues={{
                                title: editingBanner ? editingBanner.title : "",
                                description: editingBanner ? editingBanner.description : "",
                                image: editingBanner ? null : "", // Keep null for image until upload
                                redirectionUrl: editingBanner ? editingBanner.redirectionUrl : "",
                                order: editingBanner ? editingBanner.order : 1,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSaveBanner}
                        >
                            {({ setFieldValue, values }) => (
                                <Form className="space-y-4">
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                                            Title
                                        </label>
                                        <Field
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                        <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                                            Description
                                        </label>
                                        <Field
                                            as="textarea"
                                            id="description"
                                            name="description"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                            rows="3"
                                        />
                                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="image" className="block text-sm font-medium mb-1">
                                            Banner Image
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                            onChange={(event) => {
                                                const file = event.target.files[0];
                                                if (file) {
                                                    setFieldValue("image", file);
                                                }
                                            }}
                                        />
                                        {values.image && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">Selected File: {values.image.name}</p>
                                            </div>
                                        )}
                                        <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="redirectionUrl" className="block text-sm font-medium mb-1">
                                            Redirection URL
                                        </label>
                                        <Field
                                            type="text"
                                            id="redirectionUrl"
                                            name="redirectionUrl"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                        <ErrorMessage name="redirectionUrl" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="order" className="block text-sm font-medium mb-1">
                                            Order
                                        </label>
                                        <Field
                                            type="number"
                                            id="order"
                                            name="order"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                        />
                                        <ErrorMessage name="order" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div className="flex justify-end space-x-3 mt-4">
                                        <button
                                            type="button"
                                            onClick={handleModalClose}
                                            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>

                // <UploadProductImage
                //   product={editingBanner}
                // // onSubmit={handleFormSubmit}
                // //  onCancel={handleFormCancel}
                // />
            )}
        </div>
    )
}

export default AdminBannerForm
