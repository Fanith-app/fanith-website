'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const UpperHeader = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate target date (IPL 2026 start)
    const targetDate = new Date('2026-03-22T00:00:00');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <>
      <style jsx>{`
        .countdown-banner {
          width: 100%;
          background: #202020;
          display: none;
        }
        
        /* Hide on medium screens and above */
        @media (min-width: 768px) {
          .countdown-banner {
            display: block !important;
          }
        }
        
        .container {
          max-width: 100%;
          margin: 0 auto;
          padding: 0.3rem 0rem 0.3rem 2rem;
        }
        
        .content-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        
        .title {
          color: white;
          font-weight: 700;
          text-align: center;
          margin: 0;
        }
        
        .timer-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .timer-block {
          display: flex;
          flex-direction: row;
          align-items: baseline;
        }
        
        .timer-number {
          line-height: 1.2;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .timer-label {
          color: #F2F2F2;
          letter-spacing: 0.05em;
          margin-top: 0.125rem;
          font-weight: 400;
        }
        
        .separator {
          color: white;
          font-size: 1.25rem;
          font-weight: 700;
        }
        
        /* Animation */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      <div className="countdown-banner">
        <div className="container">
          <div className="content-wrapper">
            <div className='title-div'>
              <h2 className="title text-sm lg:text-lg italic font-[Neometric]/700">
              Launching before IPL 2026 — Get Ready!
            </h2>
            </div>
            
            <div className="timer-wrapper bg-black py-1 px-20 drop-shadow-[0_0_5.5px_rgba(0,0,0,0.25)] [clip-path:polygon(5%_0%,100%_0%,100%_100%,0%_100%)]">
              <div className="timer-block">
                <span className="timer-number text-3xl text-[#FC8068] font-[Bitcount Grid Single Ink]/500 italic">
                  {formatNumber(timeLeft.days)}
                </span>
                <span className="timer-label text-sm ml-1 italic">
                  Days
                </span>
              </div>
              
              {/* <span className="separator">:</span> */}
              
              <div className="timer-block">
                <span className="timer-number text-3xl text-[#FC8068] font-[Bitcount Grid Single Ink]/500 italic">
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="timer-label text-sm ml-1 italic">
                  Hours
                </span>
              </div>
              
              {/* <span className="separator">:</span> */}
              
              <div className="timer-block">
                <span className="timer-number text-3xl text-[#FC8068] font-[Bitcount Grid Single Ink]/500 italic">
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="timer-label text-sm ml-1 italic">
                  Minutes
                </span>
              </div>
              
              {/* <span className="separator">:</span> */}
              
              <div className="timer-block">
                <span className="timer-number text-3xl text-[#FC8068] font-[Bitcount Grid Single Ink]/500 italic">
                  {formatNumber(timeLeft.seconds)}
                </span>
                <span className="timer-label text-sm ml-1 italic">
                  Seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpperHeader;