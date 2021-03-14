<template>
  <v-form
    ref="form"
    v-model="valid"
    style="position: relative"
    @submit.prevent="onSubmitForm"
  >
    <v-textarea
      v-model="content"
      filled
      label="댓글 달기"
      :hide-details="hideDetails"
      :success="success"
      :success-messages="successMessages"
      @input="onChangeTextarea"
    />
    <v-btn color="green" dark absolute top right type="submit">삐약</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    postId: {
      type: Number,
      require: true,
    },
  },
  name: "CommentForm",
  data() {
    return {
      valid: false,
      content: "",
      hideDetails: true,
      success: false,
      successMessages: "",
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  methods: {
    async onSubmitForm() {
      try {
        if (this.$refs.form.validate()) {
          await this.$store.dispatch("posts/addComment", {
            postId: this.postId,
            content: this.content,
          });
          this.content = "";
          this.success = true;
          this.successMessages = "댓글이 작성되었습니다.";
          this.hideDetails = false;
        }
      } catch (error) {
        console.error(err);
      }
    },
    onChangeTextarea(value) {
      if (value.length) {
        this.success = false;
        this.successMessages = "";
        this.hideDetails = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>