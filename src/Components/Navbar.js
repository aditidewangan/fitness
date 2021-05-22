import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LogoutOutlined  } from '@ant-design/icons';
import { useParams } from "react-router";


import "antd/dist/antd.css";
import "../index.css";


class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            query: "",
            logout:false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        });
    };
    handleLogout = (e)=>{
        localStorage.removeItem("isAdmin");
        window.location.reload();
    }
    componentDidMount(){
        let url = window.location.href;
        if(url.length>23 && url.slice(22)[0]=='a'){
            let query = url.slice(38);    
            this.setState({query:query});
        }else{
            let query = url.slice(33);
            // console.log(query);
            this.setState({query:query});
        }
        
    }
    render(){
        return(
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                {/* <a class="navbar-brand" href="sdvs">Evolv Fit</a> */}
                <Link to="/" class="navbar-brand"><span>Evolv Fit</span></Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
            
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                    {/* <a class="nav-link" href="index.html">Home</a> */}
                    <Link to="/" class="nav-link"><span>Home</span></Link>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0" >
                    <input type="search" class="form-control mr-sm-2" id="query" placeholder="Search" onkeyup="searchfun" aria-label="Search" name="food_name" value={this.state.query} onChange={this.handleChange}/>
                    <button class="btn btn-outline-dark my-2 my-sm-0" type="submit" >Search</button>
                </form>
                <button class="btn btn-outline-dark my-2 my-sm-0" style={{"marginLeft":"5px"}} onClick={this.handleLogout}><LogoutOutlined /></button>
                </div>
                </nav>
                {this.props.children}
            </div>  
        )
    }
}
export default Navbar;