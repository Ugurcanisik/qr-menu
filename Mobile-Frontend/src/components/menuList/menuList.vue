<template>
  <div>

    <div>
      <div class="loading" :style="isLoading">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>


    <div id="google_translate_element2"></div>

    <div v-if="!isLoad">

      <div style="margin-left: 10px">

        <v-menu
            bottom
            origin="center center"
            transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
            >
              {{ lang }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title style="margin-right: 15px">
                <a
                    href="#"
                    onclick="doGTranslate('tr|tr');return false;"
                    class="gflag nturl"
                >
                  <img @click="chanceLang('TR')" src="./trflag.png" height="32" width="32" alt="Turkish"/>
                </a>
              </v-list-item-title>
              <v-list-item-title>
                <a
                    href="#"
                    onclick="doGTranslate('tr|en');return false;"
                    class="gflag nturl"
                >
                  <img @click="chanceLang('ENG')" src="./engb.jpg" height="32" width="32" alt="English"/>
                </a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>


      </div>

      <center style="margin-top: -35px">
        <img :src="'https://storage.googleapis.com/noxus-up-file/'+allSettings.ico" width="30"
             height="30" @click="tab=0">
      </center>

    </div>

    <v-tabs
        v-model="tab"
        style="margin-left: -50px;  margin-top: 10px; width: 90%;"
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab
          v-for="item in allCategory"
          :key="item.seoUrl"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <div v-if="!isLoad"
         style="position: absolute; top:55px; right:11px;"
    >
      <v-dialog
          transition="dialog-top-transition"
          v-model="dialog"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"

          >ᐁ
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar>
              <span style="margin: 0 auto">Kateogoriler</span>
            </v-toolbar>
            <v-card-text>


              <ul class="nav nav-pills">

                <li v-for="category in allCategory" class="nav-item-category"
                    :key="category.id"
                    style="margin:0px auto; width:100%; text-align: center;">
                  <a class="nav-link mb-sm-3 mb-md-0 kategori"
                     style="background-color: white ;"
                     @click="chanceCategory(category.seoUrl)">{{ category.name }}</a>
                </li>

              </ul>


            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                  text
                  @click="closeDialog(dialog)"
              >Kapat
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>

    <div class="wrapper">
      <section class="section pt-lg-0" id="restaurant-content" style="padding-top: 0px">

        <div class="container container-restorant">

          <v-tabs-items
              v-model="tab"
              v-touch="{
                  left: () => swipe(),
                  right: () => swipe(),
                       }"
          >
            <v-tab-item
                v-for="prod in allProducts"
                :key="prod.categorySeoUrl"
            >

              <div style="text-align: center; margin-top: 10px">
                <h1 style="font-size: 40px;color: black; font-family: 'Baloo Chettan 2', cursive;">{{
                    prod.categoryName
                  }}</h1>
                <br/>
              </div>

              <div class="row">

                <v-card flat v-for="productsDetails in prod.products" :key="productsDetails.categoryName"
                        class="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div class="strip">

                    <img :src="'https://storage.googleapis.com/noxus-up-file/'+productsDetails.picture" width="400"
                         height="400" v-if="productsDetails.picture">

                    <div style="margin-top: 10px;"></div>

                    <span
                        style="display: block; float:right"
                        class="res_mimimum urunfiyat"
                        v-html="$options.filters.priceLoad(productsDetails.price)"
                    >
                    </span>

                    <span class="res_title" style="display: block;">
                      <b
                          class="urunad"
                          style="display:block; width: 85%;"
                          v-html="$options.filters.nameLoad(productsDetails.name)"
                      >
                      </b>
                    </span>

                    <span
                        class="res_description urundetay"
                        style="display: block; margin-top: 10px;"
                    >{{ productsDetails.description }}
                    </span>

                  </div>
                </v-card>


              </div>


            </v-tab-item>
          </v-tabs-items>


        </div>
      </section>

    </div>


  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      isLoad: false,
      tab: null,
      dialog: false,
      lang: 'TR'
    }
  },

  methods: {
    chanceLang(lang) {

    },
    swipe() {
      if (window.pageYOffset != 0) {
        window.scroll(0, window.pageYOffset - 2000)
      }
    },
    chanceCategory(url) {
      let x = 0
      this.allCategory.filter(element => {
        if (element.seoUrl == url) {
          this.tab = x
        }
        x++
      })
      this.dialog = false
    },
    closeDialog() {
      this.dialog = false
    }
  },
  computed: {
    ...mapGetters(["allProducts"]),
    ...mapGetters(["allCategory"]),
    ...mapGetters(["allSettings"]),
    isLoading() {
      if (this.isLoad) {
        return {
          display: "block"
        }
      } else {
        return {
          display: "none"
        }
      }
    },
  },
  created() {
    const app = document.createElement('div');
    app.setAttribute('data-app', true);
    document.body.append(app);
    this.isLoad = true
    this.$store.dispatch('initQr')
        .then(() => {
          this.isLoad = false
        })
  },
  metaInfo() {
    return {
      title: this.allSettings.title,
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          href: 'https://storage.cloud.google.com/noxus-up-file/' + this.allSettings.ico,
          type: "image/x-icon"
        }
      ],
      meta: [
        {charset: 'utf-8'},
        {name: 'http-equiv', content: 'IE=edge'},
        {name: 'viewport', content: 'width=device-width,initial-scale=1.0'},
        {name: 'description', content: this.allSettings.description},
        {name: 'keywords', content: this.allSettings.keywords},
      ]
    }
  },
}
</script>
<style scoped>
</style>

