import React from "react";
import { Table, Popconfirm, Row, Col, Button, Modal, Form, Input,Radio} from "antd";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password:"",
            user: "user",
        }
    };
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        });
      };
    handleSubmit =(e)=>{
        e.preventDefault();
        const { username, password,user } = this.state;
        if(user==="user"){
            localStorage.setItem("isAdmin", false);
            this.props.history.push("/");
        }
        else{
            localStorage.setItem("isAdmin", true);
            this.props.history.push("/admin");
        }   
    };
    componentDidMount(){
        const admin = localStorage.getItem("isAdmin");
        if(admin=="true")this.props.history.push("/admin");
        if(admin=="false")this.props.history.push("/");
    }
    render(){
        const layout = {
            labelCol: { span: 8 },
            // wrapperCol: { span: 16 },
        };
        return(
            <div class="container">
                <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh', }}>
                    <Form onSubmit={this.handleSubmit}
                    style={{"border":"1px solid #d9d9d9", "padding":"20px","borderRadius":"7px"}} 
                    {...layout}>
                        <Form.Item label="Username">
                            <Input  id="username"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange} />
                        </Form.Item>
                        <Form.Item label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password id="password"
                            placeholder="*****"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange} />
                        </Form.Item>
                        <Form.Item label="User Type"  rules={[{ required: true, message: 'Please pick an item!' }]}>
                        <Radio.Group id="user" name="user" value={this.state.user} >
                            <Radio.Button id="user"value="user"onChange={this.handleChange} checked={this.state.user === "user"}>User</Radio.Button>
                            <Radio.Button id="user" value="admin"onChange={this.handleChange} checked={this.state.user === "admin"}>Admin</Radio.Button>
                        </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" block onClick={this.handleSubmit}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </div>
        )
    };
};

export default Login;