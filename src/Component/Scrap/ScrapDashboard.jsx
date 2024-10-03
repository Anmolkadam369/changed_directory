

import React, { useEffect, useState ,useRef } from 'react';
import './ScrapDashboard.css'
import { Chart } from 'chart.js';
import ViewProduct from './ViewProduct';

const ScrapDashboard = () => {
    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);

    useEffect(() => {
        // Initialize or destroy charts safely
        if (lineChartRef.current) lineChartRef.current.destroy();
        if (barChartRef.current) barChartRef.current.destroy();
        if (pieChartRef.current) pieChartRef.current.destroy();

        const lineCtx = document.getElementById('lineChart').getContext('2d');
        const barCtx = document.getElementById('barChart').getContext('2d');
        // const pieCtx = document.getElementById('pieChart').getContext('2d');

        // Create new chart instances and store them in refs
        lineChartRef.current = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April'],
                datasets: [{
                    label: 'Latest Hits',
                    data: [10, 26, 30, 20],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
            },
        });

        barChartRef.current = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Performance',
                    data: [50, 60, 70, 80],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
            },
        });

        // pieChartRef.current = new Chart(pieCtx, {
        //     type: 'pie',
        //     data: {
        //         labels: ['Used Storage', 'Free Storage'],
        //         datasets: [{
        //             data: [60, 40],
        //             backgroundColor: ['#FF6384', '#36A2EB'],
        //         }],
        //     },
        //     options: {
        //         responsive: true,
        //     },
        // });

        // Clean up on component unmount
        return () => {
            if (lineChartRef.current) lineChartRef.current.destroy();
            if (barChartRef.current) barChartRef.current.destroy();
            if (pieChartRef.current) pieChartRef.current.destroy();
        };
    }, []);

    const [viewProducts, setViewProducts] = useState(false)
    const [Dashboard, setDashboard] = useState(true)
    const resetValue = () => {
        setViewProducts(false)
        setDashboard(false)
    }
    const handleUpdate = () => {
        resetValue()
        setDashboard(true)
        // getData();
      };



    return (
        <div>
           {Dashboard && ( <div className="row tm-content-row">
            <div className="position-relative">
                        <button
                            className="btn btn-warning position-absolute"
                            style={{ top: '10px', right: '20px', justifyContent: 'flex-end' }}
                            onClick={() => {
                                resetValue();
                                setViewProducts(true);
                            }}
                        >
                            View Products
                        </button>
                    </div>
                <div className="row tm-content-row">
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
                        <div className="tm-bg-primary-dark tm-block">
                            <h2 className="tm-block-title">Latest Hits</h2>
                            <canvas id="lineChart"></canvas>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
                        <div className="tm-bg-primary-dark tm-block">
                            <h2 className="tm-block-title">Performance</h2>
                            <canvas id="barChart"></canvas>
                        </div>
                    </div>
                    {/* <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
                        <div className="tm-bg-primary-dark tm-block tm-block-taller">
                            <h2 className="tm-block-title">Storage Information</h2>
                            <div id="pieChartContainer">
                                <canvas id="pieChart" className="chartjs-render-monitor" width="100" height="100"></canvas>
                            </div>
                        </div>
                    </div> */}
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
                    <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-overflow">
                        <h2 className="tm-block-title">Notification List</h2>
                        <div className="tm-notification-items">
                            <div className="media tm-notification-item">
                                <div className="tm-gray-circle">
                                    <img src="img/notification-01.jpg" alt="Avatar Image" className="rounded-circle" />
                                </div>
                                <div className="media-body">
                                    <p className="mb-2">
                                        <b>Jessica</b> and <b>6 others</b> sent you new <a href="#" className="tm-notification-link">product updates</a>. Check new orders.
                                    </p>
                                    <span className="tm-small tm-text-color-secondary">6h ago.</span>
                                </div>
                            </div>
                            <div className="media tm-notification-item">
                                <div className="tm-gray-circle">
                                    <img src="img/notification-02.jpg" alt="Avatar Image" className="rounded-circle" />
                                </div>
                                <div className="media-body">
                                    <p className="mb-2">
                                        <b>Oliver Too</b> and <b>6 others</b> sent you existing <a href="#" className="tm-notification-link">product updates</a>. Read more reports.
                                    </p>
                                    <span className="tm-small tm-text-color-secondary">6h ago.</span>
                                </div>
                            </div>
                            <div className="media tm-notification-item">
                                <div className="tm-gray-circle">
                                    <img src="img/notification-02.jpg" alt="Avatar Image" className="rounded-circle" />
                                </div>
                                <div className="media-body">
                                    <p className="mb-2">
                                        <b>Oliver Too</b> and <b>6 others</b> sent you existing <a href="#" className="tm-notification-link">product updates</a>. Read more reports.
                                    </p>
                                    <span className="tm-small tm-text-color-secondary">6h ago.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-5 col-md-12 col-lg-6 col-xl-6 tm-block-col">
                <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ORDER NO.</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">OPERATORS</th>
                                    <th scope="col">LOCATION</th>
                                    <th scope="col">DISTANCE</th>
                                    <th scope="col">START DATE</th>
                                    <th scope="col">EST DELIVERY DUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row"><b>#122349</b></th>
                                    <td>
                                        <div className="tm-status-circle moving"></div> Moving
                                    </td>
                                    <td><b>Oliver Trag</b></td>
                                    <td><b>London, UK</b></td>
                                    <td><b>485 km</b></td>
                                    <td>16:00, 12 NOV 2018</td>
                                    <td>08:00, 18 NOV 2018</td>
                                </tr>
                                <tr>
                                    <th scope="row"><b>#122349</b></th>
                                    <td>
                                        <div className="tm-status-circle moving"></div> Moving
                                    </td>
                                    <td><b>Oliver Trag</b></td>
                                    <td><b>London, UK</b></td>
                                    <td><b>485 km</b></td>
                                    <td>16:00, 12 NOV 2018</td>
                                    <td>08:00, 18 NOV 2018</td>
                                </tr>
                                <tr>
                                    <th scope="row"><b>#122349</b></th>
                                    <td>
                                        <div className="tm-status-circle moving"></div> Moving
                                    </td>
                                    <td><b>Oliver Trag</b></td>
                                    <td><b>London, UK</b></td>
                                    <td><b>485 km</b></td>
                                    <td>16:00, 12 NOV 2018</td>
                                    <td>08:00, 18 NOV 2018</td>
                                </tr>
                                <tr>
                                    <th scope="row"><b>#122349</b></th>
                                    <td>
                                        <div className="tm-status-circle moving"></div> Moving
                                    </td>
                                    <td><b>Oliver Trag</b></td>
                                    <td><b>London, UK</b></td>
                                    <td><b>485 km</b></td>
                                    <td>16:00, 12 NOV 2018</td>
                                    <td>08:00, 18 NOV 2018</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                {/* <div className="col-6 tm-block-col">
                    <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                        <h2 className="tm-block-title">Orders List</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ORDER NO.</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">OPERATORS</th>
                                    <th scope="col">LOCATION</th>
                                    <th scope="col">DISTANCE</th>
                                    <th scope="col">START DATE</th>
                                    <th scope="col">EST DELIVERY DUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row"><b>#122349</b></th>
                                    <td>
                                        <div className="tm-status-circle moving"></div> Moving
                                    </td>
                                    <td><b>Oliver Trag</b></td>
                                    <td><b>London, UK</b></td>
                                    <td><b>485 km</b></td>
                                    <td>16:00, 12 NOV 2018</td>
                                    <td>08:00, 18 NOV 2018</td>
                                </tr>
                                <tr>
                                    <th scope="row"><b>#122349</b></th>
                                    <td>
                                        <div className="tm-status-circle moving"></div> Moving
                                    </td>
                                    <td><b>Oliver Trag</b></td>
                                    <td><b>London, UK</b></td>
                                    <td><b>485 km</b></td>
                                    <td>16:00, 12 NOV 2018</td>
                                    <td>08:00, 18 NOV 2018</td>
                                </tr>
                                <tr>
                                    <th scope="row"><b>#122349</b></th>
                                    <td>
                                        <div className="tm-status-circle moving"></div> Moving
                                    </td>
                                    <td><b>Oliver Trag</b></td>
                                    <td><b>London, UK</b></td>
                                    <td><b>485 km</b></td>
                                    <td>16:00, 12 NOV 2018</td>
                                    <td>08:00, 18 NOV 2018</td>
                                </tr>
                                <tr>
                                    <th scope="row"><b>#122349</b></th>
                                    <td>
                                        <div className="tm-status-circle moving"></div> Moving
                                    </td>
                                    <td><b>Oliver Trag</b></td>
                                    <td><b>London, UK</b></td>
                                    <td><b>485 km</b></td>
                                    <td>16:00, 12 NOV 2018</td>
                                    <td>08:00, 18 NOV 2018</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </div>)}
                    {viewProducts && (
                        <ViewProduct onUpdate={handleUpdate}/>
                    )}
        </div>
    )
}



export default ScrapDashboard;