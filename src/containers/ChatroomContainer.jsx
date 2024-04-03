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

  const [currentUserId, setCurrentUserId] = useState(null);
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

  // const fetchMessagesForUser = async (id) => {
  //   const response = await fetch(`${API_ROOT}/messages/user/` + id);
  //   const jsonData = await response.json();

  // };
  // add functionality to fetch messages for specific users later

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
    return savedUser;
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

  const getCurrentUser = () => {
    return users.find((user) => user.id === parseInt(currentUserId));
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
      path: "/login",
      element: (
        <>
          <UserSelectForm users={users} setCurrentUserId={setCurrentUserId} />
          <NewUserForm
            postUser={postUser}
            setCurrentUserId={setCurrentUserId}
          />
        </>
      ),
    },
    {
      path: "/",
      element: currentUserId ? (
        <Navigation setCurrentUserId={setCurrentUserId} />
      ) : (
        <>
          <UserSelectForm users={users} setCurrentUserId={setCurrentUserId} />
          <NewUserForm
            postUser={postUser}
            setCurrentUserId={setCurrentUserId}
          />
        </>
      ),
      children: [
        {
          path: "/messages",
          element: (
            <>
              <EditUserForm
                updateUser={updateUser}
                deleteUser={deleteUser}
                getCurrentUser={getCurrentUser}
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
              <SearchForm handleSearch={handleUsersSearch} />

              <UserList users={filteredUsers} />
            </>
          ),
        },

        {
          path: "/chatrooms",
          element: (
            <section className="chatroom-elements">
              <NewChatroomForm postChatroom={postChatroom} />
              <SearchForm handleSearch={handleChatroomsSearch} />
              <ChatroomList
                chatrooms={filteredChatrooms}
                deleteChatroom={deleteChatroom}
              />
            </section>
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
