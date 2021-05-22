import React from "react";
import { Table, Avatar, Row, Col, Button, Modal, Form, Input, DatePicker } from "antd";
// import FoodItem from "./FoodItem";


let count=1;
const columns = [
    { title: 'Image', key: 'image', width:'10%',
        render:(text,record)=>(
            <div style={{"height": "80px", "width": "80px",}}>
                {/* {console.log(text.image)} */}
                <img src={text.image} alt={text.label} style={{"max-width": "100%","max-height": "100%", "object-fit": "contain"}}/>
            </div>
        )
    },
    { title: 'Qty', key: 'quantity', render:()=>(<span>100</span>), width:'7%'},
    { title: 'Unit', key: 'unit', render:()=>(<span>g</span>), width:'7%'},
    { title: 'Food', dataIndex: 'label', key: 'label', },
    { title: 'Energy', key: 'enery', width:'10%', render:(text,record)=>(<div><b><div>{text.nutrients.cal}</div><div>kCal</div></b></div>)},
    { title: 'Nutrients', key: 'nutrients',width:'15%',
        render:(text,record)=>(
            <div>
                <div><span>Protien:</span><span style={{"float":"right"}}><b>{text.nutrients.protein} g</b></span></div>
                <div><span>Fat:</span><span style={{"float":"right"}}><b>{text.nutrients.fat} g</b></span></div>
                <div><span>Carbs:</span><span style={{"float":"right"}}><b>{text.nutrients.carbs} g</b></span></div>
            </div>
        )
    },

];

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : [],
        };
    };
    componentDidMount(){
        const admin = localStorage.getItem("isAdmin");
        if(admin==undefined){
            this.props.history.push("/login");
        }
        let url = window.location.href;
        let query = url.slice(33);
        console.log(query);
        if(query=="" || query==undefined)
            query='c';
        fetch('https://api.edamam.com/api/food-database/v2/parser?ingr='+query+'&app_id=79d03021&app_key=4336a1847c5590b841d9cf9a9a492629')
        .then(result=>result.json())
        .then(data => {
            let foods = [];
            data.hints.forEach(element => {
                // console.log(element);
                let item  = {};
                item.label = element.food.label;
                item.image = element.food.image;
                item.nutrients= {
                    protein : element.food.nutrients.PROCNT.toFixed(2),
                    carbs : element.food.nutrients.CHOCDF.toFixed(2),
                    cal : element.food.nutrients.ENERC_KCAL.toFixed(2),
                    fat : element.food.nutrients.FAT.toFixed(2),
                }
                foods.push(item);
            });
            this.setState({data :foods});
        }).catch(err =>{
            console.log(err);
        })
    }
    render(){
        return(
            <div class=" container " style={{"margin-top": "50px"}}>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                ></Table>
            </div>
        )
    }
}

export default Content;
