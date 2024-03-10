import React from "react";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { generateId } from "../../utils/generateId";
import styles from "./ToDoInput.module.css";
import { GrAddCircle } from "react-icons/gr";
import * as Yup from "yup";

function ToDoInput({ onData }) {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    desc: Yup.string().required("Description is required"),
  });

  const { resetForm, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { title: "", desc: "" },
      validationSchema,
      onSubmit: (data) => {
        console.log("data", data);
        data.id = generateId();
        onData(data);
        resetForm();
      },
    });

  return (
    <div
      className={`${styles.background_color} ${styles.input_div} p-5 w-50 mx-auto shadow-lg`}
    >
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Write the title of your todo here"
          onChange={handleChange}
          name="title"
          value={values.title}
          isInvalid={touched.title && !!errors.title}
          style={{ padding: "8px 60px" }}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Write the description of your todo here"
          onChange={handleChange}
          name="desc"
          value={values.desc}
          isInvalid={touched.desc && !!errors.desc}
          style={{ padding: "8px 60px" }}
        />
        <Form.Control.Feedback type="invalid">
          {errors.desc}
        </Form.Control.Feedback>
      </Form.Group>

      <div className={`${styles.add_icon_div}`}>
        <GrAddCircle className={`${styles.add_icon}`} onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default ToDoInput;
