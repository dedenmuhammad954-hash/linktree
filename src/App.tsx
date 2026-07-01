import { useState, useEffect, useMemo } from 'react';
import { DEFAULT_PROFILE_CONFIG } from './constants';
import { ProfileConfig } from './types';
import { LinkTreePreview } from './components/LinkTreePreview';
import { EditorPanel } from './components/EditorPanel';
import { 
  Smartphone, 
  Settings2, 
  Eye, 
  ExternalLink, 
  Sparkles, 
  AlertTriangle,
  ShoppingBag,
  Store,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [state, setState] = useState<{
    config: ProfileConfig;
    isPublicView: boolean;
    urlError: boolean;
  }>(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('s');
    if (s) {
      try {
        // Safe unicode base64 decoding
        const decodedStr = decodeURIComponent(escape(atob(s)));
        const decoded = JSON.parse(decodedStr);
        
        const parsedConfig: ProfileConfig = {
          name: decoded.n || '',
          bio: decoded.b || '',
          avatarType: decoded.at === 'i' ? 'image' : 'emoji',
          avatarValue: decoded.av || '🛍️',
          themeId: decoded.t || 'light',
          links: (decoded.l || []).map((link: any, i: number) => ({
            id: String(i),
            platform: link.p,
            title: link.t,
            url: link.u,
            active: true
          })),
          showQrCode: decoded.qr !== undefined ? decoded.qr : true
        };
        return { config: parsedConfig, isPublicView: true, urlError: false };
      } catch (e) {
        console.error('Failed to parse shared config:', e);
        return { config: DEFAULT_PROFILE_CONFIG, isPublicView: false, urlError: true };
      }
    }

    // Fallback to localStorage
    const saved = localStorage.getItem('marketplace_linktree_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Basic validation of fields
        if (parsed && typeof parsed.name === 'string') {
          return { config: parsed, isPublicView: false, urlError: false };
        }
      } catch (e) {
        console.error('Failed to parse localStorage config:', e);
      }
    }

    return { config: DEFAULT_PROFILE_CONFIG, isPublicView: false, urlError: false };
  });

  const { config, isPublicView, urlError } = state;
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Sync to localStorage on change (only in builder mode)
  useEffect(() => {
    if (!isPublicView) {
      localStorage.setItem('marketplace_linktree_config', JSON.stringify(config));
    }
  }, [config, isPublicView]);

  // Generate Compressed Shareable URL based on current configuration
  const shareUrl = useMemo(() => {
    const shareObj = {
      n: config.name,
      b: config.bio,
      at: config.avatarType === 'emoji' ? 'e' : 'i',
      av: config.avatarValue,
      t: config.themeId,
      l: config.links.filter(l => l.active).map(l => ({ p: l.platform, t: l.title, u: l.url })),
      qr: config.showQrCode
    };
    // Safe unicode base64 encoding
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(shareObj))));
    return `${window.location.origin}${window.location.pathname}?s=${b64}`;
  }, [config]);

  const handleConfigChange = (newConfig: ProfileConfig) => {
    setState(prev => ({
      ...prev,
      config: newConfig
    }));
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin menyetel ulang profil kembali ke template bawaan? Semua perubahan belum dibagikan akan hilang.')) {
      setState(prev => ({
        ...prev,
        config: DEFAULT_PROFILE_CONFIG
      }));
    }
  };

  // 1. PUBLIC LANDING VIEW (No settings, no panels, pure customer preview)
  if (isPublicView) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-between bg-slate-50 relative">
        <div className="flex-1 w-full">
          <LinkTreePreview config={config} previewUrl={window.location.href} />
        </div>

        {/* Minimalist Watermark Creator Invitation */}
        <div className="w-full bg-slate-900 border-t border-slate-800 py-4 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left z-10 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600/10 rounded-lg">
              <ShoppingBag className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Ingin membuat Landing Page toko Anda sendiri?</p>
              <p className="text-[10px] text-slate-400 leading-normal">Gabungkan Shopee, Tokopedia, & WA gratis & instan tanpa ribet.</p>
            </div>
          </div>
          <a
            href={window.location.origin + window.location.pathname}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
          >
            Buat Sekarang <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // 2. MERCHANT BUILDER VIEW (Two column workspace or mobile tab views)
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans">
      {/* Top Header Bar */}
      <header className="w-full bg-white border-b border-slate-100 py-4 px-4 md:px-6 sticky top-0 z-20 shadow-[0_1px_5px_-2px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-indigo-600/20">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-slate-900">Marketplace Link Tree</h1>
              <p className="text-[10px] text-slate-400 font-medium">Pembuat Landing Page Toko Online Minimalis & Responsif</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Auto-Saved to Storage
            </span>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/50 border border-indigo-100 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 bg-white transition-all shadow-sm"
              title="Buka halaman live yang sudah dikonfigurasi di tab baru"
            >
              <Eye className="w-3.5 h-3.5" /> Lihat Hasil <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-6 p-4 md:p-6 pb-24 lg:pb-6 overflow-hidden">
        
        {/* Error Alert if query parameter was corrupt */}
        {urlError && (
          <div className="col-span-12 bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900">Format Link Tidak Valid</h4>
              <p className="text-[11px] text-amber-700 leading-relaxed mt-0.5">
                Link shared yang Anda buka mengalami kerusakan atau tidak terbaca. Kami telah memuat profil default Anda sebagai gantinya.
              </p>
            </div>
          </div>
        )}

        {/* LEFT COLUMN: Live Mobile Phone Frame Mockup (lg:col-span-5) */}
        <div className={`lg:col-span-5 flex-col items-center justify-center p-4 bg-slate-100/50 rounded-3xl border border-slate-200/40 relative min-h-[580px] lg:flex ${
          activeTab === 'preview' ? 'flex' : 'hidden lg:flex'
        }`}>
          {/* Mockup Frame Title */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" /> Tampilan Live Toko
          </div>

          {/* High Fidelity Phone Shell */}
          <div className="w-[310px] sm:w-[325px] h-[610px] rounded-[40px] bg-slate-950 border-[10px] border-slate-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative overflow-hidden flex flex-col">
            {/* Phone Speaker Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-4 w-32 bg-slate-900 rounded-b-xl z-30 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
            </div>

            {/* Inner App Container with Custom Scrollbar */}
            <div className="flex-1 w-full overflow-y-auto pt-4 scrollbar-thin">
              <LinkTreePreview config={config} previewUrl={shareUrl} />
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic text-center mt-3 max-w-xs">
            Halaman di atas merepresentasikan persis apa yang akan dilihat oleh pembeli dari HP mereka.
          </p>
        </div>

        {/* RIGHT COLUMN: Merchant Settings Panel (lg:col-span-7) */}
        <div className={`lg:col-span-7 bg-white rounded-3xl border border-slate-150/60 shadow-sm overflow-y-auto scrollbar-thin ${
          activeTab === 'editor' ? 'block' : 'hidden lg:block'
        }`}>
          <EditorPanel 
            config={config} 
            onChange={handleConfigChange} 
            onReset={handleReset} 
            shareUrl={shareUrl}
          />
        </div>
      </main>

      {/* MOBILE RESPONSIVE TABS (Visible only on mobile screen widths) */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md border border-slate-200 p-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-1 z-30 lg:hidden">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
            activeTab === 'editor'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Settings2 className="w-4 h-4" /> Edit Pengaturan
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
            activeTab === 'preview'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Smartphone className="w-4 h-4" /> Lihat Live ({config.links.filter(l => l.active).length})
        </button>
      </div>
    </div>
  );
}
