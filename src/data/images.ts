import { CROWNMATE_BASE } from "@/constants/assets";

const cm = (path: string) => `${CROWNMATE_BASE}${path}`;

export const images = {
  brand: {
    logo: cm("/crownmate-logo.png"),
    loader: cm("/crownmate-logo.png"),
  },
  hero: {
    helmet: cm("/banners/Helmet_Banner.png"),
    hfWand: cm("/banners/HF_WAND_Banner.png"),
    massager: cm("/banners/Massager_Banner.png"),
    brandStory: cm("/images/helmet/2.Woman%20Wearing%20It.png"),
  },
  categories: {
    redlightHelmet: cm("/images/helmet/1.Hero%20Product%20shot.png"),
    hfWand: cm("/images/hf-wand/1.Hero%20shot.png"),
    scalpMassager: cm("/images/pro-massager/1%20Hero%20Shot.png"),
  },
  products: {
    redlightHelmet: cm("/images/helmet/1.Hero%20Product%20shot.png"),
    hfWand: cm("/images/hf-wand/1.Hero%20shot.png"),
    scalpMassager: cm("/images/pro-massager/1%20Hero%20Shot.png"),
  },
  howItWorks: {
    helmet: cm("/images/helmet/1.Hero%20Product%20shot.png"),
    hfWand: cm("/images/hf-wand/1.Hero%20shot.png"),
    massager: cm("/images/pro-massager/1%20Hero%20Shot.png"),
  },
  marketing: {
    brandStory: cm("/images/helmet/2.Woman%20Wearing%20It.png"),
    whyChooseUs: cm("/images/helmet/3.What%20It%20Does%20%20Key%20Benefit.png"),
  },
  benefits: {
    trustedQuality: cm("/images/helmet/5.%20Components%20%20Build%20Quality.png"),
    secureCheckout: cm("/images/hf-wand/4.Attachments%20explained.png"),
    freeDelivery: cm("/images/pro-massager/1%20Hero%20Shot.png"),
    warranty: cm("/images/helmet/6.%20Power%20Options%20Adaptor%20and%20Powerbank.png"),
  },
} as const;

export type ImageKey = keyof typeof images;
