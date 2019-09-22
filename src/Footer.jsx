import React, {Component} from 'react';
import { FiTriangle } from "react-icons/fi";

import {
    Nav,
    Navbar,
    Col,
    Container
  } from 'react-bootstrap';
  import {navigate} from '@reach/router';
  import classnames from "classnames";

class Footer extends Component{
    constructor(props) {
        super(props);
        this.state ={
            prevScrollpos: window.pageYOffset,
            visible: true
        }
    }
    


    componentDidMount(){
      window.addEventListener("scroll", this.handleScroll);

    }


 
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
      }


    handleScroll = () => {
        const { prevScrollpos } = this.state;
      
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;
      
        this.setState({
          prevScrollpos: currentScrollPos,
          visible
        });
    };

    goHome = (e) => {
      e.preventDefault();
      navigate("/")
  } 

    


render () {
    var user = this.props;
    console.log(user)
  
    // var user = this.state.currentUser;
    return (
        <Navbar sticky="bottom" className={classnames("footer", {
          "footer--hidden": !this.state.visible
        })}>
        <Container>

          <Col className="lCol">© 2019 Threads</Col><Col className="linkColor" onClick={this.goHome}><FiTriangle/></Col><Col className="rCol"></Col>

        </Container>
        </Navbar>

    );
}

}
export default Footer;



