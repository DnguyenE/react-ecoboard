import React, { useEffect, useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { SimulateRealTimeData } from './SimulateRealTimeData.tsx';

// Define the type for our sensor data
interface SensorData {
  sensorId: string;
  timestamp: string;
  airQuality: number;
  temperature: number;
  humidity: number;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);  //ensure to register for rendering

export default function SensorChart() {
    // State to track which charts are visible, used for 
    const [filters, setFilters] = useState({
        temperature: true,
        humidity: true,
        airQuality: true
    });

    const [sensorData, setSensorData] = useState<SensorData[]>([]);  //using the sensor data template and storing it in sensorData
    const formatTime = (date = new Date()) => {
      return date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    };

    const [chartData, setChartData] = useState({  //this is the data that is displayed on the chart
      labels: Array(10).fill('').map(() => formatTime()),
      datasets: [
        {
          label: 'Temperature (°C)',
          data: [],
          borderColor: 'rgb(255, 99, 132)', // Dark blue color
          tension: 0.1
        },
        {
          label: 'Humidity (%)',
          data: [],
          borderColor: 'rgb(255, 255, 255)',
          tension: 0.1
        },
        {
          label: 'Air Quality (AQI)',
          data: [],
          borderColor: 'rgb(53, 162, 235)',
          tension: 0.1
        }
      ]
    });

    // Callback to handle updates from the simulator
    const handleDataUpdate = useCallback((updates: SensorData[]) => {
      setSensorData(prev => [...prev, ...updates].slice(-20)); // Keep last 20 updates
      
      // Update chart data with the latest readings
      if (updates.length > 0) {
        const latest = updates[updates.length - 1];
        const now = new Date();
        
        setChartData(prev => {
          // Add new time to labels, keeping only last 10 entries
          const newLabels = [...prev.labels.slice(1), formatTime(now)];
          
          return {
            ...prev,
            labels: newLabels,
            datasets: [
              {
                ...prev.datasets[0],
                data: [...prev.datasets[0].data.slice(-10), latest.temperature]  //slice removed that last entry and keeps the most recent 10
              },
              {
                ...prev.datasets[1],
                data: [...prev.datasets[1].data.slice(-10), latest.humidity]
              },
              {
                ...prev.datasets[2],
                data: [...prev.datasets[2].data.slice(-10), latest.airQuality]
              }
            ]
          };
        });
      }
    }, []);

    // Set up the data simulation when component mounts
    useEffect(() => {
      // Start simulation with 1 sensor, updating every 2 seconds
      const cleanup = SimulateRealTimeData(1, 1000, handleDataUpdate);
      
      // Clean up interval on unmount
      return () => {
        cleanup && cleanup();
      };
    }, [handleDataUpdate]);

    //chart options for customizing the chart
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000
      },
      plugins: {
        legend: {
          labels: {
            color: '#e2e8f0',
            font: {
              size: 14,
              weight: 'normal' as const, // Using 'normal' which is a valid font weight
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 8,
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#94a3b8',
            font: {
              size: 12
            }
          }
        },
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#94a3b8',
            font: {
              size: 12
            }
          }
        }
      }
    };

    // Filter the chart data based on active filters
    const filteredChartData = {
        ...chartData,
        datasets: chartData.datasets.filter(dataset => {
          //filters out the datasets that are not selected
            if (dataset.label.includes('Temperature') && !filters.temperature) return false;
            if (dataset.label.includes('Humidity') && !filters.humidity) return false;
            if (dataset.label.includes('Air Quality') && !filters.airQuality) return false;
            return true;
        })
    };

    // Handle filter toggle
    const handleFilterChange = (filterName) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    return (  //renders the chart with the toggles and the chart
        <div className="chart-container">
            <h1 style={{ color: "white" }}>Real-time Sensor Data</h1>
            <div className="chart-filters">
                <div className="filter-item">
                    <div className="checkbox-wrapper-3">
                        <input 
                            type="checkbox" 
                            id="temperature-toggle" 
                            checked={filters.temperature}
                            onChange={() => handleFilterChange('temperature')}
                        />
                        <label htmlFor="temperature-toggle" className="toggle">
                            <span></span>
                        </label>
                    </div>
                    <span className="filter-label">Temperature</span>
                </div>
                <div className="filter-item">
                    <div className="checkbox-wrapper-3">
                        <input 
                            type="checkbox" 
                            id="humidity-toggle"
                            checked={filters.humidity}
                            onChange={() => handleFilterChange('humidity')}
                        />
                        <label htmlFor="humidity-toggle" className="toggle">
                            <span></span>
                        </label>
                    </div>
                    <span className="filter-label">Humidity</span>
                </div>
                <div className="filter-item">
                    <div className="checkbox-wrapper-3">
                        <input 
                            type="checkbox" 
                            id="airquality-toggle"
                            checked={filters.airQuality}
                            onChange={() => handleFilterChange('airQuality')}
                        />
                        <label htmlFor="airquality-toggle" className="toggle">
                            <span></span>
                        </label>
                    </div>
                    <span className="filter-label">Air Quality</span>
                </div>
            </div>
            <div className="chart-wrapper">
                <Line data={filteredChartData} options={options} />
            </div>
        </div>
    );
}