<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="field in schema" :key="field.name" class="mb-4">
      <label :for="field.name" class="block font-medium mb-1">
        {{ field.label }}
        <span v-if="field.required" class="text-red-500">*</span>
      </label>

      <input
        v-if="field.type === 'text' || field.type === 'email'"
        :type="field.type"
        :id="field.name"
        v-model="formData[field.name]"
        :required="field.required"
        class="w-full border p-2 rounded"
      />

      <select
        v-else-if="field.type === 'select'"
        :id="field.name"
        v-model="formData[field.name]"
        :required="field.required"
        class="w-full border p-2 rounded"
      >
        <option disabled value="">اختر...</option>
        <option v-for="option in field.options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <div v-else-if="field.type === 'checkbox'" class="flex items-center">
        <input
          type="checkbox"
          :id="field.name"
          v-model="formData[field.name]"
          :required="field.required"
          class="mr-2"
        />
        <label :for="field.name">{{ field.label }}</label>
      </div>

      <p v-if="errors[field.name]" class="text-red-500 text-sm mt-1">
        {{ errors[field.name] }}
      </p>
    </div>

    <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded">
      إرسال
    </button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, defineProps, defineEmits } from "vue";

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
    if (field.required && !formData[field.name]) {
      errors.value[field.name] = "هذا الحقل مطلوب";
    }
  }

  if (Object.keys(errors.value).length === 0) {
    emit("submit", formData);
  }
}
</script>
