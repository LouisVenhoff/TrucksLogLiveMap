require "json";

class Player

    @clientKey;
    @xPosition;
    @yPosition;
    @heading;

    @timeStamp;


    PlayerDto = Struct.new(:key, :x, :y, :h);

    def initialize(rawObj)
        @clientKey = rawObj.clientKey;
        @xPosition = rawObj.x;
        @yPosition = rawObj.y;
        @heading = rawObj.h;
        @timeStamp = 0;
    end

    # def initialize(clientKey, x, y, heading)
    #     @clientKey = clientKey;
    #     @xPosition = x;
    #     @yPosition = y;
    #     @heading = h;
    #     @timeStamp = 0;
    # end

    def updatePlayer(rawObj)
        @clientKey = rawObj.clientKey;
        @xPosition = rawObj.x;
        @yPosition = rawObj.y;
        @heading = rawObj.h;

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

    def getObjJSON
        dto = PlayerDto.new(@clientKey, @xPosition, @yPosition, @heading);

        return dto.to_h.to_json();

    end

end