<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-primary card-header-icon">
              <h4 class="card-title">
                المستودعات
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
                      <router-link class="btn btn-outline-danger mx-2" :to="{ name: 'ProductsCreate' }"> إضافة جديد <i class="bi bi-plus-circle"></i></router-link>
                      <router-link class="btn btn-outline-danger mx-2" :to="{ name: 'InvoicesIndex' }"> الفواتير </router-link>

                    </div>
                    
                  </div>
                      
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">المخزن</th>
                        <th scope="col">اسم الصنف</th>
                        <th scope="col">الوحدة</th>
                        <th scope="col">الكمية</th>
                        <th scope="col">تاريخ الصلاحية</th>
                        <th scope="col">ملاحظات</th>
                        <th scope="col">الإعدادات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in data" :key="index">
                        <td>{{ item.warehouse }}</td>
                        <td>{{ item.catygory }}</td>
                        <td>{{ item.unit }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.expiry_date }}</td>
                        <td>{{ item.note }}</td>
                        <td>
                          <button class="btn btn-outline-info mx-2" v-bind:item="item" @click="updateItem(index)"><i class="bi bi-pencil-square"></i>
                          </button>
                          <button class="btn btn-outline-danger mx-2" @click="deleteItem(index)"><i class="bi bi-trash"></i>
                          </button>
                        </td>
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
      }
    },
    created(){
      this.fetchIndexData()
    },
    beforeDestroy() {
      this.resetState()
    },
    computed: {
      ...mapGetters('ProductsIndex', ['data', 'total', 'loading'])
    },
    methods: {
      ...mapActions('ProductsIndex', ['fetchIndexData', 'deleteItemProduct', 'resetState']),
      deleteItem(index){
        this.deleteItemProduct(index).then(() => {
              this.fetchIndexData()
          })
          .catch((error) => {
              console.error(error)
          })
      },
      updateItem(index){
        console.log(index);
        this.$router.push({ name: 'ProductsUpdate', params:{id: index}});

      }
    }
  }
  </script>