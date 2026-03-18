import { useState, memo } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Play,
  X,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addReviews } from "../../features/reviews/reviews";
import { toast } from "react-toastify";

const ReviewModal = memo(({ isOpen, onClose, productId }) => {
  const dispatch = useDispatch();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  // const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  // ------------------ IMAGE UPLOAD ------------------
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (uploadedImages.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Each image must be under 5MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        alert("Only JPG, PNG, WebP allowed");
        return;
      }
    }

    const previews = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (id) => {
    const img = uploadedImages.find((i) => i.id === id);
    URL.revokeObjectURL(img.preview);
    setUploadedImages((prev) => prev.filter((i) => i.id !== id));
  };

  // ------------------ VIDEO UPLOAD ------------------
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert("Video must be under 50MB");
      return;
    }
    if (!["video/mp4", "video/webm", "video/ogg"].includes(file.type)) {
      alert("Only MP4, WebM, OGG allowed");
      return;
    }

    setUploadedVideo({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const removeVideo = () => {
    if (uploadedVideo) URL.revokeObjectURL(uploadedVideo.preview);
    setUploadedVideo(null);
  };

  const closeModal = () => {
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    if (uploadedVideo) URL.revokeObjectURL(uploadedVideo.preview);
    setUploadedImages([]);
    setUploadedVideo(null);
    onClose();
  };

  // ------------------ YUP SCHEMA ------------------
  const ReviewSchema = Yup.object().shape({
    rating: Yup.number().min(1, "Rating is required").required(),
    title: Yup.string(),
    review: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    // setUploading(true);

    try {
      const formData = new FormData();
      formData.append("productName", productId);
      formData.append("rating", values.rating);
      formData.append("title", values.title);
      formData.append("review", values.review);

      uploadedImages.forEach((img) => formData.append("images", img.file));
      if (uploadedVideo) formData.append("video", uploadedVideo.file);

      // console.log("Submitting →", {
      //   ...values,
      //   images: uploadedImages.length,
      //   video: uploadedVideo ? "included" : "none",
      // });

      const result = await dispatch(addReviews(formData)).unwrap();
      if (result.success) {
        // Cleanup
        uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
        if (uploadedVideo) URL.revokeObjectURL(uploadedVideo.preview);
        // setSubmitting(false);
        resetForm();
        closeModal();
        toast.success("Review submitted successfully!");
      }
    } catch (err) {
      throw err
    } finally {
      // setUploading(false);
      // setSubmitting(false)
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={closeModal}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Write a Review</h3>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* FORMIK */}
        <Formik
          initialValues={{ rating: 0, title: "", review: "" }}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form className="space-y-6">
              {/* ⭐ RATING */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFieldValue("rating", star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      <Star
                        size={32}
                        fill={
                          star <= (hoveredRating || values.rating)
                            ? "#F59E0B"
                            : "none"
                        }
                        color={
                          star <= (hoveredRating || values.rating)
                            ? "#F59E0B"
                            : "#D1D5DB"
                        }
                      />
                    </button>
                  ))}
                </div>
                <ErrorMessage
                  name="rating"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* TITLE */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Title *
                </label>
                <Field
                  name="title"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
                  placeholder="Summarize your experience"
                />
                <ErrorMessage
                  name="title"
                  className="text-red-500 text-sm mt-1"
                  component="p"
                />
              </div>

              {/* REVIEW */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Review *
                </label>
                <Field
                  as="textarea"
                  name="review"
                  rows={5}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 resize-none"
                />
                <ErrorMessage
                  name="review"
                  className="text-red-500 text-sm mt-1"
                  component="p"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="text-sm font-semibold block mb-2">
                  Upload Images (Optional)
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Max 5 images (5MB each)
                </p>

                {uploadedImages.length < 5 && (
                  <label className="block w-full border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-orange-500">
                    Click to upload
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {uploadedImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.preview}
                          className="w-full h-24 rounded-lg object-cover border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Video (Optional)
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Maximum 50MB (MP4, WebM, OGG)
                </p>
                {!uploadedVideo ? (
                  <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-500 cursor-pointer transition-colors bg-gray-50 hover:bg-orange-50">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Play size={20} />
                      <span className="font-medium">Click to upload video</span>
                    </div>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/ogg"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative group">
                    <video
                      src={uploadedVideo.preview}
                      className="w-full h-40 object-cover rounded-lg border-2 border-gray-200"
                      controls
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              {/* VIDEO UPLOAD */}

              {/* <div>
                <label className="text-sm font-semibold block mb-2">Upload Video (Optional)</label>
                {!uploadedVideo ? (
                  <label className="flex items-center justify-center w-full border-2 border-dashed rounded-xl p-4 cursor-pointer hover:border-orange-500">
                    <Play size={20} />
                    <input type="file" hidden accept="video/*" onChange={handleVideoUpload} />
                  </label>
                ) : (
                  <div className="relative">
                    <video src={uploadedVideo.preview} className="w-full h-40 rounded-lg border" controls />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div> */}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting || values.rating === 0}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl disabled:bg-gray-300"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  );
});

export default ReviewModal;