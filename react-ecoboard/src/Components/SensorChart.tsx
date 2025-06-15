import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { SimulateRealTimeData } from './SimulateRealTimeData.tsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);  //ensure to register for rendering

export default function SensorChart() {

    const options = {}

    return (
        <div>
            <h1 style={{ color: "black" }}>Real-time Sensor Data</h1>
            <Line data={lineChartData} options={options} />
        </div>
    );
}