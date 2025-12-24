import { useState, useEffect, useRef } from 'react';
import { AppIcon } from './components/AppIcon';
import { DockIcon } from './components/DockIcon';
import { CalendarIcon } from './components/CalendarIcon';
import { ClockWidget } from './components/ClockWidget';
import { WeatherWidget } from './components/WeatherWidget';
import { SearchBar } from './components/SearchBar';
import { LockScreen } from './components/LockScreen';
import { BootScreen } from './components/BootScreen';
import { CalendarApp } from './components/CalendarApp';
import { SettingsApp } from './components/SettingsApp';
import { ContactApp } from './components/ContactApp';
import { MusicApp } from './components/MusicApp';
import { MessagesApp } from './components/MessagesApp';
import { SafariApp } from './components/SafariApp';
import { FilesApp } from './components/FilesApp';
import { AssistiveTouch } from './components/AssistiveTouch';

import { WeatherApp } from './components/WeatherApp';
import { WelcomeLoader } from './components/WelcomeLoader';
import { PasswordInfo } from './components/PasswordInfo';
import { ProjectsStack } from './components/ProjectsStack';
import { NotesApp } from './components/NotesApp';

type PhoneState = 'BOOTING' | 'LOCKED' | 'UNLOCKED';

export default function App() {
  const [phoneState, setPhoneState] = useState<PhoneState>(() => {
    // Don't boot phone until onboarding is ready
    return localStorage.getItem('hasCompletedOnboarding') ? 'BOOTING' : 'LOCKED';
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState<'welcome' | 'passwordInfo' | 'waitingForUnlock' | 'complete'>(() => {
    // Check if user has completed onboarding before
    return localStorage.getItem('hasCompletedOnboarding') ? 'complete' : 'welcome';
  });

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
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      setCurrentTime(`${hours}:${minutes.toString().padStart(2, '0')}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Watch for phone unlock during onboarding
  useEffect(() => {
    if (onboardingStep === 'waitingForUnlock' && phoneState === 'UNLOCKED') {
      // Complete onboarding after user unlocks phone
      localStorage.setItem('hasCompletedOnboarding', 'true');
      setOnboardingStep('complete');
    }
  }, [phoneState, onboardingStep]);

  // Voice feedback logic is now consolidated in the transition hook below

  // Track previous state to handle transitions correctly
  const prevPhoneState = useRef<PhoneState>(phoneState);

  useEffect(() => {
    // Define robust speak function
    const speak = (text: string) => {
      if (!('speechSynthesis' in window)) return;

      const runSpeak = () => {
        window.speechSynthesis.cancel(); // Reset previous speech
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        console.log("Available Voices:", voices.map(v => v.name)); // DEBUG: See what is actually available

        // Male voice selection
        // Voice selection: Prioritize Google US English
        const maleVoice = voices.find(v =>
          v.name === 'Google US English' ||
          v.name.includes('Google US English')
        );

        if (maleVoice) utterance.voice = maleVoice;
        utterance.rate = 1.00;
        utterance.pitch = 1.0;

        console.log(`[Voice] Speaking: "${text}" | State: ${phoneState} | Voice: ${maleVoice?.name ?? 'Default'}`);
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        // Polling fallback mechanism for cached voices issue
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          const voices = window.speechSynthesis.getVoices();
          if (voices.length > 0 || attempts > 20) { // Try for 2 seconds
            clearInterval(interval);
            runSpeak();
          }
        }, 100);
      } else {
        runSpeak();
      }
    };

    // Skip if we haven't fundamentally changed state, or if we are still booting
    if (prevPhoneState.current === phoneState) return;

    // Transition: Booting/Unlocked -> Locked
    if (phoneState === 'LOCKED' && (prevPhoneState.current === 'BOOTING' || prevPhoneState.current === 'UNLOCKED')) {
      // Small delay to ensure audio context is ready
      setTimeout(() => {
        window.speechSynthesis.resume(); // Unblock if paused
        speak("Please unlock the phone");
      }, 1000);
    }
    // Transition: Locked -> Unlocked
    else if (phoneState === 'UNLOCKED' && prevPhoneState.current === 'LOCKED') {
      speak("Welcome, you now have access to Unshul's Portfolio");
    }

    prevPhoneState.current = phoneState;
  }, [phoneState]);

  type PageItem =
    | { type: 'calendar' }
    | { type: 'search' }
    | { type: 'clock' }
    | { type: 'weather' }
    | { type: 'projects' }
    | { type: 'empty' }
    | { image: string; label: string };

  const pages: PageItem[][] = [
    [
      { type: 'search' },
      { type: 'clock' },
      { type: 'weather' },
      { image: '/src/assets/app-icons/settings.png', label: 'Settings' },
      { image: '/src/assets/app-icons/music.png', label: 'Music' },
      { type: 'calendar' },
      { image: '/src/assets/app-icons/files.png', label: 'Files' },
    ],
    [
      { type: 'projects' },
    ]
  ];

  const dockIcons = [
    { image: '/src/assets/app-icons/phone.png', label: 'Contact' },
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-black p-2 font-sans">
      {/* Ambient light effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      {/* Hide phone during welcome and password info */}
      {onboardingStep !== 'welcome' && onboardingStep !== 'passwordInfo' && (
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
            <div
              id="phone-main-interface"
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${phoneState === 'UNLOCKED' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              onTouchStart={(e) => {
                // Disable swipe when app is open
                if (activeApp) return;

                // Ignore touches on AssistiveTouch button
                const target = e.target as HTMLElement;
                if (target.closest('[data-assistive-touch]')) return;

                // 3-finger swipe detection logic
                if (e.touches.length === 3) {
                  const startX = e.touches[0].clientX;
                  e.currentTarget.dataset.threeFingerStartX = startX.toString();
                  e.currentTarget.dataset.threeFingerTriggered = 'false'; // Initialize flag
                  return;
                }
                const touch = e.targetTouches[0];
                e.currentTarget.dataset.touchStartX = touch.clientX.toString();
              }}
              onTouchMove={(e) => {
                // Disable swipe when app is open
                if (activeApp) return;

                // Real-time 3-finger swipe detection - triggers during gesture
                if (e.touches.length === 3 && e.currentTarget.dataset.threeFingerStartX) {
                  // Check if already triggered to avoid multiple calls
                  if (e.currentTarget.dataset.threeFingerTriggered === 'true') return;

                  const startX = parseFloat(e.currentTarget.dataset.threeFingerStartX);
                  const currentX = e.touches[0].clientX;
                  const diff = startX - currentX;

                  // Trigger instantly on any movement - no threshold for maximum responsiveness
                  if (diff !== 0) {
                    e.currentTarget.dataset.threeFingerTriggered = 'true';
                    if (diff > 0) handlePageSwitch('right');
                    else handlePageSwitch('left');
                  }
                }
              }}
              onTouchEnd={(e) => {
                // Disable swipe when app is open
                if (activeApp) return;

                // 3-finger check
                if (e.changedTouches.length === 3 && e.currentTarget.dataset.threeFingerStartX) {
                  const startX = parseFloat(e.currentTarget.dataset.threeFingerStartX);
                  const endX = e.changedTouches[0].clientX;
                  const diff = startX - endX;
                  if (Math.abs(diff) > 5) { // Very low threshold for instant trackpad response
                    if (diff > 0) handlePageSwitch('right');
                    else handlePageSwitch('left');
                  }
                  delete e.currentTarget.dataset.threeFingerStartX;
                  return;
                }

                const touchStartX = parseFloat(e.currentTarget.dataset.touchStartX || '0');
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) { // Threshold
                  if (diff > 0) handlePageSwitch('right');
                  else handlePageSwitch('left');
                }
              }}
              onMouseDown={(e) => {
                if (activeApp) return;
                e.currentTarget.dataset.mouseStartX = e.clientX.toString();
              }}
              onMouseUp={(e) => {
                if (activeApp) return;
                const mouseStartX = parseFloat(e.currentTarget.dataset.mouseStartX || '0');
                const mouseEndX = e.clientX;
                const diff = mouseStartX - mouseEndX;
                if (Math.abs(diff) > 50) {
                  if (diff > 0) handlePageSwitch('right');
                  else handlePageSwitch('left');
                }
              }}
            >
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
              <div
                className="flex flex-col h-full px-4 pt-40 pb-4 justify-between"
                style={{ pointerEvents: activeApp ? 'none' : 'auto' }}
              >
                {/* App Grid with swipe animation */}
                <div
                  className="flex flex-1"
                  style={{
                    transform: `translateX(-${(currentPage * 100) / pages.length}%)`,
                    width: `${pages.length * 100}%`,
                    marginTop: '60px',
                    transition: 'transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smoother, more fluid
                    paddingLeft: '8px',
                    paddingRight: '24px',
                    willChange: 'transform'
                  }}
                >
                  {pages.map((pageApps, pageIndex) => (
                    <div
                      key={pageIndex}
                      className="grid grid-cols-4 content-start w-full flex-shrink-0"
                      style={{ width: `${100 / pages.length}%`, gap: '2px 2px', rowGap: '48px' }} // Each page takes equal slice
                    >
                      {pageApps.map((app, index) => {
                        if ('type' in app && app.type === 'search') {
                          return <SearchBar key={index} onOpenApp={handleOpenApp} />;
                        }
                        if ('type' in app && app.type === 'clock') {
                          return <ClockWidget key={index} delay={index * 50} />;
                        }
                        if ('type' in app && app.type === 'weather') {
                          return <WeatherWidget key={index} delay={index * 50} onClick={() => handleOpenApp('weather')} />;
                        }
                        if ('type' in app && app.type === 'projects') {
                          return <ProjectsStack key={index} />;
                        }

                        if ('type' in app && app.type === 'empty') {
                          return <div key={index} />;
                        }
                        if ('type' in app && app.type === 'calendar') {
                          return <CalendarIcon key={index} delay={index * 50} onClick={() => handleOpenApp('calendar')} isOpen={activeApp === 'calendar' && !isClosing} />;
                        }
                        // TypeScript now knows app has image and label
                        const appLabel = 'label' in app ? app.label : '';
                        const appImage = 'image' in app ? app.image : undefined;

                        const handleClick = appLabel === 'Settings' ? () => handleOpenApp('settings') :
                          appLabel === 'Music' ? () => handleOpenApp('music') :
                            appLabel === 'Files' ? () => handleOpenApp('files') : undefined;

                        // Add data-tutorial attribute for tutorial spotlight
                        const getTutorialAttr = () => {
                          if (appLabel === 'Calendar') return 'calendar';
                          if (appLabel === 'Settings') return 'settings';
                          if (appLabel === 'Weather') return 'weather';
                          if (appLabel === 'Files') return 'files';
                          if (appLabel === 'Music') return 'music';
                          return undefined;
                        };

                        return (
                          <AppIcon
                            key={index}
                            image={appImage}
                            label={appLabel}
                            delay={index * 50}
                            size={62}
                            onClick={handleClick}
                            dataTutorial={getTutorialAttr()}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>



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

                {/* Swipe Indicator */}
                {pages.length > 1 && (
                  <div
                    style={{
                      textAlign: 'center',
                      marginBottom: '8px',
                      animation: 'fadeInOut 3s ease-in-out infinite',
                      opacity: activeApp ? 0 : 1,
                      transition: 'opacity 300ms ease',
                      pointerEvents: activeApp ? 'none' : 'auto'
                    }}
                  >
                    <style>
                      {`
                      @keyframes fadeInOut {
                        0%, 100% { opacity: 0.4; }
                        50% { opacity: 0.8; }
                      }
                    `}
                    </style>
                    <span style={{
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                    }}>
                      {currentPage === 0 ? 'Swipe to see more →' : '← Swipe back'}
                    </span>
                  </div>
                )}

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
                        onClick={() =>
                          app.label === 'Contact' ? handleOpenApp('phone') :
                            app.label === 'Messages' ? handleOpenApp('messages') :
                              app.label === 'Safari' ? handleOpenApp('safari') :
                                app.label === 'Notes' ? handleOpenApp('notes') : undefined
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>


              {activeApp === 'calendar' && (
                <CalendarApp
                  onClose={() => setActiveApp(null)}
                  onStartClose={() => setIsClosing(true)}
                />
              )}
              {activeApp === 'settings' && (
                <SettingsApp
                  onClose={() => setActiveApp(null)}
                  onStartClose={() => setIsClosing(true)}
                />
              )}
              {activeApp === 'phone' && (
                <ContactApp
                  onClose={() => setActiveApp(null)}
                  onStartClose={() => setIsClosing(true)}
                />
              )}
              {activeApp === 'music' && (
                <MusicApp
                  onClose={() => setActiveApp(null)}
                  onStartClose={() => setIsClosing(true)}
                />
              )}
              {activeApp === 'messages' && (
                <MessagesApp
                  onClose={() => setActiveApp(null)}
                  onStartClose={() => setIsClosing(true)}
                />
              )}
              {activeApp === 'safari' && (
                <SafariApp
                  onClose={() => setActiveApp(null)}
                  onStartClose={() => setIsClosing(true)}
                />
              )}
              {activeApp === 'files' && (
                <FilesApp
                  onClose={() => setActiveApp(null)}
                  onStartClose={() => setIsClosing(true)}
                />
              )}
              {activeApp === 'weather' && (
                <WeatherApp
                  onClose={() => { setIsClosing(true); setTimeout(() => setActiveApp(null), 300); }}
                  onStartClose={() => setIsClosing(true)}
                />
              )}
              {activeApp === 'notes' && (
                <NotesApp
                  onClose={() => setActiveApp(null)}
                />
              )}

              {/* AssistiveTouch - Only visible when unlocked */}
              {phoneState === 'UNLOCKED' && (
                <AssistiveTouch onLock={() => setPhoneState('LOCKED')} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Premium Onboarding Flow - Outside phone container */}
      {onboardingStep === 'welcome' && (
        <WelcomeLoader onComplete={() => setOnboardingStep('passwordInfo')} />
      )}
      {onboardingStep === 'passwordInfo' && (
        <PasswordInfo onContinue={() => {
          setOnboardingStep('waitingForUnlock');
          setPhoneState('BOOTING'); // Start phone boot sequence
        }} />
      )}
    </div>
  );
}
