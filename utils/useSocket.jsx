import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [generatedCoupons, setGeneratedCoupons] = useState([]);
  const [generatedPartner, setGeneratedPartner] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    // connect to server

    // const newSocket = io('http://localhost:4002');
    const newSocket = io("https://www.stripe-tool.fluenttalkai.com/backend");

    // set up event listeners
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("coupons", (batchResults) => {
      setGeneratedCoupons((prevCoupons) => [...prevCoupons, ...batchResults]);
    });

    newSocket.on("partner", (batchResults) => {
      setGeneratedPartner((prevPartners) => [...prevPartners, batchResults]);
    });

    // Handling error event
    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    // save socket to state
    setSocket(newSocket);
    socketRef.current = newSocket;

    // cleanup function
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return { socket, generatedCoupons, generatedPartner, setGeneratedCoupons };
};

export default useSocket;
