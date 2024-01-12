import { LatLngExpression } from "leaflet";

export type PlayerPosition =
{
    x:number,
    y:number,
    h:number,
    key:string
}



class Player
{

    private xPos:number;
    private yPos:number;
    private heading:number;
    private clientKey:string;

    private lastUPdateTimestamp:number = new Date().getTime();

    constructor(clientKey:string, xPos:number, yPos:number, heading:number)
    {
        this.clientKey = clientKey;
        this.xPos = xPos;
        this.yPos = yPos;
        this.heading = heading;
    }

    public update(xPos:number, yPos:number, heading:number)
    {
        this.lastUPdateTimestamp = new Date().getTime();

        this.xPos = xPos;
        this.yPos = yPos;
        this.heading = heading;
    }


    public get x():number
    {
        return this.xPos;
    }

    public get y():number
    {
        return this.yPos;
    }

    public getHeading()
    {
        return this.heading;
    }

}

export default Player;