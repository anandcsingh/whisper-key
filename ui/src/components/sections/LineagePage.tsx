
import DynamicLineageMap from './DynamicLineageMap'
import { useState } from 'react';

const LineagePage = () => {
    const [tabs, setTabs] = useState([ 'BJJ', 'Judo', 'Karate']);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
  
    const handleTabClick = (index:number) => {
      setActiveTabIndex(index);
    };
  return (
    <div>
    <section>
    <h2 className='text-3xl font-bold sm:text-4xl'>Trace your lineage</h2>
<div className="tabs flex">
{tabs.map((tab, index) => (
  <a
    key={index}
    className={`tab tab-lg flex-auto tab-bordered ${activeTabIndex === index ? 'tab-active' : ''}`}
    onClick={() => handleTabClick(index)}
  >
    {tab}
  </a>
))}
</div>

  {activeTabIndex === 0 && (
    <div className="mr-auto place-self-center lg:col-span-7 space-y-4">
    <DynamicLineageMap parentDiscipline={tabs[0]} />
  </div>
    )}
      {activeTabIndex === 1 && (
    <div className="mr-auto place-self-center lg:col-span-7 space-y-4">
    <DynamicLineageMap parentDiscipline={tabs[1]} />
  </div>
    )}
      {activeTabIndex === 2 && (
    <div className="mr-auto place-self-center lg:col-span-7 space-y-4">
    <DynamicLineageMap parentDiscipline={tabs[2]} />
  </div>
    )}
  
  </section>
  </div>
  );
};

export default LineagePage;