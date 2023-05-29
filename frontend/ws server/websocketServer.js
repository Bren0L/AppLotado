import io from "socket.io-client";

const socket = io("http://192.168.1.12:3333");


export default socket;