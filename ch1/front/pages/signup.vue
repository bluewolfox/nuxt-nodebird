<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader> 회원가입 </v-subheader>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <v-text-field
              label="이메일"
              v-model="email"
              type="email"
              required
              :rules="emailRules"
            />
            <v-text-field
              label="비밀번호"
              type="password"
              required
              v-model="password"
              :rules="passwordRules"
            />
            <v-text-field
              label="비밀번호 확인"
              type="password"
              v-model="passwordConfirm"
              :rules="passwordCheckRules"
              required
            />
            <v-text-field
              label="닉네임"
              type="nickname"
              v-model="nickname"
              :rules="nicknameRules"
              required
            />
            <v-checkbox
              required
              label="말을 잘 들을 것을 약속합니다."
              v-model="check"
              :rules="checkRules"
            />
            <v-btn color="green" type="submit" :disabled="!valid">
              가입하기
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
      check: "",
      emailRules: [
        (v) => !!v || "이메일은 필수입니다.",
        (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다.",
      ],
      nicknameRules: [(v) => !!v || "닉네임은 필수입니다."],
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
      passwordCheckRules: [
        (v) => !!v || "비밀번호 확인은 필수입니다.",
        (v) => v === this.password || "비밀번호랑 같아야 합니다.",
      ],
      checkRules: [(v) => !!v || "체크는 필수입니다."],
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
  },
  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("users/signUp", {
            email: this.email,
            nickname: this.nickname,
          })
          .then(() => {
            this.$router.push({
              path: "/",
            });
          })
          .catch((error) => {
            alert("회원가입 실패");
          });
      } else {
        alert("회원가입 실패");
      }
    },
  },
  head() {
    return {
      title: "회원가입",
    };
  },
  middleware: "anonymous",
};
</script>

<style lang="scss" scoped>
</style>