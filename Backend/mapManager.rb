load "player.rb";


class MapManager

    @onlinePlayers;    
    @watcherThread;
    @webserver;
    
    def initialize(mutex)
        @onlinePlayers = [];
        
        @mutex = mutex;

        
        startPlayerWatcher();
    end


    def processPlayer(player)
       
        oldPlayerIndex = - 1;
       
        if(@onlinePlayers.length == 0)
            @onlinePlayers.push(Player.new(player));
            return;
        end

        puts @onlinePlayers.length

        for i in 0..@onlinePlayers.length() - 1
            if(@onlinePlayers[i].getClientKey == player.clientKey)
                oldPlayerIndex = i;
                break;
            end 
        end

        if(oldPlayerIndex != -1)
            @onlinePlayers[i].updatePlayer(player);
        else
            newPlayer = Player.new(player);
            @onlinePlayers.push(newPlayer);
            puts "New Player added!"
        end
        

    end

   

    def checkAllPlayers()
        
        updatedArr = [];

        for i in 0..@onlinePlayers.length() -1
            if(@onlinePlayers[i].checkIsActive() == true)
                updatedArr << @onlinePlayers[i];
            end
        end
        @onlinePlayers = updatedArr;
        puts @onlinePlayers.length
    end

    def startPlayerWatcher()
       
        @watcherThread = Thread.new{
                while(true)
                    @mutex.synchronize{
                    checkAllPlayers();
                    }
                    sleep(5);
                end
        }
    end

    def runWebsocket
        @webserver = WebInterface.new(4501);
        @webserver.startServer();

        while(true)
            sleep(0.2);
            @webserver.sendMapInformation(@onlinePlayers);
        end
    end

end