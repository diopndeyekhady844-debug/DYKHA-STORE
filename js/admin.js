/**
 * DYKHA STORE - Module d'Administration & Gestion Commerciale
 * Dashboard des KPIs, Gestion des Produits (CRUD), Suivi des Commandes et Répertoire Clients
 */

document.addEventListener('DOMContentLoaded', () => {
  setupAdminListeners();
});

function setupAdminListeners() {
  const btnAdminSwitch = document.getElementById('btnAdminSwitch');
  const footerAdminLink = document.getElementById('footerAdminLink');
  const btnAdminQuit = document.getElementById('btnAdminQuit');

  // Basculer vers l'espace Admin
  btnAdminSwitch?.addEventListener('click', openAdminSection);
  footerAdminLink?.addEventListener('click', (e) => {
    e.preventDefault();
    openAdminSection();
  });

  // Revenir à la boutique
  btnAdminQuit?.addEventListener('click', closeAdminSection);

  // Onglets Admin
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.getAttribute('data-tab');
      document.getElementById('paneProducts').style.display = tab === 'products' ? 'block' : 'none';
      document.getElementById('paneOrders').style.display = tab === 'orders' ? 'block' : 'none';
      document.getElementById('paneClients').style.display = tab === 'clients' ? 'block' : 'none';
    });
  });

  // Modal Ajout Produit
  document.getElementById('btnOpenAddProduct')?.addEventListener('click', () => {
    openProductModal();
  });

  document.getElementById('closeProductModal')?.addEventListener('click', () => {
    document.getElementById('productModal').classList.remove('active');
  });

  // Soumission Formulaire Produit (Ajout ou Modification)
  document.getElementById('productForm')?.addEventListener('submit', handleProductFormSubmit);
}

// ===================================================================
// OUVERTURE & FERMETURE DE L'ESPACE ADMIN
// ===================================================================

function openAdminSection() {
  document.getElementById('storeView').style.display = 'none';
  document.getElementById('adminView').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  refreshAdminDashboard();
}

function closeAdminSection() {
  document.getElementById('adminView').classList.remove('active');
  document.getElementById('storeView').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderProducts(); // Rafraîchir les produits de la boutique
}

// ===================================================================
// RAFRAÎCHISSEMENT GLOBAL DU DASHBOARD
// ===================================================================

function refreshAdminDashboard() {
  const products = getStoredProducts();
  const orders = getStoredOrders();
  const clients = JSON.parse(localStorage.getItem('dykha_clients') || '[]');

  // Calcul du Chiffre d'Affaires total
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.total || 0), 0);

  // Mise à jour des KPIs
  document.getElementById('kpiRevenue').textContent = formatFCFA(totalRevenue);
  document.getElementById('kpiOrdersCount').textContent = orders.length;
  document.getElementById('kpiProductsCount').textContent = products.length;
  document.getElementById('kpiClientsCount').textContent = Math.max(clients.length, 1);

  // Rendu des tableaux
  renderAdminProductsTable();
  renderAdminOrdersTable();
  renderAdminClientsTable();
}

// ===================================================================
// 1. GESTION DES ARTICLES (PRODUITS)
// ===================================================================

function renderAdminProductsTable() {
  const tbody = document.getElementById('adminProductsTableBody');
  if (!tbody) return;

  const products = getStoredProducts();

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px;">Aucun article dans le catalogue.</td></tr>`;
    return;
  }

  tbody.innerHTML = products.map(prod => {
    let stockBadge = '<span class="status-badge in-stock">En stock</span>';
    if (prod.stock <= 0) {
      stockBadge = '<span class="status-badge out-stock">Épuisé</span>';
    } else if (prod.stock <= 4) {
      stockBadge = '<span class="status-badge low-stock">Stock critique</span>';
    }

    return `
      <tr>
        <td>
          <div class="table-product-cell">
            <img src="${prod.image}" alt="${prod.name}" onerror="this.onerror=null; if('${prod.onlineImage || ''}') this.src='${prod.onlineImage}';">
            <div>
              <strong>${prod.name}</strong><br>
              <small style="color: var(--text-light); font-size: 0.75rem;">Réf: ${prod.id}</small>
              ${prod.characteristics && prod.characteristics[0] ? `<br><small style="color: var(--rose-primary); font-size: 0.72rem;"><i class="fa-solid fa-tag"></i> ${prod.characteristics[0].value}</small>` : ''}
            </div>
          </div>
        </td>
        <td style="text-transform: capitalize;">${prod.category}</td>
        <td>${prod.subcategory || '-'}</td>
        <td style="font-weight: 700; color: var(--rose-primary);">${formatFCFA(prod.price)}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>${prod.stock} unités</span>
            <button onclick="quickUpdateStock('${prod.id}', 1)" title="Ajouter du stock" style="font-size: 0.75rem; color: var(--success);"><i class="fa-solid fa-plus-circle"></i></button>
            <button onclick="quickUpdateStock('${prod.id}', -1)" title="Retirer du stock" style="font-size: 0.75rem; color: var(--danger);"><i class="fa-solid fa-minus-circle"></i></button>
          </div>
        </td>
        <td>${stockBadge}</td>
        <td>
          <button class="action-icon-btn btn-edit" onclick="editProduct('${prod.id}')" title="Modifier l'article">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="action-icon-btn btn-delete" onclick="deleteProduct('${prod.id}')" title="Supprimer l'article">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function quickUpdateStock(productId, delta) {
  const products = getStoredProducts();
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  prod.stock = Math.max(0, prod.stock + delta);
  saveProducts(products);
  AppState.products = products;
  renderAdminProductsTable();
  showToast(`Stock de "${prod.name}" ajusté à ${prod.stock} unités.`, 'info');
}

function openProductModal(productId = null) {
  const modal = document.getElementById('productModal');
  const title = document.getElementById('productModalTitle');
  const form = document.getElementById('productForm');

  form.reset();

  if (productId) {
    const products = getStoredProducts();
    const prod = products.find(p => p.id === productId);
    if (prod) {
      title.textContent = 'Modifier l\'article';
      document.getElementById('adminProductId').value = prod.id;
      document.getElementById('adminProdName').value = prod.name;
      document.getElementById('adminProdCategory').value = prod.category;
      document.getElementById('adminProdSubcategory').value = prod.subcategory || '';
      document.getElementById('adminProdPrice').value = prod.price;
      document.getElementById('adminProdStock').value = prod.stock;
      document.getElementById('adminProdImage').value = prod.image;
      document.getElementById('adminProdDesc').value = prod.description || '';
      
      const charsText = (prod.characteristics || []).map(c => `${c.label}: ${c.value}`).join('\n');
      const charField = document.getElementById('adminProdCharacteristics');
      if (charField) charField.value = charsText;
    }
  } else {
    title.textContent = 'Ajouter un nouvel article';
    document.getElementById('adminProductId').value = '';
    document.getElementById('adminProdStock').value = 10;
    const charField = document.getElementById('adminProdCharacteristics');
    if (charField) charField.value = 'Matière: \nCoupe: \nFinitions: \nEntretien: ';
  }

  modal.classList.add('active');
}

function editProduct(productId) {
  openProductModal(productId);
}

function deleteProduct(productId) {
  const products = getStoredProducts();
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  if (confirm(`Confirmez-vous la suppression définitive de l'article "${prod.name}" du catalogue ?`)) {
    const filtered = products.filter(p => p.id !== productId);
    saveProducts(filtered);
    AppState.products = filtered;
    refreshAdminDashboard();
    showToast(`L'article "${prod.name}" a été retiré du catalogue.`, 'danger');
  }
}

function handleProductFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('adminProductId').value;
  const name = document.getElementById('adminProdName').value.trim();
  const category = document.getElementById('adminProdCategory').value;
  const subcategory = document.getElementById('adminProdSubcategory').value.trim();
  const price = parseInt(document.getElementById('adminProdPrice').value, 10);
  const stock = parseInt(document.getElementById('adminProdStock').value, 10);
  const image = document.getElementById('adminProdImage').value.trim();
  const description = document.getElementById('adminProdDesc').value.trim();
  const charsRaw = document.getElementById('adminProdCharacteristics')?.value.trim() || '';

  let characteristics = [];
  if (charsRaw) {
    characteristics = charsRaw.split('\n').map(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        return { label: parts[0].trim(), value: parts.slice(1).join(':').trim() };
      }
      return { label: 'Détail', value: line.trim() };
    }).filter(c => c.value);
  }

  let products = getStoredProducts();

  if (id) {
    // Modification
    const index = products.findIndex(p => p.id === id);
    if (index > -1) {
      products[index] = {
        ...products[index],
        name,
        category,
        subcategory,
        price,
        stock,
        image,
        description,
        characteristics: characteristics.length > 0 ? characteristics : (products[index].characteristics || [])
      };
      showToast(`Article "${name}" modifié avec succès !`, 'success');
    }
  } else {
    // Nouvel article
    const newId = 'prod-custom-' + Date.now();
    const newProduct = {
      id: newId,
      name,
      category,
      subcategory,
      price,
      oldPrice: null,
      stock,
      image,
      description,
      characteristics,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Standard', hex: '#D47380' }],
      rating: 5.0,
      reviewsCount: 1,
      badge: 'Nouveau'
    };
    products.unshift(newProduct);
    showToast(`Nouvel article "${name}" ajouté au catalogue !`, 'success');
  }

  saveProducts(products);
  AppState.products = products;
  document.getElementById('productModal').classList.remove('active');
  refreshAdminDashboard();
}

// ===================================================================
// 2. GESTION DES COMMANDES
// ===================================================================

function renderAdminOrdersTable() {
  const tbody = document.getElementById('adminOrdersTableBody');
  const summaryEl = document.getElementById('ordersTotalSummary');
  if (!tbody) return;

  const orders = getStoredOrders();
  if (summaryEl) summaryEl.textContent = `${orders.length} commande(s) enregistrée(s)`;

  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 24px; color: var(--text-secondary);">Aucune commande reçue pour le moment.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(ord => {
    let badgeClass = 'order-pending';
    if (ord.status === 'Expédiée') badgeClass = 'order-processing';
    if (ord.status === 'Livrée') badgeClass = 'order-delivered';
    if (ord.status === 'Annulée') badgeClass = 'order-cancelled';

    const itemsSummary = ord.items.map(i => `${i.name} (x${i.quantity})`).join(', ');

    return `
      <tr>
        <td><strong>#${ord.id}</strong><br><small style="color: var(--text-light);">${ord.date}</small></td>
        <td><strong>${ord.clientName}</strong></td>
        <td><a href="tel:${ord.phone}" style="color: var(--rose-primary); font-weight: 600;">${ord.phone}</a></td>
        <td><strong>${ord.city}</strong><br><small style="color: var(--text-secondary);">${ord.address}</small></td>
        <td style="max-width: 250px; font-size: 0.8rem; color: var(--text-main);">${itemsSummary}</td>
        <td style="font-weight: 800; color: var(--rose-primary); font-size: 0.95rem;">${formatFCFA(ord.total)}</td>
        <td><span class="status-badge ${badgeClass}">${ord.status}</span></td>
        <td>
          <select onchange="updateOrderStatus('${ord.id}', this.value)" style="padding: 4px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-size: 0.8rem;">
            <option value="En attente" ${ord.status === 'En attente' ? 'selected' : ''}>En attente</option>
            <option value="En cours de préparation" ${ord.status === 'En cours de préparation' ? 'selected' : ''}>En préparation</option>
            <option value="Expédiée" ${ord.status === 'Expédiée' ? 'selected' : ''}>Expédiée</option>
            <option value="Livrée" ${ord.status === 'Livrée' ? 'selected' : ''}>Livrée</option>
            <option value="Annulée" ${ord.status === 'Annulée' ? 'selected' : ''}>Annulée</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  order.status = newStatus;
  saveOrders(orders);
  renderAdminOrdersTable();
  showToast(`Statut de la commande #${orderId} mis à jour : "${newStatus}".`, 'info');
}

// ===================================================================
// 3. RÉPERTOIRE DES CLIENTS
// ===================================================================

function renderAdminClientsTable() {
  const tbody = document.getElementById('adminClientsTableBody');
  if (!tbody) return;

  let clients = JSON.parse(localStorage.getItem('dykha_clients') || '[]');
  const orders = getStoredOrders();

  // Démo client par défaut si vide
  if (clients.length === 0) {
    clients = [
      {
        id: 'usr-1',
        name: 'Aïda Sow',
        email: 'aida.sow@gmail.com',
        phone: '+221 77 654 32 10',
        city: 'Dakar (Almadies)',
        registeredAt: '12 Nov 2026'
      },
      {
        id: 'usr-2',
        name: 'Moussa Kane',
        email: 'moussa.kane@yahoo.fr',
        phone: '+221 78 123 45 67',
        city: 'Dakar (Mermoz)',
        registeredAt: '18 Nov 2026'
      }
    ];
    localStorage.setItem('dykha_clients', JSON.stringify(clients));
  }

  tbody.innerHTML = clients.map(client => {
    const clientOrdersCount = orders.filter(o => o.phone === client.phone || o.clientName === client.name).length;

    return `
      <tr>
        <td><strong>${client.name}</strong></td>
        <td>${client.email || '-'}</td>
        <td><a href="tel:${client.phone}" style="color: var(--rose-primary); font-weight: 600;">${client.phone}</a></td>
        <td>${client.city || 'Dakar'}</td>
        <td>${client.registeredAt || 'Récemment'}</td>
        <td><span class="status-badge ${clientOrdersCount > 0 ? 'in-stock' : 'low-stock'}">${clientOrdersCount} commande(s)</span></td>
      </tr>
    `;
  }).join('');
}
