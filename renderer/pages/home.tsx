import React from 'react';
import Head from 'next/head';
import { GameProvider } from '../contexts/game';
import { Game, Points } from '../components';

function Home() {
  return (
    <GameProvider>
      <Head>
        <title>Snake Game</title>
        <link rel="stylesheet" href="styles/reset.css" />
      </Head>
      <div >
        <Points />
        <Game />
      </div>
    </GameProvider>
  );
};

export default Home;
