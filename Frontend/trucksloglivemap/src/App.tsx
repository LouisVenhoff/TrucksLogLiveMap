import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GameMap from './components/gameMap/gameMap';
import Player, { PlayerPosition } from './classes/player/player';
import WebsocketClient from './classes/websocketClient/websocketClient';

function App() {

  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);
  const [recentPlayerData, setRecentPlayerData] = useState<PlayerPosition[]>([]);

  const websocketClient = useRef<WebsocketClient>();

  useEffect(() => {
      websocketClient.current = new WebsocketClient("192.168.178.31", 4501, updatePlayers);
      websocketClient.current.start();
  },[]);

  const updatePlayers = (players:PlayerPosition[]) => 
  {
    setRecentPlayerData(players);
  }
  
  return (
    <div className="App">
        <GameMap playerData={recentPlayerData} />
    </div>
  );
}

export default App;
