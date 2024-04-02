import { Link, Outlet } from "react-router-dom";
const Chatroom = ({ chatroom, deleteChatroom }) => {
  const handleChatroomDelete = () => {
    deleteChatroom(chatroom.id);
  };
  return (
    <>
      <p>Chatroom: {chatroom.name}</p>
      <p>Capacity: {chatroom.capacity}</p>
      <p>Age Limit: {chatroom.ageLimit}</p>
      <Link to={`/chatrooms/${chatroom.id}/edit`}>Edit</Link>
      <button onClick={handleChatroomDelete}>Delete</button>
      <Outlet />
      <hr />
    </>
  );
};

export default Chatroom;
