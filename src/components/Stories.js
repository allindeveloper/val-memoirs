import React from 'react';
import "./cardStyle.css";
import "./cards.css";
import instance from './BaseInstance';
class Stories extends React.Component{

    constructor(props){
        super(props);
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

    renderStories = ()=>{
        console.log("stt here", this.state.storiesList)
        let nodes =[];
        for(let i =0; this.state.storiesList.length; i++){
            let firstname = "hey";
            let lastname = "hi"
            nodes.push(
                <div className={`w3-col   w3-blue card card-1 w3-padding`} key={i}>
          <h2 className="w3-large">{firstname}</h2>
          <div>
            <p className="w3-medium">{lastname}</p>
          </div>
          <div className="w3-light-grey w3-tiny w3-round-large">
            Text
          </div>
          <br />
          
        </div>
            );
            
        }
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