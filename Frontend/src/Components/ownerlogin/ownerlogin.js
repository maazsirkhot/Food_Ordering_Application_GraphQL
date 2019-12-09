import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "../navbar";
import './ownerlogin.css'; 
import axios from 'axios';
import {rooturl} from '../../config';

import { graphql, compose } from 'react-apollo';
import { getOwnerQuery } from '../../Queries/queries'

class OwnerLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            logincheck : ""
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
            
            var data = this.props.getOwnerQuery.owner;

            console.log(data);
            var user;
            for(user of data){
                console.log(user);
                if(user.email == form.username){
                    console.log(user.password, form.password)
                    if(user.password == form.password){
                        localStorage.setItem('cookie', "ownercookie");
                        localStorage.setItem('cookieemail', user.email);
                        localStorage.setItem('cookiename', user.name);
                        localStorage.setItem('cookierestname', user.restname);
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
        if (this.state.logincheck == true) {
            console.log("Checking Login")
            redirectVar = <Redirect to="/ViewMenu" />;
        } else {
            console.log("Check did not succeed")
        }

        return (
            <div>
                {redirectVar}
                <div class="container">
                <div class="row">
                <div class="col-lg-10 col-xl-9 mx-auto">
                <div class="card card-signin flex-row my-5">
                
                <div class="card-body">
                <h5 class="card-title text-center">Owner Login</h5>
                <form class="form-signin">
                    
                    
                    <div class="form-label-group">
                    <input type="email" name = "username" id="email" onChange = {this.changeHandler} class="form-control" placeholder="Email address" required/>
                    <label for="email">Email address</label>
                    </div>
                    <hr/>
                    <div class="form-label-group">
                    <input type="password" name = "password" id="password" onChange = {this.changeHandler} class="form-control" placeholder="Password" required/>
                    <label for="password">Password</label>
                    </div>              
                    
                    <button class="btn btn-lg btn-primary btn-block text-uppercase" onClick = {this.onSubmit} type="submit">Login</button>

                </form>
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
    graphql(getOwnerQuery, { name: "getOwnerQuery" })
)(OwnerLogin);
