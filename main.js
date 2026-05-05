// ═══ NAVBAR SCROLL ═══
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ═══ MOBILE MENU ═══
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  if (links) links.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  const links = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  if (links && links.classList.contains('open')) {
    if (!links.contains(e.target) && !btn.contains(e.target)) {
      links.classList.remove('open');
    }
  }
});

// ═══ HERO IMAGE FALLBACK ═══
document.addEventListener('DOMContentLoaded', () => {
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    heroImg.onerror = function() {
      this.parentElement.style.background = 'linear-gradient(135deg, #8B2525 0%, #C8922A 100%)';
      this.style.display = 'none';
    };
  }
});

// ═══ CART ═══
let cart = JSON.parse(localStorage.getItem('sugranCart') || '{}');

function saveCart() {
  localStorage.setItem('sugranCart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function addToCart(id, name, price) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  showToast(`${name} added to cart!`);
}

function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed;bottom:24px;right:24px;background:#4A0E0E;color:#F0C96A;
      padding:12px 22px;border-radius:10px;font-size:13.5px;font-weight:600;
      box-shadow:0 4px 20px rgba(0,0,0,.3);z-index:9999;transition:opacity .3s;
      border:1px solid rgba(200,146,42,.4);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.style.opacity = '0', 2500);
}

// Init badge on page load
document.addEventListener('DOMContentLoaded', updateCartBadge);
