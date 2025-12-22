import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    techStack: string[];
    link?: string;
    liveLink?: string;
    image?: string;
    color: string;
}

export function ProjectsStack() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const projects: Project[] = [
        {
            id: '1',
            title: 'CollabSpace',
            description: 'Real-time collaboration platform',
            category: 'WEB APP',
            techStack: ['Node.js', 'Express', 'Socket.io', 'JWT'],
            link: 'https://github.com/arsh342/collabspace',
            liveLink: 'https://collabspace-y7s9.onrender.com/',
            image: '/collabspace.png',
            color: '#667eea'
        },
        {
            id: '2',
            title: 'Institute Management',
            description: 'University management platform',
            category: 'DASHBOARD',
            techStack: ['React', 'Context API', 'CSS3'],
            link: 'https://github.com/anshul-chauhan2004/UAB',
            liveLink: 'https://uab-gamma.vercel.app/',
            image: '/uab.png',
            color: '#f093fb'
        },
        {
            id: '3',
            title: 'Smart Mining Helmet',
            description: 'IoT safety device for miners',
            category: 'IOT PROJECT',
            techStack: ['ESP32', 'IoT', 'C++'],
            image: '/helmet.png',
            color: '#4facfe'
        }
    ];

    return (
        <div style={{
            gridColumn: 'span 4',
            width: 'auto',
            maxWidth: '340px',
            marginLeft: '30px',
            background: 'transparent',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            borderRadius: '24px',
            padding: '14px',
            border: 'none',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            {/* Header */}
            <div style={{
                paddingLeft: '4px',
                textAlign: 'center'
            }}>
                <h3 style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#000000',
                    margin: 0,
                    letterSpacing: '0.3px',
                    textTransform: 'uppercase'
                }}>
                    My Projects
                </h3>
            </div>

            {/* Project Cards */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                {projects.map((project, index) => (
                    <a
                        key={project.id}
                        href={project.liveLink || project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                            display: 'flex',
                            gap: '10px',
                            background: hoveredIndex === index
                                ? 'rgba(30, 41, 59, 0.95)'
                                : 'rgba(15, 23, 42, 0.9)',
                            borderRadius: '14px',
                            padding: '10px',
                            border: hoveredIndex === index
                                ? `1.5px solid ${project.color}60`
                                : '1.5px solid rgba(255, 255, 255, 0.15)',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            transform: hoveredIndex === index ? 'scale(1.02)' : 'scale(1)',
                            boxShadow: hoveredIndex === index
                                ? `0 8px 24px ${project.color}40, 0 0 0 1px ${project.color}20`
                                : '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        {/* Project Icon/Image */}
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '12px',
                            background: project.image
                                ? 'white'
                                : `linear-gradient(135deg, ${project.color}50, ${project.color}30)`,
                            border: `1.5px solid ${project.color}40`,
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            fontWeight: 900,
                            color: project.color,
                            overflow: 'hidden',
                            transition: 'transform 0.2s ease',
                            transform: hoveredIndex === index ? 'rotate(-5deg)' : 'rotate(0deg)',
                            padding: project.image ? '8px' : '0'
                        }}>
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            ) : (
                                index + 1
                            )}
                        </div>

                        {/* Project Info */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            minWidth: 0,
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                fontSize: '9px',
                                fontWeight: 700,
                                color: 'rgba(255, 255, 255, 0.4)',
                                letterSpacing: '0.8px',
                                textTransform: 'uppercase'
                            }}>
                                {project.category}
                            </div>
                            <h4 style={{
                                fontSize: '14px',
                                fontWeight: 800,
                                color: 'white',
                                margin: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                lineHeight: 1.2
                            }}>
                                {project.title}
                            </h4>
                            <p style={{
                                fontSize: '11px',
                                color: 'rgba(255, 255, 255, 0.5)',
                                margin: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                lineHeight: 1.3
                            }}>
                                {project.description}
                            </p>
                        </div>

                        {/* Arrow Icon */}
                        {(project.liveLink || project.link) && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                opacity: hoveredIndex === index ? 1 : 0.3,
                                transition: 'opacity 0.2s ease'
                            }}>
                                <ExternalLink
                                    size={14}
                                    style={{
                                        color: project.color,
                                        strokeWidth: 2.5
                                    }}
                                />
                            </div>
                        )}
                    </a>
                ))}
            </div>

            {/* Footer - View All */}
            <div style={{
                marginTop: '2px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                <a
                    href="https://github.com/anshul-chauhan2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '11px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.2s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    }}
                >
                    View All Projects
                    <ExternalLink size={10} />
                </a>
            </div>
        </div>
    );
}
