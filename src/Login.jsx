import React, {Component} from 'react';
import {navigate} from '@reach/router'
import {authenticate} from './API';
import {
  Col,
  Accordion,
  Card,
  Button,
  Form,
  Nav,
  Navbar,
  Image,
  FormControl,
  InputGroup
} from 'react-bootstrap';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      message:''
    }
  }
  
  // handleFormSubmit = (e) => {
  //   e.preventDefault();

  //   var formData = new FormData(this.form);
  //   var data = {
  //     username:formData.get('username-input'),
  //     password:formData.get('password-input'),
  //   }

  //   var {setCurrentUser} = this.props

  //   authenticate(data)
  //   .then(res => {
  //     var user = res.data
  //     setCurrentUser(user)
  //     return user
  //   })
  //   .then(user => {
  //     if(user){
  //       localStorage.setItem('userId',user.id)
  //       navigate('/home')
  //     }else{
  //       this.setState({message:'Try again'})
  //     }
  //   })

  // }

  render(){
    return (
      <Accordion defaultActiveKey="0">
      <Card>
          <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Login
              </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
              <Form className="loginForm" onSubmit={this.handleFormSubmit} ref={(el) => {this.form = el}}>

                  <Form.Group controlId="formBasicEmail">
                      <Form.Control type="text" className="form-control" name="username-input" id="username-input" placeholder="Username"/>
                      <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Control type="password" className="form-control" name="password-input" id="password-input" placeholder="Password"/>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                      Login
                  </Button>
                  <p>{this.state.message}</p>
              </Form>
          </Accordion.Collapse>
      </Card>
      <Card>
          <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Register
              </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
              <Form className="loginForm">

                  <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">

                          <Form.Control type="email" placeholder="Enter email"/>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">

                          <Form.Control type="password" placeholder="Password"/>
                      </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="formGridAddress1">

                      <Form.Control placeholder="Street Address"/>
                  </Form.Group>

                  <Form.Group controlId="formGridAddress2">

                      <Form.Control placeholder="Apartment, studio, or floor"/>
                  </Form.Group>

                  <Form.Group controlId="formGridCity">

                      <Form.Control placeholder="City"/>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                      Register
                  </Button>
              </Form>
          </Accordion.Collapse>
      </Card>
  </Accordion>
    );
  }
}

export default Login;
