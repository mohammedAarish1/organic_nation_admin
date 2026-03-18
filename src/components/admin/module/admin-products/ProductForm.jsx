import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addNewProductInDatabase, updateExistingProduct } from '../../../../features/admin/adminData';
import { toast } from 'react-toastify';
import { Plus, X } from 'lucide-react';



const productSchema = Yup.object().shape({
    isActive: Yup.boolean().required('Required'),
    name: Yup.string().required('Required'),
    weight: Yup.string().required('Required'),
    grossWeight: Yup.string().required('Required'),
    price: Yup.number().positive('Must be positive').required('Required'),
    discount: Yup.number().min(0, 'Must be at least 0').max(100, 'Must be at most 100').required('Required'),
    tax: Yup.number().min(0, 'Must be at least 0').required('Required'),
    hsnCode: Yup.number().positive('Must be positive').required('Required'),
    category: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    availability: Yup.number().min(0, 'Must be at least 0').required('Required'),
    buy: Yup.number().min(0, 'Must be at least 0'),
    get: Yup.number().min(0, 'Must be at least 0'),
    images: Yup.array().min(1, 'At least one image is required').required('Required')
});



const SwitchField = ({ name, label }) => (
    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <Field name={name}>
            {({ field, form }) => (
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={field.value}
                        onChange={() => form.setFieldValue(name, !field.value)}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                        {field.value ? 'Active' : 'Inactive'}
                    </span>
                </label>
            )}
        </Field>
    </div>
);



const FormField = ({ name, label, type = "text", as }) => {

    // Add event handler to prevent scroll from changing number input values
    const handleWheel = (e) => {
        // Prevent the input from changing when scrolling
        e.target.blur();
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-500 mb-1 tracking-widest">{label}</label>
            <Field
                name={name}
                type={type}
                as={as}
                className="mt-1 block w-full rounded-sm  px-2 py-1 border border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onWheel={type === "number" ? handleWheel : undefined}
            />
            <ErrorMessage name={name} component="div" className="mt-1 text-sm text-red-600" />
        </div>
    );
}

const CheckboxField = ({ name, label }) => (
    <div className="flex items-center mb-4">
        <Field
            type="checkbox"
            name={name}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-900">{label}</label>
    </div>
);


const ImagePreview = ({ url, onRemove, index }) => (
    <div className="relative group">
        <img
            src={url}
            alt="Product"
            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
        />
        <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
            <X />
        </button>
    </div>
);

const ProductForm = ({ product, onSubmit, onCancel }) => {
    const dispatch = useDispatch();
    const [existingImages, setExistingImages] = useState(product ? product.img : []);
    const [newImages, setNewImages] = useState([]);
    const [removedImageUrls, setRemovedImageUrls] = useState([]);
    useEffect(() => {
        if (product && product.images) {
            // Handle images array directly from S3 URLs
            setExistingImages(product.images.map(url => ({
                url: url
            })));
        }
    }, [product]);

    const initialValues = product ? {
        isActive: product.isActive ?? true,
        name: product.name,
        weight: product.weight,
        grossWeight: product.grossWeight,
        price: product.price,
        discount: product.discount,
        tax: product.tax,
        hsnCode: product['hsn-code'],
        category: product.category,
        description: product.description,
        availability: product.availability,
        buy: product.meta.buy,
        get: product.meta.get,
        season_special: product.meta.season_special,
        new_arrivals: product.meta.new_arrivals,
        best_seller: product.meta.best_seller,
        deal_of_the_day: product.meta.deal_of_the_day,
        images: product.img || []
    } : {
        isActive: true,
        name: '',
        weight: '',
        grossWeight: '',
        price: '',
        discount: '',
        tax: '',
        hsnCode: '',
        category: '',
        description: '',
        availability: '',
        buy: '',
        get: '',
        season_special: false,
        new_arrivals: false,
        best_seller: false,
        deal_of_the_day: false,
        images: []
    };

    const handleNewImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImagePreviews = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }));
        setNewImages(prev => [...prev, ...newImagePreviews]);
    };

    const removeExistingImage = (index) => {
        const removedImageUrl = existingImages[index];
        setRemovedImageUrls(prev => [...prev, removedImageUrl]);
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index) => {
        URL.revokeObjectURL(newImages[index].url); // Clean up object URL
        setNewImages(prev => prev.filter((_, i) => i !== index));
    };

    //  =============== form submission==========
    const handleSubmit = async (values, { setSubmitting }) => {
        const data = new FormData();

        // Append form values
        Object.keys(values).forEach(key => {
            data.append(key, values[key]);
        });

        // Append new images
        newImages.forEach(image => {
            data.append('newImages', image.file);
        });

        // Append remaining existing image URLs
        const remainingImages = existingImages.map(img => img);
        data.append('existingImages', JSON.stringify(remainingImages));

        // Append removed image URLs
        if (removedImageUrls.length > 0) {
            data.append('removedImages', JSON.stringify(removedImageUrls));
        }

        try {
            if (product) {
                // for updating the product data
                await dispatch(updateExistingProduct({
                    id: product._id,
                    formData: data
                }))
                    .unwrap()
                    .then(result => {
                        toast.info(result.message)
                    })
            } else {
                // for adding new product
                await dispatch(addNewProductInDatabase(data))
                    .then(result => {
                        toast.success(result.payload?.message)
                    })
            }

            // Clean up object URLs
            newImages.forEach(image => URL.revokeObjectURL(image.url));

            onSubmit();
        } catch (error) {
            throw error
        }
        setSubmitting(false);
    };

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            newImages.forEach(image => URL.revokeObjectURL(image.url));
        };
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            onSubmit={handleSubmit}
        >
            {({ values, isSubmitting, setFieldValue }) => (
                <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                    <SwitchField name="isActive" label="Product Status" />


                    {/* Existing form fields */}
                    <FormField name="name" label="Product Name" />
                    <FormField name="weight" label="Weight" />
                    <FormField name="grossWeight" label="Gross Weight" />
                    <FormField name="price" label="Price" type="number" />
                    <FormField name="discount" label="Discount (%)" type="number" />
                    <FormField name="tax" label="Tax (%)" type="number" />
                    <FormField name="hsnCode" label="HSN Code" type="number" />
                    <FormField name="category" label="Category" />
                    <FormField name="description" label="Description" as="textarea" />
                    <FormField name="availability" label="Availability" type="number" />
                    <FormField name="buy" label="Buy" type="number" />
                    <FormField name="get" label="Get" type="number" />

                    <div className="mb-4">
                        <CheckboxField name="season_special" label="Season Special" />
                        <CheckboxField name="new_arrivals" label="New Arrivals" />
                        <CheckboxField name="best_seller" label="Best Seller" />
                        <CheckboxField name="deal_of_the_day" label="Deal of the Day" />
                    </div>

                    {/* Image Management Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>

                        <div className="mb-4">
                            <div className="grid grid-cols-4 gap-4">
                                {/* Existing S3 Images */}
                                {existingImages.map((url, index) => (
                                    <ImagePreview
                                        key={url._id}
                                        url={url.md}
                                        onRemove={() => removeExistingImage(index)}
                                        index={index}
                                    />
                                ))}

                                {/* New Image Previews */}
                                {newImages.map((image, index) => (
                                    <ImagePreview
                                        key={`new-${index}`}
                                        url={image.url}
                                        onRemove={() => removeNewImage(index)}
                                        index={index}
                                    />
                                ))}

                                {/* Add Image Button */}
                                <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        // onChange={handleNewImageChange}
                                        onChange={(e) => {
                                            handleNewImageChange(e);
                                            setFieldValue('images', [...values.images, ...Array.from(e.target.files)]);
                                        }}
                                        className="hidden"
                                    />
                                    <div className="flex flex-col items-center">
                                        <Plus size={24} className="text-green-500" />
                                        <span className="text-xs text-gray-500 mt-1">Add Images</span>
                                    </div>
                                </label>
                                <ErrorMessage name="images" component="div" className="mt-1 text-sm text-red-600" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {isSubmitting ? (product ? 'Updating...' : 'Adding...') : (product ? 'Update Product' : 'Add Product')}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ProductForm;