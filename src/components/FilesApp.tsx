import { Search, MoreHorizontal, ChevronLeft, Calendar, Building, ArrowUpDown, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { certificates, Certificate } from '../data/certificates';
import { motion, AnimatePresence } from 'framer-motion';

interface FilesAppProps {
    onClose: () => void;
    onStartClose?: () => void;
}

type SortOption = 'date' | 'name' | 'issuer';

const IssuerLogo = ({ issuer }: { issuer: string }) => {
    // Check for specific logos
    const lower = issuer.toLowerCase();
    if (lower.includes('akamai')) {
        return (
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                flexShrink: 0,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                padding: '4px'
            }}>
                <img src="/src/assets/akamai.png" alt="Akamai" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        );
    }

    if (lower.includes('hkust') || lower.includes('hong kong')) {
        return (
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                flexShrink: 0,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                padding: '2px'
            }}>
                <img src="/src/assets/hkust.png" alt="HKUST" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        );
    }

    if (lower.includes('duke')) {
        return (
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                flexShrink: 0,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                padding: '0px'
            }}>
                <img src="/src/assets/duke.png" alt="Duke" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        );
    }

    if (lower.includes('copenhagen')) {
        return (
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                flexShrink: 0,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                padding: '4px'
            }}>
                <img src="/src/assets/cbs.png" alt="CBS" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        );
    }

    if (lower.includes('ibm')) {
        return (
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                flexShrink: 0,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                padding: '4px'
            }}>
                <img src="/src/assets/ibm.png" alt="IBM" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        );
    }

    if (lower.includes('mcmaster')) {
        return (
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'black', // McMaster logo background is often black
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                flexShrink: 0,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                padding: '4px'
            }}>
                <img src="/src/assets/mcmaster.png" alt="McMaster" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        );
    }

    if (lower.includes('toronto')) {
        return (
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                flexShrink: 0,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                padding: '2px'
            }}>
                <img src="/src/assets/uoft.png" alt="UofT" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        );
    }

    // Generate distinct colors based on issuer name
    const getColors = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('copenhagen')) return ['#663399', '#ffffff']; // Purple
        if (lower.includes('ibm')) return ['#006699', '#ffffff']; // IBM Blue
        if (lower.includes('copenhagen')) return ['#663399', '#ffffff']; // Purple
        if (lower.includes('mcmaster')) return ['#7A003C', '#ffffff']; // Maroon
        if (lower.includes('akamai')) return ['#FF9900', '#ffffff']; // Orange
        if (lower.includes('toronto')) return ['#002A5C', '#ffffff']; // UofT Blue
        return ['#8e8e93', '#ffffff']; // Default Gray
    };

    const [bg, text] = getColors(issuer);
    const initials = issuer.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

    return (
        <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: `linear-gradient(135deg, ${bg}, ${bg}dd)`,
            color: text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 700,
            marginRight: '16px',
            flexShrink: 0,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            {initials}
        </div>
    );
};

export function FilesApp({ onClose, onStartClose }: FilesAppProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('date');
    const [showMenu, setShowMenu] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

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

    const filteredCertificates = certificates.filter(cert =>
        cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
        if (sortBy === 'date') {
            // Simple date parsing for Month YYYY
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        }
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'issuer') return a.issuer.localeCompare(b.issuer);
        return 0;
    });



    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white',
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '2.5rem',
                overflow: 'hidden',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.92)',
                transition: 'opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                pointerEvents: isVisible ? 'auto' : 'none',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                color: 'black'
            }}
            onClick={() => setShowMenu(false)} // Close menu on click outside
        >
            {/* Certificate Preview Modal */}
            <AnimatePresence>
                {selectedCertificate && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: '#f5f5f7',
                            zIndex: 300,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {/* Preview Header */}
                        <div style={{
                            paddingTop: '3.5rem',
                            paddingBottom: '1rem',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#f5f5f7',
                            borderBottom: '1px solid #e5e5ea',
                            zIndex: 10
                        }}>
                            <button
                                onClick={() => setSelectedCertificate(null)}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    color: '#007aff',
                                    fontSize: '17px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    padding: '0'
                                }}
                            >
                                Done
                            </button>
                            <div style={{
                                fontWeight: 600,
                                fontSize: '17px',
                                maxWidth: '60%',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {selectedCertificate.name}
                            </div>
                            <div style={{ width: '40px' }} /> {/* Spacer to balance header */}
                        </div>

                        {/* Preview Content */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0', // Removed padding to extend for phone
                            overflow: 'hidden',
                            backgroundColor: 'black' // Dark background for better contrast
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white',
                                overflow: 'hidden'
                            }}>
                                {selectedCertificate.documentUrl ? (
                                    selectedCertificate.documentUrl.toLowerCase().endsWith('.pdf') ? (
                                        <embed
                                            src={selectedCertificate.documentUrl}
                                            type="application/pdf"
                                            width="100%"
                                            height="100%"
                                            style={{
                                                border: 'none',
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={selectedCertificate.documentUrl}
                                            alt={selectedCertificate.name}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    )
                                ) : (
                                    <div style={{ textAlign: 'center', color: '#8e8e93' }}>
                                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
                                        <div>Preview not available</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div style={{
                paddingTop: '3.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f9f9f9',
                borderBottom: '1px solid #c6c6c8',
                zIndex: 20
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', position: 'relative' }}>
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
                            padding: 0,
                            zIndex: 10
                        }}
                    >
                        <ChevronLeft size={26} style={{ marginLeft: '-8px' }} />
                        <span style={{ letterSpacing: '-0.4px' }}>Back</span>
                    </button>
                    <span style={{
                        fontWeight: 600,
                        fontSize: '17px',
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        textAlign: 'center',
                        pointerEvents: 'none'
                    }}>
                        Files
                    </span>

                    <div style={{ position: 'relative', zIndex: 30 }}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu(!showMenu);
                            }}
                            style={{
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: showMenu ? '#e5e5ea' : 'transparent'
                            }}
                        >
                            <MoreHorizontal size={24} color="#007aff" />
                        </button>

                        <AnimatePresence>
                            {showMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: 0,
                                        marginTop: '8px',
                                        backgroundColor: '#f9f9f9', // iOS Menu BG
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                                        width: '200px',
                                        overflow: 'hidden',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)'
                                    }}
                                >
                                    {[
                                        { id: 'date', label: 'Date', icon: <Calendar size={18} /> },
                                        { id: 'name', label: 'Name', icon: <ArrowUpDown size={18} /> },
                                        { id: 'issuer', label: 'Issuer', icon: <Building size={18} /> },
                                    ].map((option, index) => (
                                        <div
                                            key={option.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSortBy(option.id as SortOption);
                                                setShowMenu(false);
                                            }}
                                            style={{
                                                padding: '12px 16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                borderBottom: index < 2 ? '1px solid #e5e5ea' : 'none',
                                                cursor: 'pointer',
                                                fontSize: '16px'
                                            }}
                                        >
                                            {option.icon}
                                            <span style={{ flex: 1 }}>{option.label}</span>
                                            {sortBy === option.id && <Check size={16} color="#007aff" />}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Search Bar */}
                <div style={{
                    backgroundColor: '#e3e3e8',
                    borderRadius: '30px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <Search size={16} color="#8e8e93" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            border: 'none',
                            background: 'transparent',
                            fontSize: '17px',
                            color: 'black',
                            outline: 'none',
                            width: '100%',
                            padding: 0
                        }}
                    />
                </div>
            </div>

            {/* Main Content without Animation */}
            <div
                className="no-scrollbar"
                style={{ flex: 1, overflowY: 'auto', backgroundColor: 'white' }}
            >
                <div
                    style={{
                        padding: '16px 16px 8px',
                    }}
                >
                    <div style={{
                        fontSize: '34px',
                        fontWeight: 700,
                        color: 'black',
                        marginBottom: '4px',
                        letterSpacing: '-0.5px'
                    }}>
                        Certificates
                    </div>
                    <div style={{
                        fontSize: '13px',
                        color: '#8e8e93',
                        textTransform: 'uppercase',
                        fontWeight: 600
                    }}>
                        {filteredCertificates.length} items • Sorted by {sortBy}
                    </div>
                </div>

                {filteredCertificates.map((cert) => (
                    <div
                        key={cert.id}
                        onClick={() => setSelectedCertificate(cert)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px 16px',
                            borderBottom: '1px solid #e5e5ea',
                            marginLeft: '16px',
                            cursor: 'pointer',
                            borderRadius: '12px', // Rounded for hover effect
                            marginRight: '16px' // Add right margin for hover effect spacing
                        }}
                    >
                        {/* Issuer Logo */}
                        <IssuerLogo issuer={cert.issuer} />

                        {/* File Details */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                fontSize: '17px',
                                fontWeight: 500, // Slightly bolder for title
                                marginBottom: '2px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                color: 'black'
                            }}>
                                {cert.name}
                            </div>
                            <div style={{ fontSize: '14px', color: '#8e8e93', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {cert.issuer} • {cert.date}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Visual padding at bottom */}
                <div style={{ height: '80px' }} />
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
