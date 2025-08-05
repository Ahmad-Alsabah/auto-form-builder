<template>
  <form
    @submit.prevent="handleSubmit"
    class="max-w-md mx-auto space-y-4"
    dir="rtl"
  >
    <div v-for="field in schema" :key="field.name" class="flex flex-col gap-1">
      <label
        v-if="field.type !== 'checkbox'"
        :for="field.name"
        class="font-medium"
      >
        {{ field.label }}
        <span v-if="field.required" class="text-red-500">*</span>
      </label>

      <input
        v-if="field.type === 'text' || field.type === 'email'"
        :type="field.type"
        :id="field.name"
        v-model="formData[field.name]"
        :required="field.required"
        class="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
      />

      <select
        v-else-if="field.type === 'select'"
        :id="field.name"
        v-model="formData[field.name]"
        :required="field.required"
        class="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
      >
        <option disabled value="">اختر...</option>
        <option v-for="option in field.options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <div
        v-else-if="field.type === 'checkbox'"
        class="flex items-center gap-2"
      >
        <input
          type="checkbox"
          :id="field.name"
          v-model="formData[field.name]"
          :required="field.required"
        />
        <label :for="field.name" class="text-sm">
          {{ field.label }}
          <span v-if="field.required" class="text-red-500">*</span>
        </label>
      </div>

      <p v-if="errors[field.name]" class="text-red-500 text-sm mt-1">
        {{ errors[field.name] }}
      </p>
    </div>

    <button
      type="submit"
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
    >
      إرسال
    </button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits } from "vue";

const props = defineProps<{
  schema: Array<{
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: string[];
  }>;
}>();

const emit = defineEmits<{
  (e: "submit", payload: Record<string, any>): void;
}>();

const formData = reactive<Record<string, any>>({});
const errors = ref<Record<string, string>>({});

props.schema.forEach((field) => {
  formData[field.name] =
    field.type === "checkbox" ? false : field.type === "select" ? "" : "";
});

function handleSubmit() {
  errors.value = {};

  for (const field of props.schema) {
    const value = formData[field.name];
    const isEmpty = field.type === "checkbox" ? !value : value === "";

    if (field.required && isEmpty) {
      errors.value[field.name] = "هذا الحقل مطلوب";
    }
  }

  if (Object.keys(errors.value).length === 0) {
    emit("submit", formData);
  }
}
</script>
