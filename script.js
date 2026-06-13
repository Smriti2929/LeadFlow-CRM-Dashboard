// =============================================
// LeadFlow CRM — script.js
// Vanilla JavaScript, no libraries.
// Uses LocalStorage to save/load leads.
// =============================================

// ---- SAMPLE / SEED DATA ----
// These leads are preloaded the FIRST time the app runs.
// After that, all data comes from LocalStorage.
const sampleLeads = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@tcs.com",
    company: "TCS",
    phone: "+91 98765 43210",
    status: "Closed"
  },
  {
    id: "2",
    name: "Arjun Mehta",
    email: "arjun.mehta@wipro.com",
    company: "Wipro",
    phone: "+91 91234 56789",
    status: "Contacted"
  },
  {
    id: "3",
    name: "Sara Khan",
    email: "sara.khan@infosys.com",
    company: "Infosys",
    phone: "+91 99887 76655",
    status: "New"
  },
  {
    id: "4",
    name: "Rohan Verma",
    email: "rohan.v@hcltech.com",
    company: "HCL Technologies",
    phone: "+91 90001 23456",
    status: "Qualified"
  },
  {
    id: "5",
    name: "Neha Joshi",
    email: "neha.joshi@techm.com",
    company: "Tech Mahindra",
    phone: "+91 87654 32109",
    status: "New"
  },
  {
    id: "6",
    name: "Karan Patel",
    email: "karan.p@ltimindtree.com",
    company: "LTIMindtree",
    phone: "+91 96543 21098",
    status: "Contacted"
  },
  {
    id: "7",
    name: "Divya Nair",
    email: "divya.nair@mphasis.com",
    company: "Mphasis",
    phone: "+91 77889 90011",
    status: "Closed"
  },
  {
    id: "8",
    name: "Aditya Singh",
    email: "aditya.s@hexaware.com",
    company: "Hexaware Technologies",
    phone: "+91 88001 99234",
    status: "Qualified"
  },
  {
    id: "9",
    name: "Meera Iyer",
    email: "meera.iyer@capgemini.com",
    company: "Capgemini",
    phone: "+91 99100 22334",
    status: "New"
  },
  {
    id: "10",
    name: "Vivek Reddy",
    email: "vivek.r@accenture.com",
    company: "Accenture",
    phone: "+91 95566 77889",
    status: "Contacted"
  }
];

// ---- LOCALSTORAGE KEY ----
const STORAGE_KEY = "leadflow_leads";

// ---- GLOBAL STATE ----
// We keep all leads in this array during the session.
let leads = [];
let deleteTargetId = null; // tracks which lead is being deleted

// ============================================================
// 1. DATA FUNCTIONS (Load, Save, Add, Update, Delete)
// ============================================================

// Load leads from LocalStorage.
// If no data exists, load sample data and save it.
function loadLeads() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    leads = JSON.parse(stored);
  } else {
    leads = sampleLeads;
    saveLeads();
  }
}

// Save the current leads array to LocalStorage as a JSON string.
function saveLeads() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

// Generate a simple unique ID using timestamp.
function generateId() {
  return Date.now().toString();
}

// Add a brand-new lead to the array.
function addLead(leadData) {
  const newLead = {
    id: generateId(),
    name: leadData.name,
    email: leadData.email,
    company: leadData.company,
    phone: leadData.phone,
    status: leadData.status
  };
  leads.push(newLead);
  saveLeads();
}

// Update an existing lead by matching its id.
function updateLead(id, updatedData) {
  leads = leads.map(function(lead) {
    if (lead.id === id) {
      // Spread old lead properties, then overwrite with new data
      return { ...lead, ...updatedData };
    }
    return lead;
  });
  saveLeads();
}

// Remove a lead from the array by its id.
function deleteLead(id) {
  leads = leads.filter(function(lead) {
    return lead.id !== id;
  });
  saveLeads();
}

// ============================================================
// 2. DASHBOARD CARDS — Count leads by status
// ============================================================

function updateDashboardCards() {
  document.getElementById("count-total").textContent = leads.length;

  // Count leads where status equals a specific value
  document.getElementById("count-new").textContent = leads.filter(l => l.status === "New").length;
  document.getElementById("count-contacted").textContent = leads.filter(l => l.status === "Contacted").length;
  document.getElementById("count-closed").textContent = leads.filter(l => l.status === "Closed").length;
}

// ============================================================
// 3. TABLE RENDERING — Convert lead data into HTML rows
// ============================================================

// Returns the HTML for one badge pill based on status string.
function getStatusBadge(status) {
  const classMap = {
    "New":        "badge-new",
    "Contacted":  "badge-contacted",
    "Qualified":  "badge-qualified",
    "Closed":     "badge-closed"
  };
  const cssClass = classMap[status] || "badge-new";
  return `<span class="badge ${cssClass}">${status}</span>`;
}

// Build a single <tr> HTML string for a lead object.
function buildRow(lead) {
  return `
    <tr>
      <td>${lead.name}</td>
      <td>${lead.company}</td>
      <td>${lead.email}</td>
      <td>${lead.phone}</td>
      <td>${getStatusBadge(lead.status)}</td>
      <td>
        <button class="action-btn btn-edit" onclick="openEditModal('${lead.id}')">Edit</button>
        <button class="action-btn btn-delete" onclick="openDeleteModal('${lead.id}', '${lead.name}')">Delete</button>
      </td>
    </tr>
  `;
}

// Render recent leads table (dashboard — show last 5 leads).
function renderRecentLeads() {
  const tbody = document.getElementById("recent-tbody");
  // Show only the most recently added leads (last 5 items)
  const recent = leads.slice(-5).reverse();
  tbody.innerHTML = recent.map(buildRow).join("");
}

// Render all leads table with optional search and filter.
function renderAllLeads() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const filterValue = document.getElementById("filterStatus").value;

  // Filter leads based on search text AND status dropdown
  let filtered = leads.filter(function(lead) {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchValue) ||
      lead.company.toLowerCase().includes(searchValue);

    const matchesFilter =
      filterValue === "all" || lead.status === filterValue;

    return matchesSearch && matchesFilter;
  });

  const tbody = document.getElementById("leads-tbody");
  const emptyMsg = document.getElementById("emptyMsg");

  if (filtered.length === 0) {
    tbody.innerHTML = "";
    emptyMsg.classList.remove("hidden");
  } else {
    emptyMsg.classList.add("hidden");
    tbody.innerHTML = filtered.map(buildRow).join("");
  }
}

// ============================================================
// 4. SECTION NAVIGATION — Dashboard vs All Leads
// ============================================================

function showSection(sectionName) {
  document.getElementById("section-dashboard").classList.add("hidden");
  document.getElementById("section-leads").classList.add("hidden");

  document.getElementById("section-" + sectionName).classList.remove("hidden");
  document.getElementById("page-title").textContent =
    sectionName === "dashboard" ? "Dashboard" : "All Leads";

  // Update active nav link
  document.querySelectorAll(".nav-item").forEach(function(item) {
    item.classList.remove("active");
    if (item.dataset.section === sectionName) {
      item.classList.add("active");
    }
  });

  if (sectionName === "leads") renderAllLeads();
  if (sectionName === "dashboard") {
    updateDashboardCards();
    renderRecentLeads();
  }
}

// ============================================================
// 5. MODAL — Add / Edit Lead
// ============================================================

// Open modal to add a brand-new lead.
function openAddModal() {
  // Reset form
  document.getElementById("leadId").value = "";
  document.getElementById("leadName").value = "";
  document.getElementById("leadEmail").value = "";
  document.getElementById("leadCompany").value = "";
  document.getElementById("leadPhone").value = "";
  document.getElementById("leadStatus").value = "New";
  document.getElementById("formError").classList.add("hidden");
  document.getElementById("modal-title").textContent = "Add New Lead";

  document.getElementById("modalOverlay").classList.remove("hidden");
}

// Open modal pre-filled with an existing lead's data for editing.
function openEditModal(id) {
  const lead = leads.find(l => l.id === id);
  if (!lead) return;

  // Pre-fill form with existing values
  document.getElementById("leadId").value = lead.id;
  document.getElementById("leadName").value = lead.name;
  document.getElementById("leadEmail").value = lead.email;
  document.getElementById("leadCompany").value = lead.company;
  document.getElementById("leadPhone").value = lead.phone;
  document.getElementById("leadStatus").value = lead.status;
  document.getElementById("formError").classList.add("hidden");
  document.getElementById("modal-title").textContent = "Edit Lead";

  document.getElementById("modalOverlay").classList.remove("hidden");
}

// Close the Add/Edit modal.
function closeModal() {
  document.getElementById("modalOverlay").classList.add("hidden");
}

// Save button — handles both Add and Edit.
function saveLead() {
  const id = document.getElementById("leadId").value;
  const name    = document.getElementById("leadName").value.trim();
  const email   = document.getElementById("leadEmail").value.trim();
  const company = document.getElementById("leadCompany").value.trim();
  const phone   = document.getElementById("leadPhone").value.trim();
  const status  = document.getElementById("leadStatus").value;

  // Basic validation — name, email, and company are required
  if (!name || !email || !company) {
    document.getElementById("formError").classList.remove("hidden");
    return;
  }

  const leadData = { name, email, company, phone, status };

  if (id) {
    // ID exists → editing an existing lead
    updateLead(id, leadData);
    showToast("Lead updated successfully!");
  } else {
    // No ID → adding a new lead
    addLead(leadData);
    showToast("Lead added successfully!");
  }

  closeModal();
  refreshView(); // Re-render whichever section is visible
}

// ============================================================
// 6. DELETE MODAL
// ============================================================

function openDeleteModal(id, name) {
  deleteTargetId = id;
  document.getElementById("deleteLeadName").textContent = name;
  document.getElementById("deleteOverlay").classList.remove("hidden");
}

function closeDeleteModal() {
  deleteTargetId = null;
  document.getElementById("deleteOverlay").classList.add("hidden");
}

function confirmDelete() {
  if (!deleteTargetId) return;
  deleteLead(deleteTargetId);
  showToast("Lead deleted.");
  closeDeleteModal();
  refreshView();
}

// ============================================================
// 7. TOAST NOTIFICATION
// ============================================================

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  // Hide the toast after 3 seconds
  setTimeout(function() {
    toast.classList.add("hidden");
  }, 3000);
}

// ============================================================
// 8. REFRESH — Re-render the currently visible section
// ============================================================

function refreshView() {
  const dashboardVisible = !document.getElementById("section-dashboard").classList.contains("hidden");
  if (dashboardVisible) {
    updateDashboardCards();
    renderRecentLeads();
  } else {
    renderAllLeads();
  }
}

// ============================================================
// 9. EVENT LISTENERS
// ============================================================

// Nav links (Dashboard / All Leads)
document.querySelectorAll(".nav-item").forEach(function(item) {
  item.addEventListener("click", function(e) {
    e.preventDefault();
    showSection(item.dataset.section);
    // Close sidebar on mobile after clicking a nav item
    document.getElementById("sidebar").classList.remove("open");
  });
});

// "View All" link on dashboard
document.getElementById("viewAllLink").addEventListener("click", function(e) {
  e.preventDefault();
  showSection("leads");
});

// "+ Add Lead" button in topbar
document.getElementById("openAddModal").addEventListener("click", openAddModal);

// Close modal buttons
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("cancelModal").addEventListener("click", closeModal);

// Save lead button inside modal
document.getElementById("saveLeadBtn").addEventListener("click", saveLead);

// Delete modal buttons
document.getElementById("closeDeleteModal").addEventListener("click", closeDeleteModal);
document.getElementById("cancelDelete").addEventListener("click", closeDeleteModal);
document.getElementById("confirmDelete").addEventListener("click", confirmDelete);

// Click outside modal to close
document.getElementById("modalOverlay").addEventListener("click", function(e) {
  if (e.target === this) closeModal();
});
document.getElementById("deleteOverlay").addEventListener("click", function(e) {
  if (e.target === this) closeDeleteModal();
});

// Search input — live search as user types
document.getElementById("searchInput").addEventListener("input", renderAllLeads);

// Status filter dropdown
document.getElementById("filterStatus").addEventListener("change", renderAllLeads);

// Hamburger menu (mobile sidebar toggle)
document.getElementById("hamburger").addEventListener("click", function() {
  document.getElementById("sidebar").classList.toggle("open");
});

// ============================================================
// 10. INIT — Run when page loads
// ============================================================

function init() {
  loadLeads();           // Load from LocalStorage or seed sample data
  updateDashboardCards(); // Show counts on cards
  renderRecentLeads();   // Show recent leads table on dashboard
}

// Start the app
init();
