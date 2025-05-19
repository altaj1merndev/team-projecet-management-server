// import { Server } from 'socket.io';
// import http from 'http';

// const onlineUsers = new Map<string, string>();

// export const initSocket = (server: http.Server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: ['http://localhost:3000', 'http://localhost:5173'],
//       methods: ['GET', 'POST'],
//     },
//   });


  
//   io.on('connection', (socket) => {
//     // User connects
//     socket.on('user-connected', (userId: string) => {
//       console.log({userId})
//       onlineUsers.set(userId, socket.id);
//     });

   

//     // Handle disconnects
//     socket.on('disconnect', () => {
//       for (const [key, value] of onlineUsers.entries()) {
//         if (value === socket.id) {
//           onlineUsers.delete(key);
//         }
//       }
//     });
//   });

//   return io;
// };


import { Server } from 'socket.io';
import http from 'http';

export const onlineUsers = new Map<string, string>();
export let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:5173'],
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('user-connected', (userId: string) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on('disconnect', () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
        }
      }
    });
  });

  return io;
};
