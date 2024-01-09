import Player from "../player/player";

class WebsocketClient
{
    private address:string;
    private port:number;
    private callback:(playerArr:Player[]) => void;

    private socket:WebSocket|null = null; 

    private started:boolean = false;

    constructor(address:string, port:number, callback:(playerArr:Player[]) => void)
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
            let players:Player[] = this.parseMessage(event.data);
            this.callback(players);
        });
    }

    private parseMessage(text:string):Player[]
    {
        let rawData:any = JSON.parse(text);

        let currentPlayers:Player[] = [];

        for(let i = 0; i < rawData.length; i++)
        {
            let newPlayer = new Player(rawData[i].key, rawData[i].x, rawData[i].y, rawData[i].h);
            currentPlayers.push(newPlayer);
        }

        return currentPlayers;
    }


}

export default WebsocketClient;