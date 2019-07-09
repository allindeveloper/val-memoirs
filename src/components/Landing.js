import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import instance from './BaseInstance';
import "./style.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      showAddStoryForm: false, key:"",
      dataForAdd: {}, disabled:false, saveText:"Save Story",
      data: {
        firstname:"", lastname:"", gender:"Male", headline:"", story:"", username:""
      },
    };
  }

  componentDidMount() {
    // document.getElementById("root").remove();
    console.log("landingmounted", this.props);
  }


  handleOpenStoryFormType = data => {
    this.setState({ showAddStoryForm: true, dataForAdd: data });
    const StoryFormAddModal = window.$("#addStoryForm").modal({
      keyboard: false,
      show: true
    });
    StoryFormAddModal.on("hide.bs.modal", e => {
      this.setState({ showAddStoryForm: false });
    });
    console.log("clieck");
  };

  handleInputChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }
  handleClose = () => {
    this.setState({ showAddStoryForm: false });
  };

  handleShow = () => {
    this.setState({ showAddStoryForm: true });
  };

   submit = e =>{
    e.preventDefault();

    this.setState({disabled:true, saveText:"Loading..."});
    console.log("state", this.state)
    console.log("props", this.props)
    console.log("instance", instance)
    
        const STORIES = "stories";
        const PAGENUMBER = 5
        const {data} = this.state
        
       
            try{
        const response =  instance.post(`${STORIES}`, { ...data  });
        response.then((res)=>{
            console.log("res-images", res)
            if(res.status == 201){
              this.props.push("/stories")
            }
        })
        this.setState({images:response})
        }catch(err){
            console.log("error when calling unsplash =>",err);
            
        }
       
  }

  render() {
    return (
      <React.Fragment>
        {/* <!-- Navbar --> */}
        <nav
          class="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar"
          style={{ backgroundColor: "crimson" }}
        >
          <div class="container">
            {/* <!-- Brand --> */}
            <a
              class="navbar-brand"
              href="https://mdbootstrap.com/docs/jquery/"
              target="_blank"
            >
              <strong>code.now</strong>
            </a>

            {/* <!-- Collapse --> */}
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>

            {/* <!-- Links --> */}
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              {/* <!-- Left --> */}
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="https://mdbootstrap.com/docs/jquery/"
                    target="_blank"
                  >
                    About code.now
                  </a>
                </li>
                {/* <li class="nav-item">
            <a class="nav-link" href="https://mdbootstrap.com/docs/jquery/getting-started/download/" target="_blank">Free download</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://mdbootstrap.com/education/bootstrap/" target="_blank">Free tutorials</a>
          </li> */}
              </ul>

              {/* <!-- Right --> */}
              <ul class="navbar-nav nav-flex-icons">
                <li class="nav-item">
                  <Link to={"/"} class="nav-link" target="_blank">
                    <i class="fab fa-facebook-f" />
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to={"/"} class="nav-link" target="_blank">
                    <i class="fab fa-twitter" />
                  </Link>
                </li>
                <li class="nav-item">
                  <button
                    to={"/"}
                    onClick={this.handleShow}
                    class="nav-link border border-light rounded"
                    target="_blank"
                  >
                    <i class="fab fa-github mr-2" />Add Story
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* <!-- Navbar --> */}

        {/* <!-- Full Page Intro --> */}
        {/* <div class="view full-page-intro" style={{
    backgroundImage: `url('https://mdbootstrap.com/img/Photos/Others/images/78.jpg')`, 
    backgroundRepeat: "no-repeat", 
    backgroundSize: "cover"}}> */}
        <div
          class="view full-page-intro"
          style={{
            backgroundImage: `url('/assets/78.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          {/* <!-- Mask & flexbox options--> */}
          <div class="mask rgba-black-light d-flex justify-content-center align-items-center">
            {/* <!-- Content --> */}
            <div class="container">
              {/* <!--Grid row--> */}
              <div class="row wow fadeIn">
                {/* <!--Grid column--> */}
                <div class="col-md-6 mb-4 white-text text-center text-md-left">
                  <h1 class="display-4 font-weight-bold">
                    Every &lt;/Code> Matters
                  </h1>

                  <hr class="hr-light" />

                  <p>
                    <strong>Real Time Coding</strong>
                  </p>

                  <p class="mb-4 d-none d-md-block">
                    <strong>
                      The Ultimate Coding Platform for Company, Instructors and
                      Individuals
                    </strong>
                  </p>

                  <Link to={"/register"} class="btn btn-indigo btn-lg">
                    Register
                    <i class="fas fa-sign-in ml-2" />
                  </Link>
                </div>
                {/* <!--Grid column--> */}

                {/* <!--Grid column--> */}
                <div class="col-md-6 col-xl-5 mb-4">
                  {/* <!--Card--> */}
                  <div class="card">
                    {/* <!--Card content--> */}
                    <div class="card-body">
                      {/* <!-- Form --> */}
                      <form name="">
                        {/* <!-- Heading --> */}
                        <h3 class="dark-grey-text text-center">
                          <strong>Write to us:</strong>
                        </h3>
                        <hr />

                        <div class="md-form">
                          <i class="fas fa-user prefix grey-text" />
                          <input type="text" id="form3" class="form-control" />
                          <label htmlFor="form3">Your name</label>
                        </div>
                        <div class="md-form">
                          <i class="fas fa-envelope prefix grey-text" />
                          <input type="text" id="form2" class="form-control" />
                          <label htmlFor="form2">Your email</label>
                        </div>

                        <div class="md-form">
                          <i class="fas fa-pencil-alt prefix grey-text" />
                          <textarea
                            type="text"
                            id="form8"
                            class="md-textarea"
                          />
                          <label htmlFor="form8">Your message</label>
                        </div>

                        <div class="text-center">
                          <button class="btn btn-indigo">Send</button>
                          <hr />
                          <fieldset class="form-check">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id="checkbox1"
                            />
                            <label
                              htmlFor="checkbox1"
                              class="form-check-label dark-grey-text"
                            >
                              Subscribe me to the newsletter
                            </label>
                          </fieldset>
                        </div>
                      </form>
                      {/* <!-- Form --> */}
                    </div>
                  </div>
                  {/* <!--/.Card--> */}
                </div>
                {/* <!--Grid column--> */}
              </div>
              {/* <!--Grid row--> */}
            </div>
            {/* <!-- Content --> */}
          </div>
          {/* <!-- Mask & flexbox options--> */}
          <Modal show={this.state.showAddStoryForm} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Your Story</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="firstname"
                      name="firstname"
                      aria-describedby="emailHelp"
                      value={this.state.data.firstname}
                        onChange={this.handleInputChange}
                      placeholder="Enter Firstname..."
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="lastname"
                      name="lastname"
                      aria-describedby="emailHelp"
                      value={this.state.data.lastname}
                        onChange={this.handleInputChange}
                      placeholder="Enter Lastname..."
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="username"
                      name="username"
                      aria-describedby="emailHelp"
                      value={this.state.data.username}
                        onChange={this.handleInputChange}
                      placeholder="Enter Username..."
                    />
                  </div>
                  <div className="form-group">
                      <select className="form-control"defaultValue="Gender" placeholder="Select Gende" name="gender" id="gender"value={this.state.data.gender}onChange={this.handleInputChange} >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="headline"
                      name="headline"
                      aria-describedby="emailHelp"
                      value={this.state.data.headline}
                      onChange={this.handleInputChange}
                      placeholder="Enter Headline..."
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="story"
                      name="story"
                      aria-describedby="emailHelp"
                      value={this.state.data.story}
                      onChange={this.handleInputChange}
                      placeholder="Enter Story..."
                    />
                  </div>



                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" disabled={this.state.disabled} onClick={this.submit}>
                {this.state.saveText}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {/* <!-- Full Page Intro --> */}

        {/* <!--Main layout--> */}

        {/* <!--Main layout--> */}

        {/* <!--Footer--> */}
        <footer class="page-footer text-center font-small mt-4 wow fadeIn">
          <hr class="my-4" />

          {/* <!-- Social icons --> */}

          {/* <!-- Social icons --> */}

          {/* <!--Copyright--> */}
          <div class="footer-copyright py-3">
            © 2019 Copyright:
            <a
              href="https://mdbootstrap.com/education/bootstrap/"
              target="_blank"
            >
              {" "}
              code.now{" "}
            </a>
          </div>
          {/* <!--/.Copyright--> */}
        </footer>
      </React.Fragment>
    );
  }
}

export default Landing;
