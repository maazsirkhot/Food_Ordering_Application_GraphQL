import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../navbar";
import './userlogin.css'; 
import axios from 'axios';
import {rooturl} from '../../config';

import { graphql, compose } from 'react-apollo';
import { getUserQuery } from '../../Queries/queries'


class UserLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            logincheck : "",
            errorMessage : ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        if (this.state.username == "" || this.state.password == "") {
            alert("Username and Password cannot be empty");
        }
        else {
            const form = {
                username : this.state.username,
                password : this.state.password
            }

            var data = this.props.getUserQuery.user;

            console.log(data);
            var user;
            for(user of data){
                console.log(user);
                if(user.username == form.username){
                    console.log(user.password, form.password)
                    if(user.password == form.password){
                        localStorage.setItem('cookie', "usercookie");
                        localStorage.setItem('cookieemail', user.username);
                        localStorage.setItem('cookiename', user.name);
                        this.setState({
                            logincheck : true
                        })
                        return;
                    } else {
                        this.setState({
                            logincheck : false
                        })
                        alert("Login Failed. Invalid Password");
                        return;
                    }
                } else {
                    this.setState({
                        logincheck : false
                    })
                }
            }
        }
    }

    render() {
        let redirectVar = null;
        if (this.state.logincheck == true || cookie.load("cookie")) {
            redirectVar = <Redirect to="/UserDashboard" />;
        }

        return (
            <div>
                {redirectVar}
                <div class="container">
                <div class="row">
                <div class="col-lg-10 col-xl-9 mx-auto">
                <div class="card card-signin flex-row my-5">
                
                <div class="card-body">
                <h5 class="card-title text-center">User Login</h5>
                <form class="form-signin">
                    
                    
                    <div class="form-label-group">
                    <input type="email" id="email" class="form-control"  onChange = {this.changeHandler} name="username" placeholder="Email address" required/>
                    <label for="email">Email address</label>
                    </div>
                    <hr/>
                    <div class="form-label-group">
                    <input type="password" id="password" class="form-control" onChange = {this.changeHandler} name="password" placeholder="Password" required/>
                    <label for="password">Password</label>
                    </div>              
                    
                    </form>
                
                <button class="btn btn-lg btn-danger text-uppercase" type="submit" onClick = {this.onSubmit}>Login</button>
                </div>
                </div> 
                </div>
                </div> 
                </div>
            </div>
        )
    }

}

export default compose(
    graphql(getUserQuery, { name: "getUserQuery" })
)(UserLogin);
