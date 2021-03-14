export const state = () => ({
  me: null,
  followerList: [],
  followingList: [],
  hasMoreFollowing: true,
  hasMoreFollower: true,
});

const totalFollower = 1;
const totalFollowing = 1;
const limit = 3;

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  addFollowing(state, payload) {
    state.followingList.push(payload);
  },
  addFollower(state, payload) {
    state.followerList.push(payload);
  },
  removeFollowing(state, payload) {
    const idx = state.followingList.findIndex((v) => v.id === payload.id);
    state.followingList.splice(idx, 1);
  },
  removeFollower(state, payload) {
    const idx = state.followerList.findIndex((v) => v.id === payload.id);
    state.followerList.splice(idx, 1);
  },
  loadFollowings(state) {
    const diff = totalFollowing - state.followingList.length;
    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map((v) => {
        return {
          id: Math.random(),
          nickname: Math.floor(Math.random() * 1000),
        };
      });
    state.followingList = state.followingList.concat(fakeUsers);
    state.hasMoreFollowing = fakeUsers.length === limit;
  },
  loadFollowers(state) {
    const diff = totalFollower - state.followerList.length;
    const fakeUsers = Array(diff > limit ? limit : diff)
      .fill()
      .map((v) => {
        return {
          id: Math.random(),
          nickname: Math.floor(Math.random() * 1000),
        };
      });
    state.followerList = state.followerList.concat(fakeUsers);
    state.hasMoreFollower = fakeUsers.length === limit;
  },
};

export const actions = {
  async loadUser({ state, commit }) {
    try {
      const res = await this.$axios.get("/user", {
        withCredentials: true,
      });
      commit("setMe", res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async signUp({ commit }, payload) {
    try {
      // 서버에 회원가입 요청을 보내는 부분
      const result = await this.$axios.post(
        `/user`,
        {
          nickname: payload.nickname,
          password: payload.password,
          email: payload.email,
        },
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        commit("setMe", result.data);
        this.$router.push({
          path: "/",
        });
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error(error);
    }
  },
  logIn({ commit }, payload) {
    // 서버에 로그인 요청을 보내는 부분
    this.$axios
      .post(
        `/user/login`,
        {
          email: payload.email,
          password: payload.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("setMe", res.data);
      })
      .catch((error) => {
        alert(error.response.data);
        console.error(error);
      });
  },
  logOut({ commit }, payload) {
    this.$axios
      .post(
        `/user/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        commit("setMe", null);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  changeNickname({ commit }, payload) {
    commit("changeNickname", payload);
  },
  addFollowing({ commit }, payload) {
    commit("addFollowing", payload);
  },
  addFollower({ commit }, payload) {
    commit("addFollower", payload);
  },
  removeFollowing({ commit }, payload) {
    commit("removeFollowing", payload);
  },
  removeFollower({ commit }, payload) {
    commit("removeFollower", payload);
  },
  loadFollowers({ commit, state }, payload) {
    if (state.hasMoreFollower) {
      commit("loadFollowers");
    }
  },
  loadFollowings({ commit, state }, payload) {
    if (state.hasMoreFollowing) {
      commit("loadFollowings");
    }
  },
};
