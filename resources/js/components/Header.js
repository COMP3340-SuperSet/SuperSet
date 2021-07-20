import React, { useEffect, useState, useLayoutEffect } from "react";
import { Icon, Image, Header, Dropdown, Segment, Search } from "semantic-ui-react";

import "../../css/Header.css";
import 'semantic-ui-css/semantic.min.css';

import logo from "../../images/superset.png";
import logoFull from "../../images/supersetfull.png";
import { redirect } from "../utils/redirect";
import axios from "axios";
import { toast } from "./Toast";

const SearchInput = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [value, setValue] = useState('');
    
    useEffect(() => {}, [results]);

    useEffect(() => {
        if (!value) return;

        const search = () => {
            axios.get(`/api/search/${value}`).then((response) => {
                let temp = response.data;
                if (temp.users.results && temp.users.results.length === 0) delete temp.users;
                if (temp.sets.results && temp.sets.results.length === 0) delete temp.sets;
                setResults(temp);
                setLoading(false);
            }).catch((error) => {
                console.error("Error: " + error);
            });
        }

        setLoading(true);
        const timeoutId = setTimeout(() => {
            search();
        }, 250);
        
        return() => {
            clearTimeout(timeoutId);
        }
    }, [value]);
    
    const onSearchChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const onResultSelect = (e, { result }) => {
        if ("setid" in result){
            redirect("/set", [{key: "id", value: result.setid}]);
        }
        else if ("userid" in result){
            redirect("/user", [{key: "id", value: result.userid}]);
        }
    }
    

    return (
        <Search category
                className = "ss-header-searchbar"
                placeholder = "Search"
                loading = {loading}
                
                onSearchChange = {onSearchChange}
                onResultSelect = {onResultSelect}
                results = {results}
                value = {value} />
    );
}

const SSHeader = ({currentUser}) => {
    const [screenSize, setScreenSize] = useState([0, 0]);
    
    const updateScreenSize = () => { setScreenSize([window.innerWidth, window.innerHeight]); }
    useLayoutEffect(() => {
        window.addEventListener('resize', updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    const [screenWidth, screenHeight] = screenSize;

    const onLogOut = () => {
        axios.post(`/api/logout`).then(() => {
            redirect('/');
        }).catch((error) => {
            console.error(error);
            toast("Failed to log out", "error");
        });
    }

    return (
        <Segment className="ss-header ">
            <Segment compact className = "ss-bg-grey no-margin">
                <span className = "hoverable" onClick={() => redirect('/')} >
                {screenWidth > 520 ?
                    <Image src = {logoFull} size = "small" centered verticalAlign="middle" spaced="left"/> :
                    <Image src = {logo} size = "mini" centered verticalAlign="middle" spaced="left"/>}
                </span>

                <SearchInput />
            </Segment>

            <Segment floated = "right" compact className = "ss-bg-grey no-margin" >
                <Dropdown button className="ss-white ss-bg-grey no-padding no-margin hoverable" 
                          trigger = {<Icon name="user" className="ss-white"/>}>
                    <Dropdown.Menu direction = "left" >
                        {currentUser && <Dropdown.Item text = 'Profile' onClick={() => redirect('/user', [{key: "id", value: currentUser.userid}])} /> }
                        {currentUser && <Dropdown.Item text = 'Settings' onClick={() => redirect("/user/settings")} /> }
                        {currentUser && <Dropdown.Item text = 'Log Out' onClick = {() => {onLogOut()}} /> }

                        {!currentUser && <Dropdown.Item text = 'Log In' onClick={() => redirect('/login')} /> }
                        {!currentUser && <Dropdown.Item text = 'Sign Up' onClick={() => redirect('/register')} /> }

                        <Dropdown.Item text = 'Info' onClick={() => redirect('/about')} />
                    </Dropdown.Menu>
                </Dropdown>
            </Segment>

        </Segment>
    );
}

export default SSHeader;
