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

		var {} = this.props;

		var form = new FormData(this.form);

		api.uploadPhoto(form).then(res => {
			var file = res.data;
			console.log(file);

			var data = {
				name: form.get('name-input'),
				description: form.get('description-input'),
				price: form.get('price-input'),
				photo: file,
			}

			api.addProduct(data).then(navigate('/products'));

			console.log(data);
		});
	}


  render(){

    return(

     
        <form className="productForm" onSubmit={this.submitForm} ref={(el) => {this.form = el}}>
		<h3>List your product</h3>
	        <div className="form-group">
	          <input type="text" className="form-control" name="name-input" id="name-input" placeholder="Enter name of your product"/>
	        </div>
	        <div className="form-group">
	          <input type="text" className="form-control" name="description-input" id="description-input" placeholder="Enter product description"/>
	        </div>
          <div className="form-group">
		  		<div className="priceInput"><span>$</span><input type="number" className="form-control" name="price-input" id="price-input" placeholder="Enter price"/></div>
	        </div>

	        <div className="form-group">
	          <label htmlFor="name-input">Photo</label>
	          <input type="file" className="form-control" name="photo-input" id="photo-input" placeholder="Add photo"/>
	        </div>

	        <button type="submit" className="btn btn-primary">Add Product</button>
	    </form>

    );
  }
}

export default AddProduct;
