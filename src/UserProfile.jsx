import React, {Component} from 'react';
import Products from './Products';
import UserProducts from './UserProducts';
import PurchaseProductListings from './PurchaseProductListings';
import {api, server} from './API';
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
    }
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



    render(){
    
        return(
            <Container>
                <Row>
                    <Col xs={3} md={1} className="user-photo">
                    <Image src={server+this.state.fileName} roundedCircle thumbnail={true} />
                    <Form className = "userProfile" onSubmit={this.handlePhotoSubmit} ref={(el) => {this.userForm = el}}>
                    <Form.Group controlId="formPhoto">
					<Form.Control type="file" className="form-control" name="Userphoto-input" id="Userphoto-input" placeholder="Change your photo"/>
				</Form.Group>
                <Button variant="primary" type="submit">
				upload
				</Button>
                    </Form>
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