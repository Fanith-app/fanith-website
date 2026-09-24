// Keep the existing maintenance flag without rewriting Next.js URLs to .html.
import cf from 'cloudfront';

const KVS_ID = '6240cb46-4d6f-4a1e-970c-60c2960b5941';

async function handler(event) {
  let inMaintenance = false;
  try {
    inMaintenance = (await cf.kvs(KVS_ID).get('maintenance')) === '1';
  } catch (error) {
    // Match the existing function: a missing or unavailable flag serves the site.
  }

  if (!inMaintenance) return event.request;

  return {
    statusCode: 503,
    statusDescription: 'Service Unavailable',
    headers: {
      'content-type': { value: 'text/html; charset=utf-8' },
      'retry-after': { value: '300' },
      'cache-control': { value: 'no-store, no-cache' },
    },
    body: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">'
      + '<meta name="viewport" content="width=device-width,initial-scale=1.0">'
      + '<title>Fanith - Back Soon</title>'
      + '<style>*{margin:0;padding:0;box-sizing:border-box}'
      + 'body{min-height:100vh;display:flex;align-items:center;justify-content:center;'
      + 'font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;'
      + 'background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);color:#fff;'
      + 'text-align:center;padding:2rem}'
      + '.c{max-width:480px}'
      + '.logo{font-size:2.5rem;font-weight:800;letter-spacing:-1px;margin-bottom:.5rem;'
      + 'background:linear-gradient(90deg,#ff6b6b,#feca57);-webkit-background-clip:text;'
      + '-webkit-text-fill-color:transparent;background-clip:text}'
      + '.tag{font-size:.9rem;color:rgba(255,255,255,.5);margin-bottom:2.5rem;'
      + 'text-transform:uppercase;letter-spacing:3px}'
      + '.icon{font-size:4rem;margin-bottom:1.5rem;animation:p 1.5s infinite}'
      + '@keyframes p{0%,100%{opacity:1}50%{opacity:.7}}'
      + 'h1{font-size:1.5rem;font-weight:600;margin-bottom:1rem}'
      + 'p{font-size:1rem;line-height:1.6;color:rgba(255,255,255,.7);margin-bottom:2rem}'
      + '.badge{display:inline-block;background:rgba(255,255,255,.1);'
      + 'border:1px solid rgba(255,255,255,.2);border-radius:50px;'
      + 'padding:.6rem 1.5rem;font-size:.95rem;font-weight:600;color:#feca57}'
      + '.ft{margin-top:3rem;font-size:.8rem;color:rgba(255,255,255,.3)}'
      + '</style></head><body><div class="c"><div class="logo">Fanith</div>'
      + '<div class="tag">Sports Social</div><div class="icon">&#127769;</div>'
      + '<h1>We\'re taking a short break</h1>'
      + '<p>Our servers are resting to keep things running smoothly. We\'ll be back online shortly.</p>'
      + '<div class="badge">Back soon</div>'
      + '<div class="ft">Scheduled maintenance in progress</div>'
      + '</div></body></html>',
  };
}
