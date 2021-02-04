<template>
  <div>
    <span v-for="participant in participants" :key="participant">
      {{ participant }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    participants: {
      type: Array,
      required: true,
    },
  },
};
</script>
