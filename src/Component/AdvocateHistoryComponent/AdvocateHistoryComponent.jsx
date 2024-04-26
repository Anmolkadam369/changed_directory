import React, { useState } from 'react';
import './AdvocateHistoryComponent.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function AdvocateHistoryComponent() {
    const tableStyles = `
    table,
    th,
    td {
        border: 1px solid black;
    border-collapse: collapse;
}

    th,
    td {
        padding: 5px;
    text-align: center;
}

    th {
        background - color: #f2f2f2;
}

    table {
        width: 100%;
    table-layout: fixed;
}
    `
    return (
        <div>
            <div className="advocatehistorypage-elem-10">
                <div className="advocatehistorypage-elem-9">
                    <div className="advocatehistorypage-elem-8"></div>
                    <div className="advocatehistorypage-elem-2">
                        <span className="advocatehistorypage-elem-1">
                            <p>Claim Pro Assist</p>
                        </span>
                    </div>
                    <div className="advocatehistorypage-elem-7">
                        <div className="advocatehistorypage-elem-6">
                            <span className="advocatehistorypage-elem-3">
                                <a href="home.html" className="link" target="_self">
                                    <p>Home</p>
                                </a>
                            </span>
                            <span className="advocatehistorypage-elem-4">
                                <a href="#DivMZVC" className="link" target="_self">
                                    <p>Contact Us</p>
                                </a>
                            </span>
                            <span className="advocatehistorypage-elem-5">
                                <a href="#DivFlyW" className="link" target="_self">
                                    <p>Raise Invoice</p>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

                <span className="advocatehistorypage-elem-11">
                    <p><br /></p>
                </span>
                <div className="advocatehistorypage-elem-12">
                        <style>
                          {tableStyles}
                        </style>


                        <h2> Table Example</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Reg No.</th>
                                    <th>Date of accident</th>
                                    <th>Owner Name</th>
                                    <th>Engine No</th>
                                    <th>Chasis No.</th>
                                    <th>Accident Location</th>
                                    <th>Crane service opted</th>
                                    <th>Crane owner name</th>
                                    <th>Advocate service opted</th>
                                    <th>Advocate name</th>
                                    <th>Veh release date</th>
                                    <th>On spot service opted</th>
                                    <th>On spot repairer name</th>
                                    <th>Workshop service opted</th>
                                    <th>Workshop name</th>
                                    <th>Vehicle delivery date</th>
                                    <th>Remarks</th>
                                    <th>Button</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Repeat this block for each row */}
                            </tbody>
                        </table>
                    </div>
        </div>
    )
}

export default AdvocateHistoryComponent;