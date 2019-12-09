import React, {Component} from 'react';
import cookie, { setRawCookie } from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import NavBarLogin from "../navbarlogin";
import "./userdashboard.css";
import axios from 'axios';
import {rooturl} from '../../config';
import Pagination from '../Pagination';

import { graphql, compose } from 'react-apollo';
import { getRestaurantsQuery } from '../../Queries/queries';
//import { updateOwnerMutation } from '../../Mutations/mutations';

class UserDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            restname : "",
            searchResults : [],
            itemname : "",
            searchCheck : "false",
            cuisinesFilter : [],
            option : "",
            setLoading : false,
            currentPage : 1,
            postsPerPage : 5
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.restaurantpage = this.restaurantpage.bind(this);
        this.allrestaurants = this.allrestaurants.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
            //console.log(this.state.itemname);
            const data = {
                itemname : this.state.itemname
            }
            console.log(data);
            axios.defaults.headers.common["Authorization"] = localStorage.getItem("token") ? localStorage.getItem("token") : "";
            axios.post(rooturl + '/UserDashboard', data)
            .then(response => {
                console.log("Response Status: " + response.status);
                if(response.status === 200){
                    this.setState({
                        searchResults : response.data.responseMessage,
                        searchCheck : true,
                        cuisinesFilter : response.data.responseMessage,
                        
                    })
                    console.log(this.state.searchResults, this.state.cuisinesFilter);
                } else {
                    this.setState({
                        searchCheck : false
                    })
                    console.log("No Items found");
                }
            })
    }

    restaurantpage = (e) => {
        e.preventDefault();
        //console.log(e.target.value);
        this.setState({
            restname : e.target.value
        })
    }

    allrestaurants = (e) => {
        e.preventDefault();

        var data = this.props.getRestaurantsQuery.restaurants;
        //console.log(data);
        this.setState({
            data : data
        })
    }

    

    paginate = pageNumber => {
        this.setState({
            currentPage : pageNumber
        })
    }
    



    
    render(){ 
        
        if(this.state.data){
            var rest = this.state.data.map(result => {
                return (
                    <tr>
                        <td>{result.restname}</td>
                        <td>{result.cuisine}</td>
                        <td><button value={result.restname} onClick={this.restaurantpage} class="btn btn-danger">View Restaurant</button></td>
                    </tr>
                )
            })
        }
        let redirectVar = null;
        if(this.state.restname != ""){
            localStorage.setItem('restname', this.state.restname);
            redirectVar = <Redirect to = {{pathname: '/ViewRestaurant', state: { restname: this.state.restname }}}/>
        }

        return(
            <div>
            <NavBarLogin />
            {redirectVar}
            <div class="vertical-nav bg-danger" id="sidebar">
            <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Dashboard</p>
            <ul class="nav flex-column bg-white mb-0">
                <li class="nav-item">
                    <a href="/UserProfile" class="nav-link text-dark font-italic bg-light">
                    <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>Profile
                    </a>
                </li>
            </ul>
            </div>
            <div class="page-content p-5" id="content">
            <div class="input-group mb-3">
            <button type="submit" class="btn btn-danger" onClick={this.allrestaurants}>All Restaurants</button>
            </div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Restaurant Name</th>
                            <th>Cuisine</th>
                            <th></th>
                        </tr>
                    </thead>
                        <tbody>
                        {rest}
                        </tbody>
                </table>
            </div>
            
            </div>
        )
    }
}

export default compose(
    graphql(getRestaurantsQuery, { name : "getRestaurantsQuery"})
)(UserDashboard);
