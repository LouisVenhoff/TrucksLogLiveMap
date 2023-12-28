load "connSocket.rb"
load "player.rb"
load "mapManager.rb"
load "webInterface.rb";
require "json"

@playerArrMutex = Mutex.new

@manager = MapManager.new(@playerArrMutex)

def udpResultReader(result)
    res = JSON.parse(result, object_class: OpenStruct);

    @manager.processPlayer(res);

end

conn = ConnSocket.new(4501, @playerArrMutex, method(:udpResultReader))

conn.startListener();

@webserver = WebInterface.new(3000);
@webserver.startServer();

p1 = Player.new("Spieler1", 1, 1, 1);
p2 = Player.new("Spieler2", 2, 2, 2);
p3 = Player.new("Spieler3", 3, 3, 3);



while(true)
    sleep(0.2);
    @webserver.sendMapInformation([p1, p2, p3]);
end

puts("Program Finished");


