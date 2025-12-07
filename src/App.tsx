import { useState, useEffect } from 'react';
import { AppIcon } from './components/AppIcon';
import { DockIcon } from './components/DockIcon';
import { CalendarIcon } from './components/CalendarIcon';
import { SearchBar } from './components/SearchBar';
import { LockScreen } from './components/LockScreen';
import { BootScreen } from './components/BootScreen';
import { CalendarApp } from './components/CalendarApp';
import { Github, Linkedin, FolderOpen, Award, Mail, FileText, Code2, Briefcase, Terminal, Rocket, Globe, User } from 'lucide-react';

type AppData = {
  icon: any;
  label: string;
  color: 'peach' | 'coral' | 'yellow' | 'blue' | 'lavender' | 'beige';
  content?: {
    title: string;
    description: string;
  };
};

type PhoneState = 'BOOTING' | 'LOCKED' | 'UNLOCKED';

export default function App() {
  const [phoneState, setPhoneState] = useState<PhoneState>('BOOTING');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleOpenApp = (app: string) => {
    setIsClosing(false);
    setActiveApp(app);
  };


  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      setCurrentTime(`${hours}:${minutes.toString().padStart(2, '0')}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  type PageItem =
    | { type: 'calendar' }
    | { type: 'search' }
    | { image: string; label: string };

  const pages: PageItem[][] = [
    [
      { type: 'search' },
      { type: 'calendar' },
      { image: '/src/assets/app-icons/files.png', label: 'Files' },
      { image: '/src/assets/app-icons/photos.png', label: 'Photos' },
      { image: '/src/assets/app-icons/music.png', label: 'Music' },
      { image: '/src/assets/app-icons/settings.png', label: 'Settings' },
    ],
  ];

  const dockIcons = [
    { image: '/src/assets/app-icons/phone.png', label: 'Phone' },
    { image: '/src/assets/app-icons/safari.png', label: 'Safari' },
    { image: '/src/assets/app-icons/messages.png', label: 'Messages' },
    { image: '/src/assets/app-icons/notes.png', label: 'Notes' },
  ];

  const handlePageSwitch = (direction: 'left' | 'right') => {
    if (direction === 'right' && currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'left' && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black p-8 font-sans">
      {/* Ambient light effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative w-[380px] h-[780px] bg-black rounded-[3rem] p-3 shadow-2xl ring-8 ring-slate-800">
        <div
          className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: 'url("/wallpaper.png")' }}
        >
          {/* Boot Screen */}
          {phoneState === 'BOOTING' && (
            <BootScreen onComplete={() => setPhoneState('LOCKED')} />
          )}

          {/* Lock Screen */}
          {phoneState === 'LOCKED' && (
            <LockScreen onUnlock={() => setPhoneState('UNLOCKED')} />
          )}

          {/* Main Interface - Completely hidden when not unlocked */}
          <div id="phone-main-interface" className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${phoneState === 'UNLOCKED' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {/* Status Bar */}
            <div className="w-full relative pt-2">
              {/* Time - top left */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '50px',
                  fontSize: '19px',
                  fontWeight: '600',
                  color: activeApp && !isClosing ? 'black' : 'white', // adaptive color (white if closing)
                  zIndex: 301,
                  transition: activeApp && !isClosing ? 'color 0.2s ease' : 'none' // Instant when closing
                }}
              >
                {currentTime || '9:41'}
              </div>

              {/* Dynamic Island - centered pill shape */}
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '120px',
                  height: '35px',
                  backgroundColor: 'black',
                  borderRadius: '20px',
                  zIndex: 300 // Higher than CalendarApp (200)
                }}
              />

              {/* Status Icons - top right */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '14px',
                  zIndex: 301,
                  color: activeApp && !isClosing ? 'black' : 'white', // adaptive color (white if closing)
                  transition: activeApp && !isClosing ? 'color 0.2s ease' : 'none' // Instant when closing
                }}
              >
                {/* Signal Bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '16px' }}>
                  <div style={{ width: '4px', height: '6px', backgroundColor: activeApp && !isClosing ? 'black' : 'white', borderRadius: '1px' }} />
                  <div style={{ width: '4px', height: '9px', backgroundColor: activeApp && !isClosing ? 'black' : 'white', borderRadius: '1px' }} />
                  <div style={{ width: '4px', height: '12px', backgroundColor: activeApp && !isClosing ? 'black' : 'white', borderRadius: '1px' }} />
                  <div style={{ width: '4px', height: '15px', backgroundColor: activeApp && !isClosing ? 'black' : 'white', borderRadius: '1px' }} />
                </div>

                {/* 5G Text */}
                <span style={{ fontSize: '15px', fontWeight: '600', letterSpacing: '0.3px', color: activeApp && !isClosing ? 'black' : 'white' }}>5G</span>

                {/* Battery Icon */}
                <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                  <rect x="1" y="2" width="26" height="12" rx="3" stroke={activeApp && !isClosing ? 'black' : 'white'} strokeWidth="1.3" fill={activeApp && !isClosing ? 'black' : 'white'} fillOpacity="0.3" />
                  <rect x="3" y="4" width="20" height="8" rx="1.5" fill={activeApp && !isClosing ? 'black' : 'white'} />
                  <rect x="28" y="6" width="3" height="4" rx="1.2" fill={activeApp && !isClosing ? 'black' : 'white'} fillOpacity="0.6" />
                </svg>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col h-full px-4 pt-40 pb-4 justify-between">
              {/* App Grid with swipe animation */}
              <div
                className="grid grid-cols-4 gap-x-2 gap-y-10 flex-1 content-start transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${-currentPage * 100}%)`,
                  marginTop: '60px',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                }}
              >
                {pages[0].map((app, index) => {
                  if ('type' in app && app.type === 'search') {
                    return <SearchBar key={index} />;
                  }
                  if ('type' in app && app.type === 'calendar') {
                    return <CalendarIcon key={index} delay={index * 50} onClick={() => handleOpenApp('calendar')} isOpen={activeApp === 'calendar'} />;
                  }
                  // TypeScript now knows app has image and label
                  const appLabel = 'label' in app ? app.label : '';
                  const appImage = 'image' in app ? app.image : undefined;
                  return (
                    <AppIcon
                      key={index}
                      image={appImage}
                      label={appLabel}
                      delay={index * 50}
                      size={appLabel === 'Settings' ? 72 : 62}
                    />
                  );
                })}
              </div>

              {/* Swipe hint text (only on first page) */}
              {currentPage === 0 && (
                <div className="text-center mb-4 opacity-40 text-xs animate-pulse font-medium text-white">
                  Swipe to see more →
                </div>
              )}

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mb-4">
                {pages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentPage === index
                      ? 'w-6 bg-black/40'
                      : 'w-2 bg-black/15 hover:bg-black/25'
                      }`}
                  />
                ))}
              </div>

              {/* Dock */}
              <div
                style={{
                  borderRadius: '28px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(50px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(50px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  padding: '14px 16px',
                  marginBottom: '8px',
                  marginLeft: '8px',
                  marginRight: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                  {dockIcons.map((app, index) => (
                    <DockIcon
                      key={index}
                      image={app.image}
                      label={app.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Buttons (hidden but functional for click) */}
            <button
              onClick={() => handlePageSwitch('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-32 opacity-0 hover:opacity-5 bg-gradient-to-r from-black/20 to-transparent transition-opacity z-10"
              disabled={currentPage === 0}
            />
            <button
              onClick={() => handlePageSwitch('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-32 opacity-0 hover:opacity-5 bg-gradient-to-l from-black/20 to-transparent transition-opacity z-10"
              disabled={currentPage === pages.length - 1}
            />
            {activeApp === 'calendar' && (
              <CalendarApp
                onClose={() => setActiveApp(null)}
                onStartClose={() => setIsClosing(true)}
              />
            )}
          </div>
        </div>
      </div>


    </div>
  );
}