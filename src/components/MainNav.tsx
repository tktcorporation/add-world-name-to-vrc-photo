import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { ROUTER_PATHS } from '@/constants';
import { FilePlus2, ImageIcon, SettingsIcon } from 'lucide-react';

function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  // get current path
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6 bg-muted py-2', className)} {...props}>
      <Link
        to={ROUTER_PATHS.SETTING}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary px-2',
          currentPath === ROUTER_PATHS.SETTING ? '' : 'text-muted-foreground'
        )}
      >
        <SettingsIcon />
      </Link>
      <Link
        to={ROUTER_PATHS.HOME}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary px-2',
          currentPath === ROUTER_PATHS.HOME ? '' : 'text-muted-foreground'
        )}
      >
        <FilePlus2 />
      </Link>
      <Link
        to={ROUTER_PATHS.PHOTO_LIST}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary px-2',
          currentPath === ROUTER_PATHS.PHOTO_LIST ? '' : 'text-muted-foreground'
        )}
      >
        <ImageIcon />
      </Link>
    </nav>
  );
}

export default MainNav;