// ═══ MENU DATA ═══
// To add a new dish: copy one object, change the values, add to this array
const DISHES = [
  {
    id: 1, name: 'खवा पोळी', en: 'Khawa Poli',
    price: 70, unit: 'per piece', badge: 'Bestseller',
    desc: 'Rich khawa-stuffed sweet flatbread, made fresh daily.',
    img: 'images/khawa-poli.png', emoji: '🫓', color: '#FDF0D5'
  },
  {
    id: 2, name: 'साधी पोळी', en: 'Sadhi Poli',
    price: 10, unit: 'per piece', badge: '',
    desc: 'Soft homemade wheat roti, light and fresh.',
    img: 'images/sadhi-poli.png', emoji: '🫓', color: '#FFF3E0'
  },
  {
    id: 3, name: 'फ्रूट Custard', en: 'Fruit Custard',
    price: 30, unit: 'per glass', badge: 'Sweet',
    desc: 'Creamy custard with fresh seasonal fruits.',
    img: 'images/fruit-custard.png', emoji: '🍮', color: '#FFF8E1'
  },
  {
    id: 4, name: 'इडली घोळ', en: 'Idli Ghol',
    price: 80, unit: 'per kg', badge: '',
    desc: 'Fresh fermented idli batter, ready to cook at home.',
    img: 'images/idli-ghol.png', emoji: '🥣', color: '#F1F8E9'
  },
  {
    id: 5, name: 'थालीपीठ', en: 'Thalipeeth',
    price: 40, unit: '2 pieces', badge: 'Traditional',
    desc: 'Maharashtrian spiced multigrain flatbread — crispy & filling.',
    img: 'images/thalipeeth.png', emoji: '🥙', color: '#FBE9E7'
  },
  {
    id: 6, name: 'पाव भाजी', en: 'Pav Bhaji',
    price: 80, unit: 'per plate', badge: 'Popular',
    desc: 'Spiced mixed vegetable bhaji with buttered soft pav.',
    img: 'images/pav-bhaji.png', emoji: '🍛', color: '#FFF3E0'
  },
  {
    id: 7, name: 'पुरण पोळी', en: 'Puran Poli',
    price: 70, unit: 'per piece', badge: 'Festive',
    desc: 'Traditional sweet flatbread with chana dal filling.',
    img: 'images/puran-poli.png', emoji: '🫓', color: '#FDF3E3'
  },
  {
    id: 8, name: 'श्रीखंड', en: 'Shrikhand',
    price: 300, unit: 'per kg', badge: 'Dessert',
    desc: 'Creamy hung curd dessert with saffron & cardamom.',
    img: 'images/shrikhand.png', emoji: '🍯', color: '#FFF8E1'
  }
  // ── ADD MORE DISHES HERE ──
];

// ═══ CART STATE ═══
let cart = JSON.parse(localStorage.getItem('sugranCart') || '{}');
let payMethod = 'upi';

// ═══ RENDER MENU ═══
function renderMenu() {
  const grid = document.getElementById('menuCards');
  if (!grid) return;
  grid.innerHTML = DISHES.map(d => `
    <div class="menu-card">
      <div class="mc-img" style="background:${d.color}">
        <img src="${d.img}" alt="${d.en}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="mc-fallback" style="background:${d.color}">
          <span>${d.emoji}</span>
          <span>${d.en}</span>
        </div>
        ${d.badge ? `<span class="mc-badge">${d.badge}</span>` : ''}
      </div>
      <div class="mc-body">
        <div class="mc-name">${d.name}</div>
        <div class="mc-name-en">${d.en}</div>
        <div class="mc-desc">${d.desc}</div>
        <div class="mc-foot">
          <div>
            <div class="mc-price">₹${d.price}</div>
            <div class="mc-unit">${d.unit}</div>
          </div>
          ${cart[d.id]
            ? `<div class="mc-qty">
                 <button onclick="chgQty(${d.id},-1)">−</button>
                 <span>${cart[d.id]}</span>
                 <button onclick="chgQty(${d.id},1)">+</button>
               </div>`
            : `<button class="mc-add-btn" onclick="addItem(${d.id})">+ Add</button>`
          }
        </div>
      </div>
    </div>`).join('');
}

// ═══ CART FUNCTIONS ═══
function addItem(id) { cart[id] = (cart[id] || 0) + 1; sync(); }
function chgQty(id, d) {
  cart[id] = (cart[id] || 0) + d;
  if (cart[id] <= 0) delete cart[id];
  sync();
}

function getSubtotal() {
  return Object.entries(cart).reduce((s, [id, qty]) => {
    const d = DISHES.find(x => x.id == id);
    return s + (d ? d.price * qty : 0);
  }, 0);
}

function getDelivery(sub) { return sub >= 500 ? 0 : (sub > 0 ? 15 : 0); }

function sync() {
  localStorage.setItem('sugranCart', JSON.stringify(cart));
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
  renderMenu();
  renderCartPanel();
}

function renderCartPanel() {
  const list = document.getElementById('cartItemsList');
  const ftr = document.getElementById('cartFtr');
  if (!list) return;

  const entries = Object.entries(cart);
  const sub = getSubtotal();
  const dlv = getDelivery(sub);
  const tot = sub + dlv;

  if (!entries.length) {
    list.innerHTML = `<div class="cart-empty"><div class="ce-icon">🍽️</div>
      <p style="font-weight:600;color:#4A0E0E">Cart is empty</p>
      <p style="font-size:12px;margin-top:5px">Add items from the menu!</p></div>`;
    ftr.style.display = 'none';
    return;
  }

  list.innerHTML = entries.map(([id, qty]) => {
    const d = DISHES.find(x => x.id == id);
    return `<div class="cart-item">
      <div class="ci-thumb" style="background:${d.color}">
        <img src="${d.img}" alt="${d.en}" onerror="this.innerHTML='${d.emoji}';this.style.fontSize='26px'">
      </div>
      <div class="ci-info">
        <div class="ci-name">${d.name}</div>
        <div class="ci-price">₹${d.price} × ${qty} = ₹${d.price * qty}</div>
      </div>
      <div class="ci-qc">
        <button onclick="chgQty(${id},-1)">−</button>
        <span>${qty}</span>
        <button onclick="chgQty(${id},1)">+</button>
      </div>
    </div>`;
  }).join('');

  ftr.style.display = 'block';
  document.getElementById('cartSub').textContent = '₹' + sub;
  document.getElementById('cartDlv').textContent = dlv === 0 ? '🎉 Free!' : '₹' + dlv;
  document.getElementById('cartTot').textContent = '₹' + tot;
  const note = document.getElementById('cartDlvNote');
  note.textContent = sub >= 500 ? '🎉 Free delivery!' : `Add ₹${500 - sub} more for free delivery!`;
  note.style.color = sub >= 500 ? '#2D5016' : '#9A7A5A';
}

// ═══ CART OPEN/CLOSE ═══
function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartPanel').classList.add('open');
}
function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartPanel').classList.remove('open');
}

// ═══ CHECKOUT ═══
function openCheckout() {
  const sub = getSubtotal(), dlv = getDelivery(sub), tot = sub + dlv;
  let html = `<div style="font-weight:600;color:#4A0E0E;font-size:13.5px;margin-bottom:10px">Order Summary</div>`;
  html += Object.entries(cart).map(([id, qty]) => {
    const d = DISHES.find(x => x.id == id);
    return `<div class="osm-row"><span>${d.name} × ${qty}</span><span>₹${d.price * qty}</span></div>`;
  }).join('');
  html += `<div class="osm-row"><span>Delivery</span><span>${dlv === 0 ? 'Free' : '₹' + dlv}</span></div>`;
  html += `<div class="osm-total"><span>Total Payable</span><span>₹${tot}</span></div>`;
  document.getElementById('orderSummary').innerHTML = html;
  closeCart();
  document.getElementById('modalOv').classList.add('open');
}

function closeCheckout() {
  document.getElementById('modalOv').classList.remove('open');
}

function selPay(m) {
  payMethod = m;
  document.getElementById('payUPI').classList.toggle('sel', m === 'upi');
  document.getElementById('payCOD').classList.toggle('sel', m === 'cod');
  document.getElementById('upiBox').classList.toggle('show', m === 'upi');
}

function placeOrder() {
  const name  = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const addr  = document.getElementById('custAddr').value.trim();
  if (!name || !phone || !addr) {
    alert('कृपया सर्व माहिती भरा\nPlease fill all required fields.');
    return;
  }
  const sub = getSubtotal(), dlv = getDelivery(sub), tot = sub + dlv;
  const lines = Object.entries(cart).map(([id, qty]) => {
    const d = DISHES.find(x => x.id == id);
    return `  • ${d.name} (${d.en}) × ${qty} = ₹${d.price * qty}`;
  }).join('\n');
  const payText = payMethod === 'upi' ? 'UPI – swatimuley455@oksbi' : 'Cash on Delivery';

  const msg =
`🌺 *New Order – Sugran Kitchen* 🌺

👤 *Name:* ${name}
📱 *Phone:* ${phone}
📍 *Address:* ${addr}

🛒 *Order:*
${lines}

──────────────
💰 Subtotal: ₹${sub}
🚚 Delivery: ${dlv === 0 ? 'Free' : '₹' + dlv}
✅ *Total: ₹${tot}*
──────────────
💳 *Payment:* ${payText}

_Via Sugran Kitchen Website_`;

  window.open('https://wa.me/918530888212?text=' + encodeURIComponent(msg), '_blank');

  // Show success screen
  document.getElementById('modalBody').innerHTML = `
    <div class="success-wrap">
      <div class="si">🎉</div>
      <h3>ऑर्डर पाठवला!</h3>
      <p>Your order has been sent to <strong>Sugran Kitchen</strong> on WhatsApp!<br><br>
      आम्ही लवकरच संपर्क करतो.<br><em>We'll confirm shortly.</em></p>
      <button class="back-btn" onclick="closeCheckout();cart={};sync()">← Back to Menu</button>
    </div>`;
}

// Init
renderMenu();
renderCartPanel();
