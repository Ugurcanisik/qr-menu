<template>
  <div>
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
          <div>
            <h2 class="text-white pb-2 fw-bold">Ürün İşlemleri</h2>
          </div>
        </div>
      </div>
    </div>
    <ProductList></ProductList>
    <ProductUpdate></ProductUpdate>
    <ProductsUpdatePicture></ProductsUpdatePicture>
  </div>
</template>
<script>
import ProductList from "./ProductsList";
import ProductUpdate from "./ProductsUpdate";
import ProductsUpdatePicture from "./ProductsUpdatePicture";

export default {
  components: {
    ProductList,
    ProductUpdate,
    ProductsUpdatePicture
  },
  mounted() {
    if (this.$route.path === '/products') {
      this.$store.dispatch('loading', false)
    }
  }
}
</script>

