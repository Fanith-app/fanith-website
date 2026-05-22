import { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Crosshair,
  Eye,
  Gift,
  Headphones,
  Mail,
  MessageCircle,
  MessageSquare,
  ShoppingBag,
  Trophy,
  TrendingUp,
  UserRound,
  UsersRound,
  Zap,
} from 'lucide-react';
import { Inter, Outfit } from 'next/font/google';
import React from 'react';
import BrandCollaborationForm from '@/src/components/BrandCollaborationForm';

const outfitExtraBold = Outfit({
  subsets: ['latin'],
  weight: ['800'],
});

const outfitBold = Outfit({
  subsets: ['latin'],
  weight: ['700'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Brand Collaboration - Fanith',
  description: "Partner and collaborate with Fanith, India's premier cricket fan community platform.",
  alternates: {
    canonical: 'https://www.fanith.com/brand-collaboration',
  },
};

const page = () => {
  const impactItems = [
    { icon: UsersRound, text: 'Highly engaged sports audience' },
    { icon: Zap, text: 'Real-time conversations & feedback' },
    { icon: Eye, text: 'Contextual visibility during live matches' },
    { icon: Trophy, text: 'Drive brand recall with rewards' },
    { icon: BarChart3, text: 'Measurable impact with detailed analytics' },
  ];

  const stats = [
    { icon: UserRound, value: '50K+', label: 'Active Fans' },
    { icon: CalendarDays, value: '100+', label: 'Live Events/Season' },
    { icon: MessageSquare, value: '1M+', label: 'Monthly Interactions' },
    { icon: Trophy, value: '95%+', label: 'Engagement Rate' },
  ];

  const collaborationCards = [
    {
      icon: Mail,
      title: '1. Brand Takeover',
      description: 'Take over the entire platform with high-impact branded experiences and custom themes.',
      image: '/assets/images/brand-collaboration/brand-takeover.jpg',
      footer: 'Exclusive visibility. Unmatched brand impact.',
    },
    {
      icon: MessageCircle,
      title: '2. General Chat Sponsorship',
      description: 'Showcase your brand across the Fanboard through banners, pins, and branded posts.',
      image: '/assets/images/brand-collaboration/general-chat-sponsorship.jpg',
      footer: 'High visibility. Maximum fan engagement.',
    },
    {
      icon: Gift,
      title: '3. Rewards & Coupons',
      description: 'Reward fans with exciting coupons, discounts, and giveaways for their participation.',
      image: '/assets/images/brand-collaboration/rewards-coupons.jpg',
      footer: 'Delight fans. Drive brand loyalty.',
      highlighted: true,
    },
    {
      icon: Crosshair,
      title: '4. Contests & Challenges',
      description: 'Co-create contests, quizzes, and challenges with us to engage fans and promote your brand.',
      image: '/assets/images/brand-collaboration/contests-challenges.jpg',
      footer: 'Engage. Excite. Build advocacy.',
    },
    {
      icon: ShoppingBag,
      title: '5. Affiliate Marketing',
      description: 'Promote products/services through trusted affiliate links shared with our fan community.',
      image: '/assets/images/brand-collaboration/affiliate-marketing.jpg',
      footer: 'Boost conversions. Track performance.',
    },
  ];

  return (
    <main className={`${inter.className} bg-black text-white`}>
      <section className="relative min-h-[calc(100vh-110px)] overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/images/brand-collaboration-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />

        <div className="relative mx-auto flex min-h-[calc(100vh-110px)] w-full max-w-[1280px] items-center px-6 pb-16 pt-28 md:px-10 md:pt-32 lg:px-16">
          <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
            <section className="max-w-[680px]">
              <h1 className={`${outfitExtraBold.className} text-[56px] leading-[0.98] tracking-normal text-white md:text-[72px]`}>
                <span className="block">Collaborate.</span>
                <span className="block">Engage.</span>
                <span className="block text-[#E31E24]">Create Impact.</span>
              </h1>
              <p className="mt-6 max-w-[640px] text-[20px] leading-[1.5] text-[#D0D0D0]">
                Partner with Fanith and connect with millions of passionate sports fans. From live match moments to
                fan conversations - your brand, right where the action happens.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-4">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="min-w-0">
                    <Icon className="h-5 w-5 text-[#E31E24]" strokeWidth={2.1} />
                    <p className={`${outfitExtraBold.className} mt-3 text-5xl leading-none text-white`}>{value}</p>
                    <p className="mt-2 text-base text-[#B8B8B8]">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="rounded-[24px] border border-[#E31E24] bg-[#0B0B0B]/95 px-7 py-8 backdrop-blur-sm">
              <h2 className={`${outfitBold.className} text-[34px] leading-tight text-white`}>
                Why Brands Love <span className="text-[#E31E24]">Fanith</span>
              </h2>
              <div className="mt-6 space-y-5">
                {impactItems.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E31E24]">
                      <Icon className="h-5 w-5 text-white" strokeWidth={2.4} />
                    </div>
                    <p className="text-[18px] font-semibold leading-[1.35] text-[#F3F3F3]">{text}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-16">
          <h2 className={`${outfitBold.className} text-center text-[34px] leading-tight text-white`}>
            Ways Your Brand Can Collaborate
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5 xl:items-stretch">
            {collaborationCards.map(({ icon: Icon, title, description, image, footer, highlighted }) => (
              <article
                key={title}
                className={`flex h-full flex-col rounded-2xl border bg-[#0E0F12] p-5 ${
                  highlighted ? 'border-[#E31E24]' : 'border-white/10'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E31E24]">
                    <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />
                  </div>
                  <h3 className="text-[18px] font-bold leading-snug text-white">{title}</h3>
                </div>
                <p className="mt-3 min-h-[110px] text-[14px] font-normal leading-[1.5] text-[#9CA3AF]">{description}</p>
                <div className="mt-4 h-[205px] overflow-hidden rounded-xl border border-white/5 bg-black p-2">
                  <Image
                    src={image}
                    alt={title}
                    width={280}
                    height={360}
                    className="h-full w-full rounded-lg object-cover object-center"
                  />
                </div>
                <p className="mt-4 text-center text-[15px] font-bold leading-[1.45] text-white">{footer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 pb-20 pt-14">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_1.35fr_0.8fr] lg:px-16">
          <div>
            <h3 className={`${outfitBold.className} text-[34px] leading-tight text-white`}>Something Epic Together</h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-[#9CA3AF]">
              Fanith to create unforgettable fan experiences and meaningful impact for your brand.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-7">
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-[#E31E24]" />
                <span className="text-[15px] font-bold text-white">Dedicated Support</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#E31E24]" />
                <span className="text-[15px] font-bold text-white">Impactful results</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`${outfitBold.className} text-[30px] leading-tight text-white`}>Interested In Partnering with Fanith?</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-[#9CA3AF]">
              Fill out the form and our team will get in touch with you shortly.
            </p>
            <BrandCollaborationForm />
          </div>

          <div className="border-l border-white/10 pl-0 lg:pl-8">
            <p className="text-[14px] text-[#9CA3AF]">Or contact us at:</p>
            <a href="mailto:partnership@fanith.com" className="mt-3 inline-flex items-center gap-2 text-[15px] text-white">
              <Mail className="h-4 w-4 text-[#E31E24]" />
              partnership@fanith.com
            </a>

            <p className="mt-8 text-[14px] text-[#9CA3AF]">Follow Us</p>
            <div className="mt-3 flex gap-3">
              <span className="h-9 w-9 rounded-md border border-white/10 bg-[#0E0F12]" />
              <span className="h-9 w-9 rounded-md border border-white/10 bg-[#0E0F12]" />
              <span className="h-9 w-9 rounded-md border border-white/10 bg-[#0E0F12]" />
              <span className="h-9 w-9 rounded-md border border-white/10 bg-[#0E0F12]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
