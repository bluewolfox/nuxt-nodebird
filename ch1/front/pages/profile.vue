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
        </v-container>
      </v-card>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <FollowList :users="followerList" :remove="removeFollower" />
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
  computed: {
    followerList() {
      return this.$store.state.users.followerList;
    },
    followingList() {
      return this.$store.state.users.followingList;
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
  },
  middleware: "authenticated",
};
</script>

<style lang="scss" scoped>
</style>