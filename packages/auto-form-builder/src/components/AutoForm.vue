<template>
  <form
    @submit.prevent="handleSubmit"
    class="max-w-md mx-auto space-y-4"
    dir="rtl"
  >
    <div v-for="field in schema" :key="field.name" class="flex flex-col gap-1">
      <label
        v-if="
          field.type !== 'checkbox' &&
          field.type !== 'radio' &&
          field.type !== 'switch'
        "
        :for="field.name"
        class="font-medium dark:text-white"
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
        class="border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-400"
      />

      <input
        v-else-if="field.type === 'password'"
        type="password"
        :id="field.name"
        v-model="formData[field.name]"
        :required="field.required"
        class="border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-400"
      />

      <input
        v-else-if="field.type === 'file'"
        type="file"
        :id="field.name"
        @change="handleFileUpload(field.name, $event)"
        :required="field.required"
        class="border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-400"
      />

      <div v-else-if="field.type === 'radio'" class="flex flex-col gap-1">
        <label class="font-medium dark:text-white mb-1">{{
          field.label
        }}</label>
        <div
          v-for="option in field.options"
          :key="option"
          class="flex items-center gap-2"
        >
          <input
            type="radio"
            :id="`${field.name}-${option}`"
            :value="option"
            :name="field.name"
            v-model="formData[field.name]"
            :required="field.required"
          />
          <label
            :for="`${field.name}-${option}`"
            class="text-sm dark:text-white"
          >
            {{ option }}
          </label>
        </div>
      </div>

      <div v-else-if="field.type === 'switch'" class="flex items-center gap-2">
        <input
          type="checkbox"
          :id="field.name"
          v-model="formData[field.name]"
          :required="field.required"
          class="accent-blue-600"
        />
        <label :for="field.name" class="text-sm dark:text-white">
          {{ field.label }}
        </label>
      </div>

      <textarea
        v-else-if="field.type === 'textarea'"
        :id="field.name"
        v-model="formData[field.name]"
        :required="field.required"
        rows="4"
        class="border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-400 resize-y"
      />

      <input
        v-else-if="field.type === 'number'"
        type="number"
        :id="field.name"
        v-model="formData[field.name]"
        :required="field.required"
        class="border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-400"
      />

      <input
        v-else-if="field.type === 'date'"
        type="date"
        :id="field.name"
        v-model="formData[field.name]"
        :required="field.required"
        class="border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-400"
      />

      <select
        v-else-if="field.type === 'select'"
        :id="field.name"
        v-model="formData[field.name]"
        :required="field.required"
        class="border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-400"
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
          class="accent-blue-600"
        />
        <label :for="field.name" class="text-sm dark:text-white">
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
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded dark:bg-blue-500 dark:hover:bg-blue-600"
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
    min?: number;
    max?: number;
    pattern?: string;
  }>;
}>();

const emit = defineEmits<{
  (e: "submit", payload: Record<string, any>): void;
}>();
function handleFileUpload(fieldName: string, event: Event) {
  const target = event.target as HTMLInputElement;
  if (target?.files?.length) {
    formData[fieldName] = target.files[0];
  }
}

const formData = reactive<Record<string, any>>({});
const errors = ref<Record<string, string>>({});

props.schema.forEach((field) => {
  formData[field.name] = field.type === "checkbox" ? false : "";
});

function handleSubmit() {
  errors.value = {};

  for (const field of props.schema) {
    const value = formData[field.name];
    const isEmpty = field.type === "checkbox" ? !value : value === "";

    if (field.required && isEmpty) {
      errors.value[field.name] = "هذا الحقل مطلوب";
      continue;
    }

    if (field.type === "number") {
      const numValue = Number(value);
      if (field.min !== undefined && numValue < field.min) {
        errors.value[
          field.name
        ] = `القيمة يجب أن تكون أكبر أو تساوي ${field.min}`;
      }
      if (field.max !== undefined && numValue > field.max) {
        errors.value[
          field.name
        ] = `القيمة يجب أن تكون أقل أو تساوي ${field.max}`;
      }
    }

    if (
      field.type === "text" ||
      field.type === "email" ||
      field.type === "textarea" ||
      field.type === "password"
    ) {
      const length = String(value).length;

      if (field.min !== undefined && length < field.min) {
        errors.value[
          field.name
        ] = `يجب أن يكون الطول ${field.min} أحرف على الأقل`;
      }

      if (field.max !== undefined && length > field.max) {
        errors.value[field.name] = `يجب ألا يتجاوز الطول ${field.max} حرف`;
      }

      if (field.pattern) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(String(value))) {
          errors.value[field.name] = "القيمة لا تطابق النمط المطلوب";
        }
      }
    }
  }

  if (Object.keys(errors.value).length === 0) {
    emit("submit", formData);
  }
}
</script>
