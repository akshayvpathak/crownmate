import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo";
import { images } from "@/data/images";
export const metadata = generatePageMetadata({
  title: "About Us",
  description:
    "CrownMate started in Surat in 2019. We build scalp and hair devices you can use at home.",
  path: "/about",
});

const values = [
  {
    title: "Build useful things",
    description:
      "We'd rather ship one device people use daily than five gadgets that collect dust.",
  },
  {
    title: "Say what it does",
    description:
      "No miracle claims. We tell you the session length, the wavelength, and how long results usually take.",
  },
  {
    title: "Fix problems fast",
    description: "Defective unit? WhatsApp us. We don't make you chase us for a week.",
  },
  {
    title: "For everyone",
    description:
      "Men, women, oily scalp, dry scalp — our devices are built for normal home use, not a lab.",
  },
  {
    title: "Keep improving",
    description:
      "Customer feedback goes straight to the product team. V2 of the helmet came from real user notes.",
  },
];

const team = [
  { name: "Urvashi Shingala", role: "Amazon Manager" },
  { name: "Vansh Dhankecha", role: "Designer" },
  { name: "Venisha Savaliya", role: "Social Media" },
  { name: "Khushal Dhameliya", role: "Performance Marketer & Creative strategist" },
  { name: "Foram Ramanuj", role: "Digital Marketing Executive & Content Strategist" },
  { name: "Priyal Surati", role: "HR Executive" },
  { name: "Drashti Kathrotiya", role: "Flipkart Manager" },
  { name: "Manthan Gajipara", role: "Accountant" },
  { name: "Vidhya naina", role: "Customer care support" },
  { name: "Maulik Domadiya", role: "Digital Head" },
  { name: "Nirmal Jobanputra", role: "Senior Script Writer" },
  { name: "Parthiv Patoliya", role: "Warehouse Manager" },
];

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-frizty max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">Who we are</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            CrownMate makes scalp and hair devices for home use — the RedLight Helmet,
            HF Wand, and Pulse Pro Massager. We started in 2019, packing orders from a
            room in Surat. Now we ship across India, but the idea is the same: give
            people clinic-style tools without the clinic price or the clinic visit.
          </p>

          <h2 className="text-2xl font-bold">What we&apos;re trying to do</h2>
          <p>
            Most Indians deal with hair thinning or scalp issues at some point. Clinics
            are expensive and hard to stick with. We build devices with clear session
            times and honest instructions so you can actually keep a routine going for
            months — because that&apos;s when results show up.
          </p>

          <h2 className="text-2xl font-bold">Where we&apos;re headed</h2>
          <p>
            Become the brand people trust for at-home scalp care in India. Not the
            flashiest marketing — just products that work when you use them as directed.
          </p>

          <h2 className="text-2xl font-bold">How we operate</h2>
          <div className="grid gap-4 sm:grid-cols-2 not-prose">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl bg-secondary p-4">
                <h3 className="font-bold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold">The founders</h2>
          <div className="grid gap-6 sm:grid-cols-2 not-prose">
            <div className="rounded-xl border border-border p-4">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-secondary">
                <Image
                  src={images.hero.helmet}
                  alt="Kishan"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Kishan</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Runs operations and sales. Started the business packing parcels from
                home in 2019 — still involved in every product launch.
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-secondary">
                <Image
                  src={images.hero.hfWand}
                  alt="Bhavik"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold">Bhavik</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Product and brand direction. Turns rough ideas into something we can
                actually manufacture and support.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Timeline</h2>
          <p>
            2019: first orders from a home office. 2023: CrownMate brand launch. We were
            early with the electric gua sha in India — scalp devices are where
            we&apos;re focused now.
          </p>

          <h2 className="text-2xl font-bold">The team</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 not-prose">
            {team.map((member) => (
              <div key={member.name} className="rounded-lg bg-secondary p-3">
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
