require "socket";
require "digest";
require "websocket_parser";
require "json";

class WebInterface

    @port;
    @server;

    @sockets;

    def initialize(port)
        @port = port;
        @sockets = [];
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


            @sockets.push(socket);

        end
        
    }

   

    end

    def sendMapInformation(players)
        
        sendJSON = parsePlayerArrToJSON(players);
        
        #sendJSON = "Test";

        for sck in @sockets
            sck << WebSocket::Message.new(sendJSON).to_data
        end

    end

    def parsePlayerArrToJSON(players)
        arrayJSON = "["

        for i in 0..players.length - 1
            arrayJSON += players[i].getObjJSON();

            if i != players.length - 1
                arrayJSON += ",";
            end
        end 

        arrayJSON += "]";

        return arrayJSON;
    end

end