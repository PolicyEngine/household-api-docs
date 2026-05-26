'use client';

const PolicyEngineLogo = 'https://www.policyengine.org/assets/logos/policyengine/white.svg';

const logoContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  // Wider gap than between nav items so the logo reads as an anchor
  marginRight: '40px',
};

const logoImageStyles = {
  height: '24px',
  width: 'auto',
};

export default function HeaderLogo({ country }) {
  const logoImage = <img src={PolicyEngineLogo} alt="PolicyEngine" style={logoImageStyles} />;

  return (
    <a href={country.siteUrl} style={logoContainerStyles}>
      {logoImage}
    </a>
  );
}
