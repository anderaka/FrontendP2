import React, { Component } from 'react';

import Front from "../common/home/Home";
import Login from "../login/Login";
import Register from "../register/Register";
import Advertisments from "../ads/Ads";
import AdDetail from "../ads/AdsDetail";
import Filter from "../forms/Filters";
import AdsFiltered from "../ads/AdsFiltered";
import CreateAdForm from "../forms/CreateAd";
import EditAdForm from "../forms/EditAd";

import styled from 'styled-components';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import {Navbar, Nav } from "react-bootstrap";


const StyledLink = styled(Link)`
    color: white;
	font-size: 1.25em;
	margin: .5em;
    
    :hover{
        text-decoration: none;
        color: #FFEAD0;
    }
`;

export default class Home extends Component {
    render(){
        return (
            <Router>
                <Navbar className="menu" collapseOnSelect expand="lg">
                    <StyledLink to="/">WALLATROOP</StyledLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Nav>
                            <StyledLink to="/login">Login</StyledLink>
                            <StyledLink to="/registro">Registro</StyledLink>
                            <StyledLink to="/ads">Anuncios</StyledLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
              
                    <Switch>
                        <Route exact path="/" component={Front} />
                        <Route path="/login" component={Login} />
                        <Route path="/registro" component={Register}/>
                        <Route path="/ads">
                            <Filter />
                            <Advertisments />
                        </Route>
                        <Route path={`/detail/:id`} component={AdDetail}/>
                        <Route path="/filter" component={AdsFiltered} />
                        <Route path="/crear" component={CreateAdForm} />
                        <Route path="/editar" component={EditAdForm} />
                    </Switch>
                    
            </Router>
        );
    }
}