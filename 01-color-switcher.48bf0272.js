!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=setInterval(a,1e3);function a(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0));document.body.style="background-color: ".concat(t,";")}t.addEventListener("click",(function(){n||(n=setInterval(a,1e3),t.disabled=!0)})),e.addEventListener("click",(function(){clearInterval(n),n=null,t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.48bf0272.js.map
