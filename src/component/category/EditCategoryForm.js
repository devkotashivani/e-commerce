import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAction, deleteCategory } from '../../redux/category/CategoryAction';

function EditCategoryForm() {
    const [form, setForm] = useState({
        status: "inactive",
      });

      const {selectedCategory} = useSelector((state)=> state.category)
      
      useEffect(()=>{
        setForm(selectedCategory)
      },[selectedCategory])
      const dispatch = useDispatch();
      
      const handleOnChange = (e) => {
        console.log(e);
        let { name, value, checked } = e.target;
        console.log(e.target)
        if (name === "name") {
          setForm({
            ...form,
            [name]: value,
          });
        } else if (name === "status") {
          setForm({
            ...form,
            [name]: value,
          });
        }
      };
    
      const hanndleOnSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        dispatch(addCategoryAction(form));
        
        return;
        // todo
        // by default it will have name annd status
        // but i want to pass one more field called slug
       
      };

      const handleOnDelete = () =>{
        dispatch(deleteCategory(form.slug))
      }
      return (
        <div>
          <Form
            onSubmit={hanndleOnSubmit}
            className="border p-2 ms-1 me-1 shadow-lg"
          >
            <Row>
              <Col md="4">
                <Form.Check
                  label="Status"
                  name="status"
                  type="switch"
                  checked={form.status == "on"}
                  onChange={handleOnChange}
                />
              </Col>
              <Col md="4">
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    value={form.name}
                    required
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </Col>
              <Col md="3">
                <Button type="submit">Update</Button>
              </Col>
            </Row>
            <Row>
                <Col className='mt-2 d-grid'>
                    <Button variant='danger' onClick={handleOnDelete}>Delete</Button>
                </Col>
            </Row>
           
          </Form>
          
        </div>
      );
}

export default EditCategoryForm
