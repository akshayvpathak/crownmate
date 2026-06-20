import { generatePageMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/assets";

export const metadata = generatePageMetadata({
  title: "About Us",
  description:
    "CrownMate builds at-home scalp and hair devices — RedLight Helmet, HF Wand, and Pulse Pro Massager.",
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

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-site max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">Who we are</h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p>
            CrownMate makes scalp and hair devices for home use — the RedLight Helmet,
            HF Wand, and Pulse Pro Massager. We launched the brand in 2024 with a simple
            goal: clinic-style scalp tools without the clinic visit or price tag.
          </p>

          <h2 className="text-2xl font-bold">What we&apos;re trying to do</h2>
          <p>
            Most Indians deal with hair thinning or scalp issues at some point. Clinics
            are expensive and hard to stick with. We build devices with clear session
            times and honest instructions so you can keep a routine going for months —
            because that&apos;s when results show up.
          </p>

          <h2 className="text-2xl font-bold">The lineup</h2>
          <ul>
            <li>
              <strong>RedLight Helmet</strong> — 40 laser diodes, 20-minute hands-free
              sessions
            </li>
            <li>
              <strong>HF Wand</strong> — high-frequency scalp and facial therapy
            </li>
            <li>
              <strong>Pulse Pro Massager</strong> — daily waterproof scalp massage
            </li>
          </ul>

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
          <div className="grid gap-4 sm:grid-cols-2 not-prose">
            <div className="rounded-xl border border-border p-4">
              <h3 className="font-bold">Geeta</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Operations and sales. Runs fulfilment and stays close to every product
                launch.
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <h3 className="font-bold">Kailash</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Product and brand. Turns rough ideas into devices we can manufacture and
                support at scale.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Support</h2>
          <p>
            {SITE_CONFIG.supportHours}. Reach us at {SITE_CONFIG.email} or{" "}
            {SITE_CONFIG.phone}.
          </p>
        </div>
      </div>
    </div>
  );
}
