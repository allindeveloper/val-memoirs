import React from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import instance from "./Instance";
import baseInstance from "./BaseInstance";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
// import "react-carousel/lib/carousel.css";
import "./style.css";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      key: {},
      images: [],
      storiesList: [],
      showAddStoryForm: false,
      key: "",
      showError: false,
      ErrorValue: "",
      dataForAdd: {},
      disabled: false,
      saveText: "Save Story",
      data: {
        firstname: "",
        lastname: "",
        gender: "Male",
        headline: "",
        story: "",
        username: "",
        like: 0
      }
    };
  }

  componentWillMount(){
  
}

  componentDidMount() {
    console.log("props", this.props);
    const PHOTOS = "photos";
    const PAGENUMBER = 5;
    const STORIES = "stories";
    try {
      const response = baseInstance.get(`${STORIES}`, {});
      response.then(res => {
        console.log("res-stories", res);
        this.setState({ storiesList: res.data });
      });
    } catch (err) {
      console.log("error when calling api =>", err);
    }

    instance.get("/config.json").then(res => {
      this.setState({ key: res.data.APIKEY });
      try {
        const response = instance.get(`${PHOTOS}`, {
          params: {
            client_id: this.state.key,
            query: "valentine",
            per_page: PAGENUMBER,
            h: "300"
          }
        });
        response.then(res => {
          this.setState({ images: res.data });
          console.log("res-images", res);
        });
        this.setState({ images: response });
      } catch (err) {
        console.log("error when calling unsplash =>", err);
      }
    });
  }

  reset = () => {
    this.setState({
      data: {
        firstname: "",
        lastname: "",
        gender: "",
        headline: "",
        story: "",
        username: ""
      }
    });
  };

  usernameExists = (stories, username) => {
    return stories.some(function(el) {
      return el.username === username;
    });
  };
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

  submit = e => {
    e.preventDefault();

    this.setState({ disabled: true, saveText: "Loading..." });
    console.log("state", this.state);
    console.log("props", this.props);
    console.log("instance2", baseInstance);

    const STORIES = "stories";
    const PAGENUMBER = 5;
    const { data } = this.state;
    const { storiesList } = this.state;
    if (this.usernameExists(storiesList, data.username) === true) {
      console.log("found,,, stop here");
      this.setState({
        disabled: false,
        showError: true,
        ErrorValue: "You Cannot Add A Story Twice.",
        saveText: "Save Story"
      });
      this.reset();
      return;
    }

    try {
      const response = baseInstance.post(`${STORIES}`, { ...data });
      response.then(res => {
        console.log("res-images", res);
        if (res.status === 201) {
          console.log("res---after save", { res });
          this.props.history.push("/stories");
        }
      });
      this.setState({ images: response });
    } catch (err) {
      console.log("error when calling unsplash =>", err);
    }
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

 
  

  renderSlideShow = images => {
    let nodes = [];
    for (let i = 0; i < images.length; i++) {
      let src = images[i].urls.raw;
      let alt = images[i].alt_description;
      let classname = `legend${i}`;
      nodes.push(
        <div key={i}>
          <img src={src} alt={alt} />
         </div>
      );
    }

    return nodes;
  };

  render() {
    console.log("this.state.images", this.state.images);
    const { images } = this.state;
    return (
      <div>
        <nav
          class="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar"
          style={{ backgroundColor: "crimson" }}
        >
          <div className="container">
            <Link className="navbar-brand" to={"/"}>
              <strong>Val Memoirs</strong>
            </Link>

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

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              {/* <!-- Left --> */}
              <ul class="navbar-nav mr-auto">
                {/* <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home
                    <span class="sr-only">(current)</span>
                  </a>
                </li> */}
                {/* <li class="nav-item">
                  <a
                    class="nav-link"
                    href="https://mdbootstrap.com/docs/jquery/"
                    target="_blank"
                  >
                    About code.now
                  </a>
                </li> */}
              </ul>

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
                  <Link
                    to={"/stories"}
                    className="btn-blue nav-link border border-light rounded"
                  >
                    <i class="fab fa-github mr-2" />
                    View Stories
                  </Link>
                </li>
                &nbsp;
                <li class="nav-item">
                  <button
                    onClick={this.handleShow}
                    className="btn btn-blue nav-link border border-light rounded"
                    target="_blank"
                  >
                    <i class="fab fa-github mr-2" />
                    Add Story
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Carousel showThumbs={false}>{this.renderSlideShow(images)}</Carousel>
       
        <Modal show={this.state.showAddStoryForm} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Your Story</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="w3-container" style={{ paddingLeft: "0px" }}>
              <div className="w3-row">
                <div className="w3-col">
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
                    <select
                      className="form-control"
                      defaultValue="Gender"
                      placeholder="Select Gende"
                      name="gender"
                      id="gender"
                      value={this.state.data.gender}
                      onChange={this.handleInputChange}
                    >
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
            </div>
          </Modal.Body>
          <Modal.Footer>
            <p style={{ margin: "3%", color: "#ff1313" }}>
              {this.state.ErrorValue}
            </p>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              disabled={this.state.disabled}
              onClick={this.submit}
            >
              {this.state.saveText}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default Welcome;
