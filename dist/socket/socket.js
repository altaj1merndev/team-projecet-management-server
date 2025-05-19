"use strict";
// import { Server } from 'socket.io';
// import http from 'http';
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = exports.io = exports.onlineUsers = void 0;
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
const socket_io_1 = require("socket.io");
exports.onlineUsers = new Map();
const initSocket = (server) => {
    exports.io = new socket_io_1.Server(server, {
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:5173'],
            methods: ['GET', 'POST'],
        },
    });
    exports.io.on('connection', (socket) => {
        socket.on('user-connected', (userId) => {
            exports.onlineUsers.set(userId, socket.id);
        });
        socket.on('disconnect', () => {
            for (const [userId, socketId] of exports.onlineUsers.entries()) {
                if (socketId === socket.id) {
                    exports.onlineUsers.delete(userId);
                }
            }
        });
    });
    return exports.io;
};
exports.initSocket = initSocket;
