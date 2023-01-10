<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header card-header-primary card-header-icon">
                        <h4 class="card-title">
                            تعديل منتج
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
                                    <div class="col-md-12 d-flex justify-content-end" v-if="!loading">
                                        <div class="modal-body">
                                            <Form class="row g-3" @submit="submitForm">
                                                <div class="col-auto">
                                                    <select class="form-control" v-model="singleItem.warehouse" required>
                                                        <option disabled selected value="">اختيار المستودع</option>
                                                        <option v-for="row in warehouses" :value="row.name">
                                                            {{row.name}}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="col-auto">
                                                    <Field type="text" :rules="validateCatygory" name="catygory" class="form-control" v-model="singleItem.catygory" placeholder="اسم الصنف"/>
                                                    <ErrorMessage name="catygory" />
                                                </div>
                                                <div class="col-auto">
                                                    <Field type="text" :rules="validateUnit" name="unit" class="form-control" v-model="singleItem.unit" placeholder="الوحدة"/>
                                                    <ErrorMessage name="unit" />
                                                </div>
                                                <div class="col-auto">
                                                    <Field type="number" :rules="validateQuantity" name="quantity" class="form-control" v-model="singleItem.quantity" placeholder="الكمية"/>
                                                    <ErrorMessage name="quantity" />
                                                </div>
                                                <div class="col-auto">
                                                    <Field type="date" :rules="validateExpiryDate" name="expiry_date" class="form-control" v-model="singleItem.expiry_date" placeholder="تاريخ الصلاحية"/>
                                                    <ErrorMessage name="expiry_date" />
                                                </div>
                                                <div class="col-md-12">
                                                    <textarea class="form-control" v-model="singleItem.note" placeholder="ملاحظات"></textarea>
                                                </div>
                                                <div class="col-auto">
                                                    <button type="submit" class="btn btn-primary mb-3">إضافة</button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
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
  import { Form, Field, ErrorMessage } from 'vee-validate';

  export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
      return {
        
      }
    },
    created(){
        this.fetchItemProduct(this.$route.params.id);
        this.fetchIndexData();
    },
    beforeDestroy() {
      this.resetState()
    },
    computed: {
      ...mapGetters('ProductsIndex', ['warehouses', 'singleItem','loading']),
    },
    methods: {
      ...mapActions('ProductsIndex', ['fetchIndexData','fetchItemProduct','updateProducts','resetState']),
      submitForm() {
            var id = this.$route.params.id;
            this.singleItem.id = id;
            this.updateProducts(this.singleItem).then(() => {
                this.$router.push({ name: 'ProductsIndex' })
            }).catch((error) => {
                console.error(error)
            })
        },
        validateCatygory(value) {
            if (!value) {
                return 'This field is required';
            }
            return true;
        },
        validateUnit(value) {
            if (!value) {
                return 'This field is required';
            }
            return true;
        },
        validateExpiryDate(value) {
            if (!value) {
                return 'This field is required';
            }
            var ToDate = new Date().toISOString().slice(0,10);
            if (new Date(value).toISOString().slice(0,10) <= ToDate) {
                return "The Date must be Bigger or Equal to today date";
            }

            return true;
        },
        validateQuantity(value) {
            if (!value) {
                return 'This field is required';
            }
            return true;
        },
    }
  }
  </script>