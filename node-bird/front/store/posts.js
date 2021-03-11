export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: []
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
    const idx = state.mainPosts.findIndex((v) => v.id === payload.postId);
    state.mainPosts[idx].Comments.push(payload);
  },
  loadPosts(state, payload) {
    state.mainPosts = state.mainPosts.concat(payload);
    state.hasMorePost = payload.length === limit;
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload)
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  }
};

export const actions = {
  add({ state, commit }, payload) {
    // 서버에 게시글 등록 요청 보냄
    this.$axios.post("http://localhost:3085/post", {
      content: payload.content,
      imagePath: state.imagePaths
    }, {
      withCredentials: true
    })
      .then(res => {
        commit("addMainPost", res.data);
      })
      .catch(err => {
        console.error(err);
      })
  },
  remove({ commit }, payload) {
    // 서버에 게시글 삭제
    commit("removeMainPost", payload);
  },
  addComment({ commit }, payload) {
    this.$axios.post(`http://localhost:3085/post/${payload.postId}/comment`, {
      content: payload.content
    }, {
      withCredentials: true
    })
    .then(res=>{

      commit("addComment", res.data);
      return res
    })
    .catch(err=>{
      console.error(err);
      alert(err.response.data)
    })
  },
  loadPosts({ commit, state }, payload) {
    if (state.hasMorePost) {
      this.$axios.get(`http://localhost:3085/posts?offset=${state.mainPosts.length}&limit=10`)
        .then(res => {
          commit("loadPosts", res.data);
        })
        .catch(err => {
          console.error(err);
        })
    }
  },
  uploadImages({ commit }, payload) {
    this.$axios.post("http://localhost:3085/post/images", payload, {
      withCredentials: true
    })
      .then((res) => {
        commit("concatImagePaths", res.data)
      })
      .catch(err => {
        console.error(err);
      })
  },
};
