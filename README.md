# 🏗️ Angular Form Builder

An interactive form builder built using **Angular 16+** and **Tailwind CSS**. This project allows users to dynamically create, edit, and manage form fields, structured into customizable field groups. The form configuration is stored in local storage, ensuring data persistence.

---

## 🚀 **Features**

- **Drag-and-drop Form Fields**  
  - Single Line Text, Multi Line Text, Number, Date, Time, Date & Time, Dropdown, Radio, Checkbox, File Upload
- **Field Groups**  
  - Create, edit, delete, copy, select, and reorder field groups
- **Dynamic Form Building**  
  - Add, edit, reorder, and delete form elements in the middle panel
- **Validation**  
  - Supports minLength, maxLength, and required validation
- **Local Storage Integration**  
  - Automatically saves form structure and restores it on page reload
- **Responsive UI**  
  - Styled with Tailwind CSS

---

## 🧑‍💻 **Technologies Used**

- **Angular 15+** (Component-based architecture)  
- **Tailwind CSS** (Utility-first styling)  
- **RxJS** (Reactive programming)  
- **TypeScript** (Strongly typed JavaScript)  
- **Local Storage** (Data persistence)  
- **Angular CDK** (Drag-and-drop functionality)

---

## 📦 **Packages Installed**

Ensure you have the following dependencies installed:

```bash
# Angular CLI (if not already installed)
npm install -g @angular/cli

# Install project dependencies
npm install

# Drag-and-drop (CDK)
npm install @angular/cdk

# Tailwind CSS
npm install -D tailwindcss

# Initialize Tailwind config
npx tailwindcss init
