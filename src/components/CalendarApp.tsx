import { ChevronLeft, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

interface CalendarAppProps {
    onClose: () => void;
    onStartClose?: () => void;
}

const EXPERIENCE_EVENTS = [
    { id: 101, title: 'Senior Product Designer', company: 'Apple', date: 'Jan 2024 - Present', color: '#000000', logo: '' },
    { id: 102, title: 'UI/UX Lead', company: 'Airbnb', date: 'Mar 2022 - Dec 2023', color: '#FF5A5F', logo: '🏠' },
    { id: 103, title: 'Product Designer', company: 'Spotify', date: 'Jun 2020 - Feb 2022', color: '#1DB954', logo: '🎧' },
    { id: 104, title: 'Junior Designer', company: 'Google', date: 'Aug 2018 - May 2020', color: '#4285F4', logo: 'G' },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20, y: 10 },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { type: 'spring', stiffness: 50, damping: 12 }
    }
};

const lineVariants: Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
        height: 'calc(100% - 3.5rem)',
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.1 }
    }
};

export function CalendarApp({ onClose, onStartClose }: CalendarAppProps) {
    const [isVisible, setIsVisible] = useState(false);

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

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#ffffff', // Calendar usually has white bg
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
                paddingBottom: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#ffffff',
                zIndex: 20
            }}>
                <button
                    onClick={handleClose}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#ff3b30', // iOS Red
                        fontWeight: 400,
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '17px'
                    }}
                >
                    <ChevronLeft size={24} style={{ marginLeft: '-8px' }} />
                    <span>Back</span>
                </button>

                {/* Right Side Icons */}
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <Search size={22} color="#ff3b30" />
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto' }}>

                {/* List View for Experience */}
                <div style={{ padding: '0 1rem 2rem 1rem' }}>
                    <div style={{ padding: '0 0.25rem 1rem 0.25rem' }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{ fontSize: '34px', fontWeight: 700, margin: 0, letterSpacing: '0.01em', color: '#000' }}
                        >
                            Experience
                        </motion.h1>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        style={{ position: 'relative', paddingLeft: '0.5rem', paddingTop: '1rem' }}
                    >
                        {/* Vertical Line */}
                        <motion.div
                            variants={lineVariants}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                left: '31px',
                                width: '2px',
                                backgroundColor: '#d1d1d6',
                                originY: 0
                            }}
                        />

                        {EXPERIENCE_EVENTS.map((event) => (
                            <motion.div
                                key={event.id}
                                variants={itemVariants}
                                whileHover={{ x: 5 }}
                                style={{ position: 'relative', marginBottom: '2.5rem', paddingLeft: '4rem' }}
                            >
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
                                    <div style={{ fontSize: '17px', fontWeight: 600, color: '#000' }}>{event.title}</div>
                                    <div style={{ fontSize: '15px', color: '#000', marginBottom: '2px' }}>{event.company}</div>
                                    <div style={{ fontSize: '13px', color: '#8e8e93', fontWeight: 500 }}>{event.date}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
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
