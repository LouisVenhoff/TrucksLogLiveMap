import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GameMap from './components/gameMap/gameMap';
import Player from './classes/player/player';
import WebsocketClient from './classes/websocketClient/websocketClient';

function App() {

  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);
  
  const websocketClient = useRef<WebsocketClient>();

  useEffect(() => {
      websocketClient.current = new WebsocketClient("87.106.127.217", 4501, updatePlayers);
      websocketClient.current.start();
  },[]);

  const updatePlayers = (players:Player[]) => 
  {
    setCurrentPlayers(players);
  }
  
  return (
    <div className="App">
        <GameMap playerData={currentPlayers} />
    </div>
  );
}

export default App;
