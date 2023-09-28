import React from "react";
import CategoryTable from "../../components/category/CategoryTable";
import NewCategoryForm from "../../components/category/NewCategoryForm";
import AdminLayout from "../../components/layout/AdminLayout";

function Category() {
  return (
    <AdminLayout title="Category">
      {/* Add Category Form */}
      <NewCategoryForm />
      {/* Categories table list */}
      <CategoryTable />
    </AdminLayout>
  );
}

export default Category;
