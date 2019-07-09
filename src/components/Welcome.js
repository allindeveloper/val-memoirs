import React from 'react';
import ReactDOM from 'react-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import instance from './Instance'
class Welcome extends React.Component {

    constructor(props){
        super(props);
        this.state={
            key:{},
            images:[]
        }
    }

   

     componentDidMount(){
        const PHOTOS = "photos";
        const PAGENUMBER = 5
        instance.get("/config.json").then((res)=>{
            this.setState({key:res.data.APIKEY})
            try{
        const response =  instance.get(`${PHOTOS}`, { params: { client_id: this.state.key,query:"valentine",per_page: PAGENUMBER } });
        response.then((res)=>{
            this.setState({images:res.data})
            console.log("res-images", res)
        })
        this.setState({images:response})
        }catch(err){
            console.log("error when calling unsplash =>",err);
            
        }
        })
    }

    renderSlideShow = (images)=>{
        

        let nodes = [];
        for(let i=0; i <images.length; i++){

            let src = images[i].urls.raw
            let alt = images[i].alt_description;
            let classname = `legend${i}`;
            nodes.push(
                <div>
                    <img src={src} alt={alt}></img>
                    <p className={classname}>{classname}</p>
                </div>

            );


        }

        return nodes;
       
    }

    render(){
        console.log("this.state.images", this.state.images)
        const {images} = this.state;
        return(

            <div>
                <Carousel showThumbs={false}>
                {
                    this.renderSlideShow(images)
                }
                {/* <div>
                    <img src="/1.png" alt="1"></img>
                    <p className="legend1">Legend 1</p>
                </div>
                <div>
                    <img src="/2.png"  alt="2"/>
                    <p className="legend2">Legend 2</p>
                </div>
                <div>
                    <img src="/3.png"  alt="3"/>
                    <p className="legend">Legend 3</p>
                </div> */}
            </Carousel>
            </div>

        );
    }
}
export default Welcome;