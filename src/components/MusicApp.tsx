import { ChevronLeft, Play, MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MusicAppProps {
    onClose: () => void;
    onStartClose?: () => void;
}

interface TechItem {
    name: string;
    artist: string;
    icon: string;
    color?: string; // Made optional
    description?: string; // Made optional
}

const categories = [
    {
        title: "Core Programming Languages",
        items: [
            { name: 'Java', artist: 'OOP Strong', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
            { name: 'JavaScript', artist: 'ES6+', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'TypeScript', artist: 'Type Safety', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
            { name: 'C / C++', artist: 'Systems & DSA', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
            { name: 'SQL', artist: 'Database Querying', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }, // Using MySQL icon for generic SQL
            { name: 'Bash', artist: 'Shell Scripting', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
        ]
    },
    {
        title: "Frontend Development",
        items: [
            { name: 'React.js', artist: 'The Library', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'Next.js', artist: 'App Router', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
            { name: 'HTML5', artist: 'Structure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { name: 'CSS3', artist: 'Styling', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
            { name: 'Tailwind CSS', artist: 'Utility First', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
            { name: 'Framer Motion', artist: 'Animations', icon: 'https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png' }, // Custom URL or generic
            { name: 'ShadCN UI', artist: 'Component Library', icon: 'https://avatars.githubusercontent.com/u/139895814?s=200&v=4' }, // GitHub Avatar
            { name: 'Figma', artist: 'Design to Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        ]
    },
    {
        title: "Backend Development",
        items: [
            { name: 'Node.js', artist: 'Runtime', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
            { name: 'Express.js', artist: 'Web Framework', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
            { name: 'REST APIs', artist: 'Communication', icon: 'https://cdn-icons-png.flaticon.com/512/2165/2165061.png' }, // Generic API icon
            { name: 'JWT / OAuth', artist: 'Authentication', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg' }, // OAuth icon
            { name: 'SSR', artist: 'Server Side Rendering', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' }, // Reusing Next.js
        ]
    },
    {
        title: "Databases & ORM",
        items: [
            { name: 'PostgreSQL', artist: 'Relational DB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            { name: 'Supabase', artist: 'Backend as a Service', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
            { name: 'MongoDB', artist: 'NoSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
            { name: 'Prisma', artist: 'ORM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
        ]
    },
    {
        title: "Cloud & DevOps",
        items: [
            { name: 'AWS', artist: 'Cloud Provider', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
            { name: 'Vercel', artist: 'Deployment', icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png' },
            { name: 'Netlify', artist: 'Hosting', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg' },
            { name: 'Docker', artist: 'Containerization', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            { name: 'CI/CD', artist: 'Automation', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' }, // Jenkins as generic rep
        ]
    },
    {
        title: "OS & Tools",
        items: [
            { name: 'Linux', artist: 'Administration', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
            { name: 'macOS', artist: 'Development OS', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/21/MacOS_wordmark_%282017%29.svg' },
            { name: 'Git', artist: 'Version Control', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
            { name: 'GitHub', artist: 'Collaboration', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        ]
    },
    {
        title: "CS Fundamentals",
        items: [
            { name: 'DSA', artist: 'Problem Solving', icon: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png' }, // Generic Algo icon
            { name: 'OOP', artist: 'Object Oriented', icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png' }, // Generic Structure icon
        ]
    },
    {
        title: "AI & Automation",
        items: [
            { name: 'OpenAI', artist: 'LLM APIs', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
            { name: 'Zapier', artist: 'Workflow', icon: 'https://cdn.worldvectorlogo.com/logos/zapier.svg' },
            { name: 'n8n', artist: 'Automation', icon: 'https://custom-icon-badges.demolab.com/badge/n8n-ea4b71.svg?logo=n8n&logoColor=white' },
        ]
    },
    {
        title: "UI/UX & Design",
        items: [
            { name: 'Figma', artist: 'Prototyping', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
            { name: 'Glassmorphism', artist: 'Aesthetic', icon: 'https://cdn-icons-png.flaticon.com/512/5766/5766914.png' }, // Generic design icon
        ]
    }
];

export function MusicApp({ onClose, onStartClose }: MusicAppProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [playingTrack, setPlayingTrack] = useState<TechItem | null>(null);

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

    const TrackRow = ({ item, isPlaying, onClick }: { item: TechItem, isPlaying: boolean, onClick: () => void }) => (
        <div
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 0',
                cursor: 'pointer',
                borderBottom: '1px solid #e5e5e5'
            }}>
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '6px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                padding: '8px'
            }}>
                <img src={item.icon} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: 500, color: 'black' }}>{item.name}</div>
                <div style={{ fontSize: '13px', color: '#8e8e93', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {item.artist}
                </div>
            </div>
            <MoreHorizontal size={20} color="#c7c7cc" />
        </div>
    );

    // Flatten all items for the marquee
    const allTechItems = categories.flatMap(cat => cat.items);

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
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            }}
        >
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>

            {/* Library Header */}
            <div style={{
                paddingTop: '3.5rem',
                paddingBottom: '0.75rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
                        color: '#fa2d48', // Apple Music Red
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
                <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontWeight: 600, fontSize: '17px' }}>Music</span>
            </div>

            {/* Marquee Section (Scrolling Animations) */}
            <div style={{
                width: '100%',
                overflow: 'hidden',
                padding: '20px 0',
                backgroundColor: '#f9f9f9',
                borderBottom: '1px solid #eee',
                marginBottom: '1rem'
            }}>
                <div style={{
                    display: 'flex',
                    width: 'fit-content',
                    animation: 'marquee 40s linear infinite' // Slowed down for more items
                }}>
                    {/* Render twice for seamless loop */}
                    {[...allTechItems, ...allTechItems].map((tech, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '0 20px',
                            minWidth: '60px'
                        }}>
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                style={{ width: '40px', height: '40px', marginBottom: '8px', objectFit: 'contain' }}
                            />
                            <span style={{ fontSize: '12px', fontWeight: 500, color: '#333' }}>{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem 6rem 1.5rem' }}>

                <h1 style={{ fontSize: '30px', fontWeight: 700, margin: '0 0 1.5rem 0', letterSpacing: '-0.5px' }}>Library</h1>

                {categories.map((category, index) => (
                    <div key={index} style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 700 }}>{category.title}</h2>
                        </div>

                        {category.items.map((item, i) => (
                            <TrackRow
                                key={i}
                                item={item as TechItem}
                                isPlaying={playingTrack?.name === item.name}
                                onClick={() => setPlayingTrack(item as TechItem)}
                            />
                        ))}
                    </div>
                ))}

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
                zIndex: 400 // Highest z-index to be on top of Detail View
            }} />
        </div>
    );
}
