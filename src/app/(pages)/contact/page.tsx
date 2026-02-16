import Banner from '@/src/components/common/Banner'
import SupportTabs from '@/src/components/SupportTabs'
import { Suspense } from 'react'

const page = () => {
  return (
    <main className='w-full space-y-8'>
      <div className="relative  ">
        {/* Keep the Banner content above the glow */}
        <div className="relative z-10"></div>
        <Banner
          title="We're Here to Help"
          description="Whether you have product questions, need support, or want to partner with us, feel free to reach out."
          backgroundImage="/assets/images/contact-us.webp"
          // ctaText="Join Beta"
          // ctaLink="/join-beta"
          bottomcurve='lg:h-150 lg:[clip-path:ellipse(70%_90%_at_50%_0%)]  '
        />


        {/* Full-width curved glow element (Tailwind only) */}
        {/* <div
          aria-hidden
          className={
            "pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-10 " +
            "lg:w-200 xl:w-250 2xl:w-300 max-w-none h-60 rounded-t-[100%] " +
            "bg-[radial-gradient(ellipse_at_50%_0%,rgba(160,16,16,0.88)_0%,rgba(128,12,12,0.6)_30%,rgba(96,10,10,0.25)_55%,transparent_85%)] " +
            "blur-[30px] z-0" + "overflow-hidden"
          }
        /> */}

      </div>

      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <SupportTabs />
      </Suspense>
    </main>
  )
}

export default page