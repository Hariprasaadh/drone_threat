import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Radio, 
  FileText, 
  Database, 
  Settings, 
  Info, 
  Shield 
} from 'lucide-react';
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  UserButton, 
  useUser 
} from '@clerk/nextjs';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const pathname = usePathname();
  const { user } = useUser();

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard',
      requireAuth: true
    },
    { 
      icon: AlertTriangle, 
      label: 'Threat Monitor', 
      path: '/threats',
      requireAuth: true
    },
    { 
      icon: Radio, 
      label: 'RF Analysis', 
      path: '/rf-analysis',
      requireAuth: true
    },
    { 
      icon: FileText, 
      label: 'Security Logs', 
      path: '/logs',
      requireAuth: true
    },
    { 
      icon: Database, 
      label: 'Blockchain Storage', 
      path: '/blockchain',
      requireAuth: true
    },
    { 
      icon: Info, 
      label: 'System Overview', 
      path: '/system',
      requireAuth: true
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      requireAuth: true
    },
  ];

  const renderMenuItem = (item: typeof menuItems[0]) => {
    // If item requires auth and user is not signed in, don't render
    if (item.requireAuth && !user) return null;

    return (
      <Link
        key={item.path}
        href={item.path}
        className={cn(
          "flex items-center p-2 rounded-lg group transition-all duration-200 hover:bg-primary/10",
          pathname === item.path 
            ? "bg-primary/10 text-primary" 
            : "text-foreground hover:text-primary"
        )}
      >
        <item.icon className={cn(
          "w-5 h-5 transition-all",
          !isOpen && "md:w-6 md:h-6 md:mx-auto"
        )} />
        <span className={cn(
          "ml-3 text-sm",
          !isOpen && "md:hidden"
        )}>
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 z-40 h-screen pt-16 transition-transform duration-300 bg-card border-r border-border w-64",
        !isOpen && "-translate-x-full md:translate-x-0 md:w-20"
      )}
    >
      <div className="h-full px-3 py-4 overflow-y-auto flex flex-col justify-between">
        <SignedIn>
          <div className="space-y-2">
            {menuItems.map(renderMenuItem)}
          </div>
          
          <div className="pt-2 mt-6 space-y-2 border-t border-border">
            <div className={cn(
              "p-3 rounded-lg bg-primary/5 flex items-start space-x-3",
              !isOpen && "md:hidden"
            )}>
              <div className="mt-0.5">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="text-sm font-medium">System Status</h5>
                <div className="flex items-center mt-1">
                  <div className="relative">
                    <div className="h-2.5 w-2.5 rounded-full bg-success"></div>
                    <div className="absolute inset-0 rounded-full bg-success animate-pulse-ring"></div>
                  </div>
                  <p className="text-xs text-muted-foreground ml-2">Active & Secure</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className={cn(
                "md:hidden text-xs text-muted-foreground p-2",
                !isOpen && "md:hidden"
              )}>
                ThreatScout v1.0.2
              </div>
              <div className={cn(
                "md:hidden",
                !isOpen && "md:hidden"
              )}>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col items-center justify-center space-y-4 p-4">
            <p className="text-center text-sm text-muted-foreground">
              Please sign in to access the dashboard
            </p>
            <SignInButton>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </div>
    </aside>
  );
};

export default Sidebar;