<template>
  <ABtn class="text-xs" variant="text" color="info" @click="$router.go(-1)">
    Back
  </ABtn>
</template>

<script>
export default {
  name: "BackButton"
};
</script>

<style scoped>

</style>