import express from "express";
import cors from 'cors'
import http,{createServer } from 'http'
import { Server  } from "socket.io";
import morgan from 'morgan'
import connect from './Database/conn.js'
import router from './Router/Route.js'
const app = express()
const PORT=8080
// const io = new Server(server);
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by')

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:8080",
//     credentials: true
//   }
// });

// io.on('connection',(socket)=>{
//     console.log('new client connected');
//     socket.on('disconnect', () => {
//         console.log(' A user disconnected');
//       });
//   })
// io.listen(3000);

app.get('/',(req,res)=>{
  res.status(201).json('Home get Request')
})
app.use('/api',router)


connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log(`Can't connect to the server ${e}`);
  });