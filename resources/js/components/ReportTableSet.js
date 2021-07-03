import React, {useState} from 'react';
import {Table, Image, Header, Button} from "semantic-ui-react";
import "../../css/ReportTableItem.css";
import BanModal from './BanModal';

/* 
Used For testing (simulate what is given from the database)
    setImages
    setName
    setDescription
*/

const ReportTableSet = () => {

    const [reportedSets, setReportedSets] = useState([]);

    const renderedSetReports = reportedSets.map((set) => {
        return(
            <Table.Row key={set.setName} className='ss-reporttableitem-row'>
                <Table.Cell width={14}>
                    <Image src={set.setImages[0]} inline rounded size='small' className='ss-reporttableitem-image'/>
                    <Header as='h2' image className='ss-reporttableitem-header'>
                        <Header.Content style={{margin:'10px'}}>
                            {set.setName}
                            <Header.Subheader>{set.setDescription}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Button.Group vertical>  
                        <Button color='blue' content='View set'/>
                        <Button color='blue' content='View Profile'/>
                        <Button color='red' content='Delete Report'/>
                        <BanModal trigger={<Button color='red' content='Ban Account'/>}/>
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        );
    })

    return(
        <div>
            <Table stackable basic='very' celled fixed>
                {renderedSetReports}
            </Table>
        </div>
    );
}

export default ReportTableSet;
