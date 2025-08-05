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
  { name: "username", label: "اسم المستخدم", type: "text", required: true },
  { name: "password", label: "كلمة المرور", type: "password", required: true },
  {
    name: "gender",
    label: "الجنس",
    type: "radio",
    options: ["ذكر", "أنثى"],
    required: true,
  },
  { name: "profilePic", label: "الصورة الشخصية", type: "file" },
  { name: "subscribe", label: "اشترك في النشرة", type: "switch" },
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
