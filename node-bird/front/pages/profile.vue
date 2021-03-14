<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>내 프로필</v-subheader>
        </v-container>
        <v-container>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field
              v-model="nickname"
              :rules="[(v) => !!v || '닉네임을 입력하세요']"
              label="닉네임"
              required
            />
            <v-btn color="blue" type="submit"> 수정 </v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <FollowList :users="followingList" :remove="removeFollowing" />
          <v-btn
            @click="loadMoreFollowings"
            v-if="hasMoreFollowing"
            block
            color="blue"
            >더보기</v-btn
          >
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <FollowList :users="followerList" :remove="removeFollower" />
          <v-btn
            @click="loadMoreFollowers"
            v-if="hasMoreFollower"
            block
            color="blue"
            >더보기</v-btn
          >
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from "@/components/FollowList";
export default {
  components: { FollowList },
  data() {
    return {
      valid: false,
      nickname: "",
    };
  },
  watch: {
    me(value, oldval) {
      if (value) {
        this.$router.push({
          path: "/",
        });
      }
    },
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    followerList() {
      return this.$store.state.users.followerList;
    },
    followingList() {
      return this.$store.state.users.followingList;
    },
    hasMoreFollowing() {
      return this.$store.state.users.hasMoreFollowing;
    },
    hasMoreFollower() {
      return this.$store.state.users.hasMoreFollower;
    },
  },
  methods: {
    onChangeNickname() {
      this.$store.dispatch("users/changeNickname", {
        nickname: this.nickname,
      });
    },
    removeFollowing(id) {
      this.$store.dispatch("users/removeFollowing", { id });
    },
    removeFollower(id) {
      this.$store.dispatch("users/removeFollower", { id });
    },
    loadMoreFollowers() {
      this.$store.dispatch("users/loadFollowers");
    },
    loadMoreFollowings() {
      this.$store.dispatch("users/loadFollowings");
    },
  },
  middleware: "authenticated",
  fetch({ store }) {
    store.dispatch("users/loadFollowers");
    return store.dispatch("users/loadFollowings");
  },
};
</script>

<style lang="scss" scoped>
</style>