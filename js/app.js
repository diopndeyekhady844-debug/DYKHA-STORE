/**
 * DYKHA STORE - Logique Principale de la Boutique
 * Gestion du Panier, Filtres, Catalogue, Modales & Commandes Multicanaux
 */

// ===================================================================
// GESTION DU STOCKAGE LOCAL (LOCALSTORAGE)
// ===================================================================

function getStoredProducts() {
  const data = localStorage.getItem('dykha_products');
  if (data) {
    try {
      let storedList = JSON.parse(data);
      if (Array.isArray(storedList) && storedList.length > 0) {
        // Mettre à jour et fusionner avec INITIAL_PRODUCTS pour garantir toutes les caractéristiques
        let merged = INITIAL_PRODUCTS.map(initial => {
          const found = storedList.find(p => p.id === initial.id);
          if (found) {
            return {
              ...initial,
              image: initial.image,
              onlineImage: initial.onlineImage,
              stock: found.stock !== undefined ? found.stock : initial.stock,
              price: initial.price,
              oldPrice: initial.oldPrice,
              badge: initial.badge,
              characteristics: initial.characteristics
            };
          }
          return initial;
        });

        // Ajouter les articles personnalisés ajoutés par l'admin
        storedList.forEach(custom => {
          if (!merged.some(p => p.id === custom.id)) {
            merged.push(custom);
          }
        });

        localStorage.setItem('dykha_products', JSON.stringify(merged));
        return merged;
      }
    } catch (e) {
      console.error(e);
    }
  }
  // Initialisation avec INITIAL_PRODUCTS
  localStorage.setItem('dykha_products', JSON.stringify(INITIAL_PRODUCTS));
  return [...INITIAL_PRODUCTS];
}

function saveProducts(products) {
  localStorage.setItem('dykha_products', JSON.stringify(products));
}

function getStoredCart() {
  const data = localStorage.getItem('dykha_cart');
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem('dykha_cart', JSON.stringify(cart));
}

function getStoredOrders() {
  const data = localStorage.getItem('dykha_orders');
  return data ? JSON.parse(data) : [];
}

function saveOrders(orders) {
  localStorage.setItem('dykha_orders', JSON.stringify(orders));
}

function getStoredWishlist() {
  const data = localStorage.getItem('dykha_wishlist');
  return data ? JSON.parse(data) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem('dykha_wishlist', JSON.stringify(wishlist));
}

function getCurrentUser() {
  const data = localStorage.getItem('dykha_user');
  return data ? JSON.parse(data) : null;
}

function saveCurrentUser(user) {
  if (user) {
    localStorage.setItem('dykha_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('dykha_user');
  }
}

// ===================================================================
// ÉTAT DE L'APPLICATION
// ===================================================================

const AppState = {
  products: getStoredProducts(),
  cart: getStoredCart(),
  wishlist: getStoredWishlist(),
  user: getCurrentUser(),
  currentCategory: 'all',
  currentSubcategory: 'all',
  searchQuery: '',
  sortBy: 'popular',
  activeQuickViewProduct: null,
  selectedSize: null,
  selectedColor: null,
  quickViewQty: 1
};

// ===================================================================
// UTILITAIRES D'AFFICHAGE & FORMATAGE
// ===================================================================

function formatFCFA(amount) {
  return Number(amount || 0).toLocaleString('fr-FR') + ' FCFA';
}

function showToast(message, type = 'info', duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'warning') icon = 'fa-triangle-exclamation';
  if (type === 'danger') icon = 'fa-circle-xmark';

  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="font-size: 1.3rem;"></i>
    <span style="font-size: 0.9rem; font-weight: 500;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ===================================================================
// INITIALISATION DE LA BOUTIQUE AU CHARGEMENT
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderCategoryTabs();
  renderProducts();
  updateCartCounters();
  updateWishlistCounters();
  setupEventListeners();
  updateUserInterface();
});

// ===================================================================
// RENDU DES ONGLETS DE CATÉGORIES & SOUS-CATÉGORIES
// ===================================================================

function renderCategoryTabs() {
  const tabsContainer = document.getElementById('categoriesTabs');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = INITIAL_CATEGORIES.map(cat => `
    <button class="tab-btn ${AppState.currentCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
      <i class="fa-solid ${cat.icon}"></i> ${cat.name}
    </button>
  `).join('');

  renderSubcategoryChips();
}

function renderSubcategoryChips() {
  const subBar = document.getElementById('subcategoriesBar');
  if (!subBar) return;

  if (AppState.currentCategory === 'all') {
    subBar.innerHTML = '';
    subBar.style.display = 'none';
    return;
  }

  const categoryObj = INITIAL_CATEGORIES.find(c => c.id === AppState.currentCategory);
  if (!categoryObj || !categoryObj.subcategories || categoryObj.subcategories.length === 0) {
    subBar.innerHTML = '';
    subBar.style.display = 'none';
    return;
  }

  subBar.style.display = 'flex';
  let chipsHtml = `
    <span class="subcat-chip ${AppState.currentSubcategory === 'all' ? 'active' : ''}" data-subcat="all">
      Tout ${categoryObj.name}
    </span>
  `;

  chipsHtml += categoryObj.subcategories.map(sub => `
    <span class="subcat-chip ${AppState.currentSubcategory === sub ? 'active' : ''}" data-subcat="${sub}">
      ${sub}
    </span>
  `).join('');

  subBar.innerHTML = chipsHtml;
}

// ===================================================================
// RENDU DU CATALOGUE DES PRODUITS
// ===================================================================

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const emptyMsg = document.getElementById('noProductsMsg');
  if (!grid) return;

  // Filtrage
  let filtered = AppState.products.filter(product => {
    // Filtre Catégorie
    if (AppState.currentCategory !== 'all' && product.category !== AppState.currentCategory) {
      return false;
    }
    // Filtre Sous-catégorie
    if (AppState.currentSubcategory !== 'all' && product.subcategory !== AppState.currentSubcategory) {
      return false;
    }
    // Recherche par mot-clé
    if (AppState.searchQuery.trim() !== '') {
      const q = AppState.searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchSub = (product.subcategory || '').toLowerCase().includes(q);
      const matchDesc = (product.description || '').toLowerCase().includes(q);
      if (!matchName && !matchSub && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  // Tri
  if (AppState.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (AppState.sortBy === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Par défaut: rating & popularité
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  // Affichage si vide
  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';

  grid.innerHTML = filtered.map(product => {
    const isWished = AppState.wishlist.includes(product.id);
    const badgeHtml = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    const oldPriceHtml = product.oldPrice ? `<span class="old-price">${formatFCFA(product.oldPrice)}</span>` : '';
    const stockStatus = product.stock <= 0 
      ? '<span style="color: var(--danger); font-size: 0.75rem; font-weight: 700;">Épuisé</span>' 
      : (product.stock <= 3 
          ? `<span style="color: var(--warning); font-size: 0.75rem; font-weight: 600;">Dernières pièces (${product.stock})</span>` 
          : `<span style="color: var(--success); font-size: 0.75rem; font-weight: 600;">En stock (${product.stock})</span>`);

    return `
      <article class="product-card" data-id="${product.id}" title="Cliquez pour voir les détails et caractéristiques">
        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null; if('${product.onlineImage || ''}') this.src='${product.onlineImage}';">
          ${badgeHtml}
          <div class="product-card-overlay-hint">
            <span class="hint-badge"><i class="fa-solid fa-eye"></i> Voir détails & caractéristiques</span>
          </div>
          <div class="product-quick-actions">
            <button class="quick-action-btn btn-wishlist-toggle" data-id="${product.id}" title="${isWished ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
              <i class="${isWished ? 'fa-solid' : 'fa-regular'} fa-heart" style="${isWished ? 'color: var(--rose-primary);' : ''}"></i>
            </button>
            <button class="quick-action-btn btn-quick-view" data-id="${product.id}" title="Aperçu rapide">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>

        <div class="product-details">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <span class="product-cat">${product.subcategory || product.category}</span>
            ${stockStatus}
          </div>
          <h3 class="product-name">${product.name}</h3>
          
          ${(product.characteristics && product.characteristics.length > 0) ? `
            <div class="product-card-specs">
              <div class="specs-preview-chips">
                ${product.characteristics.slice(0, 2).map(c => `
                  <span class="spec-chip" title="${c.label}: ${c.value}">
                    <i class="fa-solid fa-sparkles"></i> <strong>${c.label} :</strong> ${c.value}
                  </span>
                `).join('')}
              </div>
              <div class="card-details-cta">
                <i class="fa-solid fa-circle-info"></i> ${product.characteristics.length} caractéristiques &bull; Cliquer pour voir les détails
              </div>
            </div>
          ` : ''}

          <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half-stroke"></i>
            <span>(${product.reviewsCount || 12})</span>
          </div>

          <div class="product-price-row">
            <span class="current-price">${formatFCFA(product.price)}</span>
            ${oldPriceHtml}
          </div>

          <div class="product-card-buttons">
            <button class="btn-add-cart" data-id="${product.id}" ${product.stock <= 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
              <i class="fa-solid fa-cart-plus"></i> ${product.stock <= 0 ? 'Indisponible' : 'Ajouter au panier'}
            </button>
            <button class="btn-whatsapp-direct" data-id="${product.id}" title="Commander immédiatement sur WhatsApp">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ===================================================================
// MODALE APERÇU RAPIDE PRODUIT (QUICK VIEW)
// ===================================================================

function openQuickView(productId) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  AppState.activeQuickViewProduct = product;
  AppState.selectedSize = (product.sizes && product.sizes.length > 0) ? product.sizes[0] : null;
  AppState.selectedColor = (product.colors && product.colors.length > 0) ? product.colors[0].name : null;
  AppState.quickViewQty = 1;

  const qvImg = document.getElementById('qvImage');
  qvImg.src = product.image;
  qvImg.alt = product.name;
  qvImg.onerror = () => {
    if (product.onlineImage) qvImg.src = product.onlineImage;
  };
  document.getElementById('qvCategory').textContent = `${product.category.toUpperCase()} • ${product.subcategory || ''}`;
  document.getElementById('qvTitle').textContent = product.name;
  document.getElementById('qvPrice').textContent = formatFCFA(product.price);
  
  const oldPriceEl = document.getElementById('qvOldPrice');
  if (product.oldPrice) {
    oldPriceEl.textContent = formatFCFA(product.oldPrice);
    oldPriceEl.style.display = 'inline';
  } else {
    oldPriceEl.style.display = 'none';
  }

  document.getElementById('qvDescription').textContent = product.description || 'Article de haute qualité signé DYKHA STORE.';
  document.getElementById('qvReviews').textContent = `(${product.reviewsCount || 20} avis clients certifiés)`;
  document.getElementById('qvQtyInput').value = 1;

  // Caractéristiques & Fiche technique
  const specsWrapper = document.getElementById('qvSpecsWrapper');
  const specsList = document.getElementById('qvSpecsList');
  if (product.characteristics && product.characteristics.length > 0) {
    if (specsWrapper) specsWrapper.style.display = 'block';
    if (specsList) {
      specsList.innerHTML = product.characteristics.map(c => `
        <div class="spec-item">
          <span class="spec-item-label">
            <i class="fa-solid fa-gem"></i> ${c.label}
          </span>
          <span class="spec-item-val">${c.value}</span>
        </div>
      `).join('');
    }
  } else {
    if (specsWrapper) specsWrapper.style.display = 'none';
  }

  // Statut du stock
  const stockText = document.getElementById('qvStockText');
  if (product.stock <= 0) {
    stockText.textContent = 'Rupture de stock momentanée';
    stockText.style.color = 'var(--danger)';
  } else if (product.stock <= 4) {
    stockText.textContent = `Plus que ${product.stock} pièces disponibles`;
    stockText.style.color = 'var(--warning)';
  } else {
    stockText.textContent = `En stock (${product.stock} unités)`;
    stockText.style.color = 'var(--success)';
  }

  // Tailles
  const sizeCont = document.getElementById('qvSizeContainer');
  const sizeList = document.getElementById('qvSizesList');
  if (product.sizes && product.sizes.length > 0) {
    sizeCont.style.display = 'block';
    sizeList.innerHTML = product.sizes.map((sz, idx) => `
      <span class="size-chip ${idx === 0 ? 'active' : ''}" data-size="${sz}">${sz}</span>
    `).join('');
  } else {
    sizeCont.style.display = 'none';
  }

  // Couleurs
  const colorCont = document.getElementById('qvColorContainer');
  const colorList = document.getElementById('qvColorsList');
  if (product.colors && product.colors.length > 0) {
    colorCont.style.display = 'block';
    colorList.innerHTML = product.colors.map((c, idx) => `
      <div class="color-dot ${idx === 0 ? 'active' : ''}" style="background-color: ${c.hex};" data-color="${c.name}" title="${c.name}"></div>
    `).join('');
  } else {
    colorCont.style.display = 'none';
  }

  // Ouvrir la modal
  document.getElementById('quickViewModal').classList.add('active');
}

function closeQuickView() {
  document.getElementById('quickViewModal').classList.remove('active');
  AppState.activeQuickViewProduct = null;
}

// ===================================================================
// GESTION DU PANIER (CART)
// ===================================================================

function addToCart(productId, size = null, color = null, quantity = 1) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  if (product.stock <= 0) {
    showToast('Désolé, cet article est actuellement en rupture de stock.', 'warning');
    return;
  }

  // Valeurs par défaut si non fournies
  const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Unique');
  const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : 'Standard');

  // Clé unique pour différencier article + taille + couleur
  const itemKey = `${product.id}_${chosenSize}_${chosenColor}`;
  const existingIndex = AppState.cart.findIndex(i => i.key === itemKey);

  if (existingIndex > -1) {
    AppState.cart[existingIndex].quantity += quantity;
  } else {
    AppState.cart.push({
      key: itemKey,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: chosenSize,
      color: chosenColor,
      quantity: quantity
    });
  }

  saveCart(AppState.cart);
  updateCartCounters();
  renderCartDrawer();
  showToast(`"${product.name}" ajouté à votre panier avec succès !`, 'success');
  openCartDrawer();
}

function updateCartItemQty(itemKey, delta) {
  const item = AppState.cart.find(i => i.key === itemKey);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    AppState.cart = AppState.cart.filter(i => i.key !== itemKey);
    showToast('Article retiré du panier.', 'info');
  }

  saveCart(AppState.cart);
  updateCartCounters();
  renderCartDrawer();
}

function removeCartItem(itemKey) {
  AppState.cart = AppState.cart.filter(i => i.key !== itemKey);
  saveCart(AppState.cart);
  updateCartCounters();
  renderCartDrawer();
  showToast('Article supprimé de votre panier.', 'info');
}

function updateCartCounters() {
  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cartCount');
  const drawerCount = document.getElementById('cartDrawerCount');
  if (badge) badge.textContent = totalCount;
  if (drawerCount) drawerCount.textContent = totalCount;
}

function updateWishlistCounters() {
  const badge = document.getElementById('wishlistCount');
  if (badge) badge.textContent = AppState.wishlist.length;
}

function renderCartDrawer() {
  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');
  const footerEl = document.getElementById('cartFooter');
  if (!container) return;

  if (AppState.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4>Votre panier est vide</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 8px;">
          Laissez-vous tenter par nos créations haut de gamme.
        </p>
        <button class="btn-primary" style="margin-top: 20px;" onclick="closeCartDrawer(); window.location.hash='#catalogue';">
          <i class="fa-solid fa-gem"></i> Découvrir les collections
        </button>
      </div>
    `;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'block';

  let subtotal = 0;

  container.innerHTML = AppState.cart.map(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const prod = AppState.products.find(p => p.id === item.productId);
    const mainChar = prod && prod.characteristics && prod.characteristics[0]
      ? `<div style="font-size: 0.72rem; color: var(--rose-primary); margin-top: 2px;"><i class="fa-solid fa-gem"></i> ${prod.characteristics[0].label}: ${prod.characteristics[0].value}</div>`
      : '';

    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-meta">Taille : <strong>${item.size}</strong> &bull; Couleur : <strong>${item.color}</strong></span>
          ${mainChar}
          
          <div class="cart-item-footer">
            <span class="cart-item-price">${formatFCFA(itemTotal)}</span>
            <div class="qty-stepper" style="transform: scale(0.9); transform-origin: right center;">
              <button class="qty-btn" onclick="updateCartItemQty('${item.key}', -1)"><i class="fa-solid fa-minus"></i></button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly>
              <button class="qty-btn" onclick="updateCartItemQty('${item.key}', 1)"><i class="fa-solid fa-plus"></i></button>
            </div>
            <button onclick="removeCartItem('${item.key}')" title="Supprimer" style="color: var(--danger); font-size: 0.95rem; margin-left: 8px;">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const shippingCost = subtotal > 50000 ? 0 : 2000;
  const shippingText = subtotal > 50000 ? 'Gratuite (Offerte)' : formatFCFA(2000);
  const netTotal = subtotal + shippingCost;

  document.getElementById('cartShipping').textContent = shippingText;
  if (subtotalEl) subtotalEl.textContent = formatFCFA(subtotal);
  if (totalEl) totalEl.textContent = formatFCFA(netTotal);
}

function openCartDrawer() {
  document.getElementById('cartOverlay').classList.add('active');
  document.getElementById('cartDrawer').classList.add('active');
}

function closeCartDrawer() {
  document.getElementById('cartOverlay').classList.remove('active');
  document.getElementById('cartDrawer').classList.remove('active');
}

// ===================================================================
// COMMANDES MULTICANAUX (WHATSAPP, SOCIAL CHAT)
// ===================================================================

function orderProductOnWhatsApp(productId) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  const size = AppState.selectedSize || (product.sizes ? product.sizes[0] : 'Unique');
  const color = AppState.selectedColor || (product.colors ? product.colors[0].name : 'Standard');
  const qty = AppState.quickViewQty || 1;

  let specsText = '';
  if (product.characteristics && product.characteristics.length > 0) {
    specsText = '\n📋 *Caractéristiques techniques* :\n' + product.characteristics.map(c => `   • ${c.label} : ${c.value}`).join('\n');
  }

  const message = `Bonjour DYKHA STORE ! ✨
Je souhaite commander l'article suivant :

🛍️ *Article* : ${product.name}
🏷️ *Catégorie* : ${product.category} (${product.subcategory || ''})
📏 *Taille choisie* : ${size}
🎨 *Couleur choisie* : ${color}
🔢 *Quantité* : ${qty}
💰 *Prix unitaire* : ${formatFCFA(product.price)}
💵 *Total estimé* : ${formatFCFA(product.price * qty)}${specsText}

Merci de m'indiquer la disponibilité et les modalités de livraison à mon adresse !`;

  const url = `https://wa.me/${SOCIAL_CONTACTS.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function orderCartOnWhatsApp() {
  if (AppState.cart.length === 0) {
    showToast('Votre panier est vide !', 'warning');
    return;
  }

  let subtotal = 0;
  let itemsList = '';

  AppState.cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    const prod = AppState.products.find(p => p.id === item.productId);
    const mainSpec = prod && prod.characteristics && prod.characteristics[0] ? ` (${prod.characteristics[0].label}: ${prod.characteristics[0].value})` : '';
    itemsList += `${index + 1}. *${item.name}* (x${item.quantity})\n   Taille: ${item.size} | Couleur: ${item.color}${mainSpec} | ${formatFCFA(itemTotal)}\n`;
  });

  const shipping = subtotal > 50000 ? 0 : 2000;
  const total = subtotal + shipping;

  const message = `Bonjour DYKHA STORE ! ✨
Je souhaite commander le contenu de mon panier :

${itemsList}
----------------------------
📦 *Sous-total* : ${formatFCFA(subtotal)}
🚚 *Livraison* : ${shipping === 0 ? 'Offerte' : formatFCFA(shipping)}
💎 *TOTAL À RÉGLER* : ${formatFCFA(total)}

Pouvez-vous confirmer ma commande et convenir du créneau de livraison ? Merci !`;

  const url = `https://wa.me/${SOCIAL_CONTACTS.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ===================================================================
// FINALISATION DE COMMANDE EN LIGNE (CHECKOUT MODAL)
// ===================================================================

function openCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast('Votre panier est vide.', 'warning');
    return;
  }

  closeCartDrawer();

  let subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let shipping = subtotal > 50000 ? 0 : 2000;
  let total = subtotal + shipping;

  document.getElementById('checkoutTotalAmount').textContent = formatFCFA(total);

  // Pré-remplir si utilisateur connecté
  if (AppState.user) {
    document.getElementById('orderFullName').value = AppState.user.name || '';
    document.getElementById('orderPhone').value = AppState.user.phone || '';
  }

  document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckoutModal() {
  document.getElementById('checkoutModal').classList.remove('active');
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const fullName = document.getElementById('orderFullName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const city = document.getElementById('orderCity').value;
  const address = document.getElementById('orderAddress').value.trim();
  const notes = document.getElementById('orderNotes').value.trim();
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'cash';

  if (!fullName || !phone || !address) {
    showToast('Veuillez remplir tous les champs obligatoires.', 'danger');
    return;
  }

  let subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let shipping = subtotal > 50000 ? 0 : 2000;
  let total = subtotal + shipping;

  const orderId = 'DYKHA-' + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    id: orderId,
    clientName: fullName,
    phone: phone,
    city: city,
    address: address,
    notes: notes,
    paymentMethod: paymentMethod,
    items: [...AppState.cart],
    subtotal: subtotal,
    shipping: shipping,
    total: total,
    date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    status: 'En attente'
  };

  // Réduire le stock des produits
  AppState.cart.forEach(cartItem => {
    const prod = AppState.products.find(p => p.id === cartItem.productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - cartItem.quantity);
    }
  });
  saveProducts(AppState.products);

  // Sauvegarder la commande
  const orders = getStoredOrders();
  orders.unshift(newOrder);
  saveOrders(orders);

  // Vider le panier
  AppState.cart = [];
  saveCart(AppState.cart);
  updateCartCounters();
  renderProducts();

  closeCheckoutModal();

  showToast(`Félicitations ${fullName} ! Votre commande #${orderId} a été enregistrée avec succès. Notre équipe vous contacte sous peu.`, 'success', 6000);
}

// ===================================================================
// GESTION DU COMPTE CLIENT & AUTHENTIFICATION
// ===================================================================

function openAuthModal() {
  document.getElementById('authModal').classList.add('active');
  updateUserInterface();
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('active');
}

function updateUserInterface() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const profileView = document.getElementById('userProfileView');
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');

  if (AppState.user) {
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'none';
    if (tabLoginBtn) tabLoginBtn.style.display = 'none';
    if (tabRegisterBtn) tabRegisterBtn.style.display = 'none';
    if (profileView) {
      profileView.style.display = 'block';
      document.getElementById('profileName').textContent = AppState.user.name;
      document.getElementById('profileEmail').textContent = `${AppState.user.email} • ${AppState.user.phone}`;
      
      // Historique des commandes de l'utilisateur
      const allOrders = getStoredOrders();
      const userOrders = allOrders.filter(o => o.phone === AppState.user.phone || o.clientName === AppState.user.name);
      const ordersContainer = document.getElementById('userOrdersList');
      if (userOrders.length > 0) {
        ordersContainer.innerHTML = userOrders.map(o => `
          <div style="padding: 8px 0; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between;">
            <div>
              <strong>#${o.id}</strong> - ${o.items.length} article(s)<br>
              <small>${o.date}</small>
            </div>
            <div style="text-align: right;">
              <span style="font-weight: 700; color: var(--rose-primary);">${formatFCFA(o.total)}</span><br>
              <span class="status-badge status-badge.order-pending">${o.status}</span>
            </div>
          </div>
        `).join('');
      } else {
        ordersContainer.textContent = 'Vous n\'avez pas encore passé de commande.';
      }
    }
  } else {
    if (profileView) profileView.style.display = 'none';
    if (tabLoginBtn) tabLoginBtn.style.display = 'block';
    if (tabRegisterBtn) tabRegisterBtn.style.display = 'block';
    if (loginForm) loginForm.style.display = 'block';
    if (registerForm) registerForm.style.display = 'none';
  }
}

// ===================================================================
// ÉCOUTEURS D'ÉVÉNEMENTS GLOBAUX
// ===================================================================

function setupEventListeners() {
  // Navigation par catégorie
  document.querySelectorAll('.nav-link[data-cat]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.getAttribute('data-cat');
      AppState.currentCategory = cat;
      AppState.currentSubcategory = 'all';
      renderCategoryTabs();
      renderProducts();
      document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Cartes vitrines catégories
  document.querySelectorAll('.category-card[data-filter]').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-filter');
      AppState.currentCategory = cat;
      AppState.currentSubcategory = 'all';
      renderCategoryTabs();
      renderProducts();
      document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Liens footer catégories
  document.querySelectorAll('.footer-links a[data-cat]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.getAttribute('data-cat');
      AppState.currentCategory = cat;
      AppState.currentSubcategory = 'all';
      renderCategoryTabs();
      renderProducts();
      document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Clic sur les onglets de catégories
  document.getElementById('categoriesTabs')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const cat = btn.getAttribute('data-category');
    AppState.currentCategory = cat;
    AppState.currentSubcategory = 'all';
    renderCategoryTabs();
    renderProducts();
  });

  // Clic sur les sous-catégories
  document.getElementById('subcategoriesBar')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.subcat-chip');
    if (!chip) return;
    AppState.currentSubcategory = chip.getAttribute('data-subcat');
    renderSubcategoryChips();
    renderProducts();
  });

  // Recherche en direct
  document.getElementById('searchInput')?.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value;
    renderProducts();
  });

  // Bouton recherche header
  document.getElementById('btnHeaderSearch')?.addEventListener('click', () => {
    document.getElementById('catalogue').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('searchInput')?.focus();
  });

  // Tri
  document.getElementById('sortSelect')?.addEventListener('change', (e) => {
    AppState.sortBy = e.target.value;
    renderProducts();
  });

  // Réinitialiser filtres
  document.getElementById('btnResetFilters')?.addEventListener('click', () => {
    AppState.currentCategory = 'all';
    AppState.currentSubcategory = 'all';
    AppState.searchQuery = '';
    if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
    renderCategoryTabs();
    renderProducts();
  });

  // Clics dans la grille de produits (délégation d'événements)
  document.getElementById('productsGrid')?.addEventListener('click', (e) => {
    // 1. Bouton "Ajouter au panier" : ne pas ouvrir la modale détails
    const btnAdd = e.target.closest('.btn-add-cart');
    if (btnAdd) {
      e.stopPropagation();
      const pid = btnAdd.getAttribute('data-id');
      addToCart(pid);
      return;
    }

    // 2. Bouton "Commander direct WhatsApp" : ne pas ouvrir la modale détails
    const btnWa = e.target.closest('.btn-whatsapp-direct');
    if (btnWa) {
      e.stopPropagation();
      const pid = btnWa.getAttribute('data-id');
      orderProductOnWhatsApp(pid);
      return;
    }

    // 3. Bouton "Favoris" : ne pas ouvrir la modale détails
    const btnWish = e.target.closest('.btn-wishlist-toggle');
    if (btnWish) {
      e.stopPropagation();
      const pid = btnWish.getAttribute('data-id');
      if (AppState.wishlist.includes(pid)) {
        AppState.wishlist = AppState.wishlist.filter(id => id !== pid);
        showToast('Article retiré de vos favoris.', 'info');
      } else {
        AppState.wishlist.push(pid);
        showToast('Article ajouté à vos favoris !', 'success');
      }
      saveWishlist(AppState.wishlist);
      updateWishlistCounters();
      renderProducts();
      return;
    }

    // 4. Clic sur le produit (carte entière, image, titre, badge, bouton aperçu ou indicateur de caractéristiques)
    // -> Ouvre automatiquement les détails et toutes les caractéristiques du produit !
    const card = e.target.closest('.product-card');
    if (card) {
      const pid = card.getAttribute('data-id');
      if (pid) {
        openQuickView(pid);
      }
    }
  });

  // Modale Quick View : sélection de taille
  document.getElementById('qvSizesList')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.size-chip');
    if (!chip) return;
    document.querySelectorAll('#qvSizesList .size-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    AppState.selectedSize = chip.getAttribute('data-size');
  });

  // Modale Quick View : sélection de couleur
  document.getElementById('qvColorsList')?.addEventListener('click', (e) => {
    const dot = e.target.closest('.color-dot');
    if (!dot) return;
    document.querySelectorAll('#qvColorsList .color-dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    AppState.selectedColor = dot.getAttribute('data-color');
  });

  // Modale Quick View : Stepper quantité
  document.getElementById('qvQtyMinus')?.addEventListener('click', () => {
    if (AppState.quickViewQty > 1) {
      AppState.quickViewQty--;
      document.getElementById('qvQtyInput').value = AppState.quickViewQty;
    }
  });

  document.getElementById('qvQtyPlus')?.addEventListener('click', () => {
    const maxStock = AppState.activeQuickViewProduct ? AppState.activeQuickViewProduct.stock : 99;
    if (AppState.quickViewQty < maxStock) {
      AppState.quickViewQty++;
      document.getElementById('qvQtyInput').value = AppState.quickViewQty;
    } else {
      showToast(`Stock maximal disponible : ${maxStock}`, 'warning');
    }
  });

  // Modale Quick View : Ajouter au panier
  document.getElementById('qvAddToCartBtn')?.addEventListener('click', () => {
    if (!AppState.activeQuickViewProduct) return;
    addToCart(
      AppState.activeQuickViewProduct.id,
      AppState.selectedSize,
      AppState.selectedColor,
      AppState.quickViewQty
    );
    closeQuickView();
  });

  // Modale Quick View : Commande WhatsApp directe
  document.getElementById('qvWhatsAppOrderBtn')?.addEventListener('click', () => {
    if (!AppState.activeQuickViewProduct) return;
    orderProductOnWhatsApp(AppState.activeQuickViewProduct.id);
  });

  // Fermeture Quick View
  document.getElementById('closeQuickView')?.addEventListener('click', closeQuickView);

  // Panier Tiroir
  document.getElementById('btnCartTrigger')?.addEventListener('click', () => {
    renderCartDrawer();
    openCartDrawer();
  });

  document.getElementById('closeCartDrawer')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCartDrawer);

  // Panier : Commande WhatsApp
  document.getElementById('btnCartOrderWhatsApp')?.addEventListener('click', orderCartOnWhatsApp);

  // Panier : Ouvrir Checkout
  document.getElementById('btnOpenCheckout')?.addEventListener('click', openCheckoutModal);

  // Checkout : Fermer et soumettre
  document.getElementById('closeCheckout')?.addEventListener('click', closeCheckoutModal);
  document.getElementById('checkoutForm')?.addEventListener('submit', handleCheckoutSubmit);

  // Espace Client
  document.getElementById('btnUserAccount')?.addEventListener('click', openAuthModal);
  document.getElementById('closeAuth')?.addEventListener('click', closeAuthModal);

  // Onglets Auth
  document.getElementById('tabLoginBtn')?.addEventListener('click', () => {
    document.getElementById('tabLoginBtn').classList.add('active');
    document.getElementById('tabRegisterBtn').classList.remove('active');
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
  });

  document.getElementById('tabRegisterBtn')?.addEventListener('click', () => {
    document.getElementById('tabRegisterBtn').classList.add('active');
    document.getElementById('tabLoginBtn').classList.remove('active');
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
  });

  // Soumission Inscription
  document.getElementById('registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();

    const newUser = { id: 'usr_' + Date.now(), name, email, phone };
    AppState.user = newUser;
    saveCurrentUser(newUser);

    // Ajouter aux clients enregistrés
    const clients = JSON.parse(localStorage.getItem('dykha_clients') || '[]');
    clients.push({ ...newUser, registeredAt: new Date().toLocaleDateString('fr-FR') });
    localStorage.setItem('dykha_clients', JSON.stringify(clients));

    showToast(`Bienvenue dans la famille DYKHA STORE, ${name} !`, 'success');
    updateUserInterface();
  });

  // Soumission Connexion
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailOrPhone = document.getElementById('loginEmail').value.trim();

    // Connexion simulée / récupération client
    const clients = JSON.parse(localStorage.getItem('dykha_clients') || '[]');
    const existing = clients.find(c => c.email === emailOrPhone || c.phone === emailOrPhone);

    const loggedUser = existing || {
      id: 'usr_' + Date.now(),
      name: emailOrPhone.split('@')[0] || 'Client VIP',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'client@dykhastore.com',
      phone: emailOrPhone.includes('@') ? '+221 77 000 00 00' : emailOrPhone
    };

    AppState.user = loggedUser;
    saveCurrentUser(loggedUser);
    showToast(`Ravi de vous revoir, ${loggedUser.name} !`, 'success');
    updateUserInterface();
  });

  // Déconnexion
  document.getElementById('btnLogout')?.addEventListener('click', () => {
    AppState.user = null;
    saveCurrentUser(null);
    showToast('Vous avez été déconnecté.', 'info');
    updateUserInterface();
  });

  // Menu Mobile
  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    document.getElementById('navMenu')?.classList.toggle('active');
  });

  // Formulaire de contact
  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    showToast(`Merci ${name}, votre message a été transmis à notre service client. Nous vous répondrons sous 2h ouvrées !`, 'success', 5000);
    document.getElementById('contactForm').reset();
  });

  // Newsletter
  document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Félicitations ! Vous êtes inscrit(e) à nos invitations et ventes privées.', 'success');
    document.getElementById('newsletterForm').reset();
  });

  // Fermeture des modales avec la touche Échap
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickView();
      closeCartDrawer();
      closeCheckoutModal();
      closeAuthModal();
      document.getElementById('productModal')?.classList.remove('active');
    }
  });
}
