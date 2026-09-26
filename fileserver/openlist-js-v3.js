/* =================================================================================
   OpenList Custom JS - v3
   自動載入 CSS + Header 圖片旁新增自訂文字 (隨主題變色) + 麵包屑 SVG 變色 (🏠 home.svg & 🎁 share.svg)
   ================================================================================= */

(function () {
  'use strict';

  // 1. 動態注入外部 CSS 與 Header 自訂文字樣式
  const injectCSS = () => {
    if (!document.querySelector('link[href*="openlist-css-v3.css"]')) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://dwepserver.github.io/fileserver/openlist-css-v3.css';
      document.head.appendChild(cssLink);
    }

    if (!document.getElementById('custom-header-text-style')) {
      const customStyle = document.createElement('style');
      customStyle.id = 'custom-header-text-style';
      customStyle.textContent = `
        /* 確保原生圖片與自訂文字垂直居中對齊 */
        .header-left.hope-stack {
          display: flex;
          align-items: center;
          gap: 8px; /* 圖片與文字的間距 */
        }

        /* 保留原生圖片並確保顯示 */
        .header-left.hope-stack img.hope-image {
          display: inline-block !important;
        }

        /* 自訂 Header 文字：跟隨 Theme 文字顏色 */
        .header-left.hope-stack .custom-header-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: inherit; /* 自動跟隨主題 Header 文字顏色 */
          line-height: 1.2;
          user-select: none;
          white-space: nowrap;
        }
      `;
      document.head.appendChild(customStyle);
    }
  };

  // 2. 在 Header 圖片旁插入自訂文字 (防重複)
  const updateHeaderLogo = () => {
    const headerLeft = document.querySelector('.header-left.hope-stack');
    if (headerLeft) {
      // 檢查是否已經存在自訂文字，若不存在才建立並 append 到圖片旁邊
      if (!headerLeft.querySelector('.custom-header-title')) {
        const titleSpan = document.createElement('span');
        titleSpan.className = 'custom-header-title';
        titleSpan.textContent = 'DWEP File Server'; // 👈 可自行修改為你想要顯示的標題文字
        headerLeft.appendChild(titleSpan);
      }
    }
  };

  // 3. 替換麵包屑中的 Emoji 為可變色的 SVG Mask (🏠 home.svg 與 🎁 share.svg)
  const replaceEmojiWithIcons = () => {
    const links = document.querySelectorAll('.hope-breadcrumb__link');

    links.forEach(el => {
      // 替換 🏠 -> home.svg Mask
      if (el.textContent.includes('🏠')) {
        el.innerHTML = el.innerHTML.replace(
          '🏠', 
          '<span class="custom-bc-icon-svg home-icon"></span>'
        );
      }
      
      // 替換 🎁 -> share.svg Mask
      if (el.textContent.includes('🎁')) {
        el.innerHTML = el.innerHTML.replace(
          '🎁', 
          '<span class="custom-bc-icon-svg share-icon"></span>'
        );
      }
    });
  };

  // 4. 統一執行區域
  const runAllUpdates = () => {
    updateHeaderLogo();
    replaceEmojiWithIcons();
  };

  // 5. 初始化與 Observer 全局動態監聽
  const initObserver = () => {
    injectCSS();
    runAllUpdates();

    const observer = new MutationObserver(runAllUpdates);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserver);
  } else {
    initObserver();
  }
})();
