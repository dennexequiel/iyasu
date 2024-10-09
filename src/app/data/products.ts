import expFootPatch from '@/app/images/experience/foot-patch.jpg';
import expHerbalPatch from '@/app/images/experience/herbal-patch.jpg';
import expMultiUse from '@/app/images/experience/multi-use.jpg';
import expMainRelief from '@/app/images/experience/pain-relief.jpg';
import footPatch from '@/app/images/shop/foot-patch.jpg';
import herbalPatch from '@/app/images/shop/herbal-patch.jpg';
import multiUse from '@/app/images/shop/multi-use.jpg';
import painRelief from '@/app/images/shop/pain-relief.jpg';
import { StaticImageData } from 'next/image';

export interface Product {
  title: string;
  description: string;
  imageSrc: StaticImageData;
  experienceImageSrc: StaticImageData;
  experienceDescription: string;
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
    experienceImageSrc: expMultiUse,
    experienceDescription:
      'Feel the magic of menthol in every patch. Made from natural ingredients, these patches offer relief for sore muscles, neck aches, backaches, and other body pains. Mild-scented and easy to use, they help you stay active and comfortable wherever you are.',
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
    experienceImageSrc: expHerbalPatch,
    experienceDescription:
      'Sore tummy or cramps? Body aches? Try the healing power of moxibustion, an ancient Chinese heat therapy using mugwort. This helps stimulate circulation and relieve pain, so you can feel better fast, even on the go.',
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
    experienceImageSrc: expMainRelief,
    experienceDescription:
      'Don’t let aches stop you from doing what you love. Our Warm+ Pain Relief Patch provides extra strength for faster and lasting pain-relief from muscle aches, arthritis, and everyday discomfort.',
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
    experienceImageSrc: expFootPatch,
    experienceDescription:
      'Kick stress to the curb with soothing foot patches packed with natural ingredients like green tea. Boost your vitality, relieve fatigue, enhance sleep quality, and prevent foot odor. Sweet dreams and refreshed mornings are just a patch away!',
    originalPrice: 200,
    discountedPrice: 100,
    shopeeLink: 'https://shopee.com/iyasu-stress-away-foot-patch',
    lazadaLink: 'https://www.lazada.com/iyasu-stress-away-foot-patch',
    tiktokLink: 'https://www.tiktok.com/@iyasu/stress-away-foot-patch',
  },
];
