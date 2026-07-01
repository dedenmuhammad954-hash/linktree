import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ProfileConfig, ThemeConfig } from '../types';
import { THEMES } from '../constants';
import { BrandIcon } from './BrandLogos';
import { ExternalLink, QrCode } from 'lucide-react';

interface LinkTreePreviewProps {
  config: ProfileConfig;
  previewUrl: string;
}

export const LinkTreePreview: React.FC<LinkTreePreviewProps> = ({ config, previewUrl }) => {
  const activeTheme = useMemo(() => {
    return THEMES.find((t) => t.id === config.themeId) || THEMES[0];
  }, [config.themeId]);

  const activeLinks = useMemo(() => {
    return config.links.filter((l) => l.active && l.url.trim() !== '');
  }, [config.links]);

  const qrCodeUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      previewUrl
    )}&color=1e293b&bgcolor=ffffff`;
  }, [previewUrl]);

  return (
    <div
      id="preview-landing-page"
      className={`w-full min-h-full flex flex-col items-center justify-between py-12 px-4 transition-colors duration-300 ${activeTheme.bgClass} ${activeTheme.fontClass}`}
    >
      <div className="w-full max-w-md flex-1 flex flex-col items-center">
        {/* Avatar Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          {config.avatarType === 'emoji' ? (
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-sm border ${
                config.themeId === 'mono' ? 'border-2 border-black bg-white' : 'bg-white border-slate-100'
              }`}
            >
              {config.avatarValue || '🛍️'}
            </div>
          ) : (
            <div
              className={`w-24 h-24 rounded-full overflow-hidden border bg-white shadow-sm flex items-center justify-center ${
                config.themeId === 'mono' ? 'border-2 border-black' : 'border-slate-100'
              }`}
            >
              {config.avatarValue ? (
                <img
                  src={config.avatarValue}
                  alt={config.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to emoji if image fails
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLElement).parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = "text-5xl";
                      fallback.innerText = "🛍️";
                      parent.appendChild(fallback);
                    }
                  }}
                />
              ) : (
                <div className="text-5xl">🛍️</div>
              )}
            </div>
          )}
        </motion.div>

        {/* Name and Tagline */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mb-8 px-2"
        >
          <h1 className={`text-2xl font-bold tracking-tight mb-2 ${activeTheme.textClass}`}>
            {config.name || 'Nama Toko Anda'}
          </h1>
          <p className={`text-sm leading-relaxed max-w-sm mx-auto ${activeTheme.textMutedClass}`}>
            {config.bio || 'Tuliskan deskripsi toko atau slogan menarik Anda di sini.'}
          </p>
        </motion.div>

        {/* Links Stack */}
        <div className="w-full space-y-4 px-2">
          {activeLinks.length === 0 ? (
            <div
              className={`text-center py-10 px-4 rounded-xl border border-dashed ${
                config.themeId === 'mono' ? 'border-black' : 'border-slate-200'
              } ${activeTheme.textMutedClass} text-xs`}
            >
              Belum ada link marketplace yang aktif.
              <br /> Tambahkan beberapa link di panel pengaturan.
            </div>
          ) : (
            activeLinks.map((link, index) => {
              // Standard link handler safely opening link in new tab
              const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                // Ensure protocol exists
                let formattedUrl = link.url.trim();
                if (!/^https?:\/\//i.test(formattedUrl)) {
                  formattedUrl = 'https://' + formattedUrl;
                }
                e.currentTarget.href = formattedUrl;
              };

              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                  className={`flex items-center justify-between p-4 rounded-xl text-left font-medium w-full ${activeTheme.buttonClass}`}
                  id={`link-item-${link.id}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 p-1 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                      <BrandIcon platform={link.platform} className="w-6 h-6" />
                    </div>
                    <span className="truncate pr-4 text-[15px]">{link.title}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-40 flex-shrink-0" />
                </motion.a>
              );
            })
          )}
        </div>
      </div>

      {/* Footer & QR Code Section */}
      <div className="w-full max-w-sm mt-12 flex flex-col items-center">
        {config.showQrCode && activeLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`w-full max-w-[240px] p-4 rounded-xl flex flex-col items-center justify-center text-center mt-4 border border-dashed bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] ${
              config.themeId === 'mono' ? 'border-2 border-black' : 'border-slate-200/60'
            }`}
            id="qr-code-section"
          >
            <div className="bg-white p-2.5 rounded-lg border border-slate-100 mb-2 shadow-inner">
              <img
                src={qrCodeUrl}
                alt="Scan QR Toko"
                className="w-36 h-36"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            <span className="text-[10px] font-mono tracking-tight text-slate-500 flex items-center gap-1">
              <QrCode className="w-3 h-3" /> Scan QR untuk Bagikan
            </span>
          </motion.div>
        )}

        <div className="text-center mt-8">
          <p className={`text-[10px] tracking-widest uppercase opacity-40 ${activeTheme.textClass}`}>
            Dibuat dengan Marketplace Link Tree
          </p>
        </div>
      </div>
    </div>
  );
};
