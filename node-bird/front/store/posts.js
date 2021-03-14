import Vue from "vue";

export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
});

const limit = 10;

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },
  removeMainPost(state, payload) {
    const idx = state.mainPosts.findIndex((v) => v.id === payload.id);
    state.mainPosts.splice(idx, 1);
  },
  addComment(state, payload) {
    const idx = state.mainPosts.findIndex((v) => v.id === payload.PostId);
    state.mainPosts[idx].Comments.push(payload);
  },
  loadComments(state, payload) {
    const idx = state.mainPosts.findIndex((v) => v.id === payload.postId);
    // state.mainPosts[idx].Comments = payload;
    Vue.set(state.mainPosts[idx], "Comments", payload.data);
  },
  loadPosts(state, payload) {
    state.mainPosts = state.mainPosts.concat(payload);
    state.hasMorePost = payload.length === limit;
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  },
};

export const actions = {
  add({ state, commit }, payload) {
    // 서버에 게시글 등록 요청 보냄
    this.$axios
      .post(
        "/post",
        {
          content: payload.content,
          image: state.imagePaths,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("addMainPost", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  remove({ commit }, payload) {
    this.$axios
      .delete(`/post/${payload.postId}`, {
        widthCredentials: true,
      })
      .then(() => {
        commit("removeMainPost", payload);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  addComment({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/comment`,
        {
          content: payload.content,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("addComment", res.data);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data);
      });
  },
  loadComments({ commit }, payload) {
    this.$axios
      .get(`/post/${payload.postId}/comments`)
      .then((res) => {
        commit("loadComments", {
          postId: payload.postId,
          data: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  async loadPosts({ commit, state }, payload) {
    try {
      const res = await this.$axios.get(
        `/posts?offset=${state.mainPosts.length}&limit=10`,
        {
          withCredentials: true,
        }
      );
      commit("loadPosts", res.data);
    } catch {
      (err) => {
        console.error(err);
      };
    }
  },
  uploadImages({ commit }, payload) {
    this.$axios
      .post("/post/images", payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit("concatImagePaths", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
