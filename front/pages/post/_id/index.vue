<template>
  <div>
    <v-container v-if="post">
      <post-card :post="post"></post-card>
    </v-container>
    <div v-else>게시물이 존재하지 않습니다.</div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
export default {
  components: {
    PostCard,
  },
  computed: {
    post() {
      return this.$store.state.posts.mainPosts.find(
        (v) => String(v.id) === this.$route.params.id
      );
    },
  },
};
</script>
