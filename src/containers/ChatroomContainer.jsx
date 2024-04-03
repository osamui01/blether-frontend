import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "../components/Navigation";
import UserList from "../components/lists/UserList";
import ChatroomList from "../components/lists/ChatroomList";
import NewUserForm from "../components/forms/NewUserForm";
import NewChatroomForm from "../components/forms/NewChatroomForm";
import UserSelectForm from "../components/forms/UserSelectForm";
import SearchForm from "../components/forms/SearchForm";

// import UserSelectForm from "../components/forms/UserSelectForm";
import MessageList from "../components/lists/MessageList";
import EditUserForm from "../components/forms/EditUserForm";
import EditChatroomForm from "../components/forms/EditChatroom";

const API_ROOT = "http://localhost:8080";

const ChatroomContainer = () => {
  const [users, setUsers] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredChatrooms, setFilteredChatrooms] = useState([]);

  const [currentUserId, setCurrentUserId] = useState(0);
  // Look into using useContext

  const fetchUsers = async () => {
    const response = await fetch(`${API_ROOT}/users`);
    const jsonData = await response.json();
    setUsers(jsonData);
    setFilteredUsers(jsonData);
  };

  const fetchChatrooms = async () => {
    const response = await fetch(`${API_ROOT}/chatrooms`);
    const jsonData = await response.json();
    setChatrooms(jsonData);
    setFilteredChatrooms(jsonData);
  };

  // Will need to fetch messages for chatrooms later
  const fetchMessages = async () => {
    const response = await fetch(`${API_ROOT}/messages`);
    const jsonData = await response.json();
    setMessages(jsonData);
    setFilteredMessages(jsonData);
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

  const updateUser = async (user) => {
    await fetch(`${API_ROOT}/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    await fetchUsers();
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

  const updateChatroom = async (chatroom) => {
    await fetch(`${API_ROOT}/chatrooms/${chatroom.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatroom),
    });
    await fetchChatrooms();
  };

  const userLoader = ({ params }) => {
    return users.find((user) => user.id === parseInt(params.id));
  };
  const chatroomLoader = ({ params }) => {
    return chatrooms.find((chatroom) => chatroom.id === parseInt(params.id));
  };

  //Searching for messages
  const handleMessagesSearch = (searchTerm) => {
    const filterMessages = messages.filter((message) =>
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMessages(filterMessages);
  };

  const handleUsersSearch = (searchTerm) => {
    const filterUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filterUsers);
  };

  const handleChatroomsSearch = (searchTerm) => {
    const filterChatrooms = chatrooms.filter((chatroom) =>
      chatroom.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChatrooms(filterChatrooms);
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
              <UserSelectForm
                users={users}
                setCurrentUserId={setCurrentUserId}
              />
              <SearchForm handleSearch={handleMessagesSearch} />
              <MessageList
                messages={filteredMessages}
                deleteMessage={deleteMessage}
              />
            </>
          ),
        },
        {
          path: "/users",
          element: (
            <>
              <NewUserForm postUser={postUser} />
              <SearchForm handleSearch={handleUsersSearch} />
              <UserList users={filteredUsers} deleteUser={deleteUser} />
            </>
          ),
        },
        {
          path: "/users/:id/edit",
          loader: userLoader,
          element: <EditUserForm updateUser={updateUser} />,
        },
        {
          path: "/chatrooms",
          element: (
            <>
              <UserSelectForm
                users={users}
                setCurrentUserId={setCurrentUserId}
              />
              <NewChatroomForm postChatroom={postChatroom} />
              <SearchForm handleSearch={handleChatroomsSearch} />
              <ChatroomList
                chatrooms={filteredChatrooms}
                deleteChatroom={deleteChatroom}
              />
            </>
          ),
        },
        {
          path: "/chatrooms/:id/edit",
          loader: chatroomLoader,
          element: <EditChatroomForm updateChatroom={updateChatroom} />,
        },
      ],
    },
  ]);

  useEffect(() => {
    fetchMessagesForUser(currentUserId);
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
