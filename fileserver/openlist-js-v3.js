const replaceEmojiWithIcons = () => {
  const links = document.querySelectorAll('.hope-breadcrumb__link');

  links.forEach(el => {
    if (el.textContent.includes('🏠')) {
      el.innerHTML = el.innerHTML.replace(
        '🏠', 
        '<img src="https://dwepserver.github.io/fileserver/logo.png" class="custom-bc-icon" />'
      );
    }
    
    if (el.textContent.includes('🎁')) {
      el.innerHTML = el.innerHTML.replace(
        '🎁', 
        '<img src="https://dwepserver.github.io/fileserver/share.svg" class="custom-bc-icon" />'
      );
    }
  });
};

const initObserver = () => {
  replaceEmojiWithIcons();
  const bcObserver = new MutationObserver(replaceEmojiWithIcons);
  bcObserver.observe(document.body, { childList: true, subtree: true });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initObserver);
} else {
  initObserver();
}
