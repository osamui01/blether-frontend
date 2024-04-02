import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "../components/Navigation";
import UserList from "../components/lists/UserList";
import ChatroomList from "../components/lists/ChatroomList";
import NewUserForm from "../components/forms/NewUserForm";
import NewChatroomForm from "../components/forms/NewChatroomForm";
import UserSelectForm from "../components/forms/UserSelectForm";

// import UserSelectForm from "../components/forms/UserSelectForm";
import MessageList from "../components/lists/MessageList";

const API_ROOT = "http://localhost:8080";

const ChatroomContainer = () => {
  const [users, setUsers] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([]);

  const [currentUser, setCurrentUser] = useState();
  // Look into using useContext

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

  // Will need to fetch messages for chatrooms later
  const fetchMessages = async () => {
    const response = await fetch(`${API_ROOT}/messages`);
    const jsonData = await response.json();
    setMessages(jsonData);
  };

  const fetchMessagesForUser = async (id) => {
    const response = await fetch(`${API_ROOT}/messages/user/` + id);
    const jsonData = await response.json();
    setMessages(jsonData);
  };

  // const postMessage = async (newUserMessage) => {
  //   const response = await fetch(`${API_ROOT}/messages/user`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newUserMessage),
  //   });
  //   const savedMessage = await response.json();
  //   setUsers([...messages, savedMessage]);
  // };

  const deleteMessage = async (id) => {
    await fetch(`${API_ROOT}/messages/` + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setMessages(messages.filter((message) => message.id !== id));
  };

  const postUser = async (newUser) => {
    const response = await fetch(`${API_ROOT}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const savedUser = await response.json();
    setUsers([...users, savedUser]);
  };

  const deleteUser = async (id) => {
    await fetch(`${API_ROOT}/users/` + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setUsers(users.filter((user) => user.id !== id));
  };

  const postChatroom = async (newChatroom) => {
    const response = await fetch(`${API_ROOT}/chatrooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newChatroom),
    });
    const savedChatroom = await response.json();
    setChatrooms([...chatrooms, savedChatroom]);
  };

  const deleteChatroom = async (id) => {
    await fetch(`${API_ROOT}/chatrooms/` + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setChatrooms(chatrooms.filter((chatroom) => chatroom.id !== id));
  };

  const chatroomRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Navigation />,
      children: [
        {
          path: "/messages",
          element: (
            <>
              <UserSelectForm users={users} setCurrentId={setCurrentUserId}/>
              <MessageList messages={messages} deleteMessage={deleteMessage} />
            </>
          ),
        },
        {
          path: "/users",
          element: (
            <>
              <NewUserForm postUser={postUser} />
              <UserList users={users} deleteUser={deleteUser} />
            </>
          ),
        },
        {
          path: "/chatrooms",
          element: (
            <>
              <UserSelectForm users={users} setCurrentId={setCurrentUserId}/>
              <NewChatroomForm postChatroom={postChatroom} />
              <ChatroomList
                chatrooms={chatrooms}
                deleteChatroom={deleteChatroom}
              />
            </>
          ),
        },
      ],
    },
  ]);

  useEffect(() => {
      fetchMessagesForUser(currentUserId);
    fetchMessages();
  }, [currentUserId]);

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
