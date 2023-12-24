class Player

    @clientKey;
    @xPosition;
    @yPosition;
    @heading;

    @timeStamp;

    def initialize(rawObj)
        @clientKey = rawObj.clientKey;
        @xPosition = rawObj.x;
        @yPosition = rawObj.y;
        @heading = rawObj.heading;
        @timeStamp = 0;
    end

    def updatePlayer(rawObj)
        @clientKey = rawObj.clientKey;
        @xPosition = rawObj.x;
        @yPosition = rawObj.y;
        @heading = rawObj.heading;

        @timeStamp = Time.now.to_i();
    end


    def getClientKey()
        return @clientKey;
    end

    def checkIsActive()
        
        timeDiff = Time.now.to_i() - @timeStamp;

        puts timeDiff;

        if(timeDiff > 10)
            return false;
        else
            return true;
        end

    end

end