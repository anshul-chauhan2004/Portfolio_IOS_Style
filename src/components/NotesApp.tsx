import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface NotesAppProps {
    onClose: () => void;
}

export function NotesApp({ onClose }: NotesAppProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#FFFEF5',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}>
            {/* Status Bar Spacer */}
            <div style={{ height: '50px', backgroundColor: '#FFFEF5' }} />

            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                position: 'relative'
            }}>
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        left: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        color: '#FF9500',
                        fontSize: '17px',
                        fontWeight: 400,
                        cursor: 'pointer',
                        padding: 0
                    }}
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>

                <span style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#000000'
                }}>
                    Notes
                </span>
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                overflowY: 'auto' as const,
                padding: '16px 20px 60px 20px',
                scrollbarWidth: 'none' as const,
                msOverflowStyle: 'none' as const,
                WebkitOverflowScrolling: 'touch' as const
            }}>
                {/* Title */}
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#1C1C1E',
                    margin: '0 0 20px 0'
                }}>
                    Upcoming Targets
                </h1>

                {/* Note Content */}
                <div style={{
                    fontSize: '17px',
                    lineHeight: '1.6',
                    color: '#1C1C1E'
                }}>
                    {/* Focus */}
                    <div style={{ marginBottom: '10px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#FF9500',
                            margin: '0 0 1px 0'
                        }}>
                            Focus
                        </h2>
                        <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            listStyleType: 'disc'
                        }}>
                            <li style={{ marginBottom: '8px' }}>
                                Strong fundamentals in DSA & System Design
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Consistent problem-solving mindset
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Clean, scalable engineering thinking
                            </li>
                        </ul>
                    </div>

                    {/* Divider */}
                    <div style={{
                        borderBottom: '1px solid #E5E5E7',
                        margin: '10px 0'
                    }} />

                    {/* Learn */}
                    <div style={{ marginBottom: '10px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#FF9500',
                            margin: '0 0 1px 0'
                        }}>
                            Learn
                        </h2>
                        <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            listStyleType: 'disc'
                        }}>
                            <li style={{ marginBottom: '8px' }}>
                                Advanced React
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                TypeScript & Next.js
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                System Design basics (LLD → HLD)
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Daily LeetCode practice
                            </li>
                        </ul>
                    </div>

                    {/* Divider */}
                    <div style={{
                        borderBottom: '1px solid #E5E5E7',
                        margin: '10px 0'
                    }} />

                    {/* Build */}
                    <div style={{ marginBottom: '10px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#FF9500',
                            margin: '0 0 1px 0'
                        }}>
                            Build
                        </h2>
                        <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            listStyleType: 'disc'
                        }}>
                            <li style={{ marginBottom: '8px' }}>
                                Real-world full-stack projects
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Improve existing work (UI, performance)
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Add real-time features
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Mobile-first experiences
                            </li>
                        </ul>
                    </div>

                    {/* Divider */}
                    <div style={{
                        borderBottom: '1px solid #E5E5E7',
                        margin: '10px 0'
                    }} />

                    {/* Explore */}
                    <div style={{ marginBottom: '10px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#FF9500',
                            margin: '0 0 1px 0'
                        }}>
                            Explore
                        </h2>
                        <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            listStyleType: 'disc'
                        }}>
                            <li style={{ marginBottom: '8px' }}>
                                Devpost hackathons
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Team-based rapid building
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Impact-driven ideas
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Well-documented demos
                            </li>
                        </ul>
                    </div>

                    {/* Divider */}
                    <div style={{
                        borderBottom: '1px solid #E5E5E7',
                        margin: '10px 0'
                    }} />

                    {/* Share */}
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#FF9500',
                            margin: '0 0 1px 0'
                        }}>
                            Share
                        </h2>
                        <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            listStyleType: 'disc'
                        }}>
                            <li style={{ marginBottom: '8px' }}>
                                Polished GitHub
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Technical posts on LinkedIn
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Short build notes & learnings
                            </li>
                            <li style={{ marginBottom: '8px' }}>
                                Open-source contributions
                            </li>
                        </ul>
                    </div>

                    {/* Divider */}
                    <div style={{
                        borderBottom: '1px solid #E5E5E7',
                        margin: '10px 0'
                    }} />

                    {/* Goal */}
                    <div style={{
                        background: '#FFF9E6',
                        padding: '10px',
                        borderRadius: '12px',
                        borderLeft: '4px solid #FF9500'
                    }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#FF9500',
                            margin: '0 0 1px 0'
                        }}>
                            Goal
                        </h3>
                        <p style={{
                            margin: 0,
                            fontSize: '15px',
                            color: '#1C1C1E',
                            lineHeight: '1.5'
                        }}>
                            Build skills quietly.<br />
                            Ship work consistently.<br />
                            Let results speak.
                        </p>
                    </div>
                </div>
            </div>

            {/* Home Indicator */}
            <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '134px',
                height: '5px',
                backgroundColor: 'black',
                borderRadius: '100px',
                zIndex: 100
            }} />
        </div>
    );
}
