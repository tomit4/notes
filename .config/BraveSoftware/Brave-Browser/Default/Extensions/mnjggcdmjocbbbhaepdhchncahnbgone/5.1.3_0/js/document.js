(()=>{"use strict";(()=>{let e;const t=e=>{window.postMessage(Object.assign({source:"sponsorblock"},e),"/")};function n(e){const t=e.detail.pageType;if(t){const n={type:"navigation",pageType:t,videoID:null};if("shorts"===t||"watch"===t){const i=e.detail.endpoint;if(!i)return null;n.videoID=("shorts"===t?i.reelWatchEndpoint:i.watchEndpoint).videoId}return n}return null}function i(){if(!e)return;const n=e.getVideoData();n&&t({type:"data",videoID:n.video_id,isLive:n.isLive,isPremiere:n.isPremiere})}document.addEventListener("yt-player-updated",(function(n){e||(e=n.detail,i(),n.detail.addEventListener("onAdStart",(()=>t({type:"ad",playing:!0}))),n.detail.addEventListener("onAdFinish",(()=>t({type:"ad",playing:!1}))))})),document.addEventListener("yt-navigate-start",(function(e){const i=n(e);i&&t(i)})),document.addEventListener("yt-navigate-finish",(function(e){var d,o,a;i();const s=null===(a=null===(o=null===(d=e.detail)||void 0===d?void 0:d.response)||void 0===o?void 0:o.playerResponse)||void 0===a?void 0:a.videoDetails;s&&t(Object.assign({channelID:s.channelId,channelTitle:s.author},n(e)))}))})()})();