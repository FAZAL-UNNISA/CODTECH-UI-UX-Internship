document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Dropdowns
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = toggle.getAttribute('data-target');
      const targetMenu = document.getElementById(targetId);

      dropdownMenus.forEach(menu => {
        if (menu !== targetMenu) menu.classList.remove('open');
      });

      targetMenu.classList.toggle('open');
    });
  });

  document.addEventListener('click', () => {
    dropdownMenus.forEach(menu => menu.classList.remove('open'));
  });

  // 2. Search Bar Toggle & Live Feature Filter
  const searchToggle = document.getElementById('searchToggle');
  const searchContainer = document.getElementById('searchContainer');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput');
  const featureCards = document.querySelectorAll('.feature-card');

  searchToggle.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
      searchInput.focus();
    }
  });

  closeSearch.addEventListener('click', () => {
    searchContainer.classList.remove('active');
    searchInput.value = '';
    featureCards.forEach(card => (card.style.display = 'flex'));
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    featureCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = title.includes(query) ? 'flex' : 'none';
    });
  });

  // 3. Log In & Sign Up Modal
  const authModal = document.getElementById('authModal');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const closeModal = document.getElementById('closeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalSubmitBtn = document.getElementById('modalSubmitBtn');
  const authForm = document.getElementById('authForm');

  function openModal(mode) {
    if (mode === 'login') {
      modalTitle.textContent = 'Log In';
      modalSubtitle.textContent = 'Welcome back to your Mailchimp account.';
      modalSubmitBtn.textContent = 'Log In';
    } else {
      modalTitle.textContent = 'Get started with Mailchimp';
      modalSubtitle.textContent = 'Create your free account in seconds.';
      modalSubmitBtn.textContent = 'Sign Up';
    }
    authModal.classList.add('open');
  }

  loginBtn.addEventListener('click', () => openModal('login'));
  signupBtn.addEventListener('click', () => openModal('signup'));
  closeModal.addEventListener('click', () => authModal.classList.remove('open'));

  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) authModal.classList.remove('open');
  });

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`${modalSubmitBtn.textContent} successful!`);
    authModal.classList.remove('open');
    authForm.reset();
  });
});