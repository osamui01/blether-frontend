const Message = ({ message, deleteMessage }) => {
  const handleMessageDelete = () => {
    deleteMessage(message.id);
  };

  return (
    <>
    <div className="message-items">
      <p>{message.content}</p>
      <button className="delete-message" onClick={handleMessageDelete}>Delete</button>
    </div>
    </>
  );
};

export default Message;
