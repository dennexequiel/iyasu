import { StaticImageData } from 'next/image';

export interface Testimonial {
  id: number;
  name: string;
  address: string;
  quote: string;
  rating: number;
  image?: StaticImageData;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "As a 48-year-old dad who runs regularly, I've dealt with seasonal knee pain. Since using the Iyasu Multi-use pain patch, I’ve felt much better, and the pain has noticeably lessened, helping me stay active with my kids!",
    name: 'Dennis',
    address: 'Makati',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'I recommend Iyasu to anyone dealing with period cramps who wants to avoid taking meds. It’s light and comfortable, which let me move around and stay productive. Plus, it’s affordable!',
    name: 'Mika',
    address: 'Quezon City',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'I really like using this product for my period cramps. The gentle heat felt soothing, and after just one day, I noticed a big difference. The warmth helped take the edge off the pain.',
    name: 'Kyla',
    address: 'Cebu',
    rating: 5,
  },
  {
    id: 4,
    quote:
      'I commute to work daily and often struggle with shoulder pain. Since using the Warm+ patch, my muscles have softened and relaxed, allowing me to move more freely at work. It’s made a big difference!',
    name: 'Amee',
    address: 'Davao',
    rating: 5,
  },
  {
    id: 5,
    quote:
      'I love the menstrual cramps patch! I used to rely on heat packs, but this hands-free patch is a game-changer. I can lie on my side, walk around, and do anything while using it.',
    name: 'Maybelle',
    address: 'Ortigas',
    rating: 5,
  },
  {
    id: 6,
    quote:
      "As a motorcycle driver, my legs get tired after long days on the road. Since using Iyasu's foot patch, I feel more relaxed, and helps lower my triglyceride levels. It’s a great way to care for my health!",
    name: 'Kuya Roger',
    address: 'Manila',
    rating: 5,
  },
  {
    id: 7,
    quote:
      'Iyasu’s Warm+ patch is the right level of heat and does not carry a strong smell.  It helped me with my back pain and allowed me to sleep more soundly, letting me feel more energized for the next day',
    name: 'Vic',
    address: 'Alabang',
    rating: 5,
  },
  {
    id: 8,
    quote:
      'Stiff necks and back pain are a constant and i normally don’t place anything because of the strong smell of other products.  With Iyasu’s multi-use patch, i’m able to use it in different areas and enjoy a mild menthol smell at the same time.',
    name: 'Nica',
    address: 'Paranaque',
    rating: 5,
  },
];
