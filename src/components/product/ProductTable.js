import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsAction } from "../../redux/product/productAction";

function ProductTable() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const [displayList, setDisplayList] = useState([]);
  // const handleOnEdit = (categoryDetail) => {
  //   dispatch(setSelectedCategory(categoryDetail));
  //   dispatch(setModalShow(true));
  // };

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  useEffect(() => {
    setDisplayList(productList);
  }, [productList, dispatch]);

  const handleOnSearch = (e) => {
    const { value } = e.target;
    const filteredList = productList.filter(({ title }) =>
      title.toLowerCase().includes(value.toLowerCase())
    );
    setDisplayList(filteredList);
  };
  return (
    <div className="my-2">
      <div className="w-25 mb-3">
        <Form.Control placeholder="Search by title" onChange={handleOnSearch} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Status</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayList.map((product, i) => {
            return (
              <tr key={product.slug}>
                <td>{i + 1}</td>
                <td>
                  <img src={product.thumbnail} width="150px" />
                </td>
                <td>
                  <span className={product.status}>{product.status}</span>
                </td>
                <td>{product.title}</td>
                <td>{product.slug}</td>
                <td>{`$${product.price}`}</td>
                <td>{product.quantity}</td>
                <td>
                  <Link to={`/product/edit/${product.slug}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductTable;
