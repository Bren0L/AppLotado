import { io } from "socket.io-client";


const socket = io("http://192.168.1.11:3333");


export default socket;