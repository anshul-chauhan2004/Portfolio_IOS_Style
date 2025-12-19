import { LucideIcon } from 'lucide-react';

interface DockIconProps {
  icon?: LucideIcon;
  image?: string;
  label?: string;
  color?: 'peach' | 'coral' | 'yellow' | 'blue' | 'lavender' | 'beige';
  onClick?: () => void;
}

const colorStyles = {
  peach: {
    gradient: 'bg-gradient-to-br from-[#FFD4C3] to-[#FFBFA8]',
    shadow: 'shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]',
  },
  coral: {
    gradient: 'bg-gradient-to-br from-[#FFB8B8] to-[#FFA0A0]',
    shadow: 'shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]',
  },
  yellow: {
    gradient: 'bg-gradient-to-br from-[#FFF4C3] to-[#FFE9A0]',
    shadow: 'shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]',
  },
  blue: {
    gradient: 'bg-gradient-to-br from-[#C3E0FF] to-[#A8CEFF]',
    shadow: 'shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]',
  },
  lavender: {
    gradient: 'bg-gradient-to-br from-[#E0D4FF] to-[#CABFFF]',
    shadow: 'shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]',
  },
  beige: {
    gradient: 'bg-gradient-to-br from-[#E8DECA] to-[#D8CCB8]',
    shadow: 'shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]',
  },
};

export function DockIcon({ icon: Icon, image, label, color, onClick }: DockIconProps) {
  // If image is provided, use image-based icon
  if (image) {
    // Make phone icon slightly larger to compensate for internal padding
    const iconSize = '62px';

    return (
      <button
        onClick={onClick}
        className="transition-all duration-200 active:scale-90 hover:scale-105"
        style={{ flexShrink: 0 }}
      >
        <img
          src={image}
          alt={label || ''}
          style={{
            width: iconSize,
            height: iconSize,
            borderRadius: '22%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        />
        {/* iOS dock icons don't show labels */}
      </button>
    );
  }

  // Otherwise use Lucide icon
  const styles = colorStyles[color || 'blue'];

  return (
    <button
      onClick={onClick}
      className={`w-[62px] h-[62px] rounded-2xl ${styles.gradient} ${styles.shadow} flex items-center justify-center transition-all duration-200 active:scale-90 active:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.12),inset_-3px_-3px_8px_rgba(255,255,255,0.5)] hover:scale-110`}
    >
      {Icon && <Icon className="w-7 h-7 text-white stroke-[3]" />}
    </button>
  );
}