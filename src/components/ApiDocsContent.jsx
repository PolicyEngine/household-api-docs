'use client';

import { useState } from 'react';
import AccessModeSelector from './AccessModeSelector';
import AuthSection from './AuthSection';
import RequestSection from './RequestSection';
import HouseholdSection from './HouseholdSection';
import ModelLink from './ModelLink';
import TermsLinkSection from './TermsLinkSection';

export default function ApiDocsContent({ country }) {
  const [accessMode, setAccessMode] = useState('rest');

  return (
    <>
      <AccessModeSelector country={country} accessMode={accessMode} onChange={setAccessMode} />
      <AuthSection country={country} accessMode={accessMode} />
      <RequestSection country={country} accessMode={accessMode} />
      <HouseholdSection country={country} accessMode={accessMode} />
      <ModelLink country={country} />
      <TermsLinkSection country={country} />
    </>
  );
}
