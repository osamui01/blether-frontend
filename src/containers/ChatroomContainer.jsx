import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "../components/Navigation";

const API_ROOT = "http://localhost:8080";

const ChatroomContainer = () => {
  const [users, setUsers] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const fetchUsers = async () => {
    const response = await fetch(`${API_ROOT}/users`);
    const jsonData = await response.json();
    setUsers(jsonData);
    setCurrentUser(jsonData[0]);
  };

  const fetchChatrooms = async () => {
    const response = await fetch(`${API_ROOT}/chatrooms`);
    const jsonData = await response.json();
    setChatrooms(jsonData);
  };

  const fetchMessages = async () => {
    const response = await fetch(`${API_ROOT}/messages`);
    const jsonData = await response.json();
    setMessages(jsonData);
  };

  const chatroomRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Navigation />,
      children: [
        {
          path: "/messages",
          element: <></>,
        },
        {
          path: "/users",
          element: <></>,
        },
        {
          path: "/chatrooms",
          element: <></>,
        },
      ],
    },
  ]);

  useEffect(() => {
    fetchUsers();
    fetchChatrooms();
    fetchMessages();
  }, []);

  return (
    <>
      <h1>Big Blether</h1>
      <RouterProvider router={chatroomRoutes} />
    </>
  );
};

export default ChatroomContainer;
