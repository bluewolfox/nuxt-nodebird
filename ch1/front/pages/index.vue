<template>
  <v-container>
    <div>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  </v-container>
</template>

<script>
import PostCard from "@/components/PostCard";
export default {
  components: { PostCard },
  data() {
    return {
      name: "Nuxt.js",
    };
  },
  head() {
    return {
      title: "메인페이지",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>