import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import { storage } from "../../firebase-config";
import { addProductAction } from "../../redux/product/productAction";
import CustomInput from "../custom-input/CustomInput";

function NewProductForm() {
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => state.category);
  const [form, setForm] = useState({
    status: "inactive",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const handleOnChange = (e) => {
    let { name, value, checked } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnImageAttached = (e) => {
    let { files } = e.target;
    setUploadedFiles([...files]);
  };

  const handleFileUpload = async (imgDetail) => {
    const uniqueFileName = `${Date.now()}-${imgDetail.name}`;
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `products/img/${uniqueFileName}`);

      const uploadTask = uploadBytesResumable(storageRef, imgDetail);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };
  //   const handleFileUpload = async (imgDetail) => {
  //     return new Promise((resolve, reject) => {
  //       const uniqueFileName = `${Date.now()}-${imgDetail.name}`;
  //       // const uniqueFileName = imgDetail.name;
  //       // const storageRef = ref(storage, "images/rivers.jpg");
  //       const storageRef = ref(storage, `products/img/${uniqueFileName}`);

  //       const uploadTask = uploadBytesResumable(storageRef, imgDetail);
  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           // Observe state change events such as progress, pause, and resume
  //           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //           const progress =
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           console.log("Upload is " + progress + "% done");
  //         },
  //         (error) => {
  //           console.log(error);
  //           toast.error(error.message);
  //           reject(error);
  //         },
  //         () => {
  //           // Handle successful uploads on complete
  //           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //             console.log("File available at", downloadURL);
  //             resolve(downloadURL);
  //           });
  //         }
  //       );
  //     });
  //   };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const slug = slugify(form.title, {
      lower: true,
      trim: true,
    });

    // 1. Add a new field to capture files/images from computer
    // 2. Update it to Storage

    // we have file info in img state
    // let url;
    // try {
    //   url = await handleFileUpload(uploadedFiles[0]);
    // } catch (e) {
    //   console.log("Error", e);
    // }
    const urlPromises = uploadedFiles.map((file) => handleFileUpload(file));
    const urls = await Promise.all(urlPromises);

    // 3. Grab the URL
    // 5. Update teh productObj with URL then you save on DB

    const productObj = { ...form, slug, images: urls, thumbnail: urls[0] };
    console.log("I am saving value to db", productObj);
    dispatch(addProductAction(productObj));
  };
  const inputFields = [
    {
      label: "Product Name",
      name: "title",
      type: "text",
      placeholder: "Mobile Phone",
      required: true,
    },
    {
      label: "SKU",
      name: "sku",
      type: "text",
      placeholder: "MS_SJI_DSF",
      required: true,
    },

    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "22",
      required: true,
    },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      placeholder: "99",
      required: true,
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      placeholder: "99.99",
      required: true,
    },
    {
      label: "Sales Start From",
      name: "salesStartAt",
      type: "date",
    },
    {
      label: "Sales End At",
      name: "salesEndAt",
      type: "date",
    },
    {
      label: "Product Description",
      name: "description",
      type: "text",
      as: "textarea",
      placeholder: "Mobile Phone",
      required: true,
      rows: 5,
    },
  ];
  return (
    <div>
      <Form
        onSubmit={handleOnSubmit}
        className="border p-3 mt-3 shadow rounded"
      >
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            label="Status"
            name="status"
            onChange={handleOnChange}
          />
        </Form.Group>

        {/* Category Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Select Category</Form.Label>
          <Form.Select name="parentCategory" required onChange={handleOnChange}>
            <option>Open this select menu</option>
            {categoryList.map((cat, i) => {
              return (
                <option value={cat.slug} key={i}>
                  {cat.name}
                </option>
              );
            })}
            {/* <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
          </Form.Select>
        </Form.Group>

        {inputFields.map((item) => (
          <CustomInput {...item} onChange={handleOnChange} />
        ))}

        {/* Image Uploaded */}
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            name="images"
            multiple
            onChange={handleOnImageAttached}
          />
          <ProgressBar animated now={progress} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default NewProductForm;
