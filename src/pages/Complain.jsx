import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserAuth } from '../context/AuthControler';
import { database } from '../config/firebase';
import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../config/firebase';
import { ref as ref2, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../component/Navbar';

const Complain = () => {
  const { user } = UserAuth();

  const options = [
    "faceBook",
    "Instagram",
    "Daraz",
    "Telemart",
    "indivisual",
    "service",
    "online-website",
    "offline-shop",
  ];

  const validationSchema = Yup.object({
    product: Yup.string().required("Required"),
    shopurl: Yup.string().url("Enter a valid URL").required("Required"),
    shopName: Yup.string().required("Required"),
    desc: Yup.string().required("Required"),
    fromBuy: Yup.string().required("Required"),
    imageUpload: Yup.mixed().required("Please upload an image"),
  });

  const initialValues = {
    product: "",
    shopurl: "",
    shopName: "",
    desc: "",
    fromBuy: "",
    imageUpload: null,
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let imgName = values.imageUpload.name + uuidv4();
      const imageRef = ref2(storage, `images/${imgName}`);

      await uploadBytes(imageRef, values.imageUpload);

      const URL = await getDownloadURL(ref2(storage, `images/${imgName}`));

      const dbRef = ref(database, `users/${user.uid}/posts/${uuidv4()}`);
      await set(dbRef, {
        shopurl: values.shopurl,
        product: values.product,
        shopName: values.shopName,
        fromBuy: values.fromBuy,
        desc: values.desc,
        imgUrl: URL,
      });

      setIsSubmitted(true);
      setSubmitting(false);

      // Show success toast
      toast.success('Your post has been submitted. Thank you.');

    } catch (err) {
      console.log(err);
      setSubmitting(false);

      // Show error toast
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div>

      <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Submit a Complaint</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="product" className="block text-gray-700 font-semibold mb-1">
                  Name of Product:
                </label>
                <Field
                  type="text"
                  name="product"
                  className="w-full border rounded-md p-2"
                  />
                <ErrorMessage
                  name="product"
                  component="div"
                  className="text-red-500 mt-1"
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="shopurl" className="block text-gray-700 font-semibold mb-1">
                  Shop URL:
                </label>
                <Field
                  type="text"
                  name="shopurl"
                  className="w-full border rounded-md p-2"
                  />
                <ErrorMessage
                  name="shopurl"
                  component="div"
                  className="text-red-500 mt-1"
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="shopName" className="block text-gray-700 font-semibold mb-1">
                  Shop   Name:
                </label>
                <Field
                  type="text"
                  name="shopName"
                  className="w-full border rounded-md p-2"
                  />
                <ErrorMessage
                  name="shopName"
                  component="div"
                  className="text-red-500 mt-1"
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="desc" className="block text-gray-700 font-semibold mb-1">
                  Description:
                </label>
                <Field
                  as="textarea"
                  name="desc"
                  className="w-full border rounded-md p-2"
                  />
                <ErrorMessage
                  name="desc"
                  component="div"
                  className="text-red-500 mt-1"
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="fromBuy" className="block text-gray-700 font-semibold mb-1">
                  From Where You Buy:
                </label>
                <Field
                  as="select"
                  name="fromBuy"
                  className="w-full border rounded-md p-2"
                  >
                  <option value="">Select an option</option>
                  {options.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="fromBuy"
                  component="div"
                  className="text-red-500 mt-1"
                  />
              </div>
              <div className="mb-4">
                <label htmlFor="imageUpload" className="block text-gray-700 font-semibold mb-1">
                  Upload Image:
                </label>
                <input
                  type="file"
                  name="imageUpload"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("imageUpload", event.currentTarget.files[0]);
                  }}
                  className="border p-2"
                  />
                <ErrorMessage
                  name="imageUpload"
                  component="div"
                  className="text-red-500 mt-1"
                  />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className={`bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-300 ${
                    isSubmitting || isSubmitted ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitted ? 'Submitted' : 'Submit'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
          </div>
  );
};

export default Complain;
