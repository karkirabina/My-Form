import React, { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  FirstName: Yup.string().required("First Name is required"),
  LastName: Yup.string().required("Last Name is required"),
  Password: Yup.string().required("Password is required"),
  PasswordRepeat: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Password confirmation is required"),
  Country: Yup.string().required("Please select a country"),
});

const Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    FirstName: "",
    LastName: "",
    Password: "",
    PasswordRepeat: "",
    Country: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-8 space-y-4 w-80"
      >
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="FirstName" className="block text-gray-700 text-sm font-bold">
              First Name
            </label>
            <input
              type="text"
              id="FirstName"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              required
              className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="LastName" className="block text-gray-700 text-sm font-bold">
              Last Name
            </label>
            <input
              type="text"
              id="LastName"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              required
              className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <label htmlFor="email" className="block text-gray-700 text-sm font-bold">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="Password" className="block text-gray-700 text-sm font-bold">
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              required
              className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="PasswordRepeat" className="block text-gray-700 text-sm font-bold">
              Repeat Password
            </label>
            <input
              type="password"
              id="PasswordRepeat"
              name="PasswordRepeat"
              value={formData.PasswordRepeat}
              onChange={handleChange}
              required
              className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <label htmlFor="Country" className="block text-gray-700 text-sm font-bold">
          Country
        </label>
        <select
          id="Country"
          name="Country"
          value={formData.Country}
          onChange={handleChange}
          required
          className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a country</option>
          <option value="Nepal">Nepal</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Register Now
        </button>
      </form>
    </div>
  );
};

export default Form;
