import React from 'react';
import "./cardStyle.css";
import "./cards.css";
import instance from './BaseInstance';
import Avatar from 'react-avatar';
class Stories extends React.Component{

    constructor(props){
        super(props);
        this.renderStories = this.renderStories.bind(this);
        this.state={
            storiesList:[]
        }
    }


    componentDidMount(){
        const STORIES = "stories"
        console.log("base ins", instance)
        try{
            const response =  instance.get(`${STORIES}`, {});
            response.then((res)=>{
                console.log("res-stories", res)
                this.setState({storiesList:res.data})

            })
            }catch(err){
                console.log("error when calling api =>",err);
                
            }

    }

    renderStories (){ 
        let stories = this.state.storiesList;
        let nodes =[];
        stories.forEach(function(element, index) {
            let firstname = element.firstname;
            let lastname = element.lastname;
            let headline = element.headline;
            let fullname = `${firstname} ${lastname}`;
            let username = element.username;
            let story = element.story;
            nodes.push(
                <div className="container">
                <div className={`w3-panel w3-blue w3-card-4 w3-padding`} key={index}>
          <Avatar name={fullname} size="50" round={true} />
          <h2>{headline}</h2>
          <h4>{fullname}</h4>
          <h4>{username}</h4>
          <h5>{story}</h5>
          <div>Likes: <span className="w3-badge">5</span> <button  style={{float:"right"}}>Like</button></div>
          <br />
          
        </div>
        </div>
            );
            
        });
        return nodes;
    }

    render(){
        let {storiesList} = this.state
        console.log("this.storieslist", storiesList)
        return(
            <div>
            {
                this.renderStories()
            }  
            </div>
        )
    }
}

export default Stories