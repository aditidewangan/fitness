import React from "react";
import { Table, Popconfirm, Row, Col, Button, Modal, Form, Input} from "antd";
// import "antd/dist/antd.css";

let count=1;


class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : [],
            count:1,
            columns : [
                // {title:"#", key:'Id', render:()=>(<span>{this.state.count}</span>)},
                { title: 'Food ID',dataIndex:'foodId', key: 'foodId',},
                { title: 'Food', dataIndex: 'label', key: 'label', },
                {
                    title: 'Operation',
                    dataIndex: 'operation',
                    render: (text, record) =>
                        <div>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.foodId)}>
                            {/* <a>Delete</a> */}
                            <Button>Delete</Button>
                        </Popconfirm>
                        <Button onClick={()=>this.handleEdit(record)} style={{"margin-left":"5px"}}>Edit</Button></div>
                    },
            ],
            editRow: {},
            isModalVisible:false,
        };
        // this.handleDelete = 
    };
    handleDelete = (key) => {
        const dataSource = [...this.state.data];
        this.setState({
          data: dataSource.filter((item) => item.foodId !== key),
        });
    };
    handleEdit = (record)=>{
        this.setState({
            editRow : record,isModalVisible:true,
        });
    }
    handleModalOk = ()=>{
        this.setState({
            isModalVisible:false,editRow:{},
        });
    }
    handleSave = () =>{
        // console.log("save");
    }
    componentDidMount(){
        const admin = localStorage.getItem("isAdmin");
        if(admin==undefined){
            console.log("Not Authorised as Admin.....Login with admin acount")
            this.props.history.push("/login");
        }
        if(admin=="false"){
            this.props.history.push("/");
        }
        let url = window.location.href;
        let query = url.slice(38);
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
                item.foodId = element.food.foodId;
                item.label = element.food.label;
                item.image = element.food.image;
                item.nutrients= {
                    protein : element.food.nutrients.PROCNT,  
                    carbs : element.food.nutrients.CHOCDF,
                    cal : element.food.nutrients.ENERC_KCAL,
                    fat : element.food.nutrients.FAT,
                }
                foods.push(item);
            });
            this.setState({data :foods});
        }).catch(err =>{
            console.log(err);
        })
    }
    render(){
        const {columns,count,isModalVisible,editRow} = this.state;
        console.log(editRow);
        return(
            <div class=" container " style={{"margin-top": "50px"}}>
                <Modal 
                title={editRow.label} 
                visible={isModalVisible} 
                onOk={this.handleModalOk} 
                onCancel={this.handleModalOk}
                footer = {[
                    <Button key="delete" type="primary" onClick={() => {this.handleDelete(editRow.foodId);this.handleModalOk()}}>
                        Delete
                    </Button>,
                    <Button key="save" type="primary" onClick={() => {this.handleSave(editRow.foodId);this.handleModalOk()}}>
                        Save
                    </Button>,
                ]}>
                    <Row style={{"padding":"10px"}}>
                        <Col span={12}>
                            <img className="photo" src={editRow.image} alt={editRow.label}/>
                        </Col>
                        <Col span={12}>
                            <Row >
                                <Form class="photo">
                                    <Form.Item label="Energy : ">
                                        <Input name="energy" placeholder="in grams(g)"/>
                                    </Form.Item>
                                    <Form.Item label="Protein : ">
                                        <Input name="protein" placeholder="in grams(g)"/>
                                    </Form.Item>
                                    <Form.Item label="Carbs : ">
                                        <Input name="carbs" placeholder="in grams(g)"/>
                                    </Form.Item>
                                    <Form.Item label="Fat : ">
                                        <Input name="fat" placeholder="in grams(g)"/>
                                    </Form.Item>
                                </Form>
                            </Row>
                        </Col>
                    </Row>
                </Modal>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    // onRow={this.onRowClick}
                ></Table>
            </div>
        )
    }
}
export default Admin;