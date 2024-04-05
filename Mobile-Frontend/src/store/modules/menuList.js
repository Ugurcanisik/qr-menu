import axios from "axios";

const state = {
    products: [],
    category: [],
    settings: {},
}

const getters = {
    allProducts(state) {
        return state.products;
    },
    allCategory(state) {
        return state.category;
    },
    allSettings(state) {
        return state.settings;
    },
}

const mutations = {
    updateProductsList(state, payload) {
        state.products.push(payload);
    },
    updateCategoryList(state, payload) {
        state.category.push(payload);
    },
    updateSettingsList(state, payload) {
        state.settings = payload;
    },
}

const actions = {
    initQr({dispatch, commit, state}) {
        return axios.get('/')
            .then(response => {
                if (response.status === 200) {
                    state.category = []
                    let category = response.data.category;
                    for (let key in category) {
                        commit("updateCategoryList", category[key]);
                    }
                    state.products = []
                    let products = response.data.products;
                    for (let key in products) {
                        commit("updateProductsList", products[key]);
                    }
                    state.settings = {}
                    let settings = response.data.settings;
                    for (let key in settings) {
                        commit("updateSettingsList", settings[key]);
                    }
                    return
                }
            })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}

