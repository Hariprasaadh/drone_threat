import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ThreeDroneView: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Drone Visualization</CardTitle>
      </CardHeader>
      <CardContent className="p-0 min-h-[240px] bg-card flex items-center justify-center overflow-hidden relative">
        {/* Background effect */}
        <div className="w-full h-full absolute left-0 top-0 bg-[radial-gradient(circle,rgba(2,0,36,0)_0%,rgba(0,112,255,0.1)_100%)]"></div>
        
        {/* Animated drone wireframe */}
        <motion.div 
          className="relative w-[180px] h-[70px]"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        >
          {/* Main body */}
          <div className="absolute left-[60px] top-[10px] w-[60px] h-[25px] border-2 border-primary/80 bg-primary/10 rounded-md"></div>
          
          {/* Front propellers */}
          <div className="absolute left-[30px] top-[5px] w-[30px] h-[7px] border border-primary/80 bg-primary/5 rounded-full rotate-45"></div>
          <div className="absolute left-[120px] top-[5px] w-[30px] h-[7px] border border-primary/80 bg-primary/5 rounded-full -rotate-45"></div>
          
          {/* Rear propellers */}
          <div className="absolute left-[30px] top-[33px] w-[30px] h-[7px] border border-primary/80 bg-primary/5 rounded-full -rotate-45"></div>
          <div className="absolute left-[120px] top-[33px] w-[30px] h-[7px] border border-primary/80 bg-primary/5 rounded-full rotate-45"></div>
          
          {/* Camera */}
          <div className="absolute left-[80px] top-[35px] w-[20px] h-[10px] border border-primary/80 bg-primary/5 rounded-md"></div>
          
          {/* Status light */}
          <div className="absolute left-[90px] top-[5px] w-[2px] h-[2px] bg-destructive rounded-full animate-pulse"></div>
          
          {/* Scan beam */}
          <div className="absolute left-[85px] top-[45px] w-[10px] h-[80px] bg-gradient-to-b from-primary/50 to-transparent"></div>
        </motion.div>
        
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-muted-foreground bg-background/50 px-2 py-1 rounded backdrop-blur-sm">
          MODEL: SENTINEL-X9
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreeDroneView;