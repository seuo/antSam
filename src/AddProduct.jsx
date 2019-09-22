import React, {Component} from 'react';
import {Router, Link, navigate} from '@reach/router';
import {api} from './API';


import {
	Col,
	Button,
	Form,
	ToggleButton,
	ToggleButtonGroup,
  } from 'react-bootstrap';

import './App.css';

class AddProduct extends Component{
  constructor(props){
		super(props)
	}

	
	
	submitForm = (e) => {
		e.preventDefault();

		var form = new FormData(this.form);

		api.uploadPhotos(form).then(res => {
			var files = res.data
			console.log(files);

			var data = {
				name: form.get('name-input'),
				description: form.get('description-input'),
				price: form.get('price-input'),
				cat_name: form.get('cat-input'),
				seller_id: this.props.user.id,
				photos: files,
			}
			api.addProduct(data).then(navigate('/products'));
			console.log(data);
		})
	}


  render(){

    return(

     


			<Form className="productForm" onSubmit={this.submitForm} ref={(el) => {this.form = el}}>
				  <Form.Group className="catSelect" controlId="exampleForm.ControlSelect1">
					<Form.Label>Select Category:</Form.Label>
					<Form.Control id="cat-input" name="cat-input" as="select">
					<option value="suits">Suits</option>
					<option value="footwear">Footwear</option>
					<option value="clothing">Clothing</option>
					<option value="accessories">Accessories</option>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="formBnaasicName">
					<Form.Control type="text" className="form-control" name="name-input" id="name-input" placeholder="Name of your product"/>
				</Form.Group>
				<Form.Group controlId="formBasicDesc">
					<Form.Control type="text" className="form-control" name="description-input" id="description-input" placeholder="Product description"/>
				</Form.Group>
				<Form.Group controlId="formBasicPrice">
				<div className="priceInput"><span>$</span><Form.Control type="number" className="form-control" name="price-input" id="price-input" placeholder="Enter price"/></div>
				</Form.Group>

				<Form.Group controlId="formBasicPhoto">
					<Form.Control type="file" className="form-control" name="photo-input" id="photo-input" placeholder="Add photo" multiple/>
				</Form.Group>

				<Button variant="primary" type="submit">
				Add Product
				</Button>
			</Form>

    );
  }
}

export default AddProduct;
