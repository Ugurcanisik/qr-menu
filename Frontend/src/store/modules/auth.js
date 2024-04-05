import axios from "axios";
import {router} from '../../router/router'


const state = {
  token: "",
  user: null
}

const getters = {
  isAuthenticated(state) {
    return state.token !== ""
  },
  getUser(state) {
    return state.user
  },
  getToken(state) {
    return state.token
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = ""
  },
  setUser(state, payload) {
    state.user = payload
  }
}

const actions = {
  initAuth({commit, dispatch, state}) {
    let token = localStorage.getItem("token")
    if (token) {

      let expirationDate = localStorage.getItem("expiresIn")
      let time = new Date().getTime()
      if (time >= +expirationDate) {
        dispatch("logout")
      } else {
        return axios.get('/auth/' + token)
          .then(response => {
            if (response.data) {
              //console.log(response.data)
              const user = response.data
              user.role = JSON.parse(user.role)
              commit('setUser', user)
              commit("setToken", token)
              //router.push("/")
              return true
            } else {
              dispatch('logout')
              return false
            }
          })
      }
    } else {
      return false
    }
  },
  login({commit, dispatch, state}, payload) {
    return axios.post('/auth/recaptcha', payload.recaptcha)
      .then(response => {
        const recaptcha = response.data

        if (recaptcha.action == 'login' && recaptcha.score > 0.5 && recaptcha.success == true) {
          return axios.post('/auth', payload.user)
            .then(response => {
              if (response.data != false) {
                let timer = 3000
                let token = response.data
                localStorage.setItem("token", token)
                commit("setToken", token)
                localStorage.setItem("expiresIn", new Date().getTime() + (60 * 60 * 1000))
                dispatch("setTimeoutTimer", 60 * 60 * 1000)
                swal({
                  text: "Giriş Başarılı",
                  icon: "success",
                  button: false,
                  timer: timer,
                  closeOnClickOutside: false,
                });
                setTimeout(() => {
                  router.push("/")
                  //  router.replace('/')
                }, timer)
              } else {
                return false
              }
            })
        } else {
          return false
        }

      })
  },
  logout({commit, dispatch, state}) {
    commit("clearToken")
    localStorage.removeItem("token")
    localStorage.removeItem("expiresIn")
    router.push("/auth")
  },
  setTimeoutTimer({dispatch}, expiresIn) {
    setTimeout(() => {
      dispatch("logout")
    }, expiresIn)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

