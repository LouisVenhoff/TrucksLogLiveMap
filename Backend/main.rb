load "connSocket.rb"
load "player.rb"
load "mapManager.rb"
require "json"

@playerArrMutex = Mutex.new

@manager = MapManager.new(@playerArrMutex)

def udpResultReader(result)
    res = JSON.parse(result, object_class: OpenStruct);

    @manager.processPlayer(res);

end

conn = ConnSocket.new(4500, @playerArrMutex, method(:udpResultReader))

conn.startListener();



puts("Program Finished");


