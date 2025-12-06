import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface AppModalProps {
  app: {
    icon: any;
    label: string;
    color: 'peach' | 'coral' | 'yellow' | 'blue' | 'lavender' | 'beige';
    content?: {
      title: string;
      description: string;
    };
  };
  onClose: () => void;
}

const colorThemes = {
  peach: 'from-[#FFD4C3] to-[#FFBFA8]',
  coral: 'from-[#FFB8B8] to-[#FFA0A0]',
  yellow: 'from-[#FFF4C3] to-[#FFE9A0]',
  blue: 'from-[#C3E0FF] to-[#A8CEFF]',
  lavender: 'from-[#E0D4FF] to-[#CABFFF]',
  beige: 'from-[#E8DECA] to-[#D8CCB8]',
};

export function AppModal({ app, onClose }: AppModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const Icon = app.icon;

  useEffect(() => {
    // Trigger opening animation
    setTimeout(() => setIsAnimating(true), 10);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
        isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-[340px] bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-out ${
          isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className={`relative h-32 bg-gradient-to-br ${colorThemes[app.color]} flex items-center justify-center`}>
          <div className="absolute inset-0 bg-white/10"></div>
          <Icon className="w-16 h-16 text-white stroke-[2]" />
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="mb-4 text-black/90">{app.content?.title || app.label}</h2>
          <p className="text-black/70 whitespace-pre-line leading-relaxed">
            {app.content?.description || 'Content coming soon...'}
          </p>

          {/* Action buttons */}
          <div className="mt-6 flex gap-3">
            <button
              className={`flex-1 py-3 rounded-2xl bg-gradient-to-br ${colorThemes[app.color]} text-white transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl`}
            >
              View Details
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-3 rounded-2xl bg-gray-100 text-gray-700 transition-all duration-200 active:scale-95 hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className={`h-1 bg-gradient-to-r ${colorThemes[app.color]}`}></div>
      </div>
    </div>
  );
}
