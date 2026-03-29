'use client';

import DesktopNavigation from './DesktopNavigation';
import HeaderActionButtons from './HeaderActionButtons';
import HeaderLogo from './HeaderLogo';
import MobileMenu from './MobileMenu';

export default function HeaderContent({
  country,
  opened,
  onOpen,
  onClose,
  navItems,
}) {
  return (
    <div className="h-full w-full p-0 m-0">
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center">
          <HeaderLogo country={country} />
          <DesktopNavigation navItems={navItems} />
        </div>

        <div className="hidden lg:flex items-center">
          <HeaderActionButtons country={country} />
        </div>

        <MobileMenu country={country} opened={opened} onOpen={onOpen} onClose={onClose} navItems={navItems} />
      </div>
    </div>
  );
}
