export const RedirectToStore = () => {
    const ua = navigator.userAgent.toLowerCase();

    const playStore = "https://play.google.com/store/apps/details?id=com.fanithapp";
    const appleStore = "https://apps.apple.com/in/app/fanith/id6760101126";

    if (ua.includes("android")) {
        window.location.href = playStore;
    } else if (ua.includes("iphone") || (ua.includes("ipad")) || (ua.includes("mac"))) {
        window.location.href = appleStore;
    } else {
        window.location.href = playStore;
    }
}