/* =================================================================================
   OpenList Custom JS - v3
   自動載入 CSS + Header Logo 長寬比自適應/重複防護 + 麵包屑 SVG 變色 (🏠 & 🎁)
   ================================================================================= */

(function () {
  'use strict';

  // 1. 動態注入外部 CSS 與 Header Logo 特殊長寬比樣式
  const injectCSS = () => {
    if (!document.querySelector('link[href*="openlist-css-v3.css"]')) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://dwepserver.github.io/fileserver/openlist-css-v3.css';
      document.head.appendChild(cssLink);
    }

    if (!document.getElementById('custom-header-logo-style')) {
      const customStyle = document.createElement('style');
      customStyle.id = 'custom-header-logo-style';
      customStyle.textContent = `
        /* 強制隱藏所有原生的 header 圖片，防止深淺色切換時重複出現 */
        .header-left.hope-stack img.hope-image {
          display: none !important;
        }

        /* 頂部 Header Logo (自適應寬度，不被拉扯成正方形) */
        .header-left.hope-stack .custom-header-logo-svg {
          display: inline-block;
          height: 32px; /* 固定高度，寬度隨 SVG 比例自動調整 */
          width: 140px; /* 設定足夠展開的預設寬度 */
          max-width: 100%;
          background-color: currentColor;
          -webkit-mask-image: url('https://dwepserver.github.io/fileserver/logo-fileserver-1.svg');
          mask-image: url('https://dwepserver.github.io/fileserver/logo-fileserver-1.svg');
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-position: left center;
          mask-position: left center;
          vertical-align: middle;
        }
      `;
      document.head.appendChild(customStyle);
    }
  };

  // 2. 替換頂部 Header Logo (防重覆 + 隱藏原生 img)
  const updateHeaderLogo = () => {
    const headerLeft = document.querySelector('.header-left.hope-stack');
    if (headerLeft) {
      // 確保隱藏原生 img
      const oldImgs = headerLeft.querySelectorAll('img.hope-image');
      oldImgs.forEach(img => {
        img.style.setProperty('display', 'none', 'important');
      });

      // 檢查是否已經存在自訂 Logo，若不存在才建立
      if (!headerLeft.querySelector('.custom-header-logo-svg')) {
        const svgIcon = document.createElement('span');
        svgIcon.className = 'custom-header-logo-svg';
        headerLeft.insertBefore(svgIcon, headerLeft.firstChild);
      }
    }
  };

  // 3. 替換麵包屑中的 Emoji 為可變色的 SVG Mask (🏠 與 🎁)
  const replaceEmojiWithIcons = () => {
    const links = document.querySelectorAll('.hope-breadcrumb__link');

    links.forEach(el => {
      // 替換 🏠 -> 隨字體變色的 SVG
      if (el.textContent.includes('🏠')) {
        el.innerHTML = el.innerHTML.replace(
          '🏠', 
          '<span class="custom-bc-icon-svg home-icon"></span>'
        );
      }
      
      // 替換 🎁 -> 隨字體變色的 SVG
      if (el.textContent.includes('🎁')) {
        el.innerHTML = el.innerHTML.replace(
          '🎁', 
          '<span class="custom-bc-icon-svg share-icon"></span>'
        );
      }
    });
  };

  // 4. 統一執行邏輯
  const runAllUpdates = () => {
    updateHeaderLogo();
    replaceEmojiWithIcons();
  };

  // 5. 初始化與 Observer 全局觀察
  const initObserver = () => {
    injectCSS();
    runAllUpdates();

    const observer = new MutationObserver(runAllUpdates);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true // 監聽屬性變化，精準防範切換深淺色時 DOM 的重構
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserver);
  } else {
    initObserver();
  }
})();
