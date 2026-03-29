'use client';

import { useCallback, useState } from 'react';
import HeaderContent from '@/components/homeHeader/HeaderContent';
import { colors, spacing, typography } from '@policyengine/design-system/tokens';

// Inline useDisclosure (drop-in from app-v2 src/hooks/useDisclosure.ts)
function useDisclosure(initialState = false) {
  const [opened, setOpened] = useState(initialState);
  const open = useCallback(() => setOpened(true), []);
  const close = useCallback(() => setOpened(false), []);
  const toggle = useCallback(() => setOpened((prev) => !prev), []);
  return [opened, { open, close, toggle }];
}

function buildNavItems(country) {
  return [
    {
      label: 'Research',
      href: country.researchUrl,
      hasDropdown: false,
    },
    {
      label: 'Model',
      href: country.modelUrl,
      hasDropdown: false,
    },
    {
      label: 'API',
      href: country.apiUrl,
      hasDropdown: false,
    },
    {
      label: 'About',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Team', href: country.teamUrl },
        { label: 'Supporters', href: country.supportersUrl },
      ],
    },
    {
      label: 'Donate',
      href: country.donateUrl,
      hasDropdown: false,
    },
  ];
}

export default function Header({ country }) {
  const [opened, { open, close }] = useDisclosure(false);
  const navItems = buildNavItems(country);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        padding: `${spacing.sm} ${spacing['2xl']}`,
        height: spacing.layout.header,
        background: `linear-gradient(to right, ${colors.primary[800]}, ${colors.primary[600]})`,
        borderBottom: `0.5px solid ${colors.primary[700]}`,
        boxShadow: `0px 2px 4px -1px ${colors.shadow.light}, 0px 4px 6px -1px ${colors.shadow.medium}`,
        zIndex: 1000,
        fontFamily: typography.fontFamily.primary,
        opacity: opened ? 0 : 1,
        transition: 'opacity 0.1s ease',
        width: '100%',
      }}
    >
      <HeaderContent
        country={country}
        opened={opened}
        onOpen={open}
        onClose={close}
        navItems={navItems}
      />
    </div>
  );
}
