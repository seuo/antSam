import React, {Component} from 'react';
// import {Link, navigate} from '@reach/router';
import Review from './Review';
import {Link} from '@reach/router';
import {Form,Button,ToggleButtonGroup,ToggleButton,Card,ListGroup} from 'react-bootstrap';
import {api, server} from './API';

import './App.css';

class RouteProductDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      product:null,
    }
  }
  routeGetProduct = (id) => {
    api.getProduct(id).then(res => this.setState({product:res.data}))
  }

  componentDidMount(){
    var {id} = this.props
    //console.log(id);
    this.routeGetProduct(id)
  }
  handleReviewFormSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData(this.reviewForm);

    var productId = this.props.id;

    var data = {
      comment:formData.get('comment-input'),
      rating:formData.get('rating-input'),
      prod_id: productId,
      // user_id: this.props.currentUser.id
    }
    api.addReview(data).then(res => {
      this.reviewForm.reset()
      this.routeGetProduct(productId)
    })
  }
  render(){
    var {product,currentUser} = this.state;





    return product ? (
      <>

      {/* <div className="product">
        <h2 className="name text">{product.name}</h2>
        <p className="description text">{product.description}</p>
        <p className="price text">{product.price}</p>
        <img className="photo" src={server+product.photo}/>
        <div className="buttons">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
        
        </div> */ }
        {
          product.reviews.map(review => {
            var reviewProps = {
              review:review,
              currentUser:currentUser,
              refreshData: () => this.routeGetProduct(product.id)
            }
            return <Review {...reviewProps} />
          })
        }
      {/* </div>  */}

<div className="Item">
    <Card
        style={{
            width: '18rem'
        }}>
       
        <Card.Body>
            <Card.Title>{product.name}
            </Card.Title>
            <Card.Img variant="top" src={server+product.photo}/>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>${product.price}</Card.Text>

                {/* <ListGroup.Item className="edit"><Link to={'/products/'+id+'/edit'}>Edit Listing</Link></ListGroup.Item>
                <ListGroup.Item onClick={this.deleteProduct} className="delete linkColor">Remove Listing</ListGroup.Item> */}

        </Card.Body>
    </Card>
  </div>

      

      <Form className="reviewForm addReview" onSubmit={this.handleReviewFormSubmit} ref={(el) => {this.reviewForm = el}}>
		<h3>Add a Review</h3>
		{/* <Form.Group controlId="formGridDescription">
			<Form.Control type="text" placeholder="Description"/>
		</Form.Group> */}
		<Form.Group controlId="formGridComment">
      <Form.Label>Comment:</Form.Label>
			<Form.Control type="text" className="form-control" name="comment-input" id="comment-input" placeholder="Enter Comment"/>
		</Form.Group>

		<Form.Group controlId="formGridRating">
    <Form.Label>Rating:</Form.Label>
		<ToggleButtonGroup type="radio" required="true" className="form-control" name="rating-input" id="rating-input">
			<ToggleButton value={1}>★</ToggleButton>
			<ToggleButton value={2}>★★</ToggleButton>
			<ToggleButton value={3}>★★★</ToggleButton>
			<ToggleButton value={4}>★★★★</ToggleButton>
			<ToggleButton value={5}>★★★★★</ToggleButton>
			</ToggleButtonGroup>
		</Form.Group>

		<Button variant="primary" type="submit">
			Add Review
		</Button>
	</Form>
   </>) : null;


    //    <div className="card review">
    //    <div className="card-body">
    //      <h3>Add a review</h3>
    //      <form onSubmit={this.handleReviewFormSubmit} ref={(el) => {this.reviewForm = el}}>
    //        <div className="form-group">
    //          <label htmlFor="comment-input">Comment</label>
    //          <input type="text" className="form-control" name="comment-input" id="comment-input" placeholder="Enter comment"/>
    //        </div>
    //        <div className="form-group">
    //          <label htmlFor="rating-input">Rating</label>
    //          <input type="number" className="form-control" name="rating-input" id="rating-input" placeholder="Enter rating"/>
    //        </div>

    //        <button type="submit" className="btn btn-primary">Add Review</button>
    //      </form>
    //    </div>
    //  </div>
    // </>) : null;
    
  }
}

export default RouteProductDetails;
