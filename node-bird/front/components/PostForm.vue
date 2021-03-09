<template>
  <v-card style="margin-bottom: 20px">
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="onSubmitForm"
        style="position: relative"
      >
        <v-textarea
          v-model="content"
          outlined
          auto-grow
          clearable
          label="어떤 신기한 일이 있었나요?"
          :hide-details="hideDetails"
          :succes-message="successMessages"
          :success="success"
          :rules="[(v) => !!v.trim() || '내용을 입력하세요.']"
          @input="onChangeTextarea"
        />
        <v-btn type="submit" color="green" absolute right>짹짹</v-btn>
        <input
          type="file"
          ref="imageInput"
          multiple
          hidden
          @change="onChangeImages"
        />
        <v-btn @click="onClickImageUpload" type="button">이미지 업로드</v-btn>
        <div>
          <div
            v-for="(p, i) in imagePaths"
            :key="p"
            style="display: inline-block"
          >
            <img
              :src="`http://localhost:3085/${p}`"
              :alt="p"
              style="width: 200px"
            />
            <div>
              <button @click="onRemoveImage(i)" type="button">제거</button>
            </div>
          </div>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      valid: false,
      hideDetails: true,
      successMessages: "",
      success: false,
      content: "",
    };
  },
  computed: {
    ...mapState("users", ["me"]),
    ...mapState("posts", ["imagePaths"]),
  },
  methods: {
    onChangeTextarea(value) {
      if (value.length) {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = "";
      }
    },
    // 이미지 업로드
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    // 이미지 변경
    onChangeImages(e) {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        // [].forEach.call 은 e.target.files가 유사배열(배열같지만 오브젝트임)이기 때문에 강제로 forEach 시키기 위해서 사용
        imageFormData.append("image", f);
      });
      this.$store.dispatch("posts/uploadImages", imageFormData);
    },
    // 이미지 제거
    onRemoveImage(idx) {
      this.$store.commit("posts/removeImagePath", idx);
    },
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("posts/add", {
            content: this.content,
          })
          .then(() => {
            this.content = "";
            this.hideDetails = false;
            this.success = true;
            this.successMessages = "게시글 등록 성공!";
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>