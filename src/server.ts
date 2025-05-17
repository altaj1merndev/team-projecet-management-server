import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
// import { initSocket } from './sockets/socket';
// import seedSuperAdmin from './app/DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    // seed super admin
    // seedSuperAdmin();

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
    // initSocket(server); // Init WebSocket server
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected. Server is shutting down...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('uncaughtException occurred. Server is shutting down...');
  process.exit(1);
});
