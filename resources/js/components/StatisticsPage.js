import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import "../../css/StatisticsPage.css";

// Data sent into bar graph (Popular Sets)
const barGraphData = {
    labels: ['Pokemon Cards', 'Shoes', 'Computer', 'Hockey Sticks', 'Hats', 'Pets', 'Shirts', 'Pictures', 'Pillows', 'Socks'],
    datasets: [
        {
            label: 'Number of Sets',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [99, 59, 80, 81, 56, 10, 34, 22, 11, 75]
        }
    ]
}

// Data sent into line graph (Users Per Month)
const lineGraphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Number of Users',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [1, 5, 20, 16, 56, 34, 73, 50, 89, 67, 150, 100]
        }
    ]
}

// Data sent into line graph (Reports Per Month)
const pieGraphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Number of Reports',
            backgroundColor: [
                '#f00e1e',
                '#0e21f0',
                '#0ef021',
                '#c9f00e',
                '#de0ef0',
                '#165033',
                '#f09d0e',
                '#0ef0bb',
                '#f0a3ac',
                '#d2a3f0',
                '#a3f0de',
                '#f0c3a3'
            ],
            hoverBackgroundColor: [
                '#501800'
            ],
            data: [9, 4, 7, 10, 5, 12, 22, 11, 30, 56, 1, 12]
        }
    ]
}

const StatisticsPage = () => {
    /*
    * Input: --no input--
    * Description: The purpose of this functional component is to display three graphs
    *              each with their own data to display
    * Usage: StatisticsPage.js --> /views
    */

    return (
        <div className='ss-statisticspage-div'>
            <Grid centered stackable columns={4}>
                <Grid.Column textAlign="center" className='ss-statisticspage-column' width={7}>
                    <div>
                        <Header> Top 10 Popular Sets </Header>
                        <Bar
                            className='ss-statisticspage-bargraph'
                            data={barGraphData}
                            options={{
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                    </div>
                </Grid.Column>
                <Grid.Column textAlign="center" className='ss-statisticspage-column' width={7}>
                    <div>
                        <Header> Users Per Month </Header>
                        <Line
                            className='ss-statisticspage-linegraph'
                            data={lineGraphData}
                            options={{
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                    </div>
                </Grid.Column>
                <Grid.Column textAlign="center" className='ss-statisticspage-column'>
                    <div>
                        <Header> Reports Per Month </Header>
                        <Pie
                            className='ss-statisticspage-piegraph'
                            data={pieGraphData}
                            options={{
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                    </div>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default StatisticsPage;
