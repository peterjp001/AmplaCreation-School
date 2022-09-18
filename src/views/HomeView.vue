<script setup> 
import Navbar from '@/components/NavBar.vue';
import Offcanvas from '@/components/OffCanvas.vue';

</script>

<template>
  <div> 
    <Navbar/>
    <Offcanvas/> 
    <main class="mt-5 ">
          <div class="container-fluid">
              <div class="row shadow bg-danger">
                  <div class="col-md-12 bg-light fw-bold fs-5 p-1 px-3 d-flex justify-content-between  ">
                      <span>DASHBOARD</span>
                  </div>
              </div>
              
              <div class="row row-cols-1 row-cols-sm-2  row-cols-lg-4  pt-3">
                <div class="col" >
                  <a href="#" class="text-decoration-none">
                  <div class="card  mb-3 shadow "  >
                    <div class="card-body">
                      <div class="row acc-text">
                        <div class="col-sm-7 text-center "><h5>Title</h5>0</div>
                        <div class="col-sm-5 text-center"><i class="bi bi-list-ul" style="font-size: 50px;"></i></div>
                      </div>
                    </div>
                  </div>
                  </a>
                </div>
                <div class="col" >
                  <a href="#" class="text-decoration-none">
                  <div class="card  mb-3 shadow "  >
                    <div class="card-body">
                      <div class="row acc-text">
                        <div class="col-sm-7 text-center "><h5>Title</h5>0</div>
                        <div class="col-sm-5 text-center"><i class="bi bi-people" style="font-size: 50px;"></i></div>
                      </div>
                    </div>
                  </div>
                  </a>
                </div>
                <div class="col" >
                  <a href="#" class="text-decoration-none">
                  <div class="card  mb-3 shadow "  >
                    <div class="card-body">
                      <div class="row acc-text">
                        <div class="col-sm-7 text-center "><h5>Title</h5>0</div>
                        <div class="col-sm-5 text-center"><i class="bi bi-people" style="font-size: 50px;"></i></div>
                      </div>
                    </div>
                  </div>
                  </a>
                </div>
                <div class="col" >
                  <a href="#" class="text-decoration-none">
                  <div class="card  mb-3 shadow "  >
                    <div class="card-body">
                      <div class="row acc-text">
                        <div class="col-sm-7 text-center "><h5>Title</h5>0</div>
                        <div class="col-sm-5 text-center"><i class="bi bi-people" style="font-size: 50px;"></i></div>
                      </div>
                    </div>
                  </div>
                  </a>
                </div>
                
              </div>
              <div class="row row-cols-1 row-cols-sm-2">
                <div class="col pb-2">
                  <div class="card shadow">
                    <div class="card-header acc-bg d-flex justify-content-between">
                        <span>Title</span>
                        <span><a href="#" class="btn btn-sm text-light border"><i class="bi bi-arrow-right-circle"></i></a></span>
                    </div>
                    <div class="card-body">
                      <table id="example" class="table table-striped table-bordered nowrap" style="width:100%">
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
                      <span><a href="#" class="btn btn-sm text-light border"><i class="bi bi-arrow-right-circle"></i></a></span>
                  </div>
                    <div class="card-body">
                      <table id="example" class="table table-striped table-bordered nowrap" style="width:100%">
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
