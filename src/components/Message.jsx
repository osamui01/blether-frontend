const Message = ({ message, deleteMessage }) => {
  const handleMessageDelete = () => {
    deleteMessage(message.id);
  };

  return (
    <>
    <div className="message-items">
      <p>{message.content}</p>
      <button onClick={handleMessageDelete}>Delete</button>
      <hr />
    </div>
    </>
  );
};

export default Message;
