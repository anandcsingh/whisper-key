import { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
    const [totalCredentialsCreated, setTotalCredsCreated] = useState<number|null>(null);
    const [totalIssuedCreds, setTotalIssuedCreds] = useState<number|null>(null);
    const [firstCredCreated, setFirstCreated] = useState<string>('');
    const [mostRecentCred, setMostRecent] = useState<string>('');
    const [mostCredsOwned, setMostOwnedBy] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        // To be replaced by calling whispey key core 'contract-is-key' npm package
        // for now direct calls...
        const fetchData = async () => {
            try {
                console.log('base URL:',process.env.NEXT_PUBLIC_BASE_API);
                const apiURL = `${process.env.NEXT_PUBLIC_BASE_API}/api/credential-stats`;
                console.log(apiURL);
                const responses = await Promise.all([
                    axios.get(`${apiURL}/`),
                    axios.get(`${apiURL}/issued`),
                    axios.get(`${apiURL}/first`),
                    axios.get(`${apiURL}/recent`),
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
          
                  // Update state variables
                  setTotalCredsCreated(response1.length);
                  setTotalIssuedCreds(response2.count);
                  setFirstCreated(response3);
                  setMostRecent(response4);
                  //@ts-ignore
                  setMostOwnedBy(response5.mostOwned);
                  setIsLoading(false);
            } catch (error) {
                console.error('Error getting data:', error);
            }
        };
        console.log('about to fetch dataaaaa');
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
            <div className="divider"></div> 
            <h1 className='text-5xl'>Statistics</h1>


            {
                isLoading ? (
                    <div>
                        <span className="loading loading-ring loading-xs"></span>
                        <span className="loading loading-ring loading-sm"></span>
                        <span className="loading loading-ring loading-md"></span>
                        <span className="loading loading-ring loading-lg"></span>
                        <br/>
                        Loading.....
                    </div>
                ) : 
                <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                {
                    totalCredentialsCreated && (
                    <div style={{flex: '0 0 30%', margin: '5px'}} className="stats-comp">
                        <div style={{}} className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img crossOrigin="anonymous" src="/assets/abacus.png" alt="Whisper Key call to action" /></figure>
                        <div className="card-body">
                            <h2 style={{margin: '0 auto'}} className="card-title">Total Credentials Created: {totalCredentialsCreated}</h2>
                            {/* <h1>{totalCredentialsCreated}</h1> */}
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                }

                {
                    totalIssuedCreds && (
                    <div style={{flex: '0 0 30%', margin: '5px'}} className="stats-comp">
                        <div style={{}} className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img crossOrigin="anonymous" src="/assets/magic-wand.png" alt="Whisper Key call to action" /></figure>
                        <div className="card-body">
                            <h2 style={{margin: '0 auto'}} className="card-title">Total Verifiable Credentials Issued: {totalIssuedCreds}</h2>
                            {/* <p>{totalIssuedCreds}</p> */}
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                }

                {
                    firstCredCreated && (
                    <div style={{flex: '0 0 30%', margin: '5px'}} className="stats-comp">
                        <div style={{margin: '0 auto'}} className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img crossOrigin="anonymous" src="/assets/first-medal.png" alt="Whisper Key call to action" /></figure>
                        <div className="card-body">
                            <h2 style={{margin: '0 auto'}} className="card-title">Frist Credential Created: {firstCredCreated}</h2>
                            {/* <p>{firstCredCreated}</p> */}
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                }

                {
                    mostRecentCred && (
                    <div style={{flex: '0 0 30%', margin: '5px'}} className="stats-comp">
                        <div style={{margin: '0 auto'}} className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img crossOrigin="anonymous" src="/assets/beer.png" alt="Whisper Key call to action" /></figure>
                        <div className="card-body">
                            <h2 style={{margin: '0 auto'}} className="card-title">Most Recent Credential Created: {mostRecentCred}</h2>
                            {/* <p>{mostRecentCred}</p> */}
                            <div className="card-actions justify-end">
                            <button style={{margin: '0 auto'}} className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                }

                {
                    mostCredsOwned && (
                    <div style={{flex: '0 0 30%', margin: '5px'}} className="stats-comp">
                        <div style={{margin: '0 auto'}} className="card card-compact w-96 bg-base-100 shadow-xl">
                        <figure><img crossOrigin="anonymous" src="/assets/most-valuable-player.png" alt="Whisper Key call to action" /></figure>
                        <div className="card-body">
                            <h2 style={{margin: '0 auto'}} className="card-title">Institution that owns the most Credentials:</h2>
                            <h1>{mostCredsOwned?.substring(0, 10)}.......</h1>
                            <div className="card-actions justify-end">
                            <button style={{margin: '0 auto'}} className="btn btn-primary">Get Started</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                }
                </div>
            }

            <div className="divider"></div> 
        </div>
        
        
    );
}

export default Statistics;