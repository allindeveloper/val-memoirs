import React from 'react';
import { Modal, Button } from "react-bootstrap";

class ViewStory extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            // showViewMoreStoryForm:false
        }
    }
    // componentDidMount(){
    //     this.setState({showViewMoreStoryForm:this.props.showViewMoreStoryForm})
    // }

    handleClose = (showViewMoreStoryForm) => {
        this.props.handler(showViewMoreStoryForm)
      };

    render(){
        console.log("view sotry props", this.props)
        return(
            <div>
                    <Modal show={this.props.showViewMoreStoryForm} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Your Story</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                 
                 <label></label>


                </div>
              </div>
            </Modal.Body>
            <Modal.Footer><p style={{margin:"3%", color:"#ff1313"}}>{this.state.ErrorValue}</p>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" disabled={this.state.disabled} onClick={this.submit}>
                Okay
              </Button>
            </Modal.Footer>
          </Modal>
            </div>
        );
    }
}

export default ViewStory