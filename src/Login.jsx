import React, {Component} from 'react';
import {navigate} from '@reach/router'
import {api} from './API';
import {
  Col,
  Accordion,
  Card,
  Button,
  Form,

} from 'react-bootstrap';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
        text:'',
       
    }
    
  }
  handleSubmitForm=(e)=>{
    e.preventDefault()
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var form = new FormData(this.form);
    var data = {
        name: form.get("name-input"),
        username: form.get("userName-input"),
        password: form.get("password-input"),
        email: form.get("email-input"),
        photo:'default.png',
        date: date,

    }
    api.addUser(data).then(res => {
        var user = res.data

        var data = {
            username: user.username,
            password: user.password,
        }

        api.authenticate(data).then(res =>{

            
            this.props.updateCurrentUser(res.data)
            localStorage.setItem('userID',user.id)
            this.props.closeModal()
        })
      })
  }
  
  handleSubmitLogin=(e)=>{
    e.preventDefault()
    var form = new FormData(this.loginForm);
    var data = {
        username: form.get("username-input"),
        password: form.get("password-input"),
    }

    this.loginForm.reset()
    api.authenticate(data).then(res =>{
        var user = res.data
        this.props.updateCurrentUser(user)
    
        return user
    })
    .then(user => {
        if(user){
            localStorage.setItem('userID',user.id)
            this.props.closeModal()
        }else{
            this.setState({text:'incorrect username or password, please try again'})
        }
    })
   
  }
  
 
  
  

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
              <Form className="loginForm" onSubmit={this.handleSubmitLogin} ref={(el) => {this.loginForm = el}} >

                  <Form.Group controlId="formBasicEmail">
                      <Form.Control type="text" className="form-control" name="username-input" id="username-input" placeholder="Username" />
                      <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                      <Form.Control type="password" className="form-control" name="password-input" id="password-input" placeholder="Password"/>
                  </Form.Group>
                  <p>{this.state.text}</p>
                  <Button variant="primary" type="submit">
                      Login
                  </Button>
                  <p></p>
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
              <Form className="loginForm" onSubmit={this.handleSubmitForm} ref={(el) => {this.form = el}} >

              <Form.Group  controlId="formGridName">

                <Form.Control type="text" placeholder="Name" name="name-input"/>
                </Form.Group>
                  <Form.Row>
                    
                      <Form.Group as={Col} controlId="formGridUsername">

                          <Form.Control type="text" placeholder="Username" name="userName-input"/>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">

                          <Form.Control type="password" placeholder="Password" name="password-input"/>
                      </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="formGridEmail">

                      <Form.Control type="email" placeholder="Email" name="email-input"/>
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
