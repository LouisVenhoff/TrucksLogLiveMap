import { PlayerPosition } from "../player/player";

class WebsocketClient
{
    private address:string;
    private port:number;
    private callback:(playerArr:PlayerPosition[]) => void;

    private socket:WebSocket|null = null; 

    private started:boolean = false;

    constructor(address:string, port:number, callback:(playerArr:PlayerPosition[]) => void)
    {
        this.address = address;
        this.port = port;
        this.callback = callback;
    }

    public start()
    {
        if(!this.started)
        {
            this.initializeSocket();
            this.started = true;
        }
    }


    private initializeSocket()
    {
        this.socket = new WebSocket(`ws://${this.address}:${this.port}`);

        this.socket.addEventListener("message", (event) => 
        {
            let players:PlayerPosition[] = this.parseMessage(event.data);
            this.callback(players);
        });
    }

    private parseMessage(text:string):PlayerPosition[]
    {
        let rawData:any = JSON.parse(text);

        let currentPlayers:PlayerPosition[] = [];

        for(let i = 0; i < rawData.length; i++)
        {
            let playerData:PlayerPosition = {x:rawData[i].x, y:rawData[i].y, h:rawData[i].h, key:rawData[i].key};
            currentPlayers.push(playerData);
        }

        return currentPlayers;
    }


}

export default WebsocketClient;