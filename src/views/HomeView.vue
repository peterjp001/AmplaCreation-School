<script>
import Navbar from "@/components/NavBar.vue";
import Offcanvas from "@/components/OffCanvas.vue";
import Titlebar from "@/components/TitleBar.vue";
import CardDashboard from "@/components/CardDashboard.vue";
import ChartComponent from "../components/ChartComponent.vue";

export default {
  components: { Navbar, Offcanvas, Titlebar, CardDashboard, ChartComponent },
  data() {
    return {};
  },
  computed: {
    getCData() {
      return this.$store.getters.getCardData;
    },
  },
};
</script>

<template>
  <div>
    <Navbar />

    <Offcanvas />

    <main class="mt-5">
      <div class="container-fluid">
        <Titlebar title="Dashboard" />

        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 pt-3">
          <div class="col" v-for="item in this.getCData" :key="item.index">
            <CardDashboard :cardData="item" />
          </div>
        </div>

        <div class="row row-cols-1 row-cols-sm-2">
          <div class="col pb-2">
            <div class="card shadow">
              <div class="card-body">
                <ChartComponent :idChart="'firstChart'" typeChart="line" title="Eleves" />
              </div>
            </div>
          </div>
          <div class="col pb-2">
            <div class="card shadow">
              <div class="card-body">
                <ChartComponent
                  :idChart="'secondChart'"
                  typeChart="bar"
                  title="Employees"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-sm-2">
          <div class="col pb-2">
            <div class="card shadow">
              <div class="card-header acc-bg d-flex justify-content-between">
                <span>Title</span>
                <span>
                  <a href="#" class="btn btn-sm text-light border">
                    <i class="bi bi-arrow-right-circle"></i>
                  </a>
                </span>
              </div>
              <div class="card-body">
                <table
                  id="example"
                  class="table table-striped table-bordered nowrap"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>Position</th>
                      <th>Office</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tiger</td>
                      <td>Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col pb-2">
            <div class="card shadow">
              <div class="card-header acc-bg d-flex justify-content-between">
                <span>Title</span>
                <span
                  ><a href="#" class="btn btn-sm text-light border"
                    ><i class="bi bi-arrow-right-circle"></i></a
                ></span>
              </div>
              <div class="card-body">
                <table
                  id="example"
                  class="table table-striped table-bordered nowrap"
                  style="width: 100%"
                >
                  <thead>
                    <tr>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>Position</th>
                      <th>Office</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tiger</td>
                      <td>Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
