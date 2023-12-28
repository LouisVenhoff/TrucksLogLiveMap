require "socket";


class ConnSocket

    @port
    @udpSock = UDPSocket.new
    @mutex

    @dataCallback

    def initialize(port, mutex, callback)
        @port = port;
        @dataCallback = callback;
        @mutex = mutex;

        @udpSock = UDPSocket.new

        @udpSock.bind("192.168.178.31", @port);
    end

    def startListener()
        udpThread = Thread.new{
                while(true)
                    if(@mutex.locked? == false)
                        data = @udpSock.recvfrom(255)[0];
                        @dataCallback.call(data);
                    end        
                end
        }

        #udpThread.join();
    end


end