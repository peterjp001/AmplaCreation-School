<script>
    import Navbar from "@/components/NavBar.vue";
    import Offcanvas from "@/components/OffCanvas.vue";
    import Titlebar from "@/components/TitleBar.vue";
    import ModalAddGrade from "@/components/ModalAddGrade.vue";
    
    export default {
      components: { Navbar, Offcanvas, Titlebar, ModalAddGrade },
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
            <Titlebar title="Classes" />
    
            <div class="card shadow mt-3 p-2">
              <div class="row row-cols-12 mt-2">
                <div class="col pb-2">
                  <ModalAddGrade />
                </div>
              </div>
            </div>
    
            <div class="row row-cols-12 mt-3">
              <div class="col pb-2">
                <div class="card shadow">
                  <div class="card-header acc-bg d-flex justify-content-between">
                    <span>Title</span>
                  </div>
                  <div class="card-body">
                    <table
                      id="example"
                      class="table table-striped nowrap"
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
    