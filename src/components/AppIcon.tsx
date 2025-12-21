import { LucideIcon } from 'lucide-react';

interface AppIconProps {
  icon?: LucideIcon;
  image?: string;
  label: string;
  color?: 'peach' | 'coral' | 'yellow' | 'blue' | 'lavender' | 'beige';
  onClick?: () => void;
  delay?: number;
  size?: number; // Size in pixels, defaults to 62
  dataTutorial?: string; // For tutorial spotlight
}

const colorStyles = {
  peach: {
    gradient: 'bg-gradient-to-br from-[#FFD4C3] to-[#FFBFA8]',
  },
  coral: {
    gradient: 'bg-gradient-to-br from-[#FFB8B8] to-[#FFA0A0]',
  },
  yellow: {
    gradient: 'bg-gradient-to-br from-[#FFF4C3] to-[#FFE9A0]',
  },
  blue: {
    gradient: 'bg-gradient-to-br from-[#C3E0FF] to-[#A8CEFF]',
  },
  lavender: {
    gradient: 'bg-gradient-to-br from-[#E0D4FF] to-[#CABFFF]',
  },
  beige: {
    gradient: 'bg-gradient-to-br from-[#E8DECA] to-[#D8CCB8]',
  },
};

export function AppIcon({ icon: Icon, image, label, color, onClick, delay = 0, size = 62, dataTutorial }: AppIconProps) {
  // If image is provided, use image-based icon
  if (image) {
    return (
      <div
        className="flex flex-col items-center gap-2 relative z-[20]"
        data-tutorial={dataTutorial}
      >
        <button
          onClick={onClick}
          className="transition-all duration-200 active:scale-90 hover:scale-105"
        >
          <img
            src={image}
            alt={label}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '22%',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          />
        </button>
        <span
          className="text-[11px] max-w-[70px] text-center truncate font-medium"
          style={{
            color: 'white',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
          }}
        >
          {label}
        </span>
      </div>
    );
  }

  // Otherwise use Lucide icon with gradient background
  const styles = colorStyles[color || 'blue'];

  return (
    <div
      className="flex flex-col items-center gap-2 relative z-[20]"
      data-tutorial={dataTutorial}
    >
      <button
        onClick={onClick}
        className={`${styles.gradient} flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 border border-white/10`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '22%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        {Icon && <Icon className="w-7 h-7 text-white stroke-[2.5]" />}
      </button>
      <span
        className="text-[11px] max-w-[70px] text-center truncate font-medium"
        style={{
          color: 'white',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
        }}
      >
        {label}
      </span>
    </div>
  );
}