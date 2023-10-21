import dynamic from 'next/dynamic';

const DynamicLineageMap = dynamic(
    () => import('./LineageMap'),
    { ssr: false }
  )
export default DynamicLineageMap;