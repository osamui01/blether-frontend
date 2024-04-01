const Message = ({ message, deleteMessage }) => {
  const handleMessageDelete = () => {
    deleteMessage(message.id);
  };

  return (
    <>
      <p>{message.content}</p>
      <button onClick={handleMessageDelete}>Delete</button>
      <hr />
    </>
  );
};

export default Message;
