(()=>{
 const status=document.getElementById('boot-status');let attempt=0,timer,pendingMode;
 function message(text){status.hidden=false;status.firstChild.textContent=text+' ';status.querySelector('a').hidden=false}
 function start(){attempt++;const script=document.createElement('script');script.src='__BUNDLE_URL__';script.async=true;
 script.onload=()=>{clearTimeout(timer);if(window.__atlasReady){status.hidden=true;if(pendingMode&&typeof setMode==='function')setMode(pendingMode)}else message('页面未能完成初始化，请重新加载。')};
 script.onerror=()=>{clearTimeout(timer);script.remove();if(attempt<2)setTimeout(start,600);else message('网络连接不稳定，资料未能下载，请重新加载。')};
 timer=setTimeout(()=>message('加载时间较长，可以继续等待或重新加载。'),15000);document.head.appendChild(script);
 }
 document.querySelector('.feature-nav').addEventListener('click',event=>{if(!window.__atlasReady){pendingMode=event.target.closest('[data-mode]')?.dataset.mode;message('资料仍在加载，完成后会打开所选页面。')}});
 start();
})();
