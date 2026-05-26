'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { IconChevronDown } from '@tabler/icons-react';
import { colors, typography } from '@policyengine/ui-kit/legacy/tokens';

const NAV_ITEM_PADDING_X = 14;
const NAV_UNDERLINE_INSET = 10;
const DROPDOWN_GAP = 10;
const HOVER_OPEN_DELAY_MS = 100;
const HOVER_CLOSE_DELAY_MS = 200;

const navItemStyle = {
  color: colors.text.inverse,
  fontWeight: typography.fontWeight.medium,
  fontSize: '15px',
  fontFamily: typography.fontFamily.primary,
  textDecoration: 'none',
  padding: `8px ${NAV_ITEM_PADDING_X}px`,
  letterSpacing: '0.01em',
  position: 'relative',
};

function NavUnderline({ visible }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: `${NAV_UNDERLINE_INSET}px`,
        right: `${NAV_UNDERLINE_INSET}px`,
        bottom: '2px',
        height: '2px',
        borderRadius: '2px',
        backgroundColor: colors.text.inverse,
        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'center',
        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: 'none',
      }}
    />
  );
}

function isItemActive(setup, currentPath) {
  if (!currentPath) return false;
  const matches = (href) => {
    if (!href) return false;
    // External absolute URLs (https://...) never match the local pathname
    if (href.startsWith('http')) return false;
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };
  if (setup.hasDropdown && setup.dropdownItems) {
    const walk = (items) =>
      items.some(
        (c) => matches(c.href) || (c.children ? walk(c.children) : false),
      );
    return walk(setup.dropdownItems);
  }
  return matches(setup.href);
}

function DropdownRow({ item, depth, index, visible, onClose }) {
  const isChild = depth > 0;
  return (
    <a
      href={item.href}
      onClick={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        textAlign: 'left',
        padding: `${isChild ? 8 : 11}px 16px ${isChild ? 8 : 11}px ${
          16 + depth * 16
        }px`,
        borderRadius: '10px',
        textDecoration: 'none',
        fontSize: isChild ? '13px' : '14px',
        fontFamily: typography.fontFamily.primary,
        fontWeight: isChild
          ? typography.fontWeight.medium
          : typography.fontWeight.semibold,
        color: isChild ? colors.primary[700] : colors.primary[800],
        transition: `background-color 0.12s ease 0ms, color 0.12s ease 0ms, opacity 0.3s ease ${
          visible ? index * 30 : 0
        }ms`,
        opacity: visible ? 1 : 0,
        lineHeight: '1.3',
        letterSpacing: '-0.01em',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary[500];
        e.currentTarget.style.color = colors.text.inverse;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = isChild
          ? colors.primary[700]
          : colors.primary[800];
      }}
    >
      {item.label}
    </a>
  );
}

function DropdownPanel({ items, open, onClose }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timer = setTimeout(() => setContentHeight(0), 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open && contentHeight === 0) return null;

  // Flatten one level of children for the cascading reveal
  const rows = [];
  for (const item of items) {
    rows.push({ item, depth: 0 });
    if (item.children) {
      for (const child of item.children) {
        rows.push({ item: child, depth: 1 });
      }
    }
  }

  return (
    <div
      // Bridge across the visual gap so hover doesn't close while travelling.
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        paddingTop: `${DROPDOWN_GAP}px`,
        zIndex: 1001,
      }}
    >
      <div
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-8px)',
          minWidth: '220px',
          overflow: 'hidden',
          maxHeight: visible ? `${contentHeight}px` : '0px',
          opacity: visible ? 1 : 0,
          transition:
            'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '14px',
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.97), rgba(240,249,255,0.95))',
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          boxShadow:
            '0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
        }}
      >
        <div ref={contentRef} style={{ padding: '8px' }}>
          {rows.map(({ item, depth }, i) => (
            <DropdownRow
              key={`${item.label}-${item.href}`}
              item={item}
              depth={depth}
              index={i}
              visible={visible}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable navigation item component.
 * Hover opens dropdowns with a 100ms intent delay and a 200ms grace
 * close; the underline grows from the center on hover or when active.
 */
export default function NavItem({ setup }) {
  const { label, onClick, href, hasDropdown, dropdownItems } = setup;
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  // Outside-click and Escape close
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') setDropdownOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [dropdownOpen]);

  const handleMouseEnter = () => {
    setHovered(true);
    if (!hasDropdown) return;
    clearTimers();
    openTimerRef.current = setTimeout(
      () => setDropdownOpen(true),
      HOVER_OPEN_DELAY_MS,
    );
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (!hasDropdown) return;
    clearTimers();
    closeTimerRef.current = setTimeout(
      () => setDropdownOpen(false),
      HOVER_CLOSE_DELAY_MS,
    );
  };

  const active = isItemActive(setup, pathname || '');
  const underlineVisible = active || hovered || dropdownOpen;

  if (hasDropdown && dropdownItems) {
    return (
      <div
        ref={containerRef}
        style={{ position: 'relative' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={() => {
            onClick?.();
            setDropdownOpen((prev) => !prev);
          }}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
          style={{
            ...navItemStyle,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>{label}</span>
          <IconChevronDown
            size={15}
            color={colors.text.inverse}
            style={{
              opacity: 0.7,
              transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
          <NavUnderline visible={underlineVisible} />
        </button>
        <DropdownPanel
          items={dropdownItems}
          open={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
        />
      </div>
    );
  }

  return (
    <a
      href={href}
      onClick={href ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-current={active ? 'page' : undefined}
      style={navItemStyle}
    >
      {label}
      <NavUnderline visible={underlineVisible} />
    </a>
  );
}
