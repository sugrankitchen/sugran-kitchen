# 🌺 Sugran Kitchen Website

**Arvi, Maharashtra** — Homemade food website with WhatsApp ordering

---

## 📁 File Structure

```
sugran-kitchen/
├── index.html          ← Homepage
├── menu.html           ← Full menu with cart & ordering
├── contact.html        ← Contact page
├── about.html          ← About page (add yourself)
├── gallery.html        ← Gallery page (add yourself)
├── testimonials.html   ← Reviews page (add yourself)
├── css/
│   ├── style.css       ← Main styles
│   └── menu.css        ← Menu page styles
├── js/
│   ├── main.js         ← Navbar, cart badge, animations
│   └── menu.js         ← Menu cards, cart, WhatsApp order
└── images/             ← PUT YOUR DISH PHOTOS HERE
    ├── hero-food.jpg       (Hero section - pav bhaji or any main dish)
    ├── khawa-poli.jpg
    ├── sadhi-poli.jpg
    ├── fruit-custard.jpg
    ├── idli-ghol.jpg
    ├── thalipeeth.jpg
    ├── pav-bhaji.jpg
    ├── puran-poli.jpg
    ├── shrikhand.jpg
    └── about-kitchen.jpg   (Kitchen/cooking photo for about section)
```

---

## 🖼️ How to Add Your Dish Photos

1. Take a clear photo of each dish
2. Rename the photo to match the filename above (e.g., `pav-bhaji.jpg`)
3. Put all photos inside the `images/` folder
4. If a photo is missing, the website will show a nice emoji illustration instead

---

## ➕ How to Add a New Dish

Open `js/menu.js` and find the `DISHES` array. Add a new entry:

```js
{
  id: 9,                        // give a unique number
  name: 'नवीन पदार्थ',           // Marathi name
  en: 'New Dish',               // English name
  price: 50,                    // price in ₹
  unit: 'per piece',            // unit
  badge: 'New',                 // badge text (or '' for none)
  desc: 'Description here.',    // short description
  img: 'images/new-dish.jpg',   // your photo filename
  emoji: '🍱',                  // fallback emoji
  color: '#FDF0D5'              // fallback background color
}
```

---

## 🚀 How to Host on GitHub Pages (FREE)

### Step 1 — Create GitHub account
Go to [github.com](https://github.com) and create a free account.

### Step 2 — Create a new repository
- Click **New Repository**
- Name it: `sugran-kitchen`
- Set to **Public**
- Click **Create Repository**

### Step 3 — Upload all files
- Click **Upload files**
- Drag and drop ALL the files and folders (index.html, menu.html, css/, js/, images/)
- Click **Commit changes**

### Step 4 — Enable GitHub Pages
- Go to repository **Settings**
- Click **Pages** (left sidebar)
- Under **Source**, select **Deploy from a branch**
- Select branch: **main**, folder: **/ (root)**
- Click **Save**

### Step 5 — Your site is live! 🎉
After 2-3 minutes your site will be at:
`https://YOUR-USERNAME.github.io/sugran-kitchen`

---

## 📱 WhatsApp Orders
When a customer places an order, it automatically opens WhatsApp with a pre-filled message to **8530888212**. Your mom receives the full order details instantly!

## 💳 UPI
UPI ID: `swatimuley455@oksbi`

## 📧 Email: `swatimuley455@gmail.com`
