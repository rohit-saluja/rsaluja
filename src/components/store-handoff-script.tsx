/**
 * Pre-hydration safety net for App Store links.
 *
 * <StoreLink /> swaps its href to `itms-apps://` once React hydrates, but a tap
 * that lands before hydration would still follow the https URL — and inside
 * Instagram's webview that is exactly the blank page we are trying to avoid.
 * This inline script closes that window: it runs the moment the HTML is parsed
 * and intercepts taps on any `a[data-store-id]` on iOS.
 *
 * It deliberately attaches a listener rather than rewriting the href, so the
 * DOM still matches what React prerendered and hydration stays quiet. Once
 * hydration lands, the href and this listener point at the same URL.
 */
const SCRIPT = `(function(){
if(window.__storeHandoff)return;
var n=navigator,ua=n.userAgent;
if(!/iPad|iPhone|iPod/.test(ua)&&!(n.platform==="MacIntel"&&n.maxTouchPoints>1))return;
window.__storeHandoff=1;
document.addEventListener("click",function(e){
var a=e.target&&e.target.closest&&e.target.closest("a[data-store-id]");
if(!a)return;
e.preventDefault();
window.location.href="itms-apps://apps.apple.com/app/id"+a.getAttribute("data-store-id");
});
})();`;

export function StoreHandoffScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
