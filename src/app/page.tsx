import EarlyAccess from '../components/home/EarlyAccess'
import FanCommunity from '../components/home/FanCommunity'
import HomeBanner from '../components/home/HomeBanner'
import LaunchCountdown from '../components/home/LaunchCountdown'
import PartnersAndFeatures from '../components/home/PartnersAndFeatures'
import StadiumCTA from '../components/home/StadiumCTA'

const page = () => {
  return (
    <div className="min-h-screen">
      <HomeBanner />
      <StadiumCTA filledPercentage={64} joinedFans={48000} />
      <LaunchCountdown />
      <EarlyAccess />
      <PartnersAndFeatures />
      {/* <HowItWorks /> */}
      <FanCommunity />

    </div>
  )
}

export default page