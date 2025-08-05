<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">🧱 Auto Form Builder Demo</h1>

    <AutoForm :schema="formSchema" @submit="handleSubmit" />

    <div v-if="submitted" class="mt-6 bg-green-100 p-4 rounded">
      <h2 class="font-semibold mb-2">📤 البيانات المرسلة:</h2>
      <pre>{{ submitted }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AutoForm } from "auto-form-builder";

const submitted = ref(null);

const formSchema = [
  { name: "fullName", label: "الاسم الكامل", type: "text", required: true },
  { name: "email", label: "البريد الإلكتروني", type: "email", required: true },
  {
    name: "gender",
    label: "الجنس",
    type: "select",
    options: ["ذكر", "أنثى"],
    required: true,
  },
  {
    name: "terms",
    label: "أوافق على الشروط",
    type: "checkbox",
    required: true,
  },
];

function handleSubmit(data: Record<string, any>) {
  submitted.value = JSON.stringify(data, null, 2);
}
</script>

<style scoped>
body {
  font-family: sans-serif;
}
</style>
