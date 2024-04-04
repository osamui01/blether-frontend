import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const EditMessageForm = ({updateMessage}) => {

    const message = useLoaderData();
    const navigate = useNavigate();

    const [content, setContent] = useState(message.content);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const updatedMessage = {
            content: content,
            userId: message.user.id,
            chatroomId: message.chatroom.id
        };
        updateMessage(updatedMessage);
        setContent("");
        navigate("/chatrooms/:id")
    };
    return ( 
        <form onSubmit={handleFormSubmit}>
            <h4>Edit Message: {content.name} </h4>

            <input
                type="text"
                placeholder=""
                value= {content}
                onChange={(event) => setContent(event.target.value)}
                required
            />

            <input type="submit" value="Edit Message" />
        </form>
     );
}
 
export default EditMessageForm;