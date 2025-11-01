import { io } from 'socket.io-client';
const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api','') : 'https://mgnrega-0yrr.onrender.com';
export const socket = io(SOCKET_URL, { autoConnect: true });
