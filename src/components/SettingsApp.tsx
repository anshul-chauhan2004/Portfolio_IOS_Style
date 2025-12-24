import { ChevronLeft, ChevronRight, MapPin, GraduationCap, Download, Database, Rocket, Users, Globe, Zap, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import ProfileImage from '../assets/profile.jpg';

interface SettingsAppProps {
    onClose: () => void;
    onStartClose?: () => void;
}

export function SettingsApp({ onClose, onStartClose }: SettingsAppProps) {
    const [isVisible, setIsVisible] = useState(false);

    // Trigger entry animation
    useEffect(() => {
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    const handleClose = () => {
        if (onStartClose) onStartClose();
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const SectionHeader = ({ title }: { title: string }) => (
        <div style={{
            fontSize: '0.8125rem',
            color: '#6c6c70',
            textTransform: 'uppercase',
            padding: '0 1rem 0.5rem 1rem',
            marginBottom: '0',
            marginTop: '1.5rem',
            letterSpacing: '-0.1px'
        }}>
            {title}
        </div>
    );

    const ListItem = ({
        icon,
        label,
        value,
        isLink = false,
        isLast = false,
        color = '#007aff',
        textColor = '#000',
        onClick
    }: {
        icon?: React.ReactNode,
        label: string,
        value?: string,
        isLink?: boolean,
        isLast?: boolean,
        color?: string,
        textColor?: string,
        onClick?: () => void
    }) => (
        <div
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '11px 0',
                marginLeft: '16px',
                borderBottom: isLast ? 'none' : '0.5px solid #c6c6c8',
                cursor: (isLink || onClick) ? 'pointer' : 'default',
            }}
        >
            {icon && (
                <div style={{
                    minWidth: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    backgroundColor: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    color: 'white'
                }}>
                    {icon}
                </div>
            )}
            <div style={{ flex: 1, fontSize: '17px', color: textColor, letterSpacing: '-0.3px' }}>
                {label}
            </div>
            {value && (
                <div style={{ fontSize: '17px', color: '#8e8e93', marginRight: isLink ? '8px' : '16px' }}>
                    {value}
                </div>
            )}
            {isLink && (
                <ChevronRight size={20} color="#c7c7cc" style={{ marginRight: '16px' }} />
            )}
        </div>
    );

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#f2f2f7', // iOS Grouped Background
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
                backgroundColor: 'rgba(242, 242, 247, 0.9)',
                backdropFilter: 'blur(20px)',
                zIndex: 20,
                position: 'sticky',
                top: 0
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
                <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontWeight: 600, fontSize: '17px' }}>Settings</span>
            </div>

            {/* Scrollable Content */}
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingBottom: '3rem' }}>

                {/* Profile Section - iOS Style Large Header */}
                <div style={{ padding: '0 1rem 1.5rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                        src={ProfileImage}
                        alt="Profile"
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            objectPosition: '28% 50%',
                            border: '1px solid #c6c6c8'
                        }}
                    />
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 600, margin: 0, letterSpacing: '0.3px' }}>Anshul Chauhan</h1>
                        <p style={{ fontSize: '15px', color: '#8e8e93', margin: '2px 0 0 0' }}>Software Developer</p>
                        <p style={{ fontSize: '13px', color: '#8e8e93', margin: '1px 0 0 0' }}>CSE @ Chitkara University</p>
                    </div>
                </div>

                {/* Info Group */}
                <div style={{ backgroundColor: 'white', borderRadius: '10px', margin: '0 1rem', overflow: 'hidden' }}>
                    <ListItem
                        icon={<MapPin size={16} />}
                        label="Location"
                        value="Chandigarh"
                        color="#34c759"
                    />
                    <ListItem
                        icon={<GraduationCap size={16} />}
                        label="CGPA"
                        value="9.0"
                        color="#ff9500"
                        isLast={true}
                    />
                </div>

                {/* Resume Section */}
                <SectionHeader title="Documents" />
                <div style={{ backgroundColor: 'white', borderRadius: '10px', margin: '0 1rem', overflow: 'hidden' }}>
                    <ListItem
                        icon={<Download size={16} />}
                        label="Resume"
                        value="PDF"
                        isLink={true}
                        color="#ff3b30"
                        isLast={true}
                        onClick={() => window.open('/resume.pdf', '_blank')}
                    />
                </div>

                {/* Education Section */}
                <SectionHeader title="Education" />
                <div style={{ backgroundColor: 'white', borderRadius: '10px', margin: '0 1rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {/* Chitkara University */}
                    <div style={{ padding: '12px 16px', borderBottom: '0.5px solid #c6c6c8' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
                            <span style={{ fontWeight: 600, fontSize: '16px', color: '#000' }}>Chitkara University</span>
                            <span style={{ color: '#8e8e93', fontSize: '14px', fontVariantNumeric: 'tabular-nums' }}>2023–Present</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#8e8e93', marginBottom: '2px' }}>Coursework: DSA, OOP, OS, CN, DBMS</div>
                        <div style={{ fontSize: '15px', color: '#3c3c43' }}>B.E. CSE (CGPA 9.0)</div>
                    </div>

                    {/* GMSSS */}
                    <div style={{ padding: '12px 16px', borderBottom: '0.5px solid #c6c6c8' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
                            <span style={{ fontWeight: 600, fontSize: '16px', color: '#000' }}>GMSSS, Chandigarh</span>
                            <span style={{ color: '#8e8e93', fontSize: '14px', fontVariantNumeric: 'tabular-nums' }}>2023</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#8e8e93', marginBottom: '2px' }}>CBSE BOARD</div>
                        <div style={{ fontSize: '15px', color: '#3c3c43' }}>Class XII (80%)</div>
                    </div>

                    {/* Little Flower Convent */}
                    <div style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'baseline' }}>
                            <span style={{ fontWeight: 600, fontSize: '16px', color: '#000' }}>Little Flower Convent</span>
                            <span style={{ color: '#8e8e93', fontSize: '14px', fontVariantNumeric: 'tabular-nums' }}>2021</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#8e8e93', marginBottom: '2px' }}>ICSE BOARD</div>
                        <div style={{ fontSize: '15px', color: '#3c3c43' }}>Class X (94%)</div>
                    </div>
                </div>

                {/* Bio Section */}
                <SectionHeader title="About" />
                <div style={{ backgroundColor: 'white', borderRadius: '10px', margin: '0 1rem', padding: '12px 16px' }}>
                    <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.4', color: '#3c3c43' }}>
                        Building smart, scalable, and user-centric digital experiences — turning complex ideas into polished realities.
                    </p>
                </div>



                {/* Future Section */}
                <SectionHeader title="Future Focus" />
                <div style={{ backgroundColor: 'white', borderRadius: '10px', margin: '0 1rem', overflow: 'hidden' }}>
                    <ListItem
                        icon={<Zap size={16} />}
                        label="AI-assisted workflows"
                        color="#FF9500"
                    />
                    <ListItem
                        icon={<Database size={16} />}
                        label="Strong software fundamentals"
                        color="#007AFF"
                    />
                    <ListItem
                        icon={<Rocket size={16} />}
                        label="Versatile Engineer"
                        color="#ff9500"
                    />
                    <ListItem
                        icon={<Users size={16} />}
                        label="Scalable Products"
                        color="#ffcc00"
                    />
                    <ListItem
                        icon={<Globe size={16} />}
                        label="Web & Cloud Systems"
                        color="#007aff"
                    />
                    <ListItem
                        icon={<Zap size={16} />}
                        label="Blockchain & Real-time"
                        color="#5856d6"
                    />
                    <ListItem
                        icon={<Heart size={16} />}
                        label="Open Source"
                        color="#ff2d55"
                        isLast={true}
                    />
                </div>

                {/* Vision Footer */}
                <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                    <p style={{
                        fontSize: '13px',
                        color: '#8e8e93',
                        margin: 0,
                        lineHeight: '1.5',
                        maxWidth: '280px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        Long-term vision: "Engineer technology that empowers people — everywhere."
                    </p>
                </div>

                {/* Bottom Spacer for Home Indicator */}
                <div style={{ height: '2rem' }} />

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
