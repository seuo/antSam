import React, {Component} from 'react';
import Products from './Products';
import UserProducts from './UserProducts';
import PurchaseProductListings from './PurchaseProductListings';
import {api, server} from './API';
import Modal from 'react-awesome-modal';

import {
    Tabs,
    Tab,
    Container,
    Col,
    Image,
    Row,
    Form,
    Button,
  } from 'react-bootstrap';

class UserProfile extends Component {
    constructor(props){
    super(props)
    this.state ={
        fileName:this.props.user.photo,
        visible:false,
        }
    }
    openModal = () => {
        this.setState({visible: true});
    }
    
    closeModal = () => {
        this.setState({visible: false});
    }
handlePhotoSubmit=(e)=>{
    var {user} = this.props;
    
    e.preventDefault();

    var form = new FormData(this.userForm)

    api.uploadPhoto(form).then(res=>{
        api.updateUser(user.id,{photo:res.data}).then(res=>{
            this.props.updateCurrentUser(res.data)
        })
    })
}

handleEditSubmit =(e)=>{
    e.preventDefault()
    var id= this.props.user.id
    var form = new FormData(this.form);
    var data = {
        name: form.get("name-input"),
        password: form.get("password-input"),
        email: form.get("email-input"),
    }
    api.updateUser(id,data).then(res=>{
        this.props.updateCurrentUser(res.data)
    })
//NEED A REFRESHING THING!!!!!!
}


    render(){
        
        var products = this.props.user.products
        var currentListing = 0
        var soldListing = 0

        for(var i=0;i<products.length;i++){
            if(products[i].purchaser_id == null){
                currentListing++
            }
        }
        for(var i=0;i<products.length;i++){
            if(products[i].purchaser_id){
                soldListing++
            }
        }
        
        return(
            <Container>
                <Row>
                    <Col xs={3} md={1} className="user-photo">
                    <Image src={server+this.state.fileName} roundedCircle thumbnail={true} />
                    <Form className = "userProfile" onSubmit={this.handlePhotoSubmit} ref={(el) => {this.userForm = el}}>
                    <Form.Group controlId="formPhoto">
					<input type="file" className="photo-input" name="Userphoto-input" id="Userphoto-input" placeholder="Change your photo"/>
				</Form.Group>
                <Button variant="primary" type="submit">
				upload
				</Button>
                    </Form>
                    <input
                            className="loginButton"
                            type="button"
                            value="Edit"
                            onClick={() => this.openModal()}/>
                <Modal visible={this.state.visible}
                    width="95%"
                    height="70%"
                effect="fadeInUp"
                onClickAway={() => this.closeModal()}>
              <Form className="editForm" onSubmit={this.handleEditSubmit} ref={(el) => {this.form = el}} >
              <Form.Group  controlId="formGridName">
                <Form.Control type="text" defaultValue={this.props.user.name} name="name-input"/>
                </Form.Group>
                      <Form.Group controlId="formGridPassword">
                          <Form.Control type="password" placeholder="Current Password" name="password-input"/>
                      </Form.Group>
                      <Form.Group controlId="formGridPassword">
                          <Form.Control type="password" placeholder="New Password" name="password-input"/>
                      </Form.Group>
                      <Form.Group controlId="formGridPassword">
                          <Form.Control type="password" placeholder="Confirm Password" name="password-input"/>
                      </Form.Group>
                  
                  <Form.Group controlId="formGridEmail">
                      <Form.Control type="email" defaultValue={this.props.user.email} name="email-input"/>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                      Save Changes
                  </Button>
                  <p>Please email contact@threads.com to change User Name</p>
              </Form>
              </Modal>
                    </Col>
                    <Col>
                    <p>{this.props.user.username}({soldListing})</p>
                    <p>Memeber since {this.props.user.date}</p>
                    <p> reviews</p>
                    <p> {currentListing} listings</p>
                    </Col>
                </Row>
                
               
            <Tabs defaultActiveKey="Products" id="uncontrolled-tab-example">
                <Tab eventKey="Products" title="My Listings">
                   
                    <UserProducts user={this.props.user}/>
                </Tab>
                <Tab eventKey="Reviews" title="Reviews">
                    
                </Tab>
                <Tab eventKey="Purchases" title="Purchases" >
                    
                    <PurchaseProductListings user={this.props.user}/>
                </Tab>
            </Tabs>
            </Container>
        )
    }
}
export default UserProfile;