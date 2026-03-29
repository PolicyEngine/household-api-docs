'use client';

import { spacing } from '@policyengine/design-system/tokens';
const PolicyEngineLogo = 'https://www.policyengine.org/assets/logos/policyengine/white.svg';

const logoContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
};

const logoImageStyles = {
  height: '24px',
  width: 'auto',
  marginRight: 12,
};

export default function HeaderLogo({ country }) {
  const logoImage = <img src={PolicyEngineLogo} alt="PolicyEngine" style={logoImageStyles} />;

  return (
    <a href={country.siteUrl} style={{ ...logoContainerStyles, marginRight: spacing.md }}>
      {logoImage}
    </a>
  );
}
