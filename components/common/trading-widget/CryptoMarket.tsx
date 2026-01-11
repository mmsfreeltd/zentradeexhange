'use client';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, memo } from 'react';

function CryptoMarket() {
  const container = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!container.current) return;

    // Clear existing widget so it doesn't stack
    container.current.innerHTML = '';

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
        {
          "defaultColumn": "overview",
          "screener_type": "crypto_mkt",
          "displayCurrency": "USD",
         "colorTheme": "${resolvedTheme === 'dark' ? 'dark' : 'light'}",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "height": 550
        }`;
    container.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget" ref={container} />
    </div>
  );
}

export default memo(CryptoMarket);
