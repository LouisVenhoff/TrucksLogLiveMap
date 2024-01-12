import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GameMap from './components/gameMap/gameMap';
import Player, { PlayerPosition } from './classes/player/player';
import WebsocketClient from './classes/websocketClient/websocketClient';

function App() {

  const currentPlayers:MutableRefObject<Player[]> = useRef<Player[]>([]);
  const [recentPlayerData, setRecentPlayerData] = useState<PlayerPosition[]>([]);

  const websocketClient = useRef<WebsocketClient>();

  useEffect(() => {
      websocketClient.current = new WebsocketClient("192.168.178.31", 4501, updatePlayers);
      websocketClient.current.start();
      startPlayerCollection(10000);
  },[]);

  const updatePlayers = (players:PlayerPosition[]) => 
  {
      
    for(let i = 0; i < players.length; i++)
    {
        let playerIndex:number = currentPlayers.current.findIndex((player:Player) => player.key === players[i].key);

        if(playerIndex === -1)
        {
            let newPlayer = new Player(players[i].key, players[i].x, players[i].y, players[i].h);
            currentPlayers.current.push(newPlayer);
        }
        else
        {
          currentPlayers.current[i].update(players[i].x, players[i].y, players[i].h);
        }

    }

      setRecentPlayerData(players);
  }

  const collectInactivePlayers = () => 
  {
      let cleanArr:Player[] = [];

      for(let i = 0; i < currentPlayers.current.length; i++)
      {
          if(currentPlayers.current[i].isActive)
          {
              cleanArr.push(currentPlayers.current[i]);
          }
      }

      currentPlayers.current = cleanArr;
  }

  const startPlayerCollection = async (time:number) => 
  {
      setInterval(() => {collectInactivePlayers()}, time);
  }



  
  return (
    <div className="App">
        <GameMap positionData={recentPlayerData} playerData={currentPlayers.current} />
    </div>
  );
}

export default App;
