import React, {Component} from 'react'
// import {Link, navigate} from '@reach/router'
import SoldProductDetail from './SoldProductDetail';

class SellerReviewProducts extends Component {
    
    
    render(){
     
        var reviews = this.props.user.receivedReviews;

       
        return reviews ? (
          
          <div className="listings">
            <h1>User Reviews </h1>
            {
             
              reviews.map((item) => {
                var Reviewprops = {
                  ...item,
                  key: item.id,
                //   refreshData: this.getProducts,
                }
                return <SoldProductDetail {...Reviewprops}/>
             
                
              })
            }
            
          </div>
    
        ):null;
      }
}

export default SellerReviewProducts;