import React, {Component} from 'react';
import UserProduct from './UserProduct';
import {Container,Button} from 'react-bootstrap';
import Modal from 'react-awesome-modal';
import {MdClose} from "react-icons/md";

class UserProducts extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    }
  }
  

  openModal = () => {
    this.setState({visible: true});
  }

  closeModal = () => {
    this.setState({visible: false});
  }

  render(){
    var {user} = this.props;
    
    return user.currentListings ? (
      <>
       <Container><h1>Products</h1>
        <Container className="listings">
        
        {
          user.currentListings.map((item) => {
            var props = {
              ...item,
              key: item.id,
              refreshData: this.props.refreshCurrentUser,
            }
            return <UserProduct {...props}/>
          })
        }
        </Container>

        <Container className="modalStyle">
      <Modal
          visible={this.state.visible}
          width="90%"
          height="50%"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}>
          <div className="deleteModal">
              <span>
                  <a href="javascript:void(0);" onClick={() => this.closeModal()}>
                  <MdClose/>
                  </a>
              </span>
              <h3>Are You Sure You Want To Delete This Product?</h3>
              <div class="buttons">
                <Button variant="primary" onClick={() => this.closeModal()}>Cancel</Button>
                <Button variant="primary" onClick={() => this.deleteProduct()}>Delete</Button>
              </div>
          </div>
      </Modal>
    </Container>
      </Container>
      </>
    ) : null
  }


}

export default UserProducts;
