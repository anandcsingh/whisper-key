import Master from '../components/layout/Master'
import Head from 'next/head';
import Link from 'next/link'
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import LandingPageHeader from '@/components/layout/LandingPageHeader';
import React, { useState } from 'react';

export default function AnotherComponent() {
    const [fields, setFields] = useState([{ name: '', type: 'string' }]);

    const addField = () => {
        setFields([...fields, { name: '', type: 'string' }]);
    };

    return (
        <>
        <Master>
        <div>
            <header className="bg-red-500 h-20">
                <div className="container mx-auto flex items-center justify-between">
                    <h1 className="text-white text-2xl font-bold">Website Title</h1>
                    <nav>
                        <ul className="flex">
                            <li className="mr-3">
                                <a href="#" className="hover:bg-red-700 hover:rounded-lg">Issuers</a>
                            </li>
                            <li className="mr-3">
                                <a href="#" className="hover:bg-red-700 hover:rounded-lg">Owners</a>
                            </li>
                            <li>
                                <a href="#" className="hover:bg-red-700 hover:rounded-lg">Verifiers</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="container mt-5">
                <h3 className="text-2xl font-bold">Title of the Page</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="block font-semibold">Name</label>
                        <input type="text" id="name" className="input input-bordered w-full max-w-xs" placeholder="Enter Name" />
                        {/* <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" /> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="block font-semibold">Description</label>
                        <input type="text" id="description" className="input w-full max-w-xs" placeholder="Enter Description" />
                    </div>
                    <div className="mb-3">
                        <h3 className="text-xl font-bold">Define fields</h3>
                        {fields.map((field, index) => (
                            <div className="flex mb-3" key={index}>
                                <div className="flex-grow">
                                    <label htmlFor="fieldName" className="block font-semibold">Name</label>
                                    <input type="text" id="fieldName" className="input w-full max-w-xs" placeholder="Enter Name" />
                                </div>
                                <div className="flex-grow">
                                    <label htmlFor="fieldType" className="block font-semibold">Type</label>
                                    <select id="fieldType" className="input w-full max-w-xs">
                                        <option value="string">string</option>
                                        <option value="int">int</option>
                                        <option value="decimal">decimal</option>
                                    </select>
                                </div>
                                {index === fields.length - 1 && (
                                    <div>
                                        <button type="button" className="bg-red-500 text-white rounded-md p-2 hover:bg-red-700" onClick={addField}>
                                            Add another
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Save</button>
                    <button type="button" className="bg-gray-500 text-white p-2 rounded-md ml-2">Cancel</button>
                </form>
            </div>
        </div>
        </Master>
        </>
    );
}


