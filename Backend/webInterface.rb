require "socket";
require "digest";

class WebInterface

    @port;
    @server;

    def initialize(port)
        @port = port;

        @server = TCPServer.new("0.0.0.0", @port);
    end

    def startServer
        
    handshakeThread = Thread.new{
        loop do
            socket = @server.accept;
            puts "Client is Connecting...";

            httpRequest = "";

            while(line = socket.gets) && (line != "\r\n")
                httpRequest += line;
            end
            #socket.close();

            if matches = httpRequest.match(/^Sec-WebSocket-Key: (\S+)/);
                websocketKey = matches[1];
            else
                puts "No Websocket connection!";
                socket.close();
                next
            end

            responseKey = Digest::SHA1.base64digest([websocketKey, "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"].join());

            socket.write <<-eos
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: #{ responseKey }

eos

            puts "Handshake completed!";
        
           
        end
    }

    

    end

end