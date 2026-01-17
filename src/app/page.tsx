import React from 'react'
import HomeBanner from '../components/home/HomeBanner'
import StadiumCTA from '../components/home/StadiumCTA'
import LaunchCountdown from '../components/home/LaunchCountdown'
import EarlyAccess from '../components/home/EarlyAccess'
import PartnersAndFeatures from '../components/home/PartnersAndFeatures'
import HowItWorks from '../components/home/HowItWorks'
import FanCommunity from '../components/home/FanCommunity'

const page = () => {
  return (
    <div className="min-h-screen">
      <HomeBanner />
      <StadiumCTA filledPercentage={64} joinedFans={48000} />
      <LaunchCountdown />
      <EarlyAccess />
      <PartnersAndFeatures />
      <HowItWorks />
      <FanCommunity />

    </div>
  )
}

export default page