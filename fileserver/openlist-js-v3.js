/* =================================================================================
   OpenList Custom JS - v3
   自動載入 CSS + Header Logo 變色 + 麵包屑 Emoji 替換 (🏠 & 🎁)
   ================================================================================= */

(function () {
  'use strict';

  // 1. 自動注入外部 CSS (openlist-css-v3.css)
  const injectCSS = () => {
    if (!document.querySelector('link[href*="openlist-css-v3.css"]')) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://dwepserver.github.io/fileserver/openlist-css-v3.css';
      document.head.appendChild(cssLink);
    }

    // 動態注入 Header Logo 自動隨主題變色 (currentColor) 的 Mask 樣式
    if (!document.getElementById('custom-header-logo-style')) {
      const customStyle = document.createElement('style');
      customStyle.id = 'custom-header-logo-style';
      customStyle.textContent = `
        .header-left.hope-stack .custom-header-logo-svg {
          display: inline-block;
          width: 28px;
          height: 28px;
          background-color: currentColor;
          -webkit-mask-image: url('https://dwepserver.github.io/fileserver/logo-fileserver-1.svg');
          mask-image: url('https://dwepserver.github.io/fileserver/logo-fileserver-1.svg');
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-position: center;
          mask-position: center;
          vertical-align: middle;
        }
      `;
      document.head.appendChild(customStyle);
    }
  };

  // 2. 替換頂部 Header Logo (隱藏原本 img，插入可自動跟隨字體變色的 SVG Mask)
  const updateHeaderLogo = () => {
    const headerLeft = document.querySelector('.header-left.hope-stack');
    if (headerLeft) {
      const oldImg = headerLeft.querySelector('img.hope-image');
      if (oldImg && !headerLeft.querySelector('.custom-header-logo-svg')) {
        oldImg.style.display = 'none';
        
        const svgIcon = document.createElement('span');
        svgIcon.className = 'custom-header-logo-svg';
        headerLeft.insertBefore(svgIcon, oldImg);
      }
    }
  };

  // 3. 替換麵包屑中的 Emoji (🏠 與 🎁)
  const replaceEmojiWithIcons = () => {
    const links = document.querySelectorAll('.hope-breadcrumb__link');

    links.forEach(el => {
      // 替換 🏠 -> logo.png
      if (el.textContent.includes('🏠')) {
        el.innerHTML = el.innerHTML.replace(
          '🏠', 
          '<img src="https://dwepserver.github.io/fileserver/logo.png" class="custom-bc-icon" />'
        );
      }
      
      // 替換 🎁 -> share.svg
      if (el.textContent.includes('🎁')) {
        el.innerHTML = el.innerHTML.replace(
          '🎁', 
          '<img src="https://dwepserver.github.io/fileserver/share.svg" class="custom-bc-icon" />'
        );
      }
    });
  };

  // 4. 統一執行區域
  const runAllUpdates = () => {
    updateHeaderLogo();
    replaceEmojiWithIcons();
  };

  // 5. 初始化與 MutationObserver 動態監聽
  const initObserver = () => {
    injectCSS();        // 先注入 CSS
    runAllUpdates();    // 執行 DOM 替換

    const observer = new MutationObserver(runAllUpdates);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserver);
  } else {
    initObserver();
  }
})();
