'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center px-4 md:px-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg tracking-tight">DroneThreat</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">{currentTime.toLocaleTimeString()}</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
          </Button>

         

          {isSignedIn ? (
            // If user is signed in, show UserButton
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium">{user?.fullName || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.emailAddresses[0]?.emailAddress}</p>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            // If user is not signed in, show Sign In button
            <SignInButton mode="modal">
              <Button variant="default">Sign In</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
