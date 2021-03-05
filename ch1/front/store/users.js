export const state = () => ({
  me: null,
  followerList: [
    {
      id: 1,
      nickname: "제로초"
    },
    {
      id: 2,
      nickname: "네로"
    },
    {
      id: 3,
      nickname: "히어로"
    }
  ],
  followingList: [
    {
      id: 1,
      nickname: "제로초"
    },
    {
      id: 2,
      nickname: "네로"
    },
    {
      id: 3,
      nickname: "히어로"
    }
  ],
})

export const mutations = {
  setMe(state, payload) {
    state.me = payload
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname
  },
  addFollowing(state, payload) {
    state.followingList.push(payload)
  },
  addFollower(state, payload) {
    state.followerList.push(payload)
  },
  removeFollowing(state, payload) {
    const idx = state.followingList.findIndex(v => v.id === payload.id)
    state.followingList.splice(idx, 1)
  },
  removeFollower(state, payload) {
    const idx = state.followerList.findIndex(v => v.id === payload.id)
    state.followerList.splice(idx, 1)
  },
}

export const actions = {
  signUp({ commit, dispatch, state, rootState, getters, rootGetters }, payload) {
    // 서버에 회원가입 요청을 보내는 부분
    commit("setMe", payload)
  },
  logIn({ commit }, payload) {
    commit("setMe", payload)
  },
  logOut({ commit }, payload) {
    commit("setMe", null)
  },
  changeNickname({ commit }, payload) {
    commit("changeNickname", payload)
  },
  addFollowing({ commit }, payload) {
    commit("addFollowing", payload)
  },
  addFollower({ commit }, payload) {
    commit("addFollower", payload)
  },
  removeFollowing({ commit }, payload) {
    commit("removeFollowing", payload)
  },
  removeFollower({ commit }, payload) {
    commit("removeFollower", payload)
  },
}