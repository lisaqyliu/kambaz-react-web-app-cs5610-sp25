import { useState } from 'react';
import { ListGroup, Form, Button, InputGroup } from 'react-bootstrap';
import { FaUserCircle, FaPaperPlane, FaSearch } from 'react-icons/fa';
import './style.css';

interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
    isMe: boolean;
}

interface Conversation {
    id: string;
    name: string;
    lastMessage: string;
    unread: number;
    online: boolean;
    avatar?: string;
}

export default function Inbox() {
    const [conversations] = useState<Conversation[]>([]);
    const [messages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };

    return (
        <div className="inbox-container">
            {/* Left sidebar with conversations */}
            <div className="conversations-sidebar">
                <div className="p-3 border-bottom">
                    <InputGroup>
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search conversations..."
                            className="border-start-0"
                        />
                    </InputGroup>
                </div>
                <ListGroup variant="flush">
                    {conversations.length === 0 ? (
                        <div className="text-center p-4 text-muted">
                            <p>No conversations yet</p>
                        </div>
                    ) : (
                        conversations.map(conv => (
                            <ListGroup.Item 
                                key={conv.id}
                                action 
                                className="conversation-item d-flex align-items-center p-3"
                            >
                                <div className="position-relative">
                                    <FaUserCircle className="conversation-avatar" />
                                    {conv.online && <div className="online-indicator"></div>}
                                </div>
                                <div className="ms-3 flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="mb-0">{conv.name}</h6>
                                        {conv.unread > 0 && (
                                            <span className="badge bg-danger rounded-pill">
                                                {conv.unread}
                                            </span>
                                        )}
                                    </div>
                                    <small className="text-muted">{conv.lastMessage}</small>
                                </div>
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
            </div>

            {/* Main chat area */}
            <div className="chat-area">
                {/* Chat header */}
                <div className="chat-header p-3 border-bottom">
                    <div className="d-flex align-items-center">
                        <FaUserCircle className="conversation-avatar" />
                        <div className="ms-3">
                            <h5 className="mb-0">Select a conversation</h5>
                            <small className="text-muted">No chat selected</small>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="messages-container p-3">
                    {messages.length === 0 ? (
                        <div className="text-center p-4 text-muted">
                            <p>No messages yet</p>
                            <small>Start a conversation by selecting a contact</small>
                        </div>
                    ) : (
                        messages.map(message => (
                            <div 
                                key={message.id}
                                className={`message ${message.isMe ? 'message-mine' : 'message-other'}`}
                            >
                                <div className="message-content">
                                    <p className="mb-1">{message.text}</p>
                                    <small className="text-muted">
                                        {formatTime(message.timestamp)}
                                    </small>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Message input */}
                <div className="message-input p-3 border-top">
                    <InputGroup>
                        <Form.Control
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={messages.length === 0}
                        />
                        <Button variant="danger" disabled={messages.length === 0}>
                            <FaPaperPlane />
                        </Button>
                    </InputGroup>
                </div>
            </div>
        </div>
    );
} 