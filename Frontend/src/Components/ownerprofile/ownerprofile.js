import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Link, Redirect} from 'react-router-dom';
import NavBarLogin from "../navbarlogin";
import "./ownerprofile.css";

import { graphql, compose } from 'react-apollo';
import { getOwnerQuery } from '../../Queries/queries';
import { updateOwnerMutation } from '../../Mutations/mutations';

class OwnerProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            mob : "",
            email : "",
            restname : "",
            restzip : "",
            cuisine : "",
            updateStatus : "",
            getProfile: "",
            //data : this.props.getOwnerQuery
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
                email : username
            })
            console.log("Checking Email : " + username);
        }
    }

    onSubmit(e){
        e.preventDefault();
            console.log("Updating Profile");
            var data = this.props.getOwnerQuery;
            console.log(data);

            var check = this.props.updateOwnerMutation({
                variables : {
                    email : this.state.email,
                    name : this.state.name,
                    restname : this.state.restname,
                    restzip : this.state.restzip,
                    cuisine : this.state.cuisine,
                    mob : this.state.mob
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

        var data = this.props.getOwnerQuery.owner;
        console.log(data);

        this.setState({
            data : data
        })

        var username = localStorage.getItem("cookieemail");
        this.setState({
            email : username
        })
        console.log("Checking Email : " + username);
        const form = {
            username : username
        }

        var user;
        for(user of data){
            //console.log(user);
            if(user.email == form.username){
                console.log(user)
                this.setState({
                    name : user.name,
                    mob : user.mob,
                    restname : user.restname,
                    restzip : user.restzip,
                    cuisine : user.cuisine,
                    getProfile : true
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

        return (
            <div>
                <NavBarLogin />
                <div>
                <div class="container">
                <h2 >Owner Profile</h2>
                <button type="submit" class="btn btn-danger" onClick={this.onProfile}>Get Profile</button>
                <form class="form-horizontal">
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="Email">Email:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.email} class="form-control" id="email" placeholder="Email" name="email" disabled/>
                    </div>
                    </div>

                    <div class="form-group">
                    <label class="control-label col-sm-2" for="fname">Name:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.name} class="form-control" id="name" placeholder="First Name" name="name"/>
                    </div>
                    </div>
                    
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="ownermob">Contact:</label>
                    <div class="col-sm-10">
                        <input type="number" onChange = {this.changeHandler} value={this.state.mob} class="form-control" id="mob" placeholder="Contact" name="mob"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="restname">Restaurant Name:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.restname} class="form-control" id="restname" placeholder="Restaurant Name" name="restname" disabled/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="restzip">Restaurant Zip:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.restzip} class="form-control" id="restzip" placeholder="Restaurant Zip" name="restzip"/>
                    </div>
                    </div>
                    <div class="form-group">
                    <label class="control-label col-sm-2" for="cuisine">Cuisine:</label>
                    <div class="col-sm-10">
                        <input type="text" onChange = {this.changeHandler} value={this.state.cuisine} class="form-control" id="cuisine" placeholder="cuisine" name="cuisine"/>
                    </div>
                    </div>
                    
                    
                    <div class="form-group">        
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-danger" onClick={this.onSubmit}>Submit</button>
                        <Link to="/ViewMenu"><button type="submit" class="btn btn-danger">Cancel</button></Link>
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
    graphql(getOwnerQuery, { name : "getOwnerQuery"}),
    graphql(updateOwnerMutation, { name : "updateOwnerMutation"})    
)(OwnerProfile);