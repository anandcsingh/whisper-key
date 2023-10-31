import Authentication from '@/modules/Authentication';
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';

const DashBoardCredentialsOwned = () => {
    return(
        <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
                
                <div className="card w-96 bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title">License</h2>
                        <p>Issued by the Ministry of Works &amp; Transport</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Credential</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title">Bsc. Computing</h2>
                        <p>Issued by the University of the West Indies</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Credential</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title">National ID</h2>
                        <p>Issued by the EBC</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Credential</button>
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">❮</a> 
                <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div> 
            <div id="slide2" className="carousel-item relative w-full">
            <div className="card w-96 bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title">National ID</h2>
                        <p>Issued by the EBC</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Credential</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title">Passport</h2>
                        <p>Issued by the Ministry of Legal Affairs</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Credential</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title">Deed</h2>
                        <p>Issued by the Ministry of Housing</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Credential</button>
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">❮</a> 
                <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div> 
        </div>
    );
}

export default DashBoardCredentialsOwned;
