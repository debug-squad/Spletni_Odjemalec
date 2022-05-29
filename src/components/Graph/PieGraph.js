import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function PieGraph(){
    return( <PieChart
        data={[
            { title: 'Razstava', value: 10, color: '#0066ff' },
            { title: 'Gledališče', value: 3, color: '#C13C37' },
            { title: 'Športne prireditve', value: 7, color: '#6A2135' },
        ]}
        radius={PieChart.defaultProps.radius - 7}
        style={{ height: '500px' }}
        labelStyle={(index) => ({
            fontSize: '5px',
            fontFamily: 'sans-serif',
        })}
        label={({ dataEntry }) => dataEntry.title + ": " + dataEntry.value.toString()} />
        )
}

export default PieGraph;