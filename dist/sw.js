if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>n(e,l),u={module:{uri:l},exports:o,require:t};s[l]=Promise.all(i.map((e=>u[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-6daa0e2e"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/apple-touch-icon-11dec09c.png",revision:null},{url:"assets/backgroundImage-93212d8d.png",revision:null},{url:"assets/brand-icons-6519a15b.svg",revision:null},{url:"assets/flags-94d5c7f1.png",revision:null},{url:"assets/icons-282a64fb.svg",revision:null},{url:"assets/index-27f5b6d1.js",revision:null},{url:"assets/index-aa3fa57b.css",revision:null},{url:"assets/outline-icons-ae8fd02a.svg",revision:null},{url:"index.html",revision:"19a91ad4d4f31d284c8ef8056c4fa07a"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"dab0e19f96be37bd973b129867357ce7"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/\/api\/.*\/*.json/,new e.NetworkOnly({plugins:[new e.BackgroundSyncPlugin("myQueueName",{maxRetentionTime:1440})]}),"POST")}));
