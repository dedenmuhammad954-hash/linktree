import React from 'react';
import { PlatformId } from '../types';

interface BrandIconProps {
  platform: PlatformId;
  className?: string;
}

export const BrandIcon: React.FC<BrandIconProps> = ({ platform, className = "w-5 h-5" }) => {
  switch (platform) {
    case 'shopee':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${className} text-[#EE4D2D]`}
          aria-hidden="true"
        >
          {/* Shopee Bag Logo */}
          <path d="M19 6h-3c0-2.21-1.79-4-4-4S8 3.79 8 6H5c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2c1.1 0 2 .9 2 2H10c0-1.1.9-2 2-2zm7 15H5V8h14v11z"/>
          <path d="M12 10.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm0 3.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>
      );
    case 'tokopedia':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${className} text-[#03AC0E]`}
          aria-hidden="true"
        >
          {/* Tokopedia Green Shopping Bag / Owl silhouette concept */}
          <path d="M19 4h-2.5c-.2-1.1-1.2-2-2.5-2h-4c-1.3 0-2.3.9-2.5 2H5c-1.1 0-2 .9-2 2v13c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3V6c0-1.1-.9-2-2-2zm-9-2h4c.6 0 1.1.4 1.2 1H8.8c.1-.6.6-1 1.2-1zm10 17c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V6h14v11z"/>
          <path d="M12 15c-2.2 0-4-1.8-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.2-1.8 4-4 4z"/>
        </svg>
      );
    case 'tiktok':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${className} text-slate-900 dark:text-white`}
          aria-hidden="true"
        >
          {/* TikTok Note Logo */}
          <path d="M12.525.02c1.31 0 2.57.44 3.59 1.25.12.1.2.24.23.39.12.63.4 1.22.81 1.72.63.77 1.54 1.27 2.56 1.41.16.02.3.1.4.23.1.13.13.3.1.46-.22 1.35-.91 2.57-1.95 3.42-.13.11-.2.27-.19.44.02 1.63-.37 3.25-1.13 4.67a11.13 11.13 0 01-13.43 5.4 11.13 11.13 0 01-7.14-11.3A11.13 11.13 0 0110.15 1.1c.17-.02.34.03.45.15.11.12.15.29.11.45a5.535 5.535 0 00.35 3.65c.29.56.7 1.04 1.21 1.4.13.09.29.11.43.05.14-.06.24-.18.27-.33.25-1.25.13-2.56-.37-3.73A11.1 11.1 0 0112.525.02z" className="hidden"/>
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.56 2.9 2.9 0 014.28-3.83v-3.51A6.37 6.37 0 005.15 15a6.37 6.37 0 0011.22 4.24V9.27A8.25 8.25 0 0019.59 11V6.69z" />
        </svg>
      );
    case 'lazada':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${className} text-[#101433]`}
          aria-hidden="true"
        >
          {/* Lazada Heart Fold concept in vibrant blue-ish pink */}
          <path d="M12.14 2.15c-.09-.09-.23-.09-.32 0l-8.5 8.5c-.15.15-.15.4 0 .55l8.5 8.5c.09.09.23.09.32 0l8.5-8.5c.15-.15.15-.4 0-.55l-8.5-8.5zm-.14 3.01L18.84 11H12V5.16zM5.16 11L12 4.16V11H5.16zm6.84 7.84L5.16 12H12v6.84zm6.84-6.84L12 18.84V12h6.84z" className="hidden"/>
          <path d="M11.83 2.13a.4.4 0 00-.51 0L2.12 11.1a.4.4 0 000 .57l9.2 9.2c.16.16.42.16.58 0l9.2-9.2a.4.4 0 000-.57l-9.27-8.97zm.17 3.2L18.17 11H12V5.33zm-6.17 5.67L12 5.33V11H5.83zm6.17 6.67V12h6.17l-6.17 5.67zm-6.17-5.67H12v5.67L5.83 12z" />
        </svg>
      );
    case 'bukalapak':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${className} text-[#E1254A]`}
          aria-hidden="true"
        >
          {/* Bukalapak "b" logo */}
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2.5v-9H13c1.38 0 2.5 1.12 2.5 2.5v4c0 1.38-1.12 2.5-2.5 2.5zm0-2.5c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1h-1v6h1z" className="hidden"/>
          <path d="M19 12c0 3.87-3.13 7-7 7H7V5h5c3.87 0 7 3.13 7 7zm-5.2-1.8c0-1.21-.99-2.2-2.2-2.2H9.8v8h2c1.21 0 2.2-.99 2.2-2.2v-3.6z" />
        </svg>
      );
    case 'blibli':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${className} text-[#0095DA]`}
          aria-hidden="true"
        >
          {/* Blibli blue shopping bag icon */}
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 10.9 13 11.5 13 13h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" className="hidden"/>
          <path d="M20 6h-3V5c0-1.66-1.34-3-3-3h-4C8.34 2 7 3.34 7 5v1H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 5c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v1H9V5zm11 14H4V8h16v11zm-5-8h-2v2h2v-2zm-4 0H9v2h2v-2z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${className} text-[#25D366]`}
          aria-hidden="true"
        >
          {/* WhatsApp Speech Bubble & Phone */}
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.817 9.817 0 0012.04 2zm0 1.78c2.17 0 4.21.85 5.75 2.38 1.54 1.54 2.38 3.58 2.38 5.75s-.85 4.21-2.38 5.75c-1.54 1.54-3.58 2.38-5.75 2.38-1.44 0-2.85-.38-4.1-1.1l-.29-.17-3.05.8.82-2.98-.19-.3a8.092 8.092 0 01-1.24-4.38c0-4.48 3.65-8.13 8.13-8.13zm-3.57 5.16c-.2-.05-.41-.05-.62.03-.2.07-.37.22-.49.4-.41.59-.57 1.3-.43 2.01.21 1.05.8 2.03 1.58 2.81 1.48 1.48 3.32 2.41 5.25 2.7.73.11 1.48-.06 2.07-.48.2-.14.33-.33.39-.55.06-.22.04-.44-.04-.65l-1.07-1.37c-.15-.19-.39-.27-.61-.21l-.57.17c-.14.04-.29.02-.41-.06-.39-.27-.75-.58-1.07-.9-.31-.32-.61-.69-.87-1.09-.07-.11-.08-.25-.04-.38l.24-.59c.09-.22.04-.47-.13-.64l-1.2-1.3z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${className} text-[#E1306C]`}
          aria-hidden="true"
        >
          {/* Instagram Camera Logo */}
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case 'gofood':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${className} text-[#E11931]`}
          aria-hidden="true"
        >
          {/* Hot GoFood Bowl representation */}
          <path d="M2 12c0 4.42 3.58 8 8 8h4c4.42 0 8-3.58 8-8H2zm19-2H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1zm-9-5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-4 1.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm8 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
        </svg>
      );
    case 'shopeefood':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${className} text-[#EE4D2D]`}
          aria-hidden="true"
        >
          {/* ShopeeFood Delivery Box / Shopping Bag with hot bowl accent */}
          <path d="M19 6h-3c0-2.21-1.79-4-4-4S8 3.79 8 6H5c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2c1.1 0 2 .9 2 2H10c0-1.1.9-2 2-2zm7 15H5V8h14v11z"/>
          <path d="M8.5 11c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5h-1zm3.5 0c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5s.5-.22.5-.5v-3c0-.28-.22-.5-.5-.5zm3.5 0c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h1c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5h-1z" />
        </svg>
      );
    case 'grabfood':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${className} text-[#00B14F]`}
          aria-hidden="true"
        >
          {/* GrabFood clean cutlery and dish outline */}
          <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z"/>
          <path d="M11 7h-1v4H9V7H8v4c0 1.66 1.34 3 3 3v3h1v-3c1.66 0 3-1.34 3-3V7h-1v4h-1V7h-1zm4 0v10h1V7h-1z" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${className} text-slate-500`}
          aria-hidden="true"
        >
          {/* Default generic link icon */}
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
  }
};
