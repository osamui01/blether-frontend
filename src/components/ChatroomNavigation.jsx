import { Link } from "react-router-dom";

const ChatroomNavigation = ({ getCurrentChatroom }) => {

    const currentChatroom = getCurrentChatroom();
    return (
        <div className="navDiv">
            <nav>
                <ul>
                    <li>
                        <Link className="chatroom-edit" to={`/chatrooms`} > Back </Link>
                    </li>

                    <li>
                        {currentChatroom.name}
                    </li>

                    <li>
                        <p>capacity: {currentChatroom.capacity}</p>
                        <p>age limit: {currentChatroom.ageLimit}</p>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default ChatroomNavigation;