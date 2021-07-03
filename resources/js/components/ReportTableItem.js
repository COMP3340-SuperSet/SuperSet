
import React, {useState} from 'react';
import {Table, Image, Header, Button} from "semantic-ui-react";
import "../../css/ReportTableItem.css";
import ItemModal from './ItemModal';
import BanModal from './BanModal';

/* 
Used For testing (simulate what is given from the database)
    itemImages
    itemName
    itemDescription
*/

const ReportTableItem = () => {

    const [reportedItems, setReportedItems] = useState([]);

    const renderedItemReports = reportedItems.map((item) => {
        return(
            <Table.Row key={item.itemName} className='ss-reporttableitem-row'>
                <Table.Cell width={14}>
                    <Image src={item.itemImages[0]} inline rounded size='small' className='ss-reporttableitem-image'/>
                    <Header as='h2' image className='ss-reporttableitem-header'>
                        <Header.Content style={{margin:'10px'}}>
                            {item.itemName}
                            <Header.Subheader>{item.itemDescription}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <Button.Group vertical>  
                        <ItemModal 
                            itemImages={item.itemImages}
                            itemName={item.itemName} 
                            itemDescription={item.itemDescription} 
                            trigger={<Button color='blue' content='View Item'/>}
                        />
                        <Button color='blue' content='View Set'/>
                        <Button color='blue' content='View Profile'/>
                        <Button color='red' content='Delete Report'/>
                        <BanModal trigger={<Button color='red' content='Ban Account'/>}/>
                    </Button.Group>
                    <BanModal />
                </Table.Cell>
            </Table.Row>
        );
    })

    return(
        <div>
            <Table stackable basic='very' celled fixed>
                {renderedItemReports}
            </Table>
        </div>
    );
}

export default ReportTableItem;
