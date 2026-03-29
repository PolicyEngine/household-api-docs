'use client';

import CountrySelector from './CountrySelector';

export default function HeaderActionButtons({ country }) {
  return <CountrySelector country={country} />;
}
