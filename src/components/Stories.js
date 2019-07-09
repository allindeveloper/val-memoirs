import React from "react";
import "./cardStyle.css";
import "./cards.css";
import instance from "./BaseInstance";
import Avatar from "react-avatar";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
class Stories extends React.Component {
  constructor(props) {
    super(props);
    this.renderStories = this.renderStories.bind(this);
    this.likeStory = this.likeStory.bind(this);
    this.state = {
      storiesList: [],
      showViewMoreStoryForm: false,
      dataForView: {}
    };
  }

  componentDidMount() {
    const STORIES = "stories";
    console.log("base ins", instance);
    try {
      const response = instance.get(`${STORIES}`, {});
      response.then(res => {
        console.log("res-stories", res);
        this.setState({ storiesList: res.data });
      });
    } catch (err) {
      console.log("error when calling api =>", err);
    }
  }

  likeStory(element) {
    console.log("username", element);
    console.log("");
    const STORIES = "stories";
    const payload = {
      id: 1,
      firstname: element.firstname,
      lastname: element.lastname,
      username: element.username,
      gender: element.gender,
      headline: element.headline,
      story: element.story,
      likes: element.likes + 1
    };
    try {
      const response = instance.patch(`${STORIES}/${element.id}`, {
        ...payload
      });
      response.then(res => {
        console.log("res-likes updated", res);
        try {
          const response = instance.get(`${STORIES}`, {});
          response.then(res => {
            console.log("res-stories", res);
            this.setState({ storiesList: res.data });
          });
        } catch (err) {
          console.log("error when calling api =>", err);
        }
      });
    } catch (err) {
      console.log("error when calling api =>", err);
    }
  }

  viewMoreStory(element) {
    this.setState({ dataForView: element }, () => {
      this.setState({ showViewMoreStoryForm: true });
    });

    console.log("dataforview", this.state.dataForView);
  }

  renderStories() {
    let stories = this.state.storiesList;
    let nodes = [];
    stories.forEach((element, index) => {
      let firstname = element.firstname;
      let lastname = element.lastname;
      let headline = element.headline;
      let fullname = `${firstname} ${lastname}`;
      let username = element.username;
      let story = element.story;
      let likes = element.likes;
      nodes.push(
        <div className="container" key={index}>
          <div className={`w3-panel w3-blue w3-card-4 w3-padding`}>
            <Avatar name={fullname} size="50" round={true} />
            <h2>{headline}</h2>
            <h4>{fullname}</h4>
            <h4>{username}</h4>
            <h5>{story}</h5>
            <div>
              Likes: <span className="w3-badge">{likes}</span>{" "}
              <img
                style={{ float: "right", width: "5%" }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png"
                alt="like"
                onClick={() => this.likeStory(element)}
              />{" "}
              <button
                className="w3-button w3-white w3-border w3-border-red w3-round-large"
                onClick={() => this.viewMoreStory(element)}
                style={{ float: "right", margin: "1%" }}
              >
                View More
              </button>
            </div>
            <br />
          </div>
        </div>
      );
    });
    return nodes;
  }

  renderViewMore = element => {
    this.setState({ showViewMoreStoryForm: true });
    console.log("username", element);

    let nodes = [];

    nodes.push(
      <Modal show={this.state.showViewMoreStoryForm} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12" />
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
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return nodes;
  };
  handleClose = () => {
    this.setState({ showViewMoreStoryForm: false });
  };
  render() {
    let { storiesList } = this.state;
    console.log("this.storieslist", storiesList);
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
         <center style={{marginTop:"5rem",fontSize:"3rem"}}>
                All Stories
        </center>       
        {this.renderStories()}

        <Modal
          show={this.state.showViewMoreStoryForm}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.dataForView.firstname} Story</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <label>
                  <h1>{this.state.dataForView.headline}</h1>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label>
                  <h3>
                    {this.state.dataForView.firstname}{" "}
                    {this.state.dataForView.lastname}
                  </h3>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label>
                  <h3>{this.state.dataForView.gender}</h3>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label>
                  <h3>{this.state.dataForView.story}</h3>
                </label>
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
              Okay
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Stories;
