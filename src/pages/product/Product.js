import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import ProductTable from "../../components/product/ProductTable";

function Product() {
  return (
    <AdminLayout title="Product">
      {/* Button to Add a new Product */}
      {/* Table to display products */}
      <div className="text-end me-2">
        <Link to="/product/new">
          <Button>Add new Product </Button>
        </Link>
      </div>
      <ProductTable />
    </AdminLayout>
  );
}

export default Product;
