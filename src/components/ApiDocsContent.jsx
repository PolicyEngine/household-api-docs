'use client';

import { useState } from 'react';
import AccessModeSelector from './AccessModeSelector';
import AuthSection from './AuthSection';
import RequestSection from './RequestSection';
import HouseholdSection from './HouseholdSection';
import ApiRecipesSection from './ApiRecipesSection';
import OpenApiReferenceSection from './OpenApiReferenceSection';
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
      <ApiRecipesSection country={country} />
      <OpenApiReferenceSection country={country} />
      <ModelLink country={country} />
      <TermsLinkSection country={country} />
    </>
  );
}
