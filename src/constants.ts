import { ThemeConfig, ProfileConfig, PlatformId } from './types';

export const SUPPORTED_PLATFORMS: { id: PlatformId; name: string; color: string; defaultPlaceholder: string }[] = [
  { id: 'shopee', name: 'Shopee', color: 'bg-[#EE4D2D]/10 text-[#EE4D2D] hover:bg-[#EE4D2D]/15', defaultPlaceholder: 'https://shopee.co.id/nama_toko' },
  { id: 'tokopedia', name: 'Tokopedia', color: 'bg-[#03AC0E]/10 text-[#03AC0E] hover:bg-[#03AC0E]/15', defaultPlaceholder: 'https://tokopedia.com/nama_toko' },
  { id: 'tiktok', name: 'TikTok Shop', color: 'bg-black/5 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-black/10', defaultPlaceholder: 'https://tiktok.com/@nama_toko' },
  { id: 'lazada', name: 'Lazada', color: 'bg-[#101433]/5 text-[#101433] hover:bg-[#101433]/10', defaultPlaceholder: 'https://lazada.co.id/shop/nama_toko' },
  { id: 'bukalapak', name: 'Bukalapak', color: 'bg-[#E1254A]/10 text-[#E1254A] hover:bg-[#E1254A]/15', defaultPlaceholder: 'https://bukalapak.com/u/nama_toko' },
  { id: 'blibli', name: 'Blibli', color: 'bg-[#0095DA]/10 text-[#0095DA] hover:bg-[#0095DA]/15', defaultPlaceholder: 'https://blibli.com/merchant/nama_toko' },
  { id: 'gofood', name: 'GoFood', color: 'bg-[#E11931]/10 text-[#E11931] hover:bg-[#E11931]/15', defaultPlaceholder: 'https://gofood.link/a/xxxxxx' },
  { id: 'shopeefood', name: 'ShopeeFood', color: 'bg-[#EE4D2D]/10 text-[#EE4D2D] hover:bg-[#EE4D2D]/15', defaultPlaceholder: 'https://shopee.co.id/now-food/shop/xxxxxx' },
  { id: 'grabfood', name: 'GrabFood', color: 'bg-[#00B14F]/10 text-[#00B14F] hover:bg-[#00B14F]/15', defaultPlaceholder: 'https://food.grab.com/id/id/restaurant/xxxxxx' },
  { id: 'whatsapp', name: 'WhatsApp Order', color: 'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/15', defaultPlaceholder: 'https://wa.me/628XXXXXXXXXX' },
  { id: 'instagram', name: 'Instagram', color: 'bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/15', defaultPlaceholder: 'https://instagram.com/nama_toko' },
  { id: 'custom', name: 'Link Custom', color: 'bg-slate-500/10 text-slate-700 hover:bg-slate-500/15', defaultPlaceholder: 'https://nama-website.com' },
];

export const THEMES: ThemeConfig[] = [
  {
    id: 'light',
    name: 'Clean Light (Susu)',
    bgClass: 'bg-[#F8F9FA]',
    cardBgClass: 'bg-white',
    borderClass: 'border border-slate-200/80',
    textClass: 'text-slate-800',
    textMutedClass: 'text-slate-500',
    accentClass: 'bg-slate-900 text-white hover:bg-slate-800',
    fontClass: 'font-sans antialiased',
    buttonClass: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 shadow-sm transition-all duration-200 active:scale-[0.98]',
    activeIndicatorClass: 'bg-emerald-500'
  },
  {
    id: 'sand',
    name: 'Warm Sand (Pasir)',
    bgClass: 'bg-[#F4EFEA]',
    cardBgClass: 'bg-[#FCFBF9]',
    borderClass: 'border border-[#E6DDD4]',
    textClass: 'text-[#3E2723]',
    textMutedClass: 'text-[#8D6E63]',
    accentClass: 'bg-[#5D4037] text-white hover:bg-[#4E342E]',
    fontClass: 'font-serif antialiased',
    buttonClass: 'bg-[#FCFBF9] hover:bg-[#F7F3EE] text-[#3E2723] border border-[#E6DDD4] hover:border-[#D1C3B4] shadow-sm transition-all duration-200 active:scale-[0.98]',
    activeIndicatorClass: 'bg-amber-600'
  },
  {
    id: 'cosmic',
    name: 'Cosmic Dark (Kosmik)',
    bgClass: 'bg-[#0F172A]',
    cardBgClass: 'bg-[#1E293B]',
    borderClass: 'border border-slate-800/80',
    textClass: 'text-slate-100',
    textMutedClass: 'text-slate-400',
    accentClass: 'bg-indigo-500 text-white hover:bg-indigo-600',
    fontClass: 'font-sans antialiased',
    buttonClass: 'bg-[#1E293B] hover:bg-slate-800 text-slate-100 border border-slate-800 hover:border-slate-700 shadow-sm transition-all duration-200 active:scale-[0.98]',
    activeIndicatorClass: 'bg-indigo-400'
  },
  {
    id: 'emerald',
    name: 'Emerald Moss (Lumut)',
    bgClass: 'bg-[#F0F5F2]',
    cardBgClass: 'bg-white',
    borderClass: 'border border-emerald-100',
    textClass: 'text-[#1B3B2B]',
    textMutedClass: 'text-[#4F735F]',
    accentClass: 'bg-[#1B3B2B] text-white hover:bg-[#12281D]',
    fontClass: 'font-sans antialiased',
    buttonClass: 'bg-white hover:bg-emerald-50/50 text-[#1B3B2B] border border-emerald-100 hover:border-emerald-200 shadow-sm transition-all duration-200 active:scale-[0.98]',
    activeIndicatorClass: 'bg-emerald-500'
  },
  {
    id: 'orchid',
    name: 'Orchid Blush (Anggrek)',
    bgClass: 'bg-[#FAF5F7]',
    cardBgClass: 'bg-white',
    borderClass: 'border border-pink-100',
    textClass: 'text-[#3B1B2C]',
    textMutedClass: 'text-[#8C5D76]',
    accentClass: 'bg-[#8C5D76] text-white hover:bg-[#724B60]',
    fontClass: 'font-sans antialiased',
    buttonClass: 'bg-white hover:bg-pink-50/30 text-[#3B1B2C] border border-pink-100 hover:border-pink-200 shadow-sm transition-all duration-200 active:scale-[0.98]',
    activeIndicatorClass: 'bg-pink-500'
  },
  {
    id: 'mono',
    name: 'Monochrome (Hitam-Putih)',
    bgClass: 'bg-white',
    cardBgClass: 'bg-white',
    borderClass: 'border-2 border-black',
    textClass: 'text-black',
    textMutedClass: 'text-zinc-600',
    accentClass: 'bg-black text-white hover:bg-zinc-800',
    fontClass: 'font-mono tracking-tight',
    buttonClass: 'bg-white hover:bg-black hover:text-white text-black border-2 border-black font-semibold transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    activeIndicatorClass: 'bg-black border border-white'
  }
];

export const PROFILE_EMOJIS = [
  '🛍️', '👕', '👟', '💄', '🍔', '☕', '🌿', '🧸', '💍', '📦', '🛒', '🎨', '📚', '💻', '🍰', '🌸', '🏡', '🚲', '🐶', '🍕'
];

export const DEFAULT_PROFILE_CONFIG: ProfileConfig = {
  name: 'Sambal Bakar Nusantara',
  bio: 'Pilihan sambal bakar pedas legendaris khas nusantara dengan lauk ayam goreng, bebek madura, dan ikan bakar segar. Siap santap, pesan instan hangat-hangat! 🌶️🍗🔥',
  avatarType: 'emoji',
  avatarValue: '🌶️',
  themeId: 'sand',
  links: [
    {
      id: '1',
      platform: 'gofood',
      title: 'Pesan Hangat via GoFood',
      url: 'https://gofood.link',
      active: true,
    },
    {
      id: '2',
      platform: 'grabfood',
      title: 'Diskon Spesial di GrabFood',
      url: 'https://food.grab.com',
      active: true,
    },
    {
      id: '3',
      platform: 'shopeefood',
      title: 'Pesan Hemat di ShopeeFood',
      url: 'https://shopee.co.id',
      active: true,
    },
    {
      id: '4',
      platform: 'whatsapp',
      title: 'Pemesanan Katering via WhatsApp',
      url: 'https://wa.me/628123456789',
      active: true,
    },
  ],
  showQrCode: true,
};
