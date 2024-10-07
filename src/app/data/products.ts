import footPatch from '@/app/images/shop/foot-patch.jpg';
import herbalPatch from '@/app/images/shop/herbal-patch.jpg';
import multiUse from '@/app/images/shop/multi-use.jpg';
import painRelief from '@/app/images/shop/pain-relief.jpg';
import { StaticImageData } from 'next/image';

export interface Product {
  title: string;
  description: string;
  imageSrc: StaticImageData;
  originalPrice: number;
  discountedPrice: number;
  shopeeLink: string;
  lazadaLink: string;
  tiktokLink: string;
}

export const PRODUCTS: Product[] = [
  {
    title: 'Multi-Use Pain Relief',
    description:
      'Relief for sore muscles, neck aches, backaches, and other body pains',
    imageSrc: multiUse,
    originalPrice: 200,
    discountedPrice: 100,
    shopeeLink: 'https://shopee.com/iyasu-multi-use-pain-relief',
    lazadaLink: 'https://www.lazada.com/iyasu-multi-use-pain-relief',
    tiktokLink: 'https://www.tiktok.com/@iyasu/multi-use-pain-relief',
  },
  {
    title: 'Herbal Warm Patch',
    description:
      'Soothing heat therapy to relieve dysmenorrhea and other body aches',
    imageSrc: herbalPatch,
    originalPrice: 200,
    discountedPrice: 100,
    shopeeLink: 'https://shopee.com/iyasu-herbal-warm-patch',
    lazadaLink: 'https://www.lazada.com/iyasu-herbal-warm-patch',
    tiktokLink: 'https://www.tiktok.com/@iyasu/herbal-warm-patch',
  },
  {
    title: 'Warm+ Pain Relief',
    description:
      'Perfect for sore muscles, sprains, rheumatism, arthritis, and bruises.',
    imageSrc: painRelief,
    originalPrice: 200,
    discountedPrice: 100,
    shopeeLink: 'https://shopee.com/iyasu-warm-plus-pain-relief',
    lazadaLink: 'https://www.lazada.com/iyasu-warm-plus-pain-relief',
    tiktokLink: 'https://www.tiktok.com/@iyasu/warm-plus-pain-relief',
  },
  {
    title: 'Stress Away Foot Patch',
    description:
      'Boost your vitality, relieve fatigue, enhance sleep quality, and prevent foot odor.',
    imageSrc: footPatch,
    originalPrice: 200,
    discountedPrice: 100,
    shopeeLink: 'https://shopee.com/iyasu-stress-away-foot-patch',
    lazadaLink: 'https://www.lazada.com/iyasu-stress-away-foot-patch',
    tiktokLink: 'https://www.tiktok.com/@iyasu/stress-away-foot-patch',
  },
];
