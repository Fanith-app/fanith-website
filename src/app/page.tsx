import FanCommunity from '../components/home/FanCommunity'
import HomeBanner from '../components/home/HomeBanner'
import LiveMatchEnergy from '../components/home/LiveMatchEnergy'
import PartnersAndFeatures from '../components/home/PartnersAndFeatures'
import StadiumCTA from '../components/home/StadiumCTA'
import WhatYouCanDo from '../components/home/WhatYouCanDo'

const page = () => {
  return (
    <div className="min-h-screen">
      <HomeBanner />
      <LiveMatchEnergy />
      <WhatYouCanDo />
      <StadiumCTA filledPercentage={64} joinedFans={48000} />
      {/* <LaunchCountdown /> */}
      {/* <EarlyAccess /> */}
      <PartnersAndFeatures />
      {/* <HowItWorks /> */}
      <FanCommunity />

    </div>
  )
}

export default page