'use client';

import { useState } from 'react';
import AccessModeSelector from './AccessModeSelector';
import AuthSection from './AuthSection';
import RequestSection from './RequestSection';
import HouseholdSection from './HouseholdSection';
import VariableExplorer from './VariableExplorer';

export default function ApiDocsContent() {
  const [accessMode, setAccessMode] = useState('rest');

  return (
    <>
      <AccessModeSelector accessMode={accessMode} onChange={setAccessMode} />
      <AuthSection accessMode={accessMode} />
      <RequestSection accessMode={accessMode} />
      <HouseholdSection accessMode={accessMode} />
      <VariableExplorer />
    </>
  );
}
