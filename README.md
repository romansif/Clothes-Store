# 🛍️ Online Clothing Store App

A modern online clothing store built with **Vue 3**, **TypeScript**, and **Supabase**.
The project features a product catalog with dynamic filtering, product management,
and a responsive interface.

---

## 🚀 Technology stack

* **Frontend:** [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Collector:** [Vite](https://vitejs.dev/)
* **Stylization:** [Tailwind CSS](https://tailwindcss.com/)
* **Backend & Database:** [Supabase](https://supabase.com/) (PostgreSQL + JSONB, Authentication, Storage)
* **Icons & Animations:** Vue Transitions, Кастомные SVG-иконки

---

## ✨ Core functionality

* 📦 **Product Catalog:** Dynamic product list display with filtering by category, size, and color.
---
* 🎨 **JSONB Color Handling:** Parsing and filtering of complex JSON arrays containing colors and HEX codes directly from the database.
---
* 📏 **Size Selection:** Interactive size selection panel with visual indicators for active items.
---
* 🔄 **Filtering and Search:** Comprehensive client-side and server-side search functionality for the Supabase database.
---
* ✏️ **Product Management:** Confirmation modals for deleting and editing product cards.
---
* 📱 **Responsive Design:** User-friendly interface for mobile devices, tablets, and desktops.
---
* 🖱️ **Horizontal Scroll:** Custom `v-horizontal-scroll` directive for easy scrolling through categories and sizes using the mouse wheel.

---

## 🛠️ Quick Start (Installation and Launch)

To run the project locally, follow these steps:

### 1. Cloning a repository

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
```

### 2. Installing dependencies

```bash
npm install
```

### 3. Launch in development mode (Both the backend and frontend are launched.)

```
npm run dev
```

## 📦 Production Build

To release the project:

### 1. To build an optimized project for deployment

```bash
npm run build
```

### 2. Verify the locally built build

```bash
npm run preview
```