import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { addNewpost } from "../features/postSlice";
import { savePost } from "../services/postService";
import "./css/createpost.css";

function CreatePost() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleCreate = async (values) => {
    const response = await savePost(values);

    if (!response.success) {
      setFieldError("title", response.message);
    } else {
      values._id = response.post.insertedId;
      values.status = "Pending";
      dispatch(addNewpost(values));

      toast.success("Post created successfully");
      toast.success("After admin approval it will be visible to others");
    }
  };
  const createPostValidationschema = yup.object({
    title: yup
      .string()
      .min(10, "minimum length should be 10")
      .max(50)
      .required("Please enter title of post"),
    description: yup
      .string()
      .min(100)
      .max(1000)
      .required("please enter your description"),
    amount: yup
      .number()
      .required("Must be between 10,000 and 10,00,000")
      .positive()
      .integer()
      .min(10000)
      .max(1000000),
    category: yup.string().required("please atleast one category"),
  });

  const {
    formik,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldError,
    resetForm,
  } = useFormik({
    initialValues: { title: "", description: "", category: "", amount: 0 },
    validationSchema: createPostValidationschema,
    onSubmit: (values) => {
      values.username = user.email;
      values.name = user.name;
      handleCreate(values);
      resetForm();
    },
  });
  return (
    <div className="createpost">
      <h3>Create New Post</h3>

      <Form className="createForm" onSubmit={handleSubmit}>
        {touched.title && errors.title ? (
          <div className="error">{errors.title}</div>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Post Title</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Enter Title of Post"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Form.Group>
        {touched.description && errors.description ? (
          <div className="error">{errors.description}</div>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="formBasicdescription">
          <Form.Label>Description about post</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Description of post goes here..."
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        {touched.amount && errors.amount ? (
          <div className="error">{errors.amount}</div>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="formBasicdescription">
          <Form.Label>Target Amount</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>Rs.</InputGroup.Text>
            <Form.Control
              aria-label="Amount"
              type="number"
              placeholder="Enter your Amount"
              name="amount"
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </InputGroup>
        </Form.Group>
        {touched.category && errors.category ? (
          <div className="error">{errors.category}</div>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Select
            aria-label="Default select example"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select one category</option>
            <option value="Health">Health</option>
            <option value="StartUp">StartUp</option>
            <option value="Education">Education</option>
            <option value="Natural Disasters">Natural Disasters</option>
            <option value="Global Warming">Global Warming</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="createpostbtn">
          Create Post
        </Button>
      </Form>
    </div>
  );
}

export default CreatePost;
