/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PlatformId =
  | 'shopee'
  | 'tokopedia'
  | 'tiktok'
  | 'lazada'
  | 'bukalapak'
  | 'blibli'
  | 'whatsapp'
  | 'instagram'
  | 'gofood'
  | 'shopeefood'
  | 'grabfood'
  | 'custom';

export interface MarketplaceLink {
  id: string;
  platform: PlatformId;
  title: string;
  url: string;
  active: boolean;
}

export type ThemeId = 'light' | 'sand' | 'cosmic' | 'emerald' | 'orchid' | 'mono';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  bgClass: string;
  cardBgClass: string;
  borderClass: string;
  textClass: string;
  textMutedClass: string;
  accentClass: string;
  fontClass: string;
  buttonClass: string;
  activeIndicatorClass: string;
}

export interface ProfileConfig {
  name: string;
  bio: string;
  avatarType: 'emoji' | 'image';
  avatarValue: string;
  themeId: ThemeId;
  links: MarketplaceLink[];
  showQrCode: boolean;
}
