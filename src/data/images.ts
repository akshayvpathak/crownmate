/** Local Crownmate assets under public/images/crownmate/ */
const img = (path: string) => `/images/crownmate/${path}`;

export const images = {
  brand: {
    logo: img("brand/logo.png"),
    loader: img("brand/logo.png"),
  },
  hero: {
    helmet: img("helmet/01-hero-product-shot.png"),
    hfWand: img("hf-wand/01-hero-shot.png"),
    massager: img("pro-massager/01-hero-shot.png"),
    serumStamp: img("serum-stamp/01-hero-shot.png"),
    brandStory: img("helmet/02-woman-wearing.png"),
  },
  banners: {
    helmet: img("banners/helmet_banner_v0.2.PNG"),
    hfWand: img("banners/HF_WAND_Banner_v0.2.png"),
    massager: img("banners/massager_banner_v0.2.png"),
    serumStamp: img("banners/Serum_Stamp_Banner_V0.2.png"),
  },
  categories: {
    redlightHelmet: img("helmet/01-hero-product-shot.png"),
    hfWand: img("hf-wand/01-hero-shot.png"),
    scalpMassager: img("pro-massager/01-hero-shot.png"),
    serumStamp: img("serum-stamp/01-hero-shot.png"),
  },
  products: {
    redlightHelmet: img("helmet/01-hero-product-shot.png"),
    hfWand: img("hf-wand/01-hero-shot.png"),
    scalpMassager: img("pro-massager/01-hero-shot.png"),
    serumStamp: img("serum-stamp/01-hero-shot.png"),
  },
  howItWorks: {
    helmet: img("helmet/03-key-benefit.png"),
    hfWand: img("hf-wand/03-how-it-works.png"),
    massager: img("pro-massager/03-how-it-works.png"),
    serumStamp: img("serum-stamp/03-how-it-works.png"),
  },
  marketing: {
    brandStory: img("helmet/02-woman-wearing.png"),
    whyChooseUs: img("helmet/03-key-benefit.png"),
  },
  benefits: {
    trustedQuality: img("helmet/05-build-quality.png"),
    secureCheckout: img("hf-wand/04-attachments.png"),
    freeDelivery: img("pro-massager/01-hero-shot.png"),
    warranty: img("helmet/06-power-options.png"),
  },
} as const;

export const helmetImages = [
  img("helmet/01-hero-product-shot.png"),
  img("helmet/02-woman-wearing.png"),
  img("helmet/03-key-benefit.png"),
  img("helmet/04-laser-vs-led.png"),
  img("helmet/05-build-quality.png"),
  img("helmet/06-power-options.png"),
  img("helmet/07-results-before-after-1.png"),
  img("helmet/08-size-fit-guide.png"),
] as const;

export const hfWandImages = [
  img("hf-wand/01-hero-shot.png"),
  img("hf-wand/02-woman-using.png"),
  img("hf-wand/03-how-it-works.png"),
  img("hf-wand/04-attachments.png"),
  img("hf-wand/05-how-to-use.png"),
  img("hf-wand/06-results-expectations.png"),
] as const;

export const massagerImages = [
  img("pro-massager/01-hero-shot.png"),
  img("pro-massager/02-woman-using.png"),
  img("pro-massager/03-how-it-works.png"),
  img("pro-massager/04-modes.png"),
  img("pro-massager/05-charging-buttons.png"),
] as const;

export type ImageKey = keyof typeof images;

export const serumStampImages = [
  img("serum-stamp/01-hero-shot.png"),
  img("serum-stamp/02-man-using.png"),
  img("serum-stamp/03-how-it-works.png"),
  img("serum-stamp/04-components.png"),
  img("serum-stamp/05-how-to-use.png"),
] as const;
