import React, {Component} from 'react';
import PurchaseProductDetail from './PurchaseProductDetail';
import {Router, Link, navigate} from '@reach/router';
import {api} from './API';
import {
  Card,
  Button,
} from 'react-bootstrap';




class PurchaseProductListings extends Component{
  constructor(props){
    super(props)
    this.state={
      user:{},
    }
   
  }

  componentDidMount=()=>{
    
    var userID = localStorage.getItem('userID')
    
    api.getUser(userID).then(res =>{
      var user = res.data
      this.setState({user})
      
  })
  
}
  render(){
   
    var products = this.state.user.purchases;
    
    return products ? (
      
      <div className="listings">
        <h1>Purchase Products</h1>
          {/* <div className="listProduct"><Link to="/products/new"><Button className="AddButton" variant="primary" type="submit">List a product</Button></Link></div> */}
        {
          products.map((item) => {
            var props = {
              ...item,
              key: item.id,
            //   refreshData: this.getProducts,
            }
            return <PurchaseProductDetail {...props}/>
         
            
          })
        }
        
      </div>

    ):null;
  }


}

export default PurchaseProductListings;
