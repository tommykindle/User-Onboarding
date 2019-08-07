import React, { useState, useEffect } from 'react'
import { Formik, Field, setNestedObjectValues } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './OnboardingForm.scss';

const [users, setUsers] = useState([])
const OnboardingForm = (props) => (
  useEffect(() => {
    if (status) {
      setUsers([...users, status])
    }
  }, [status]));
<Formik
  initialValues={{ name: "", email: "", password: "", tos: false }}
  onSubmit={(values, { setSubmitting }, { status }) => {
    axios.post("https://reqres.in/api/users", values, {

    })
      .then(res => {
        console.log('Result', res)
        setStatus(res.data);

      })
      .catch(err => {

        console.log(err)
      })
    setTimeout(() => {
      console.log("Logging in", values);
      setSubmitting(false);
    }, 500);
  }}
  validationSchema={
    Yup.object().shape({
      name: Yup.string()
        .required('Required'),
      email: Yup.string()
        .email()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password  should be 8 chars minimum.")
        .matches(/(^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.{8,}))/, "Password must contain at least one uppercase character and one special character")
    })
  }
>
  {props => {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit
    } = props;
    return (
      <div className='formHolder'>
        <form onSubmit={handleSubmit}>
          <div className='Margin'>
            <h1>Create User</h1>
            <label htmlFor="email">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter the users name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name && touched.name && "error"}
            />
            {errors.name && touched.name && (
              <div className="input-feedback">{errors.name}</div>
            )}
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email && "error"}
            />
            {errors.email && touched.email && (
              <div className="input-feedback">{errors.email}</div>
            )}
            <label htmlFor="email">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password && "error"}
            />
            {errors.password && touched.password && (
              <div className="input-feedback">{errors.password}</div>
            )}
            <label className='checkbox'>
              tos
                <Field
                type='checkbox'
                name='tos'
                checked={values.tos}
              />
            </label>
            <button type="submit" disabled={isSubmitting}>
              Create User
          </button>
          </div>
        </form>
      </div>
    );
  }}
</Formik>
);

export default OnboardingForm;