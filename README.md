# ⚡ LeadFlow CRM Dashboard

A beginner-to-intermediate level Customer Relationship Management (CRM) dashboard built with plain HTML, CSS, and Vanilla JavaScript. No frameworks, no backend, no APIs.

Site is live at https://smriti2929.github.io/LeadFlow-CRM-Dashboard/
---

## 📌 Project Overview

LeadFlow CRM helps sales teams manage potential customers (called "leads") and track their progress through a sales pipeline. Users can add, edit, delete, search, and filter leads — all data is stored locally in the browser using LocalStorage.

This project was built to demonstrate core frontend development skills and an understanding of CRM concepts commonly used in platforms like Salesforce.

---

## ✅ Features

- **Dashboard Cards** — At-a-glance count of Total, New, Contacted, and Closed leads
- **Add Lead** — Create a new lead with Name, Email, Company, Phone, and Status
- **Edit Lead** — Update any lead's information using a pre-filled modal form
- **Delete Lead** — Remove a lead with a confirmation modal (prevents accidental deletion)
- **Search** — Live search leads by Name or Company name
- **Filter** — Filter the leads table by Status (New, Contacted, Qualified, Closed)
- **LocalStorage** — All data persists across browser sessions without a backend
- **Sample Data** — 10 pre-loaded sample leads so the app is not empty on first run
- **Responsive Design** — Works on desktop, tablet, and mobile screens
- **Toast Notifications** — Small popup messages for user feedback (add/edit/delete)

---

## 🛠 Technologies Used

| Technology      | Purpose                                      |
|----------------|----------------------------------------------|
| HTML5           | Page structure and layout                    |
| CSS3            | Styling, layout (Flexbox/Grid), animations   |
| Vanilla JS (ES6)| All app logic — no jQuery, no frameworks     |
| LocalStorage    | Browser-side data persistence                |
| Google Fonts    | Inter font for clean typography              |

---

## 📁 Folder Structure

```
LeadFlow-CRM/
├── index.html     → Main HTML file (structure + layout)
├── style.css      → All styles (sidebar, cards, table, modal)
├── script.js      → All JavaScript logic (CRUD, search, filter)
└── README.md      → Project documentation
```

---

## 🚀 How to Run

**No installation or setup needed.**

1. Download or clone the project folder.
2. Open `index.html` directly in any modern browser (Chrome, Firefox, Edge).
3. The app will load with 10 pre-filled sample leads automatically.

> **Tip:** If you want to reset to the original sample data, open your browser's DevTools → Application tab → LocalStorage → delete the `leadflow_leads` key and refresh the page.

---

## 📖 How to Use

| Action             | How to do it                                            |
|--------------------|---------------------------------------------------------|
| Add a lead         | Click the **+ Add Lead** button in the top-right corner |
| Edit a lead        | Click the **Edit** button in any lead's row             |
| Delete a lead      | Click the **Delete** button, then confirm               |
| Search leads       | Type in the search bar on the All Leads page            |
| Filter by status   | Use the Status dropdown on the All Leads page           |
| View all leads     | Click **All Leads** in the sidebar or **View All →**    |

---

## 🔮 Future Improvements

If I were to extend this project, I would add:

1. **User Authentication** — Login/logout with sessions (using Firebase or a Node.js backend)
2. **REST API + Database** — Replace LocalStorage with a real database (e.g., MongoDB or MySQL)
3. **Lead Notes** — Allow users to add notes or activity logs per lead
4. **Charts & Analytics** — Visual charts (bar/pie) showing pipeline progress over time
5. **Export to CSV** — Allow users to download lead data as a spreadsheet
6. **Dark Mode** — Toggle between light and dark themes

---

## 👨‍💻 About

Built as a portfolio project to demonstrate frontend development and CRM domain knowledge.  
**Tech Stack:** HTML · CSS · Vanilla JavaScript · LocalStorage  
**Author:** Smriti Asthana 
**Version:** 1.0
