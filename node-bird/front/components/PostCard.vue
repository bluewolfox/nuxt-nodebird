<template>
  <div>
    <v-card style="margin-bottom: 20px">
      <post-images :images="post.Images || []" />
      <v-card-title>
        <h3>
          <nuxt-link :to="`/user/${post.id}`">{{
            post.User.nickname
          }}</nuxt-link>
        </h3>
      </v-card-title>
      <v-card-text>
        <div>
          <div>{{ post.content }}</div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="orange">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onToggleComment">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn text color="orange" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background: white">
            <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
            <v-btn dark color="orange" @click="onEditPost">수정</v-btn>
          </div>
        </v-menu>
      </v-card-actions>
    </v-card>
    <template v-if="commentOpened">
      <CommentForm :post-id="post.id" />
      <v-list-item v-for="c in post.Comments" :key="c.id">
        <div v-if="!c">댓글을 등록해주세요!</div>
        <template v-else>
          <v-list-item-avatar color="teal">
            <span>{{ c.User.nickname[0] }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <h3>{{ c.User.nickname }}</h3>
            <div>{{ c.content }}</div>
          </v-list-item-content>
        </template>
      </v-list-item>
    </template>
  </div>
</template>

<script>
import PostImages from "@/components/PostImages.vue";
import CommentForm from "@/components/CommentForm.vue";
export default {
  name: "PostCard",
  components: { PostImages, CommentForm },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      commentOpened: false,
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  methods: {
    onRemovePost() {
      if (!this.me) {
        alert("로그인이 필요합니다.");
        return;
      }
      this.$store.dispatch("posts/remove", {
        postId: this.post.id,
      });
    },
    onEditPost() {},
    onToggleComment() {
      if (!this.commentOpened) {
        this.$store.dispatch("posts/loadComments", {
          postId: this.post.id,
        });
      }
      this.commentOpened = !this.commentOpened;
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>