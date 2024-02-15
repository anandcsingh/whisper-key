import { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
    const [totalCredentialsCreated, setTotalCredsCreated] = useState<number>(0);
    const [totalIssuedCreds, setTotalIssuedCreds] = useState<number>(0);
    const [firstCredCreated, setFirstCreated] = useState<string>('');
    const [mostRecentCred, setMostRecent] = useState<string>('');
    const [mostCredsOwned, setMostOwnedBy] = useState<string | null>('');
    
    useEffect(() => {
        // To be replaced by calling whispey key core 'contract-is-key' npm package
        // for now direct calls...
        const fetchData = async () => {
            try {
                const apiURL = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/credential-stats`;
                const responses = await Promise.all([
                    axios.get(`${apiURL}/`),
                    axios.get(`${apiURL}/issued`),
                    axios.get(`${apiURL}/first`),
                    axios.get(`${apiURL}/last`),
                    axios.get(`${apiURL}/most-owned`),
                  ]);
          
                  // Extracting data from responses
                  const [
                    response1,
                    response2,
                    response3,
                    response4,
                    response5,
                  ] = responses.map(response => response.data);

                  const mostOwned = getKeyWithHighestCount(response5);
          
                  // Update state variables
                  setTotalCredsCreated(response1.length);
                  setTotalIssuedCreds(response2.totalIssuedCredentials.length);
                  setFirstCreated(response3);
                  setMostRecent(response4);
                  setMostOwnedBy(mostOwned);
            } catch (error) {
                console.error('Error getting data:', error);
            }
        };
        fetchData();
    }, []);

    function getKeyWithHighestCount(data: { [key: string]: number }): string | null {
        let maxCount = 0;
        let keyWithMaxCount: string | null = null;
    
        for (const key in data) {
            if (data[key] > maxCount) {
                maxCount = data[key];
                keyWithMaxCount = key;
            }
        }
        return keyWithMaxCount;
    }

    return(
        <div>
            <div className="stats1">
                <div className="stats shadow">
  
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">Total Verifiable Credentials</div>
                    <div className="stat-value">31K</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div className="stat-title">New Verified Credentials</div>
                    <div className="stat-value">4,200</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">Total Issued Verifiable Credentials</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                
                </div>
            </div>

            <div className="stats2">
                <div className="stats shadow">
  
                <div className="stat">
                    <div className="stat-title">Projected Issued By December 2024</div>
                    <div className="stat-value">89,400</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>
  
                </div>
            </div>


            <div className="stats3">
                <div style={{}} className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img crossOrigin="anonymous" src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Whisper Key call to action" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Total Credentials Created</h2>
                    <p>{totalCredentialsCreated}</p>
                    <div className="card-actions justify-end">
                    </div>
                </div>
                </div>
            </div>

            <div className="stats3">
                <div style={{margin: '0 auto'}} className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img crossOrigin="anonymous" src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Whisper Key call to action" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Total Verifiable Credentials Issued</h2>
                    <p>{totalIssuedCreds}</p>
                    <div className="card-actions justify-end">
                    </div>
                </div>
                </div>
            </div>

            <div className="stats3">
                <div style={{margin: '0 auto'}} className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img crossOrigin="anonymous" src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Whisper Key call to action" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Frist Credential Created</h2>
                    <p>{firstCredCreated}</p>
                    <div className="card-actions justify-end">
                    </div>
                </div>
                </div>
            </div>

            <div className="stats3">
                <div style={{margin: '0 auto'}} className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img crossOrigin="anonymous" src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Whisper Key call to action" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Most Recent Credential Created</h2>
                    <p>{mostRecentCred}</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
                </div>
            </div>

            <div className="stats3">
                <div style={{margin: '0 auto'}} className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure><img crossOrigin="anonymous" src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Whisper Key call to action" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Institution that owns the most Credentials</h2>
                    <p>{mostCredsOwned}</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
                </div>
            </div>

        </div>
        
    );
}

export default Statistics;