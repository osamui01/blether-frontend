import { Link, Outlet } from "react-router-dom";
const Chatroom = ({ chatroom, deleteChatroom }) => {
  const handleChatroomDelete = () => {
    deleteChatroom(chatroom.id);
  };
  return (
    <>
      <div className="chatroom-items">
        <p className="chatroom-name">{chatroom.name}</p>
        <p className="chatroom-cap">Capacity: {chatroom.capacity}</p>
        <p className="chatroom-age">Age Limit: {chatroom.ageLimit}</p>
        <Link className="chatroom-edit" to={`/chatrooms/${chatroom.id}`}>
          Enter
        </Link>
        <Link className="chatroom-edit" to={`/chatrooms/${chatroom.id}/edit`}>
          Edit
        </Link>
        <button className="chatroom-delete" onClick={handleChatroomDelete}>
          Delete
        </button>
        <Outlet />
      </div>
    </>
  );
};

export default Chatroom;
