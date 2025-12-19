import { ChevronLeft, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

interface MessagesAppProps {
    onClose: () => void;
    onStartClose?: () => void;
}

interface Message {
    id: number;
    text: string;
    sender: string;
    avatar?: string;
    isUser: boolean;
    timestamp: string;
}

export function MessagesApp({ onClose, onStartClose }: MessagesAppProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [senderName, setSenderName] = useState(() => localStorage.getItem('user_name') || '');
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Initial Load & Subscription
    useEffect(() => {
        // 1. Load initial messages
        const fetchMessages = async () => {
            try {
                const { data, error } = await supabase
                    .from('messages')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (data) {
                    const mySentIds = JSON.parse(localStorage.getItem('my_sent_message_ids') || '[]');

                    const formattedMessages: Message[] = data.map((msg: any) => ({
                        id: msg.id,
                        text: msg.text,
                        sender: msg.sender,
                        isUser: mySentIds.includes(msg.id), // Check if I sent this
                        timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }));

                    setMessages(formattedMessages);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();

        // 2. Subscribe to new messages
        const channel = supabase
            .channel('messages_channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    const newMsg = payload.new;
                    const mySentIds = JSON.parse(localStorage.getItem('my_sent_message_ids') || '[]');

                    const formattedMsg: Message = {
                        id: newMsg.id,
                        text: newMsg.text,
                        sender: newMsg.sender,
                        isUser: mySentIds.includes(newMsg.id),
                        timestamp: new Date(newMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };

                    setMessages((prev) => {
                        // Prevent duplicates if we already added it manually
                        if (prev.some(msg => msg.id === formattedMsg.id)) {
                            return prev;
                        }
                        return [...prev, formattedMsg];
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Trigger entry animation
    useEffect(() => {
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleClose = () => {
        if (onStartClose) onStartClose();
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const textToSend = inputText;
        const nameToSend = senderName.trim() || 'Guest';

        setInputText(''); // Clear input immediately
        if (senderName.trim()) {
            localStorage.setItem('user_name', senderName.trim());
        }

        const { data, error } = await supabase
            .from('messages')
            .insert([
                { text: textToSend, sender: nameToSend } // Default sender name
            ])
            .select();

        if (data && data.length > 0) {
            const newMsgData = data[0];

            // Save this ID to local storage so we know "I" sent it
            const mySentIds = JSON.parse(localStorage.getItem('my_sent_message_ids') || '[]');
            mySentIds.push(newMsgData.id);
            localStorage.setItem('my_sent_message_ids', JSON.stringify(mySentIds));

            // Manually add to state for instant feedback
            const newMessage: Message = {
                id: newMsgData.id,
                text: newMsgData.text,
                sender: newMsgData.sender,
                isUser: true,
                timestamp: new Date(newMsgData.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages((prev) => [...prev, newMessage]);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white', // Messages app is usually white or very light gray
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '2.5rem',
                overflow: 'hidden',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.92)',
                transition: 'opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                pointerEvents: isVisible ? 'auto' : 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            }}
        >
            {/* Header */}
            <div style={{
                paddingTop: '3.5rem',
                paddingBottom: '0.75rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Translucent white header
                backdropFilter: 'blur(20px)',
                zIndex: 20,
                position: 'sticky',
                top: 0,
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
                <button
                    onClick={handleClose}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#007aff',
                        fontWeight: 400,
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '17px',
                        padding: 0
                    }}
                >
                    <ChevronLeft size={26} style={{ marginLeft: '-8px' }} />
                    <span style={{ letterSpacing: '-0.4px' }}>Back</span>
                </button>

                {/* Title Container */}
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '17px' }}>Messages</span>
                </div>

                <div style={{ width: '48px' }} /> {/* Spacer */}
            </div>

            {/* Messages Area */}
            <div
                ref={messagesContainerRef}
                className="no-scrollbar"
                style={{ flex: 1, overflowY: 'auto', padding: '1rem 1rem 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
                {isLoading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}>
                        <div className="spinner" style={{
                            width: '32px',
                            height: '32px',
                            border: '3px solid rgba(0,0,0,0.1)',
                            borderTop: '3px solid #007aff',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <style>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                    </div>
                ) : (
                    <>
                        {messages.map((msg) => (
                            <div key={msg.id} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: msg.isUser ? 'flex-end' : 'flex-start',
                                maxWidth: '100%',
                                marginBottom: '4px'
                            }}>
                                {!msg.isUser && (
                                    <span style={{ fontSize: '11px', color: '#8e8e93', marginLeft: '12px', marginBottom: '2px' }}>
                                        {msg.sender}
                                    </span>
                                )}
                                <div style={{
                                    padding: '10px 16px',
                                    borderRadius: '18px',
                                    backgroundColor: msg.isUser ? '#007aff' : '#e9e9eb',
                                    color: msg.isUser ? 'white' : 'black',
                                    maxWidth: '75%',
                                    fontSize: '17px',
                                    lineHeight: '1.4',
                                    borderBottomRightRadius: msg.isUser ? '4px' : '18px',
                                    borderBottomLeftRadius: msg.isUser ? '18px' : '4px',
                                    wordWrap: 'break-word',
                                    position: 'relative'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </>
                )}

            </div>

            {/* Input Area */}
            <div style={{
                padding: '12px 1rem 2rem 1rem', // Extra bottom padding for home indicator
                backgroundColor: 'white',
                borderTop: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                {/* Name Input */}
                <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name (Optional)"
                    style={{
                        fontSize: '13px',
                        color: '#333',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#f2f2f7',
                        width: '100%',
                        marginBottom: '4px'
                    }}
                />

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        flex: 1,
                        position: 'relative',
                        borderRadius: '20px',
                        border: '1px solid #c6c6c8',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Write a testimonial..."
                            style={{
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                fontSize: '17px',
                                background: 'transparent'
                            }}
                        />
                    </div>
                    <button
                        onClick={handleSend}
                        disabled={!inputText.trim()}
                        style={{
                            backgroundColor: inputText.trim() ? '#007aff' : '#c6c6c8',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: inputText.trim() ? 'pointer' : 'default',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        <Send size={16} fill="white" style={{ marginLeft: '2px' }} />
                    </button>
                </div>
            </div>

        </div>
    );
}
