import React, {Component} from 'react'
// import {Link, navigate} from '@reach/router'
import {Form, Button, ListGroup} from 'react-bootstrap';
import {api} from './API';

class Review extends Component {

    handleTrashClick = (e) => {
        var {
            refreshData
        } = this.props

        var reviewId = e
            .target
            .dataset
            .reviewid
            api
            .deleteReview(reviewId)
            .then(res => refreshData())
    }

    render() {

        var {
            review,
            currentUser
        } = this.props
        console.log(review)
        return (

	<Form className="reviewForm">
			<h3>Product Review</h3>

			<Form.Group controlId="formGridFile">
					<Form.Label>Comment: {review.comment}
					</Form.Label>
			</Form.Group>
			<Form.Group controlId="formGridFile">
					<Form.Label>Rating: {review.rating} Star
					</Form.Label>
			</Form.Group>
			<Form.Group controlId="formGridFile">
                    <Form.Label>Review by: {currentUser}
                    {/* {
								currentUser
									? currentUser
									: null
							} */}
					</Form.Label>
			</Form.Group>

			<Button
                            className="AddButton"
                            data-reviewid={review.id}
                            onClick={this.handleTrashClick}>Delete</Button>
			</Form>

            // <div className="card review">
            //     <div className="card-body">
            //         <p className="card-text">{review.comment}</p>
            //         <p className="card-text">Rating: {review.rating}</p>
            //         <p className="card-text">Review by: {
            //                 review.user
            //                     ? review.user.name
            //                     : 'anonymous'
            //             }</p>
            //         <div className="buttons">
            //             <Button
            //                 className="AddButton"
            //                 data-reviewid={review.id}
            //                 onClick={this.handleTrashClick}>Delete</Button>
            //         </div>
            //         {/* <p>
		    //         {
		    //          	(currentUser && currentUser.id == review.user_id) ? (
		    //             	<i data-reviewid={review.id} onClick={this.handleTrashClick} className="fas fa-trash"></i>
		    //           	) : null
	    	// 		}
		    //         </p> */
            //         }
            //     </div>
            // </div>
        );
    }
}

export default Review;