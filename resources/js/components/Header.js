import React, { useEffect, useState } from "react";
import { Icon, Image, Header, Dropdown, Segment, Search } from "semantic-ui-react";

import "../../css/Header.css";
import 'semantic-ui-css/semantic.min.css';

import logo from "../../images/superset.png";
import { redirect } from "../utils/redirect";
import axios from "axios";

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

const SSHeader = () => {
    return (
        <Segment className="ss-header ">
            <Segment basic compact className="ss-header-title-search ss-bg-grey no-margin no-bottompadding ss-header-1">
                <Header size="huge" className="inline">
                    <div
                        onClick={() => redirect('/')}
                        style={{ cursor: "pointer" }}
                    >
                        <Image className="ss-header-logo" src={logo} size="mini" centered verticalAlign="middle" spaced="left" />
                        <a className="ss-header-title" style={{ padding: "12px", verticalAlign: "middle", textDecoration: "none" }}>SuperSet</a>
                    </div>
                </Header>

                <SearchInput />
            </Segment>

            <Segment basic floated="right" compact className="ss-bg-grey no-margin">
                <Icon name="user" className="ss-white no-padding" />
                <Dropdown button className="ss-white ss-bg-grey no-padding no-margin">
                    <Dropdown.Menu direction="left">
                        <Dropdown.Item text='Log In' onClick={() => redirect('/login')} />
                        <Dropdown.Item text='Sign Up' onClick={() => redirect('/register')} />
                        <Dropdown.Item text='Tutorial' />
                    </Dropdown.Menu>
                </Dropdown>
            </Segment>

        </Segment>
    );
}

export default SSHeader;
