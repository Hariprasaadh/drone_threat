
import React from 'react';
import { motion } from 'framer-motion';
import { TargetIcon, LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  index: number;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  details,
  index,
  isActive,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className={`
        feature-card rounded-2xl p-6 group
        ${isActive
          ? 'bg-drone-blue/10 border-drone-blue/30 scale-[1.02] shadow-lg shadow-drone-blue/5'
          : 'bg-white/[0.03] border-white/10 hover:border-drone-blue/20'}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center space-x-4 mb-5">
        <div className="icon-container bg-drone-blue/10 p-3 rounded-xl border border-drone-blue/20 group-hover:bg-drone-blue/20">
          <Icon className="w-6 h-6 text-drone-blue" />
        </div>
        <h3 className="text-xl font-medium text-white">
          {title}
        </h3>
      </div>
      <p className="text-gray-400 mb-5 h-16 leading-relaxed">{description}</p>
      
      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <ul className="space-y-3 text-sm">
            {details.map((detail, idx) => (
              <motion.li 
                key={idx} 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="flex items-start space-x-2"
              >
                <TargetIcon className="w-4 h-4 text-drone-blue mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{detail}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FeatureCard;
