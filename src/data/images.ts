import { CDN_BASE, SHOPIFY_CDN } from "@/constants/assets";

const cdn = (file: string, width = 800) =>
  `${CDN_BASE}/${file}?crop=center&height=${width}&v=1&width=${width}`;

const shopify = (file: string) => `${SHOPIFY_CDN}/${file}`;

export const images = {
  brand: {
    logo: cdn("Isolation_Mode.svg", 100),
    loader: cdn("loader.png", 32),
  },
  hero: {
    guaShaDesktop: cdn("home_mobile.webp", 800),
    guaShaMobile: cdn("home_mobile.webp", 800),
    headMassager: cdn("Head_Massager_Banner_-_MOBILE.webp", 800),
    frame162: cdn("Frame_162_22c0466e-2e5c-4afe-96a2-679db86f5390.webp", 800),
    frame161: cdn("Frame_161_c0ef1a47-2ab2-443b-b5c4-ccf01ee1f59a.webp", 800),
  },
  categories: {
    personalCare: cdn("Personal_Care_2e5b01ee-5a81-4950-9acd-915059a56598.webp", 360),
    pillOrganizer: cdn("Pill_Organizer_348823a7-2be3-4511-9750-dbb4e64a9459.webp", 360),
    essentialOil: cdn("Essential_Oil.png", 360),
    faceMassager: cdn("Face_Massager_53013054-c262-4b9a-acb8-203eb8757d99.webp", 360),
    massager: cdn("Massager.webp", 360),
    trimmers: cdn("Trimmers_3c40283d-745d-4c52-8a19-e8702b7a01f9.webp", 360),
    feetCare: cdn("CallusRemover.webp", 360),
    heatingPad: cdn("Group69_f802523f-be30-441c-ba6d-ac866021c85d.png", 360),
  },
  products: {
    guaSha: shopify("FaceMassager-Men.webp?v=1775021417"),
    scalpMassager: shopify("HeadMasagger.webp?v=1775020905"),
    slixyTrimmer: shopify("4in1SlixyTrimmer.webp?v=1775021672"),
    callusRemover: shopify("CallusRemover.webp?v=1768497236"),
    scalpFaceCombo: shopify(
      "MassagerkaBaap_addaac72-9659-4f5e-ab13-971a58aea140.webp?v=1775021544",
    ),
    wellnessCombo: shopify(
      "WellnessCombo-Guasha_HeadMassagerand4in1Trimmer_a2e9b135-5c0c-4afa-a011-4cf0ceec4117.webp?v=1775021417",
    ),
    guaShaTrimmerCombo: shopify(
      "Grooming_Skincare_Duo_-_4_In_1_Trimmer_Face_Massager.png?v=1775021672",
    ),
    trimmerScalpCombo: shopify(
      "Grooming_MassagerDuo-4in1Trimmer_HeadMassager.webp?v=1775021468",
    ),
    relaxationCombo: shopify(
      "HeadMassagerwithRosemaryOil_f67d5d80-7126-4996-96b7-1595064c3217.webp?v=1775021036",
    ),
    footMask: shopify("08_6663965c-fcaf-4b8e-ad5f-805ee38c4799.png?v=1768497236"),
    pillOrganizer: shopify("1000100650.webp?v=1753546017"),
    medicineOrganizer: shopify(
      "05_674f5c0f-b68b-4620-982a-2af1f22a861b.png?v=1775021417",
    ),
    rosemaryOil: shopify("05_610f8a16-49b0-40f4-9e1f-c48d82f15513.webp?v=1775022006"),
    heatingPad: shopify(
      "Group69_f802523f-be30-441c-ba6d-ac866021c85d.png?v=1772615655",
    ),
  },
  marketing: {
    brandStory: cdn("Frame_161_c0ef1a47-2ab2-443b-b5c4-ccf01ee1f59a.webp", 800),
    expressYourself: cdn("Frame_162_22c0466e-2e5c-4afe-96a2-679db86f5390.webp", 800),
    whyChooseUs: cdn("blue-back-img.svg", 800),
    zigzag: cdn("zig-zag-svg.svg", 800),
    bottomCurve: cdn("bottom-shape-curve.svg", 800),
  },
  press: {
    interviewer: cdn("interviewer.png", 2048),
    indianBusinessTimes: cdn("indian_business_times.png", 2048),
    mediaHindustan: cdn("media_hindustan.png", 2048),
  },
  testimonials: {
    saurabh: shopify("review_5.png?v=1745409583"),
    vibha: shopify("review_4.webp?v=1745409534"),
    aakash: shopify("akash.png?v=1752512520"),
    kashish: shopify("8.png?v=1747124404"),
    edwina: shopify("1_e207f877-d8e4-4209-a4ef-cd9702797bbf.webp?v=1746128908"),
    tanya: shopify("1_83134efd-e6bc-4f02-8625-a2c6d111910e.jpg?v=1747333624"),
    ankita: shopify("5_c37d952d-e2ad-49f4-911d-e8ce43ac3ec9.png?v=1747140527"),
    comboReview: shopify(
      "ComboofTwo1_5aea36c8-2964-456f-b7e3-e247e58c0186.png?v=1753963283",
    ),
  },
  about: {
    founderKishan: shopify(
      "WhatsApp_Image_2025-05-12_at_16.07.22_43fcae9b.jpg?v=1753963283",
    ),
    founderBhavik: shopify("5_6a92111e-7f85-4d96-a743-6429c07037e3.png?v=1747141418"),
    behindScenes: shopify("02_7d489a4c-17d5-45ef-a85a-fa13051320eb.webp?v=1775021672"),
  },
  benefits: {
    trustedQuality: cdn("Frame_162_22c0466e-2e5c-4afe-96a2-679db86f5390.webp", 400),
    secureCheckout: cdn("Frame_161_c0ef1a47-2ab2-443b-b5c4-ccf01ee1f59a.webp", 400),
    freeDelivery: cdn("home_mobile.webp", 400),
    warranty: cdn("blue-back-img.svg", 400),
  },
} as const;

export type ImageKey = keyof typeof images;
