import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../store/utils/thunk";

import { showToast } from "../utils/tools";
const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: "", firstname: "", lastname: "", message: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("email is required")
        .email("the email isnt valid"),
      firstname: Yup.string().required("name is required"),
      lastname: Yup.string().required("name is required"),
      message: Yup.string()
        .required("message is required")
        .max(500, "you have exceeded the limit"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(sendMessage(values))
      .unwrap()
      .then(response=>{
        if(response){
        resetForm();
        showToast('SUCCESS','message recieved')}
      })
      .catch(err=>{
        showToast('ERROR','message failed ')

      })
    },
  });

  return (
    <>
      <h1>contact us</h1>

      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="email@example.com"
            {...formik.getFieldProps("email")}
          />

          {formik.errors.email && formik.touched.email ? (
            <Alert variant="danger">{formik.errors.email}</Alert>
          ) : null}
        </div>

        <div className="form-group mt-2">
          <label htmlFor="firstname">first name</label>
          <input
            type="text"
            className="form-control"
            name="firstname"
            placeholder="enter your first name"
            {...formik.getFieldProps("firstname")}
          />

          {formik.errors.firstname && formik.touched.firstname ? (
            <Alert variant="danger">{formik.errors.firstname}</Alert>
          ) : null}
        </div>

        <div className="form-group mt-2">
          <label htmlFor="lastname">last name</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            placeholder="enter your last name"
            {...formik.getFieldProps("lastname")}
          />

          {formik.errors.lastname && formik.touched.lastname ? (
            <Alert variant="danger">{formik.errors.lastname}</Alert>
          ) : null}
        </div>

        <div className="form-group mt-2">
          <label htmlFor="message">message</label>

          <textarea
            className="form-control"
            name="message"
            rows={3}
            {...formik.getFieldProps("message")}
          />
          {formik.errors.message && formik.touched.message ? (
            <Alert variant="danger">{formik.errors.message}</Alert>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          send message
        </button>
      </form>
    </>
  );
};

export default Contact;
