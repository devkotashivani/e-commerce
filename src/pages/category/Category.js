import React from 'react'
import AdminLayout from '../../component/layout/AdminLayout'
import NewCategoryForm from '../../component/category/NewCategoryForm'
import CategoryTable from '../../component/category/CategoryTable'

function Category() {
  return (
    <div>
    <AdminLayout title="Category">
      <NewCategoryForm />
      <CategoryTable />
    </AdminLayout>
    </div>
  )
}

export default Category
