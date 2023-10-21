
import Head from 'next/head';
import Link from 'next/link'
import Image from 'next/image';
import Header from './Header'
import { useEffect } from 'react';
import GradientBG from '../GradientBG.js';
import styles from '../../styles/Home.module.css';

const Master = ({ children }) => {
  return (
    <>
      <Head>
        <title>RankProof zkApp</title>
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      {/* <GradientBG> */}
        {/* <Header /> */}
        <main>
            {children}
        </main>
      {/* </GradientBG> */}
    </>
  );
}

export default Master;