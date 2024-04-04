const Message = ({ message, deleteMessage }) => {
  const handleMessageDelete = () => {
    deleteMessage(message.id);
  };

  return (
    <>
    <div className="message-items">
      <p>{message.content}</p>
      <h6>Sent by: {message.user.name}</h6>
      <button className="delete-message" onClick={handleMessageDelete}>Delete</button>
    </div>
    </>
  );
};

export default Message;
