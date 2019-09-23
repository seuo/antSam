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

class EditProduct extends Component{
  constructor(props){
		super(props)
		this.state = {
			product: {},
		}
	}

	

	componentDidMount(){
		var {id} = this.props;  

		api.getProduct(id).then(res => {
			this.setState({product: res.data})
		})

		console.log(id)
	}
	
	
	submitForm = (e) => {

		e.preventDefault();

		// var {} = this.props;

		var form = new FormData(this.form);

		// api.uploadPhoto(form).then(res => {
			// var file = res.data;
			// console.log(file);

			var data = {
				name: form.get('name-input'),
				description: form.get('description-input'),
				price: form.get('price-input'),
				// photo: file,
			}

			var {id} = this.props;
			api.updateProduct(id, data).then(navigate('/products'));

			console.log(data);
		// });
	}


  render(){

		var {name,description,price} = this.state.product;

    return(
	  
		
		<Form className="productForm" onSubmit={this.submitForm} ref={(el) => {this.form = el}}>
        <h3>Edit your product</h3>
        <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
				
                <Form.Control type="text" className="form-control" name="name-input" id="name-input" defaultValue={name}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPrice">

                <Form.Control type="currency" className="form-control" name="price-input" id="price-input" defaultValue={price}/>
            </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridDescription">
            <Form.Control type="text" className="form-control" name="description-input" id="description-input" defaultValue={description}/>
        </Form.Group>
        <Form.Group controlId="formGridFile">
            <Form.Control type="file" className="form-control" name="photo-input" id="photo-input" placeholder="Add photo"/>
        </Form.Group>

        <Form.Group controlId="formGridCondition">
        <ToggleButtonGroup type="radio" name="options" required="true">
            <ToggleButton value={1}>Average</ToggleButton>
            <ToggleButton value={2}>Good</ToggleButton>
            <ToggleButton value={3}>Very Good</ToggleButton>
            <ToggleButton value={4}>Unboxed</ToggleButton>
            
            </ToggleButtonGroup>
        </Form.Group>

        <Button variant="primary" type="submit">
            Update Product
        </Button>
    </Form>


    //   <div className="add-product">
    //     <h2 className="name text">New Product</h2>
    //     <form onSubmit={this.submitForm} ref={(el) => {this.form = el}}>

	//         <div className="form-group">
	//           <label htmlFor="name-input">Name</label>
	//           <input type="text" className="form-control" name="name-input" id="name-input" defaultValue={name}/>
	//         </div>

	//         <div className="form-group">
	//           <label htmlFor="name-input">Description</label>
	//           <input type="text" className="form-control" name="description-input" id="description-input" defaultValue={description}/>
	//         </div>

    //       <div className="form-group">
	//           <label htmlFor="name-input">Price</label>
	//           <input type="text" className="form-control" name="price-input" id="price-input" defaultValue={price}/>
	//         </div>

	//         <div className="form-group">
	//           <label htmlFor="name-input">Photo</label>
	//           <input type="file" className="form-control" name="photo-input" id="photo-input" placeholder="Add photo"/>
	//         </div>

	//         <button type="submit" className="btn btn-primary">Update</button>
	//     </form>
    //   </div>
    );
  }
}

export default EditProduct;
