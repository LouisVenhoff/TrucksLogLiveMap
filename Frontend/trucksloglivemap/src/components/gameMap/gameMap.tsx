import L, { LatLngBoundsExpression, LatLngExpression, Icon } from "leaflet";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import overlay from "../0.png";
import tileInfo from "../../TileMapInfo.json";
import "./gameMapStyle.css";
import Player, { PlayerPosition } from "../../classes/player/player";

//url="http://87.106.127.217/tiles/{z}/{x}/{y}.png"
//url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//  url="https://ets2.online/map/ets2map_148/{z}/{x}/{y}.png"
/// url="http://87.106.127.217/map/Tiles/{z}/{x}/{y}.png"

type GameMapProps ={
    playerData:PlayerPosition[]
}

const truckIcon = new Icon({
    iconUrl:"/truck.svg",
    iconSize: [25, 25]
})



const GameMap:React.FC<GameMapProps> = ({playerData}) => 
{
    //const position:LatLngExpression = [33.05000000, 36.9877005];
    
    

    const [position, setPosition] = useState<LatLngExpression>([0, 0]);

    const [playerMarkers, setPlayerMarkers] = useState<JSX.Element[]>([]);
    //const map = useMap();
  
    useEffect(() => {
       calculateCoords(-10447.169631958, -5369.0345916748);
    },[]);

    useEffect(() => {
        createPlayerMarkers(playerData);
    },[playerData]);

   const createPlayerMarkers = (players:PlayerPosition[]) => 
   {
        let markers:JSX.Element[] = [];

        for(let i = 0; i < players.length; i++)
        {
            
            let currentMarker:JSX.Element = 
            <Marker position={calculateCoords(players[i].x, players[i].y)} icon={truckIcon}>
                <Popup>
                    Nickname
                </Popup>

            </Marker>
        
            markers.push(currentMarker);
            
        }

        setPlayerMarkers(markers);
   }


    const bounds:LatLngBoundsExpression = [[tileInfo.x1, tileInfo.y2], [tileInfo.x2, tileInfo.y1]];

    const calculateCoords = (gameX:number, gameY:number):LatLngExpression => 
    {
        const x1:number = tileInfo.x1;
        const x2:number = tileInfo.x2;
        const y1:number = tileInfo.y1;
        const y2:number = tileInfo.y2;
        
        

        //const MAX = (Math.pow(2, 8) * 256);
        
        const MAX = 256 * 256;

        const conversionFactor = 256/MAX;
        

        const xTotal:number = x2 - x1;
        const yTotal:number = y2 - y1;


        const relativeX:number = (gameX - x1) / xTotal;
        const relativeY:number = 1 - (gameY - y1) / yTotal;

        return([(relativeY * MAX * conversionFactor) - 256, (relativeX * MAX) * conversionFactor]);
    }


    return(
        <div className="mapDiv">
             <MapContainer center={position} zoom={0} minZoom={0} maxZoom={8} crs={L.CRS.Simple} maxBounds={bounds}   >
                <TileLayer
                   url="http://87.106.127.217/map/Tiles/{z}/{x}/{y}.png"
                    tileSize={256}
                    noWrap={true}
                    tms={false}
                    />
                    {playerMarkers}
            </MapContainer>
        </div>
       
    );
}


export default GameMap;