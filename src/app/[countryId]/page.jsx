'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function CountryGuidePage() {
  const router = useRouter();
  const { countryId } = useParams();
  useEffect(() => {
    router.replace(`/${countryId}/api`);
  }, [router, countryId]);
  return null;
}
