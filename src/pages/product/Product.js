import React from 'react'
import AdminLayout from '../../component/layout/AdminLayout'
import { Button } from 'react-bootstrap'
import ProductTable from '../../component/product/ProductTable'
import { Link } from 'react-router-dom'

function Product() {
  return (
    <div>
      <AdminLayout title="Product">
        {/* button to add a new product */}
        {/* define a table to display product */}
        <div className='text-end me-2'>
          <Link to="/product/new">
          <Button>Add New Product</Button>
          </Link>
       
        </div>
       <ProductTable />
      </AdminLayout>
    </div>
  )
}

export default Product
