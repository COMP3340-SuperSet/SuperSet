import React, { useState } from 'react';
import {Container, Grid, Header, Icon, Popup} from 'semantic-ui-react';
import StatusCard from './StatusCard';
import ServiceStatusModal from './ServiceStatusModal'; 

import axios from 'axios';

const serviceCheckArray = 
[
    {
        name: "Super Set Webpage",
        description: "This is the Super Set webpage as a whole, from this the user can navigate to the various pages and " + 
                     "use the functionalities that are provided. If this webpage were to be unavailable, even if other " + 
                     "functionalites are fully operational non would be accessible.",
        ping: "",
        response: null,
        status: "",
        failedStatusDescription: "Currently the Super Set webpage is unavailable, this will restrict all functionality that is possible. " +
                                 "This includes creating profiles/sets/items as well submitting feedback and reports. " +
                                 "Our team is working hard to resolve this issue and will be working around the clock to get " + 
                                 "this service up and running.",
        passedStatusDescription: "Currently the Super Set webpage is available, all functionality is reachable assuming that those " +
                                 "specific services are also available. This includes creating profiles/sets/items as well submitting " +
                                 "feedback and reports. The user is able to navigate to all areas of Super Set."
    },
    {
        name: "Super-Set Account Creation",
        description: "The account creation service is the ticket to being able to access other services of Super Set. " + 
                     "To create an account the actor must enter Username, Email, Password and once verified the account is created.",
        ping: '/api/users',
        response: null,
        status: "",
        failedStatusDescription: "Currently account creation is unavailable, this will restrict all functionality pertaining to account creation. "  +
                                 "Our team is working hard to resolve this issue and will be working around the clock to get " + 
                                 "this service up and running.",
        passedStatusDescription: "Currently account creation is available, all functionality pertaining to the account creation service is operational."
    },
    {
        name: "Super-Set Set Creation",
        description: "The set creation service allows users to create many differnt sets and display them on their profile for others to view. " + 
                     "To create a set the user must enter set name, items, and images.",
        ping: '/api/sets',
        response: null,
        status: "",
        failedStatusDescription: "Currently set creation is unavailable, this will restrict all functionality pertaining to set creation."  +
                                 "Our team is working hard to resolve this issue and will be working around the clock to get " + 
                                 "this service up and running.",
        passedStatusDescription: "Currently set creation is available, all functionality pertaining to the set creation service is operational."
    },
    {
        name: "Super-Set Item Creation",
        description: "The item creation service allows users to create many differnet items inside of a set and display them on under the sets " + 
                     "on their profile for others to view. To create an item, the user can provide a name, description, and images.",
        ping: '/api/items',
        response: null,
        status: "",
        failedStatusDescription: "Currently item creation is unavailable, this will restrict all functionality pertaining to item creation. "  +
                                 "Our team is working hard to resolve this issue and will be working around the clock to get " + 
                                 "this service up and running.",
        passedStatusDescription: "Currently item creation is available, all functionality pertaining to the item creation service is operational."
    },
    {
        name: "Super-Set Feedback Creation",
        description: "The feedback creation service allows users to communicate with the developers directly, being able to voice their opinion on Super Set. " +
                     "To submit feedback the user must enter detailed text feedback as well as a rating, they can choose to be contacted.",
        ping: '/api/feedback',
        response: null,
        status: "",
        failedStatusDescription: "Currently feedback creation is unavailable, this will restrict all functionality pertaining to feedback creation. "  +
                                 "Our team is working hard to resolve this issue and will be working around the clock to get " + 
                                 "this service up and running.",
        passedStatusDescription: "Currently feedback creation is available, all functionality pertaining to the feedback creation service is operational."
    },
    {
        name: "Super-Set Report Creation",
        description: "The report creation service allows users to report profiles, sets, and items. This allows Super Set to remain a friendly and safe environment. " +
                     "To submit a report, simply navigate to the object you'd like to report and click the report button.",
        ping: '/api/reports',
        response: null,
        status: "",
        failedStatusDescription: "Currently report creation is unavailable, this will restrict all functionality pertaining to report creation. "  +
                                 "Our team is working hard to resolve this issue and will be working around the clock to get " + 
                                 "this service up and running.",
        passedStatusDescription: "Currently report creation is available, all functionality pertaining to the report creation service is operational."
    },
    {
        name: "Unsplash API",
        description: "This is a live open dataset which gives the user access to images that relate to their set and/or item name. When creating these objects " +
                     "the user will have the option to select from a list of images generated by the Unsplash API.",
        ping: "https://api.unsplash.com/search/photos",
        response: null,
        status: "",
        failedStatusDescription: "Currently the Unsplash API is unavailable, this will restrict all functionality utilizing the Unsplash API. "  +
                                 "Our team is working hard to resolve this issue and will be working around the clock to get " + 
                                 "this service up and running.",
        passedStatusDescription: "Currently Unsplashed API is available, all functionality utilizing the Unsplash API is operational."
    },
    {
        name: "Axios API",
        description: "The Axios API allows Super Set to function properly, all information from Super Set needs Axios to either be displayed or saved.",
        ping: "/api/check",
        response: null,
        status: "",
        failedStatusDescription: "Currently the Axios API is unavailable, this will restrict all functionality utilizing the Axios API. "  +
        "Our team is working hard to resolve this issue and will be working around the clock to get " + 
        "this service up and running.",
        passedStatusDescription: "Currently Axios API is available, all functionality utilizing the Axios API is operational."
    }
];


function pingService(service, query)
{
    axios.get(service.ping, {
        headers: {
            Authorization: `Client-ID ${process.env.MIX_REACT_APP_UNSPLASH_PUBLIC}`
        },
        params: { query },
        crossDomain:true
    }).then(response => {
        if(response.status == 200)
        {
            service.response = true;
            service.status = 'Fully Operational';
        }
        else
        {
            service.response = false;
            service.status = 'Not Operational';
        }
    }).catch(error => {
        service.response = false;
        service.status = 'Not Operational';
    })
}


const ServiceStatusPage = () => 
{
    var count = 0;
    const renderedServiceStatus = serviceCheckArray.map(service => {
    pingService(service, 'Unsplash API');
        count++;
        return(
            <Grid.Column key={count}>
                <ServiceStatusModal
                name={service.name}
                description={service.description}
                status={service.status}
                statusDescription={ service.response ? service.passedStatusDescription : service.failedStatusDescription} 
                trigger={
                    <Container>
                        <Popup
                            trigger=
                            {
                                <Container>
                                    <StatusCard name={service.name} description={service.status} operational={service.response}/>
                                </Container>
                            }
                            content='Expand Service'
                            position='bottom center'
                        />
                    </Container>   
                }
                />  
            </Grid.Column>
        );
    });

    return(
        <Grid divided columns={1} stackable textAlign='center' centered >
            <Grid.Row centered>
                <Grid.Column textAlign='center'>
                    <br />
                    <Header as='h1'>
                        <Icon name='heartbeat'/>
                        Super Set Services
                    </Header>
                    <br />
                    <br />
                    <br />
                    <Grid divided columns={4} stackable>
                        {renderedServiceStatus}
                    </Grid>
                </Grid.Column>
            </Grid.Row>   
        </Grid>
    );
}

export default ServiceStatusPage;