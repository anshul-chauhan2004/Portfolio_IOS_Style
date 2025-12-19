import { ChevronLeft, MessageCircle, Mail, Github, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PhoneAppProps {
    onClose: () => void;
    onStartClose?: () => void;
}

export function PhoneApp({ onClose, onStartClose }: PhoneAppProps) {
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

    const ActionButton = ({ icon: Icon, label, color = '#007aff', onClick, isFilled = true }: { icon: any, label: string, color?: string, onClick?: () => void, isFilled?: boolean }) => (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                background: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 0',
                width: '74px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'transform 0.1s active:scale-95'
            }}
        >
            <div style={{ color: color }}>
                <Icon size={24} fill={isFilled && color === '#007aff' ? formatFill() : 'none'} />
            </div>
            <span style={{ fontSize: '11px', color: color, fontWeight: 500 }}>{label}</span>
        </button>
    );

    // Helper to handle fill for some icons if needed, though Lucide usually uses stroke
    const formatFill = () => 'currentColor';

    const InfoRow = ({ label, value, isLast = false, isLink = false, onClick }: { label: string, value: string, isLast?: boolean, isLink?: boolean, onClick?: () => void }) => (
        <div
            onClick={onClick}
            style={{
                padding: '12px 16px',
                backgroundColor: 'white',
                borderBottom: isLast ? 'none' : '0.5px solid #c6c6c8',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                cursor: isLink || onClick ? 'pointer' : 'default'
            }}>
            <span style={{ fontSize: '13px', color: '#000' }}>{label}</span>
            <span style={{ fontSize: '17px', color: isLink || onClick ? '#007aff' : '#000' }}>{value}</span>
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
                transform: isVisible ? 'none' : 'scale(0.92)',
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
                backgroundColor: 'rgba(242, 242, 247, 0.9)',
                backdropFilter: 'blur(20px)',
                zIndex: 20,
                position: 'sticky', // Keep sticky
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
                <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontWeight: 600, fontSize: '17px' }}>Contacts</span>
            </div>

            {/* Scrollable Content */}
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingBottom: '3rem' }}>

                {/* Profile Header Block */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0 0 1.5rem 0',
                    background: 'linear-gradient(to bottom, transparent 0%, transparent 100%)'
                }}>
                    <img
                        src="/src/assets/profile.jpg"
                        alt="Profile"
                        style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            objectPosition: '25% 50%',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            marginBottom: '10px'
                        }}
                    />
                    <h1 style={{ fontSize: '26px', fontWeight: 500, margin: 0, color: '#000', letterSpacing: '-0.5px' }}>Anshul Chauhan</h1>
                    <p style={{ fontSize: '15px', color: '#8e8e93', margin: '4px 0 0 0' }}>Software Developer</p>

                    {/* Action Row */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                        <ActionButton icon={MessageCircle} label="message" isFilled={false} onClick={() => window.open('https://t.me/anshul_chauhan_0504', '_blank')} />
                        <ActionButton icon={Mail} label="mail" isFilled={false} onClick={() => window.location.href = 'mailto:anshulchauhan0504@gmail.com'} />
                        <ActionButton icon={Linkedin} label="LinkedIn" isFilled={false} onClick={() => window.open('https://www.linkedin.com/in/anshul-chauhan-16a08b264/', '_blank')} />
                        <ActionButton icon={Github} label="GitHub" isFilled={false} onClick={() => window.open('https://github.com/anshul-chauhan2004', '_blank')} />
                    </div>
                </div>

                {/* Info Groups */}
                <div style={{ padding: '0 1rem' }}>

                    {/* Chat Block */}
                    <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                        <InfoRow
                            label="telegram"
                            value="@anshul_chauhan_0504"
                            isLink={true}
                            isLast={true}
                            onClick={() => window.open('https://t.me/anshul_chauhan_0504', '_blank')}
                        />
                    </div>

                    {/* Email Block */}
                    <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                        <InfoRow label="personal" value="anshulchauhan0504@gmail.com" isLink={true} onClick={() => window.location.href = 'mailto:anshulchauhan0504@gmail.com'} />
                        <InfoRow label="college" value="anshul1697.be23@chitakara.edu.in" isLast={true} isLink={true} onClick={() => window.location.href = 'mailto:anshul1697.be23@chitakara.edu.in'} />
                    </div>



                    {/* Notes */}
                    <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                        <div style={{ padding: '12px 16px', backgroundColor: 'white', minHeight: '80px' }}>
                            <span style={{ fontSize: '13px', color: '#000', display: 'block', marginBottom: '4px' }}>Notes</span>
                            <span style={{ fontSize: '15px', color: '#333', lineHeight: '1.4' }}>
                                Passionate about clean code and pixel-perfect UI. Open to opportunities in Full Stack Development.
                            </span>
                        </div>
                    </div>


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
