'use client';

import { useEffect } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { colors, spacing, typography } from '@policyengine/design-system/tokens';

export default function MobileMenu({ country, opened, onOpen, onClose, navItems }) {
  // Lock body scroll when sheet is open
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  return (
    <>
      <div className="flex lg:hidden items-center" style={{ gap: spacing.md }}>
        <button
          type="button"
          className="p-1 rounded bg-transparent border-none cursor-pointer"
          onClick={onOpen}
          aria-label="Toggle navigation"
        >
          <IconMenu2 size={24} color={colors.text.inverse} />
        </button>
      </div>

      {/* Mobile Sheet — matches Radix Sheet side="right" */}
      {opened && (
        <>
          {/* Overlay */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1001,
            }}
          />
          {/* Panel */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '300px',
              backgroundColor: colors.primary[600],
              zIndex: 1002,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* SheetHeader */}
            <div style={{ padding: `${spacing.lg} ${spacing['2xl']}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: colors.text.inverse, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.lg, fontFamily: typography.fontFamily.primary }}>Menu</span>
              <button
                type="button"
                onClick={onClose}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                aria-label="Close menu"
              >
                <IconX size={20} color={colors.text.inverse} />
              </button>
            </div>
            {/* SheetContent nav items */}
            <div className="flex flex-col" style={{ gap: spacing.lg, padding: spacing.lg }}>
              {navItems.map((item) =>
                item.hasDropdown && item.dropdownItems ? (
                  // Render dropdown as a section
                  <div key={item.label}>
                    <span
                      style={{
                        color: colors.text.inverse,
                        fontWeight: typography.fontWeight.medium,
                        fontSize: typography.fontSize.sm,
                        marginBottom: spacing.xs,
                        display: 'block',
                        fontFamily: typography.fontFamily.primary,
                      }}
                    >
                      {item.label}
                    </span>
                    <div
                      className="flex flex-col"
                      style={{ gap: spacing.xs, paddingLeft: spacing.md }}
                    >
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          onClick={dropdownItem.href ? undefined : dropdownItem.onClick}
                          style={{
                            color: colors.text.inverse,
                            textDecoration: 'none',
                            fontWeight: typography.fontWeight.normal,
                            fontSize: typography.fontSize.sm,
                            fontFamily: typography.fontFamily.primary,
                          }}
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Render regular link
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={item.href ? undefined : item.onClick}
                    style={{
                      color: colors.text.inverse,
                      textDecoration: 'none',
                      fontWeight: typography.fontWeight.medium,
                      fontSize: typography.fontSize.sm,
                      fontFamily: typography.fontFamily.primary,
                      display: 'block',
                    }}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
