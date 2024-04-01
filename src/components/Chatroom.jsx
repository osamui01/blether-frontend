const Chatroom = ({ chatroom, deleteChatroom }) => {
  const handleChatroomDelete = () => {
    deleteChatroom(chatroom.id);
  };
  return (
    <>
      <p>Chatroom: {chatroom.name}</p>
      <p>Capacity: {chatroom.capacity}</p>
      <p>Age Limit: {chatroom.ageLimit}</p>
      <button onClick={handleChatroomDelete}>Delete</button>
      <hr />
    </>
  );
};

export default Chatroom;
