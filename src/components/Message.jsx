import { Link } from "react-router-dom";

const Message = ({ message, deleteMessage }) => {
  const handleMessageDelete = () => {
    deleteMessage(message.id);
  };

  return (
    <>
    <div className="message-items">
      <p>{message.content}</p>
      <Link className="message-edit" to={`/messages/${message.id}/edit`}>
          Edit
        </Link>
      <button className="delete-message" onClick={handleMessageDelete}>Delete</button>
    </div>
    </>
  );
};

export default Message;
