import React, { useState } from 'react';
import { ProfileConfig, ThemeConfig, MarketplaceLink, PlatformId } from '../types';
import { THEMES, SUPPORTED_PLATFORMS, PROFILE_EMOJIS } from '../constants';
import { BrandIcon } from './BrandLogos';
import { 
  Store, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Copy, 
  Check, 
  Share2, 
  Eye, 
  Image, 
  Smile, 
  Link2,
  Undo2,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Scissors,
  Loader2
} from 'lucide-react';

interface EditorPanelProps {
  config: ProfileConfig;
  onChange: (newConfig: ProfileConfig) => void;
  onReset: () => void;
  shareUrl: string;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ config, onChange, onReset, shareUrl }) => {
  const [copied, setCopied] = useState(false);
  const [copiedShort, setCopiedShort] = useState(false);
  const [newLinkPlatform, setNewLinkPlatform] = useState<PlatformId>('tokopedia');
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [editingAvatarUrl, setEditingAvatarUrl] = useState(config.avatarType === 'image' ? config.avatarValue : '');
  const [showEmojiSelector, setShowEmojiSelector] = useState(config.avatarType === 'emoji');

  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [shorteningError, setShorteningError] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleCopyShort = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopiedShort(true);
      setTimeout(() => setCopiedShort(false), 2000);
    } catch (err) {
      console.error('Failed to copy shortened text', err);
    }
  };

  const handleShortenUrl = async () => {
    setIsShortening(true);
    setShorteningError('');
    setShortenedUrl('');
    try {
      const response = await fetch(`/api/shorten?url=${encodeURIComponent(shareUrl)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.shortUrl) {
          setShortenedUrl(data.shortUrl);
        } else {
          setShorteningError('Gagal memperpendek link. Silakan coba lagi.');
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        setShorteningError(errData.error || 'Server gagal memperpendek link.');
      }
    } catch (err) {
      console.error(err);
      setShorteningError('Gagal menghubungi server pemendek link.');
    } finally {
      setIsShortening(false);
    }
  };

  const updateProfileField = (field: keyof ProfileConfig, value: any) => {
    onChange({
      ...config,
      [field]: value
    });
  };

  const handleAvatarTypeChange = (type: 'emoji' | 'image') => {
    const value = type === 'emoji' ? '🛍️' : editingAvatarUrl;
    onChange({
      ...config,
      avatarType: type,
      avatarValue: value
    });
    setShowEmojiSelector(type === 'emoji');
  };

  const handleEmojiSelect = (emoji: string) => {
    onChange({
      ...config,
      avatarType: 'emoji',
      avatarValue: emoji
    });
  };

  const handleImageUrlChange = (url: string) => {
    setEditingAvatarUrl(url);
    onChange({
      ...config,
      avatarType: 'image',
      avatarValue: url
    });
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkUrl.trim()) return;

    // Determine default title if empty
    let title = newLinkTitle.trim();
    if (!title) {
      const platformInfo = SUPPORTED_PLATFORMS.find(p => p.id === newLinkPlatform);
      title = platformInfo ? `Beli di ${platformInfo.name}` : 'Beli Sekarang';
    }

    // Process URL - prepend protocol if missing
    let url = newLinkUrl.trim();
    if (!/^https?:\/\//i.test(url) && !url.startsWith('wa.me/')) {
      if (newLinkPlatform === 'whatsapp') {
        // Clean numbers for WA
        const cleanNumber = url.replace(/[^0-9]/g, '');
        url = `https://wa.me/${cleanNumber}`;
      } else {
        url = `https://${url}`;
      }
    }

    const newLink: MarketplaceLink = {
      id: Date.now().toString(),
      platform: newLinkPlatform,
      title,
      url,
      active: true
    };

    onChange({
      ...config,
      links: [...config.links, newLink]
    });

    // Reset fields
    setNewLinkTitle('');
    setNewLinkUrl('');
  };

  const handleDeleteLink = (id: string) => {
    onChange({
      ...config,
      links: config.links.filter(l => l.id !== id)
    });
  };

  const handleToggleLinkActive = (id: string) => {
    onChange({
      ...config,
      links: config.links.map(l => l.id === id ? { ...l, active: !l.active } : l)
    });
  };

  const moveLink = (index: number, direction: 'up' | 'down') => {
    const newLinks = [...config.links];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newLinks.length) return;

    // Swap
    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIndex];
    newLinks[targetIndex] = temp;

    onChange({
      ...config,
      links: newLinks
    });
  };

  const handlePlatformChange = (platform: PlatformId) => {
    setNewLinkPlatform(platform);
    const platformInfo = SUPPORTED_PLATFORMS.find(p => p.id === platform);
    if (platformInfo) {
      if (platform === 'gofood' || platform === 'shopeefood' || platform === 'grabfood') {
        setNewLinkTitle(`Pesan via ${platformInfo.name}`);
      } else if (platform === 'whatsapp') {
        setNewLinkTitle('Hubungi via WhatsApp');
      } else if (platform === 'instagram') {
        setNewLinkTitle('Ikuti Kami di Instagram');
      } else {
        setNewLinkTitle(`Beli di ${platformInfo.name}`);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 md:p-6" id="editor-control-panel">
      {/* Header Panel */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Store className="w-6 h-6 text-slate-800" />
          <h2 className="text-lg font-bold text-slate-800">Atur Landing Page</h2>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-medium text-slate-500 hover:text-red-500 flex items-center gap-1.5 transition-colors border border-slate-200 hover:border-red-200 px-2.5 py-1.5 rounded-lg bg-white"
        >
          <Undo2 className="w-3.5 h-3.5" /> Reset Default
        </button>
      </div>

      {/* Bagikan Section (Sticky Call-out) */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800 flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute right-[-15px] top-[-15px] text-white/5 pointer-events-none">
          <Sparkles className="w-24 h-24" />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-800 rounded-lg">
            <Share2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Bagikan ke Pelanggan</h3>
            <p className="text-slate-400 text-xs mt-0.5">Semua perubahan Anda tersimpan secara otomatis ke link ini!</p>
          </div>
        </div>

        <div className="flex gap-2 mt-1">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-700/60 focus:outline-none select-all truncate"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 active:scale-95 ${
              copied 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white text-slate-900 hover:bg-slate-100 shadow-sm'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Tersalin!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Salin Link
              </>
            )}
          </button>
        </div>
        
        {/* Shorten Link Action */}
        <div className="border-t border-slate-800/60 pt-3 mt-1 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-slate-400">Link terlalu panjang untuk profil medsos?</span>
            <button
              type="button"
              onClick={handleShortenUrl}
              disabled={isShortening}
              className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isShortening ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" /> Memproses...
                </>
              ) : (
                <>
                  <Scissors className="w-3 h-3" /> Perpendek Link (Instan)
                </>
              )}
            </button>
          </div>

          {shortenedUrl && (
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex flex-col gap-2 mt-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Link Pendek Siap Ditautkan!
                </span>
                <span className="text-[9px] text-slate-500 font-mono">Pas untuk bio medsos</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={shortenedUrl}
                  className="flex-1 bg-slate-900 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-800 focus:outline-none select-all font-mono"
                />
                <button
                  type="button"
                  onClick={handleCopyShort}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all duration-200 active:scale-95 cursor-pointer ${
                    copiedShort 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
                >
                  {copiedShort ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Salin!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Salin
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {shorteningError && (
            <p className="text-[10px] text-red-400 italic">
              ⚠️ {shorteningError}
            </p>
          )}
        </div>

        <p className="text-[10px] text-slate-400 italic leading-relaxed">
          💡 Pasang link di atas pada bio <b>Instagram</b>, <b>TikTok</b>, atau sebar ke grup <b>WhatsApp</b> agar pembeli mudah berbelanja.
        </p>
      </div>

      {/* Profil Toko Section */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
        <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2 flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-indigo-500 rounded-full"></span> Profil Toko
        </h3>

        {/* Avatar Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-600">Avatar / Logo Toko</label>
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl max-w-xs">
            <button
              type="button"
              onClick={() => handleAvatarTypeChange('emoji')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                config.avatarType === 'emoji' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smile className="w-3.5 h-3.5" /> Emoji
            </button>
            <button
              type="button"
              onClick={() => handleAvatarTypeChange('image')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                config.avatarType === 'image' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Image className="w-3.5 h-3.5" /> URL Gambar
            </button>
          </div>

          {showEmojiSelector ? (
            <div className="mt-2">
              <span className="text-[10px] text-slate-500 block mb-1.5">Pilih Emoji untuk Toko Anda:</span>
              <div className="grid grid-cols-10 gap-1.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                {PROFILE_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleEmojiSelect(emoji)}
                    className={`w-8 h-8 flex items-center justify-center text-xl rounded-lg hover:bg-white hover:scale-110 active:scale-95 transition-all ${
                      config.avatarValue === emoji ? 'bg-white shadow-sm border border-slate-200' : ''
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-2 flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-500 block">Masukkan URL Gambar / Logo Toko (HTTPS):</span>
              <input
                type="url"
                value={editingAvatarUrl}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                placeholder="https://example.com/logo-toko.png"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-slate-50"
              />
            </div>
          )}
        </div>

        {/* Nama Toko & Bio */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">Nama Toko</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => updateProfileField('name', e.target.value)}
              placeholder="Nama Toko Anda"
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-slate-50"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">Bio Toko / Informasi Singkat</label>
            <textarea
              value={config.bio}
              onChange={(e) => updateProfileField('bio', e.target.value)}
              placeholder="Tuliskan slogan, jam buka toko, atau info promo untuk pelanggan..."
              rows={3}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-slate-50"
            />
          </div>
        </div>
      </div>

      {/* Pilih Tema Section */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
        <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2 flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-amber-500 rounded-full"></span> Desain & Tema Warna
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {THEMES.map((theme) => {
            const isSelected = config.themeId === theme.id;
            
            // Render beautiful swatches depending on colors of theme
            let swatches = <div className="flex gap-1 mt-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200"></span>
              <span className="w-3 h-3 rounded-full bg-slate-800"></span>
            </div>;

            if (theme.id === 'sand') {
              swatches = <div className="flex gap-1 mt-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FCFBF9] border border-[#E6DDD4]"></span>
                <span className="w-3 h-3 rounded-full bg-[#5D4037]"></span>
              </div>;
            } else if (theme.id === 'cosmic') {
              swatches = <div className="flex gap-1 mt-1.5">
                <span className="w-3 h-3 rounded-full bg-[#0F172A] border border-slate-800"></span>
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              </div>;
            } else if (theme.id === 'emerald') {
              swatches = <div className="flex gap-1 mt-1.5">
                <span className="w-3 h-3 rounded-full bg-[#F0F5F2] border border-emerald-100"></span>
                <span className="w-3 h-3 rounded-full bg-[#1B3B2B]"></span>
              </div>;
            } else if (theme.id === 'orchid') {
              swatches = <div className="flex gap-1 mt-1.5">
                <span className="w-3 h-3 rounded-full bg-[#FAF5F7] border border-pink-100"></span>
                <span className="w-3 h-3 rounded-full bg-[#8C5D76]"></span>
              </div>;
            } else if (theme.id === 'mono') {
              swatches = <div className="flex gap-1 mt-1.5">
                <span className="w-3 h-3 rounded-full bg-white border border-black"></span>
                <span className="w-3 h-3 rounded-full bg-black"></span>
              </div>;
            }

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => updateProfileField('themeId', theme.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isSelected 
                    ? 'border-indigo-600 ring-2 ring-indigo-500/10 bg-indigo-50/10' 
                    : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">{theme.name}</span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0" />}
                </div>
                {swatches}
              </button>
            );
          })}
        </div>

        {/* Toggle QR code */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-700">Tampilkan QR Code Toko</span>
            <span className="text-[10px] text-slate-400">Pembeli bisa memindai dari layar desktop</span>
          </div>
          <button
            type="button"
            onClick={() => updateProfileField('showQrCode', !config.showQrCode)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
              config.showQrCode ? 'bg-indigo-600' : 'bg-slate-200'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-all duration-300 ${
                config.showQrCode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Tambah Link Marketplace Baru */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
        <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2 flex items-center gap-2">
          <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full"></span> Tambah Link Baru
        </h3>

        <form onSubmit={handleAddLink} className="flex flex-col gap-3">
          {/* Platform Selector Grid */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600">Pilih Platform Marketplace</label>
            <div className="grid grid-cols-3 gap-2">
              {SUPPORTED_PLATFORMS.map((platform) => {
                const isSelected = newLinkPlatform === platform.id;
                return (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => handlePlatformChange(platform.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-slate-800 bg-slate-50 ring-2 ring-slate-100 font-semibold'
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                    }`}
                  >
                    <BrandIcon platform={platform.id} className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs text-slate-700 truncate">{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">Judul Tombol</label>
            <input
              type="text"
              value={newLinkTitle}
              onChange={(e) => setNewLinkTitle(e.target.value)}
              placeholder="Contoh: Beli Madu Asli di Shopee"
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-slate-50"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">URL / Link Marketplace</label>
            <input
              type="text"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              placeholder={SUPPORTED_PLATFORMS.find(p => p.id === newLinkPlatform)?.defaultPlaceholder || 'https://shopee.co.id/...'}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-slate-50 font-mono text-[11px]"
            />
            {newLinkPlatform === 'whatsapp' && (
              <span className="text-[10px] text-slate-400">
                💡 Masukkan nomor WA lengkap Anda dimulai dari kode negara 62. Contoh: 628123456789
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!newLinkUrl.trim()}
            className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 ${
              newLinkUrl.trim()
                ? 'bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer hover:shadow active:scale-[0.98]'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4" /> Tambah Tombol Link
          </button>
        </form>
      </div>

      {/* Daftar Link Aktif Section */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-50 pb-2">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-indigo-500 rounded-full"></span> Urutan & Daftar Link ({config.links.length})
          </h3>
          <span className="text-[10px] text-slate-400 italic">Gunakan panah untuk merapikan urutan</span>
        </div>

        {config.links.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            Daftar link kosong. Tambahkan link baru di atas!
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {config.links.map((link, index) => {
              const platformInfo = SUPPORTED_PLATFORMS.find(p => p.id === link.platform);
              
              return (
                <div
                  key={link.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    link.active 
                      ? 'border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.01)]' 
                      : 'border-slate-100 bg-slate-50/50 opacity-60'
                  }`}
                  id={`editor-link-item-${link.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Active toggle */}
                    <input
                      type="checkbox"
                      checked={link.active}
                      onChange={() => handleToggleLinkActive(link.id)}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 accent-indigo-600 flex-shrink-0 cursor-pointer"
                      title="Aktifkan / Sembunyikan Link"
                    />

                    <div className="flex-shrink-0 p-1.5 bg-slate-100/70 rounded-lg">
                      <BrandIcon platform={link.platform} className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">
                        {link.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate leading-normal font-mono mt-0.5">
                        {link.url}
                      </p>
                    </div>
                  </div>

                  {/* Actions (Reorder & Delete) */}
                  <div className="flex items-center gap-1.5 ml-2">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveLink(index, 'up')}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                      title="Geser ke Atas"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === config.links.length - 1}
                      onClick={() => moveLink(index, 'down')}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                      title="Geser ke Bawah"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <div className="w-[1px] h-4 bg-slate-100 mx-1"></div>
                    <button
                      type="button"
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Hapus Link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
