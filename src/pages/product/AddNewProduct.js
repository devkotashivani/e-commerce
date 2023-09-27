import React from "react";
import AdminLayout from "../../component/layout/AdminLayout";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import NewProductForm from "../../component/product/NewProductForm";

function AddNewProduct() {
  return (
    <div>

      <AdminLayout>
        <h3>Add New Product</h3>
        <hr/>
        <Link to={"/product"}> 
        <Button variant="secondary" className="ms-2">Go Back</Button>
        </Link>
        {/* form to capture data */}
        <NewProductForm />
      </AdminLayout>
    </div>
  );
}

export default AddNewProduct;
