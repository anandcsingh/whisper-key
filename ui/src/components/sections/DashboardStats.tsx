
const DashboardStats = () => {

    return (
        <section className="bg-white place-self-center lg:col-span-7 space-y-8">
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
              <header className="text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">Martial Arts Stats</h2>
              </header>
              <div className="m-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="bg-white stats w-full ">
                  <div className="card w-100 bg-gray-100 shadow-xl mr-5">
                    <div className="card-body">
                      <h2 className="card-title">More Stats!</h2>
                      <p>Would You like to see more interesting martial arts stats?</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">More Stats</button>
                      </div>
                    </div>
                  </div>
                  <div className="stat bg-gray-100 rounded-l-lg">

                    <div className="stat-figure text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title">Total Black belts</div>
                    <div className="stat-value text-primary">25.6K</div>
                    <div className="stat-desc">21% more than last month</div>
                  </div>

                  <div className="stat bg-gray-100" >
                    <div className="stat-figure text-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title">Total Martial Artists</div>
                    <div className="stat-value text-secondary">2.6M</div>
                    <div className="stat-desc">21% more than last month</div>
                  </div>
                  <div className="stat bg-gray-100">
                    <div className="stat-figure text-secondary">
                      <div className="avatar online">
                        <div className="w-16 rounded-full">
                          <img src="/assets/images/jutsu.png" />
                        </div>
                      </div>
                    </div>
                    <div className="stat-value">86%</div>
                    <div className="stat-title">Progression</div>
                    <div className="stat-desc text-secondary">31 did not rank up</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    );
}

export default DashboardStats;