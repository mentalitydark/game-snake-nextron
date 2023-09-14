import React from 'react';
import Head from 'next/head';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <img src="/images/logo.png" />
      </div>
    </React.Fragment>
  );
};

export default Home;
