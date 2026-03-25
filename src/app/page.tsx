
import FanCommunity from '../components/home/FanCommunity'
import HomeBanner from '../components/home/HomeBanner'
import LiveMatchEnergy from '../components/home/LiveMatchEnergy'
import PartnersAndFeatures from '../components/home/PartnersAndFeatures'
import WhatYouCanDo from '../components/home/WhatYouCanDo'
import WhyPeopleLoveFanith from '../components/home/WhyPeopleLoveFanith'

export default async function page() {
  return (
    <div className="min-h-screen">
      <HomeBanner />
      <LiveMatchEnergy />
      <WhatYouCanDo />
      {/* <StadiumCTA filledPercentage={64} joinedFans={48000} /> */}
      <WhyPeopleLoveFanith />
      {/* <LaunchCountdown /> */}
      {/* <EarlyAccess /> */}
      <PartnersAndFeatures />
      {/* <HowItWorks /> */}
      <FanCommunity />

    </div>
  )
}