import React, {Component} from 'react';
// import {Link, navigate} from '@reach/router';
import Review from './Review';
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
    var {product} = this.state;

    return product ? (
      <>
      <div className="product">
        <h2 className="name text">{product.name}</h2>
        <p className="description text">{product.description}</p>
        <p className="price text">{product.price}</p>
        <img className="photo" src={server+product.photo}/>
        <div className="buttons">
          <button className="edit">Edit</button>
          <button className="delete">Delete</button>
          
        </div>
        {
          product.reviews.map(review => {
            var reviewProps = {
              review:review,
              // currentUser:currentUser,
              refreshData: () => this.routeGetProduct(product.id)
            }
            return <Review {...reviewProps} />
          })
        }
      </div>
      
       <div className="card review">
       <div className="card-body">
         <h3>Add a review</h3>
         <form onSubmit={this.handleReviewFormSubmit} ref={(el) => {this.reviewForm = el}}>
           <div className="form-group">
             <label htmlFor="comment-input">Comment</label>
             <input type="text" className="form-control" name="comment-input" id="comment-input" placeholder="Enter comment"/>
           </div>
           <div className="form-group">
             <label htmlFor="rating-input">Rating</label>
             <input type="number" className="form-control" name="rating-input" id="rating-input" placeholder="Enter rating"/>
           </div>

           <button type="submit" className="btn btn-primary">Add Review</button>
         </form>
       </div>
     </div>
    </>) : null;
    
  }
}

export default RouteProductDetails;
