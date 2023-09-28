import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import EditProductForm from "../../components/product/EditProductForm";

function EditProduct() {
  return (
    <AdminLayout title="Edit Product">
      <Link to={"/product"}>
        <Button variant="secondary ms-2">&lt; Go Back</Button>
      </Link>
      {/* Form to capture the data */}
      <EditProductForm />
    </AdminLayout>
  );
}

export default EditProduct;
