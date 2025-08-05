# 🧱 vue-auto-form-builder

[![npm](https://img.shields.io/npm/v/auto-form-builder)](https://www.npmjs.com/package/auto-form-builder
)

A smart and fully customizable Vue 3 component to auto-generate forms using a simple JSON schema.  
Supports **RTL**, **Dark Mode**, **themes**, **sections**, **validation**, **i18n**, and more — all out of the box ⚡️

---

## ✨ Features

- 📄 Build forms instantly from a schema
- 🧑‍🎨 Fully customizable styling via `themeConfig`
- 🧩 Supports all common field types: text, number, password, file, switch, checkbox, radio, textarea, select, etc.
- 📦 Section-based grouping (with `section` titles)
- ✅ Built-in validation (required, min, max, pattern)
- 🌐 Multi-language support (EN / AR auto-detect)
- 🌓 Auto dark mode support via `prefers-color-scheme`
- 🔗 Optional `submitUrl` to POST form data automatically
- 🧪 Works perfectly with Tailwind / Bootstrap
- 💡 JSON output ready-to-use
- 🪶 Lightweight and dependency-free

---

## 📦 Installation

```bash
npm install vue-auto-form-builder
```

---

## 🚀 Usage

```ts
import { AutoForm } from "vue-auto-form-builder";
```

```vue
<AutoForm :schema="formSchema" @submit="handleSubmit" />
```

---

## 📘 Schema Example

```ts
const formSchema = [
  {
    section: "معلومات أساسية",
    fields: [
      { name: "name", label: "الاسم", type: "text", required: true },
      {
        name: "email",
        label: "البريد الإلكتروني",
        type: "email",
        required: true,
      },
      {
        name: "gender",
        label: "الجنس",
        type: "radio",
        options: ["ذكر", "أنثى"],
      },
    ],
  },
  {
    section: "تفاصيل إضافية",
    fields: [
      { name: "dob", label: "تاريخ الميلاد", type: "date" },
      { name: "resume", label: "السيرة الذاتية", type: "file" },
    ],
  },
];
```

---

## 🎨 Theme Configuration (optional)

```ts
<AutoForm
  :schema="formSchema"
  :theme-config="{
    input: 'bg-gray-100 rounded border p-2',
    label: 'text-gray-700 font-semibold',
    submitButton: 'bg-blue-600 text-white py-2 px-4 rounded'
  }"
/>
```

---

## 📁 Project Structure

```
vue-auto-form-builder/
├── src/
│   ├── components/AutoForm.vue
│   ├── utils/schemaParser.ts
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🛠️ Build & Publish

```bash
npm run build
npm publish
```

---

## 📜 License

## 📜 License

This project is licensed under the [LICENSE](./LICENSE) file.

