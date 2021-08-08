import React, { useEffect, useState, useLayoutEffect } from "react";
import { Icon, Image, Dropdown, Segment, Search } from "semantic-ui-react";
import axios from "axios";

import logo from "../../images/superset.png";
import logoFull from "../../images/supersetfull.png";
import logoFullGrey from "../../images/supersetfullgrey.png";
import { redirect } from "../utils/redirect";
import { toast } from "./Toast";

import 'semantic-ui-css/semantic.min.css';

const SearchInput = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => { }, [results]);

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
                console.error(error);
            });
        }

        setLoading(true);
        const timeoutId = setTimeout(() => {
            search();
        }, 250);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [value]);

    const onSearchChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const onResultSelect = (e, { result }) => {
        if ("setid" in result) {
            redirect("/set", [{ key: "id", value: result.setid }]);
        }
        else if ("userid" in result) {
            redirect("/user", [{ key: "id", value: result.userid }]);
        }
    }


    return (
        <Search category
            className="ss-header-searchbar"
            placeholder="Search"
            loading={loading}

            onSearchChange={onSearchChange}
            onResultSelect={onResultSelect}
            results={results}
            value={value} />
    );
}

const SSHeader = ({ currentUser }) => {
    const [screenSize, setScreenSize] = useState([0, 0]);
    const [headerLogo, setHeaderLogo] = useState(logoFull);

    const updateScreenSize = () => { setScreenSize([window.innerWidth, window.innerHeight]); }
    useLayoutEffect(() => {
        window.addEventListener('resize', updateScreenSize);
        updateScreenSize();
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    const [screenWidth, screenHeight] = screenSize;

    useEffect(() => {
        axios.get(`/api/settings/theme`).then(response => {
            if (response.data.value !== "0"){ setHeaderLogo(logoFullGrey); }
        });
    }, []);
    
    const onLogOut = () => {
        axios.post(`/api/logout`).then(() => {
            redirect('/');
        }).catch((error) => {
            console.error(error);
            toast("Failed to log out", "error");
        });
    }

    return (
        <Segment className="ss-header">
            <Segment compact className="no-margin" style = {{backgroundColor: "inherit"}}>
                <span className="hoverable" onClick={() => redirect('/')} >
                    {screenWidth > 520 ?
                        <Image src={headerLogo} id = "ss-header-logo" size="small" centered verticalAlign="middle" spaced="left"  /> :
                        <Image src={logo} size="mini" centered verticalAlign="middle" spaced="left" />}
                </span>

                <SearchInput />
            </Segment>

            <Segment floated="right" compact className="no-margin" style = {{backgroundColor: "inherit"}}>
                <Dropdown button className="no-padding no-margin hoverable ss-header-icon" style = {{backgroundColor: "inherit"}}
                    trigger={<Icon name="user" className="ss-header-icon" />}>
                    <Dropdown.Menu direction="left" className = "ss-header-dropdown">
                        {currentUser && <Dropdown.Item text='Profile' onClick={() => redirect('/user', [{ key: "id", value: currentUser.userid }])} />}
                        {currentUser && <Dropdown.Item text='Settings' onClick={() => redirect("/user/settings")} />}
                        {currentUser && <Dropdown.Item text='Log Out' onClick={() => { onLogOut() }} />}

                        {!currentUser && <Dropdown.Item text='Log In' onClick={() => redirect('/login')} />}
                        {!currentUser && <Dropdown.Item text='Sign Up' onClick={() => redirect('/register')} />}

                        {currentUser && currentUser.role === 1 && <Dropdown.Item text='Admin' onClick={() => redirect('/admin')} />}

                        <Dropdown.Divider />

                        <Dropdown.Item text = 'Feedback' onClick={() => redirect('/feedback')} />
                        <Dropdown.Item text = 'Info' onClick={() => redirect('/about')} />
                        {currentUser && <Dropdown.Item text = 'Service Status' onClick={() => redirect('/status')} />}
                    </Dropdown.Menu>
                </Dropdown>
            </Segment>

        </Segment>
    );
}

export default SSHeader;
