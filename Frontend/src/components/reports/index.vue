<template>
  <div>
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
          <div>
            <h2 class="text-white pb-2 fw-bold">Rapor İşlemleri</h2>
          </div>
        </div>
      </div>
    </div>
    <reportsList></reportsList>
  </div>
</template>
<script>
import reportsList from "./ReportsList";

export default {
  components: {
    reportsList,
  },
}
</script>

