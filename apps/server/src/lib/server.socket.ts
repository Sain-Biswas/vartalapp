import { Server as Engine } from "@socket.io/bun-engine";
import { Server } from "socket.io";

const io = new Server();

const engine = new Engine();

io.bind(engine);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("hello", (message) => {
    console.log(message);
  });
});

export { engine, io };
