
import React from 'react';
import {Grid, Button, Header, Icon} from "semantic-ui-react";
import "../../css/SiteThemes.css";
import SetCard from './SetCard';
import SSHeader from './Header';

const SiteThemes = () => {
    /*
    * Input: --no input--
    * Description: The purpose of this functional component is to display a selection of 
    *              website themes the actor can choose from
    * Usage: SiteThemes.js-->/view
    */

    return(
        <div>
            <SSHeader />
            <Header textAlign='center' as='h2'>
                <Icon name='sync'/>
                <Header.Content>Website Themes</Header.Content>
            </Header>
            <Grid centered stackable columns={4}>
                <Grid.Column textAlign="center" className='ss-sitethemes-column'>
                    <SSHeader />
                    <div>
                        <SetCard name='Website Theme One' description='This theme will change the entire look of the entire webpage'/>
                        <Button content='Select Theme' onClick={() => {return null}}/>
                    </div>
                </Grid.Column>
                <Grid.Column textAlign="center" className='ss-sitethemes-column'>
                    <SSHeader />
                    <div>
                        <SetCard name='Website Theme Two' description='This theme will change the entire look of the entire webpage'/>
                        <Button content='Select Theme' onClick={() => {return null}}/>
                    </div>
                </Grid.Column>
                <Grid.Column textAlign="center" className='ss-sitethemes-column'>
                    <SSHeader />
                    <div>
                        <SetCard name='Website Theme Three' description='This theme will change the entire look of the entire webpage'/>
                        <Button content='Select Theme' onClick={() => {return null}}/>
                    </div>
                </Grid.Column>
                <Grid.Column textAlign="center" className='ss-sitethemes-column'>
                    <SSHeader />
                    <div>
                        <SetCard name='Website Theme Four' description='This theme will change the entire look of the entire webpage'/>
                        <Button content='Select Theme' onClick={() => {return null}}/>
                    </div>
                </Grid.Column>
                <Grid.Column textAlign="center" className='ss-sitethemes-column'>
                    <SSHeader />
                    <div>
                        <SetCard name='Website Theme Five' description='This theme will change the entire look of the entire webpage'/>
                        <Button content='Select Theme' onClick={() => {return null}}/>
                    </div>
                </Grid.Column>
                <Grid.Column textAlign="center" className='ss-sitethemes-column'>
                    <SSHeader />
                    <div>
                        <SetCard name='Website Theme Six' description='This theme will change the entire look of the entire webpage'/>
                        <Button content='Select Theme' onClick={() => {return null}}/>
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );

}

export default SiteThemes;