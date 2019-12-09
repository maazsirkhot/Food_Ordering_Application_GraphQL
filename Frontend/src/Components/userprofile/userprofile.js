import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Link, Redirect} from 'react-router-dom';
import NavBarLogin from "../navbarlogin";
import './userprofile.css';
import axios from 'axios';
import {rooturl} from '../../config';

import { graphql, compose } from 'react-apollo';
import { getUserQuery } from '../../Queries/queries';
import { updateUserMutation } from '../../Mutations/mutations';

class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            contact : "",
            address : "",
            username : "",
            updateStatus : ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onProfile = this.onProfile.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.files[0]
        });
    }
 
    componentWillMount(){
        if(localStorage.getItem("cookieemail")){
            var username = localStorage.getItem("cookieemail");
            this.setState({
                username : username
            })            
        }
    }
    onSubmit(e){
        e.preventDefault();
            console.log("Updating Profile");

            const data = {
                name : this.state.name,
                contact : this.state.contact,
                address : this.state.address,
                username : this.state.username,
            }
            var check = this.props.updateUserMutation({
                variables : {
                    username : this.state.username,
                    name : this.state.name,
                    address : this.state.address,
                    contact : this.state.contact
                }
            })

            if(check){
                console.log(check);
                this.setState({
                    updateStatus : true
                })
            } else {
                this.setState({
                    updateStatus : false
                })
            }

    }

    onProfile(e){
        e.preventDefault();
        console.log("Updating Profile");

        var data = this.props.getUserQuery.user;
        console.log(data);

        this.setState({
            data : data
        })

        var username = localStorage.getItem("cookieemail");
        this.setState({
            username : username
        })
        console.log("Checking Email : " + username);
        const form = {
            username : username
        }

        var user;
        for(user of data){
            //console.log(user);
            if(user.username == form.username){
                console.log(user)
                this.setState({
                    name : user.name,
                    contact : user.contact,
                    address : user.address,
                    username : user.username
                })
                console.log(this.state);
                return;
            } else {
                this.setState({
                    getProfile : false
                })
            }
        }

    }

    render() {

        let redirectVar = null;
        if(this.state.restname != ""){
            localStorage.setItem('restname', this.state.restname);
            redirectVar = <Redirect to = {{pathname: '/ViewRestaurant', state: { restname: this.state.restname }}}/>
        }
        return (
            <div>
                <NavBarLogin />
                
                <div>
                <div class="container">
                <h2 >User Profile</h2>
                <button type="submit" class="btn btn-danger" onClick={this.onProfile}>Get Profile</button>
                <form class="form-horizontal">
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="name">Username:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.username} class="form-control" id="username"  placeholder="Name" name="name" disabled />
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="name">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.name} class="form-control" id="name"  placeholder="Name" name="name" required />
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="contact">Contact:</label>
                    <div class="col-sm-10">
                        <input type="number" onChange = {this.changeHandler} value={this.state.contact} class="form-control" id="contact" placeholder="Contact" name="contact" required/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="address">Address:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.address} class="form-control" id="address" placeholder="Address" name="address" required/>
                    </div>
                    </div>
                    
                    <div class="form-group">        
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-danger" onClick={this.onSubmit}>Submit</button>
                        <Link to="/UserDashboard"><button type="button" class="btn btn-danger">Cancel</button></Link>
                    </div>
                    </div>
                </form>
                </div>
                </div>
                
            </div>
        )
    }

}

export default compose(
    graphql(getUserQuery, { name : "getUserQuery"}),
    graphql(updateUserMutation, { name : "updateUserMutation"})    
)(UserProfile);
