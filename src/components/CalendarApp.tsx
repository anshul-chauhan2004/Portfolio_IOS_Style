import { ChevronLeft, Plus, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CalendarAppProps {
    onClose: () => void;
    onStartClose?: () => void;
}

export function CalendarApp({ onClose, onStartClose }: CalendarAppProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<'experience' | 'journey'>('experience');

    // Trigger entry animation
    useEffect(() => {
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    const handleClose = () => {
        if (onStartClose) onStartClose(); // Trigger instant status bar change
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to finish
    };

    // Mock Data
    const experienceEvents = [
        { id: 1, title: 'Senior Product Designer', company: 'Apple', date: 'Jan 2024 - Present', color: '#000000', logo: '' },
        { id: 2, title: 'UI/UX Lead', company: 'Airbnb', date: 'Mar 2022 - Dec 2023', color: '#ff5a5f', logo: '🏠' },
        { id: 3, title: 'Product Designer', company: 'Spotify', date: 'Jun 2020 - Feb 2022', color: '#1db954', logo: '🎧' },
        { id: 4, title: 'Junior Designer', company: 'Google', date: 'Aug 2018 - May 2020', color: '#4285f4', logo: 'G' },
    ];

    const journeyUpdates = [
        { id: 1, title: 'Deployed Portfolio App', date: 'December 7, 2025', description: 'Finally shipped the v1 of my portfolio.', icon: '🚀', color: '#3b82f6' },
        { id: 2, title: 'Mastering animations', date: 'December 5, 2025', description: 'Deep dived into spring physics for smoother UI interactions.', icon: '✨', color: '#8b5cf6' },
        { id: 3, title: 'Started React Native Course', date: 'November 28, 2025', description: 'Expanding skills to mobile development.', icon: '�', color: '#10b981' },
        { id: 4, title: 'Design System Workshop', date: 'November 15, 2025', description: 'Attended a workshop on building scalable design systems.', icon: '🎨', color: '#f59e0b' },
        { id: 5, title: 'First Open Source PR', date: 'November 1, 2025', description: 'Fixed a buggy accessible label in a popular UI library.', icon: '⌨️', color: '#ec4899' },
    ];

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#f2f2f7', // iOS Grouped Background Color
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '2.5rem',
                overflow: 'hidden',
                // Animation styles
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.92)',
                transition: 'opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                pointerEvents: isVisible ? 'auto' : 'none'
            }}
        >
            {/* Header */}
            <div style={{
                paddingTop: '3.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f2f2f7', // Match background
                zIndex: 20
            }}>
                <button
                    onClick={handleClose}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#ff3b30', // iOS Red
                        fontWeight: 500,
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '1.0625rem'
                    }}
                >
                    <ChevronLeft size={22} style={{ marginLeft: '-6px' }} />
                    <span>Back</span>
                </button>

                {/* Optional Title or Empty to mimic iOS nav bar */}
                <div style={{ width: '24px' }} />
            </div>

            {/* iOS Segmented Control */}
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <div style={{
                    display: 'flex',
                    backgroundColor: '#e3e3e8', // iOS Segmented Control Container
                    padding: '2px',
                    borderRadius: '8.91px',
                    height: '32px'
                }}>
                    <button
                        onClick={() => setActiveTab('experience')}
                        style={{
                            flex: 1,
                            borderRadius: '6.93px',
                            border: 'none',
                            fontSize: '0.8125rem', // 13px
                            fontWeight: activeTab === 'experience' ? 600 : 500,
                            cursor: 'pointer',
                            backgroundColor: activeTab === 'experience' ? 'white' : 'transparent',
                            color: 'black',
                            boxShadow: activeTab === 'experience' ? '0 3px 8px rgba(0,0,0,0.12), 0 3px 1px rgba(0,0,0,0.04)' : 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        Experience
                    </button>
                    <div style={{ width: '1px', backgroundColor: activeTab === 'experience' || activeTab === 'journey' ? 'transparent' : '#8e8e93', margin: '8px 0', opacity: 0.5 }} />
                    <button
                        onClick={() => setActiveTab('journey')}
                        style={{
                            flex: 1,
                            borderRadius: '6.93px',
                            border: 'none',
                            fontSize: '0.8125rem', // 13px
                            fontWeight: activeTab === 'journey' ? 600 : 500,
                            cursor: 'pointer',
                            backgroundColor: activeTab === 'journey' ? 'white' : 'transparent',
                            color: 'black',
                            boxShadow: activeTab === 'journey' ? '0 3px 8px rgba(0,0,0,0.12), 0 3px 1px rgba(0,0,0,0.04)' : 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        My Journey
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingBottom: '2rem' }}>

                {/* Large Title */}
                <div style={{ padding: '0 1.25rem 0.5rem 1.25rem' }}>
                    <h1 style={{ fontSize: '2.125rem', fontWeight: 700, margin: 0, letterSpacing: '0.01em' }}>
                        {activeTab === 'experience' ? 'Experience' : 'My Journey'}
                    </h1>
                </div>

                <div style={{ padding: '1rem' }}>

                    {/* Experience View */}
                    {activeTab === 'experience' && (
                        <div style={{ position: 'relative', paddingLeft: '0.5rem' }}>
                            {/* Vertical Line */}
                            <div style={{
                                position: 'absolute',
                                top: '1.5rem',
                                bottom: 0,
                                left: '31px',  // Center of 48px icon is 24px + 8px padding = 32px. Line center 32px -> left 31px.
                                width: '2px',
                                backgroundColor: '#d1d1d6'
                            }} />

                            {experienceEvents.map((event) => (
                                <div key={event.id} style={{ position: 'relative', marginBottom: '2rem', paddingLeft: '3.5rem' }}>
                                    {/* Logo/Dot */}
                                    <div style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        backgroundColor: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        zIndex: 10
                                    }}>
                                        {event.logo}
                                    </div>

                                    <div style={{ paddingTop: '0.25rem' }}>
                                        <div style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#000' }}>{event.title}</div>
                                        <div style={{ fontSize: '0.9375rem', color: '#000', marginBottom: '0.25rem' }}>{event.company}</div>
                                        <div style={{ fontSize: '0.8125rem', color: '#8e8e93', fontWeight: 500 }}>{event.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Journey View */}
                    {activeTab === 'journey' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {journeyUpdates.map((update, index) => (
                                <div key={update.id} style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '2.5rem'
                                    }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8e8e93', marginBottom: '0.125rem', textTransform: 'uppercase' }}>
                                            {update.date.split(' ')[0].substring(0, 3)}
                                        </div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#000', lineHeight: 1 }}>
                                            {update.date.split(' ')[1].replace(',', '')}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#8e8e93', marginTop: '0.125rem' }}>
                                            {update.date.split(' ')[2]}
                                        </div>
                                    </div>

                                    <div style={{
                                        flex: 1,
                                        backgroundColor: 'white',
                                        borderRadius: '14px',
                                        padding: '1rem',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '1.25rem' }}>{update.icon}</span>
                                            <span style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#000' }}>{update.title}</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.9375rem', color: '#3c3c4399', lineHeight: '1.4' }}>
                                            {update.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                {/* Bottom Safe Area Spacer */}
                <div style={{ height: '4rem' }} />
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
