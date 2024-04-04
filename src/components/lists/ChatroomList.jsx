import Chatroom from "../Chatroom";
import "../../styles/lists/ChatroomList.css";

const ChatroomList = ({ chatrooms, deleteChatroom, setCurrentChatroomId }) => {
  const chatroomComponents = chatrooms.map((chatroom) => {
    return (
      <Chatroom
        className="chatroom"
        key={chatroom.id}
        chatroom={chatroom}
        deleteChatroom={deleteChatroom}
        setCurrentChatroomId={setCurrentChatroomId}
      />
    );
  });
  return (
    <>
      <h3>Chatroom List</h3>
      <div className="chatroom-grid">{chatroomComponents}</div>
    </>
  );
};

export default ChatroomList;
