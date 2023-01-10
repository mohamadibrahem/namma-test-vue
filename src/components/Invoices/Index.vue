<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-primary card-header-icon">
              <h4 class="card-title">
                إذون الإضافة
              </h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="table-overlay" v-show="loading">
                    <div class="table-overlay-container">
                      <material-spinner></material-spinner>
                      <span>Loading...</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 d-flex justify-content-end">
                      <button type="button" class="btn btn-danger" @click="fetchIndexData" :disabled="loading" :class="{ disabled: loading }">
                        <i class="material-icons" :class="{ 'fa-spin': loading }"></i> <i class="bi bi-arrow-clockwise"></i>
                      </button>
                      <button class="btn btn-danger mx-2" data-bs-target="#myModal" data-bs-toggle="modal"><i class="bi bi-funnel"></i></button>
                      <div class="modal" id="myModal">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">تنفيذ الفلتر</h5>
                            </div>
                            <div class="modal-body" @submit.prevent="filterInvoces(filter)">
                              <form class="row g-3">
                                <div class="col-auto">
                                  <input type="date" class="form-control" v-model="filter.invoice_date" placeholder="تاريخ الفاتورة">
                                </div>
                                <div class="col-auto">
                                  <input type="text" class="form-control" v-model="filter.invoice_number" placeholder="رقم الفاتورة">
                                </div>
                                <div class="col-auto">
                                  <button type="submit" class="btn btn-primary mb-3" data-bs-dismiss="modal">تنفيذ</button>
                                </div>
                              </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <router-link class="btn btn-outline-danger mx-2" :to="{ name: 'InvoicesCreate' }"> إضافة جديد <i class="bi bi-plus-circle"></i></router-link>
                      <router-link class="btn btn-outline-danger mx-2" :to="{ name: 'ProductsIndex' }"> المنتجات </router-link>
                    </div>
                    
                  </div>
                      
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">المورد</th>
                        <th scope="col">اسم المورد</th>
                        <th scope="col">رقم الفاتورة</th>
                        <th scope="col">تاريخ الفاتورة</th>
                        <th scope="col">الإعدادات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in data" :key="index">
                        <td>{{ item.supplier }}</td>
                        <td>{{ item.supplier_name }}</td>
                        <td>{{ item.invoice_number }}</td>
                        <td>{{ item.invoice_date }}</td>
                        <td><i class="bi bi-pencil-square"></i></td>
                      </tr>
                    </tbody>
                  </table>
                  <div><h1></h1><hr></div>
                  <div>total: {{ total }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { mapGetters, mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        filter: {
          invoice_date: null,
          invoice_number: null
        }
      }
    },
    created(){
      this.fetchIndexData()
    },
    beforeDestroy() {
      this.resetState()
    },
    computed: {
      ...mapGetters('InvoicesIndex', ['data', 'total', 'loading'])
    },
    methods: {
      ...mapActions('InvoicesIndex', ['fetchIndexData', 'filterInvoces', 'setQuery', 'resetState'])
    }
  }
  </script>