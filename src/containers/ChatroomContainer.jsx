import "../styles/ChatroomContainer.css";
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
import ChatroomNavigation from "../components/ChatroomNavigation";
import ChatroomMessageList from "../components/lists/ChatroomMessageList";
import NewMessageForm from "../components/forms/NewMessageForm";
import EditMessageForm from "../components/forms/EditMessage";


const API_ROOT = "http://localhost:8080";

const ChatroomContainer = () => {
  const [users, setUsers] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatroomMessages, setChatroomMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredChatrooms, setFilteredChatrooms] = useState([]);

  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentChatroomId, setCurrentChatroomId] = useState(null);
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

  const fetchAllMessages = async () => {
    const response = await fetch(`${API_ROOT}/messages`);
    const jsonData = await response.json();
    setAllMessages(jsonData);
  };

  const fetchUserMessages = async (id) => {
    const response = await fetch(`${API_ROOT}/messages/user/` + id);
    const jsonData = await response.json();
    setMessages(jsonData);
    setFilteredMessages(jsonData);

  };

  const fetchChatroomMessages = async (id) => {
    const response = await fetch(`${API_ROOT}/messages/chatroom/` + id);
    const jsonData = await response.json();
    setChatroomMessages(jsonData);
  };

  // add functionality to fetch messages for specific users later

  const postMessage = async (newMessage) => {
     await fetch(`${API_ROOT}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });
    // const savedMessage = await response.json();
    if (newMessage.chatroomId === currentChatroomId) {
      fetchChatroomMessages(currentChatroomId)
    } 
    fetchAllMessages();
  
  };

  const deleteMessage = async (id) => {
    await fetch(`${API_ROOT}/messages/` + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setMessages(messages.filter((message) => message.id !== id));
    setFilteredMessages(filteredMessages.filter((message) => message.id !== id));
    if (currentChatroomId) {
      fetchChatroomMessages(currentChatroomId);
    }
    fetchAllMessages();
  };

  const updateMessage = async (id) => {
    await fetch(`${API_ROOT}/messages/` + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });
    await fetchChatroomMessages();
    fetchAllMessages();
  };

  const postUser = async (newUser) => {
    const response = await fetch(`${API_ROOT}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const savedUser = await response.json();
    setUsers([...users, savedUser]);
    setFilteredUsers([...users, savedUser]);
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
    setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
  };

  const postChatroom = async (newChatroom) => {
    const response = await fetch(`${API_ROOT}/chatrooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newChatroom),
    });
    const savedChatroom = await response.json();
    setChatrooms([...chatrooms, savedChatroom]);
    setFilteredChatrooms([...chatrooms, savedChatroom]);
  };

  const deleteChatroom = async (id) => {
    await fetch(`${API_ROOT}/chatrooms/` + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setChatrooms(chatrooms.filter((chatroom) => chatroom.id !== id));
    setFilteredChatrooms(
      filteredChatrooms.filter((chatroom) => chatroom.id !== id)
    );
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

  const messageLoader = ({ params }) => {
    console.log(params);
    console.log( allMessages.find((message) => message.id === parseInt(params.id)));
    return allMessages.find((message) => message.id === parseInt(params.id));
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
          path: "/profile",
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
                setCurrentChatroomId={setCurrentChatroomId}
              />
            </section>
          ),
        },
        {
          path: "/chatrooms/:id/edit",
          loader: chatroomLoader,
          element: <EditChatroomForm updateChatroom={updateChatroom} />,
        },
        {
          path: "/chatrooms/:id",
          element: (
            <>
              <ChatroomNavigation />
              <ChatroomMessageList 
              chatroomMessages={chatroomMessages}
              deleteMessage={ deleteMessage}
              
              />
              <NewMessageForm 
              postMessage={postMessage}
              currentUserId={currentUserId}
              currentChatroomId={currentChatroomId}
              />
            
            </>
          ),
        },
        {
          path: "/messages/:id/edit",
          loader: messageLoader,
          element: <EditMessageForm updateMessage={updateMessage} />,
        },
      ],
    },
  ]);

  useEffect(() => {
    fetchUsers();
    fetchChatrooms();
    fetchAllMessages();
  }, []);

  useEffect(() => {
    if (currentChatroomId){
      fetchChatroomMessages(currentChatroomId);
    }
  }, [currentChatroomId]);

  useEffect(() => {
    if (currentUserId) {
      fetchUserMessages(currentUserId);
    }
  }, [currentUserId]);

  return (
    <>
      <h1>BIG BLETHER</h1>
      <RouterProvider router={chatroomRoutes} />
    </>
  );
};

export default ChatroomContainer;