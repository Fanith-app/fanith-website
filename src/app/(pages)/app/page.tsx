"use client";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export default function AppDownloadPage() {
  const [qrLink, setQrLink] = useState("");

  const playStore = "https://play.google.com/store/apps/details?id=com.fanithapp";
  const appleStore = "https://apps.apple.com/in/app/fanith/id6760101126";

  useEffect(() => {
    // Device detection for QR Link
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("mac")) {
      setQrLink(appleStore);
    } else {
      setQrLink(playStore);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-start sm:justify-center p-6 pt-28 pb-12">
      {/* Main Card */}
      <div className="bg-[#202020] p-8 rounded-3xl shadow-xl max-w-sm w-full text-center border border-[#960018]">

        {/* Text Section */}
        <h1 className="text-2xl font-bold text-[#960018] mb-2">Get the Fanith App</h1>
        <p className="text-[#c3c3c3] text-sm font-semibold mb-8 px-4">
          Scan the QR code below to download the app directly on your smartphone.
        </p>

        {/* Interactive QR Code Container */}
        <div className="inline-block p-4 bg-white border-2 border-dashed border-blue-100 rounded-2xl transition-transform hover:scale-105 duration-300">
          {qrLink ? (
            <QRCodeCanvas 
              value={qrLink} 
              size={200} 
              level={"H"} 
              includeMargin={false}
              className="rounded-lg"
            />
          ) : (
            <div className="w-50 h-50 flex items-center justify-center text-[#141414] font-bold text-2xl">
              Loading QR...
            </div>
          )}
        </div>

        {/* App Store Buttons */}
        <div className="mt-10">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Also available on
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href={appleStore} 
              target="_blank" 
              className="text-[#c3c3c3] hover:text-blue-600 font-medium transition-colors"
            >
              App Store
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href={playStore} 
              target="_blank" 
              className="text-[#c3c3c3] hover:text-green-700 font-medium transition-colors"
            >
              Play Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}