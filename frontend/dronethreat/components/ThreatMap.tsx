
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ThreatMap: React.FC = () => {
  return (
    <Card className="col-span-2 overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-base">Threat Geolocation</CardTitle>
      </CardHeader>
      <CardContent className="p-0 aspect-[16/9] bg-secondary/50 relative">
        {/* Map placeholder - in real app would integrate mapping library */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZGVmcz4KICA8cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgIDxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMzAsMzYsNjMsMC4yKSIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+Cjwvc3ZnPg==')] bg-opacity-20">
            <div className="flex items-center justify-center w-full h-full relative">
              {/* Threat point 1 */}
              <div className="absolute left-[35%] top-[35%]">
                <div className="w-3 h-3 bg-destructive rounded-full shadow-lg relative">
                  <div className="absolute inset-0 bg-destructive/50 rounded-full animate-ping"></div>
                </div>
              </div>
              
              {/* Threat point 2 */}
              <div className="absolute right-[25%] top-[40%]">
                <div className="w-3 h-3 bg-warning rounded-full shadow-lg relative">
                  <div className="absolute inset-0 bg-warning/50 rounded-full animate-ping"></div>
                </div>
              </div>
              
              {/* Threat point 3 */}
              <div className="absolute right-[40%] bottom-[30%]">
                <div className="w-3 h-3 bg-success rounded-full shadow-lg"></div>
              </div>
              
              {/* Defensive perimeter */}
              <div className="w-[70%] h-[70%] border border-primary/30 border-dashed rounded-full flex items-center justify-center">
                <div className="text-xs text-primary/70 font-mono bg-background/30 px-2 py-0.5 rounded-sm backdrop-blur-sm">
                  Defensive Perimeter
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatMap;
