/* =================================================================================
   OpenList Custom JS - v3
   自動載入 CSS + Header 圖片旁新增自訂文字 + 麵包屑 SVG 變色 + 頁尾隱藏原連結並新增自訂文字
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
      if (!headerLeft.querySelector('.custom-header-title')) {
        const titleSpan = document.createElement('span');
        titleSpan.className = 'custom-header-title';
        titleSpan.textContent = 'DWEP File Server';
        headerLeft.appendChild(titleSpan);
      }
    }
  };

  // 3. 替換麵包屑中的 Emoji 為可變色的 SVG Mask (🏠 home.svg 與 🎁 share.svg)
  const replaceEmojiWithIcons = () => {
    const links = document.querySelectorAll('.hope-breadcrumb__link');

    links.forEach(el => {
      if (el.textContent.includes('🏠')) {
        el.innerHTML = el.innerHTML.replace(
          '🏠', 
          '<span class="custom-bc-icon-svg home-icon"></span>'
        );
      }
      
      if (el.textContent.includes('🎁')) {
        el.innerHTML = el.innerHTML.replace(
          '🎁', 
          '<span class="custom-bc-icon-svg share-icon"></span>'
        );
      }
    });
  };

  // 4. 重構頁尾：隱藏原 OpenList 連結，於「登錄」下方插入全新文字行
  const updateFooter = () => {
    const footerContainer = document.querySelector('.footer .hope-stack');
    if (!footerContainer) return;

    // 尋找原本的 OpenList 連結並隱藏
    const poweredByLink = footerContainer.querySelector('a[href*="OpenList"], a[href*="alist"]');
    if (poweredByLink) {
      poweredByLink.style.display = 'none';
    }

    // 隱藏中間豎線 "|"
    const divider = Array.from(footerContainer.children).find(
      el => el.tagName === 'SPAN' && el.textContent.includes('|')
    );
    if (divider) {
      divider.style.display = 'none';
    }

    // 設定父容器為上下垂直排版
    footerContainer.style.setProperty('flex-direction', 'column', 'important');
    footerContainer.style.setProperty('align-items', 'center', 'important');
    footerContainer.style.setProperty('gap', '6px', 'important');

    // 在「登錄」連結下方插入全新的文字區塊 (防重複)
    if (!footerContainer.querySelector('.custom-footer-text')) {
      const customFooterText = document.createElement('div');
      customFooterText.className = 'custom-footer-text';
      customFooterText.textContent = '© DWEP Server, Powered by OpenList';
      footerContainer.appendChild(customFooterText);
    }
  };

  // 5. 統一執行區域
  const runAllUpdates = () => {
    updateHeaderLogo();
    replaceEmojiWithIcons();
    updateFooter();
  };

  // 6. 初始化與 Observer 全局動態監聽
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
