import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo";
import { images } from "@/data/images";
export const metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about CrownMate Personal Care — India's trusted D2C brand for smart self-care solutions.",
  path: "/about",
});

const values = [
  {
    title: "Innovation",
    description:
      "From India's first Electric Gua Sha to improving everyday wellness tools, innovation drives everything we create.",
  },
  {
    title: "Integrity",
    description:
      "Honesty, transparency, and ethical practices are at the heart of our business.",
  },
  {
    title: "Collaboration",
    description:
      "We grow together — teamwork and trust help us build better products and a better company.",
  },
  {
    title: "Diversity & Inclusion",
    description:
      "CrownMate is for everyone. We welcome different ideas, backgrounds, and perspectives.",
  },
  {
    title: "Continuous Improvement",
    description:
      "We never settle. Every challenge is an opportunity to learn, improve, and evolve.",
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
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">Who we are?</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            CrownMate Personal Care transforms daily routines into enjoyable rituals.
            Self-care should be more than a habit—it should be a moment of joy and
            fulfillment. With a focus on innovation, CrownMate creates products that
            make wellness effortless and rewarding.
          </p>

          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p>
            To improve the quality of daily self-care for every Indian by providing
            affordable, innovative, and effective personal wellness tools. We aim to
            bridge the gap between ancient self-care traditions and modern technology.
          </p>

          <h2 className="text-2xl font-bold">Our Vision</h2>
          <p>
            To become India&apos;s most trusted D2C brand for smart self-care
            solutions—where beauty meets science, and comfort meets results.
          </p>

          <h2 className="text-2xl font-bold">Our Values</h2>
          <div className="grid gap-4 sm:grid-cols-2 not-prose">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl bg-secondary p-4">
                <h3 className="font-bold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold">Meet The Founders</h2>
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
              <h3 className="font-bold">Kishan — The Hustler with a Vision</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                From handling e-commerce orders from a single room in 2019 to leading
                one of India&apos;s most exciting personal care brands.
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
              <h3 className="font-bold">Bhavik — The Mind Behind the Brand</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The calm strategist and creative thinker behind CrownMate, turning chaos
                into structure and ideas into strategy.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Our Journey</h2>
          <p>
            In 2019, we began our journey from a small room at home. In 2023, we
            officially launched CrownMate—a D2C brand dedicated to upgrading
            India&apos;s personal care experience. We are the first brand in India to
            launch the Electric Gua Sha.
          </p>
          <blockquote className="border-l-4 border-primary pl-4 italic text-lg">
            &ldquo;Every downfall is a setup for a bigger comeback.&rdquo;
          </blockquote>

          <h2 className="text-2xl font-bold">
            The Pillars behind a Successful Ambition
          </h2>
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
