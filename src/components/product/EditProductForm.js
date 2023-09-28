import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../../firebase-config";
import {
  addProductAction,
  deleteProductAction,
} from "../../redux/product/productAction";
import CustomInput from "../custom-input/CustomInput";

function EditProductForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const { categoryList } = useSelector((state) => state.category);
  const { productList } = useSelector((state) => state.product);
  const [form, setForm] = useState({
    status: "inactive",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [imgToRemove, setImgToRemove] = useState([]);
  useEffect(() => {
    const prodInfo = productList.find((p) => p.slug == slug);
    if (!prodInfo) {
      return navigate("/product");
    }
    setForm(prodInfo);
  }, [slug, productList]);

  const handleOnChange = (e) => {
    let { name, value, checked } = e.target;

    if (name === "thumbnail") {
      if (imgToRemove.includes(value)) {
        return alert("Thumbnail can't be deleted, change the thumbnail first");
      }
    }

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

  const selectOnImgDelete = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setImgToRemove([...imgToRemove, value]);
    } else {
      const filteredRemoveList = imgToRemove.filter((img) => img !== value);
      setImgToRemove(filteredRemoveList);
    }
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
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleOnDelete = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProductAction(slug));
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (imgToRemove.includes(form.thumbnail)) {
      return alert("You can not delete thumbnail");
    }
    const urlPromises = uploadedFiles.map((file) => handleFileUpload(file));
    const urls = await Promise.all(urlPromises);

    // We have list of images to remove
    const filteredList = form.images.filter(
      (img) => !imgToRemove.includes(img)
    );
    const finalImgList = [...filteredList, ...urls];
    const productObj = { ...form, images: finalImgList };
    dispatch(addProductAction(productObj));
  };
  const inputFields = [
    {
      label: "Product Name",
      name: "title",
      type: "text",
      placeholder: "Mobile Phone",
      required: true,
      value: form.title,
    },
    {
      label: "Slug",
      name: "slug",
      type: "text",
      required: true,
      value: form.slug,
      disabled: true,
    },
    {
      label: "SKU",
      name: "sku",
      type: "text",
      placeholder: "MS_SJI_DSF",
      required: true,
      value: form.sku,
      disabled: true,
    },

    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "22",
      required: true,
      value: form.price,
    },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      placeholder: "99",
      required: true,
      value: form.quantity,
    },
    {
      label: "Sales Price",
      name: "salesPrice",
      type: "number",
      placeholder: "99.99",
      required: true,
      value: form.salesPrice,
    },
    {
      label: "Sales Start From",
      name: "salesStartAt",
      type: "date",
      value: form.salesStartAt,
    },
    {
      label: "Sales End At",
      name: "salesEndAt",
      type: "date",
      value: form.salesEndAt,
    },
    {
      label: "Product Description",
      name: "description",
      type: "text",
      as: "textarea",
      placeholder: "Mobile Phone",
      required: true,
      rows: 5,
      value: form.description,
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
            checked={form.status == "active"}
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
                <option
                  value={cat.slug}
                  key={i}
                  selected={cat.slug === form.parentCategory}
                >
                  {cat.name}
                </option>
              );
            })}
            {/* <option value={"asd"} selected>
              TestMe
            </option> */}
            {/* <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option> */}
          </Form.Select>
        </Form.Group>

        {inputFields.map((item) => (
          <CustomInput {...item} onChange={handleOnChange} />
        ))}

        <div className="d-flex p-1 gap-2 border rounded">
          {form?.images?.length > 0 &&
            form?.images?.map((img) => (
              <div>
                <div>
                  <input
                    type="radio"
                    id="thumbnail"
                    name="thumbnail"
                    value={img}
                    checked={img === form.thumbnail}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="thumbnail">Thumbnail</label>
                </div>
                <img src={img} width={"150px"} />
                <div>
                  <Form.Check
                    label="Delete"
                    onChange={selectOnImgDelete}
                    value={img}
                  />
                </div>
              </div>
            ))}
        </div>
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
          Update
        </Button>
        <div className="mt-2">
          <Button variant="danger" onClick={handleOnDelete}>
            Delete
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditProductForm;
