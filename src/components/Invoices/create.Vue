<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header card-header-primary card-header-icon">
                        <h4 class="card-title">
                            إضافة فاتورة
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
                                        <div class="modal-body">
                                            <Form class="row g-3" @submit="submitForm">
                                                <div class="col-auto">
                                                    <Field :rules="validateSupplier" name="supplier" type="text" class="form-control" v-model="item.supplier" placeholder="المورد"/>
                                                    <ErrorMessage name="supplier" />
                                                </div>
                                                <div class="col-auto">
                                                    <Field type="text" :rules="validateSupplierName" name="supplier_name" class="form-control" v-model="item.supplier_name" placeholder="اسم المورد"/>
                                                    <ErrorMessage name="supplier_name" />
                                                </div>
                                                <div class="col-auto">
                                                    <input type="date" :rules="validateInvoiceDate" name="invoice_date" class="form-control" v-model="item.invoice_date" placeholder="تاريخ الفاتورة"/>
                                                    <ErrorMessage name="invoice_date" />
                                                </div>
                                                <div class="col-auto">
                                                    <input type="text" readonly class="form-control" v-model="item.invoice_number" placeholder="رقم الفاتورة">
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
        item: {
            supplier: null,
            supplier_name: null,
            invoice_number: 0,
            invoice_date: new Date().toISOString().slice(0,10),
        },
      }
    },
    created(){
      this.getserialNumber().then(() => {
        this.item.invoice_number = this.serialNumber;
      })
    },
    beforeDestroy() {
      //this.resetState()
    },
    computed: {
      ...mapGetters('InvoicesIndex', ['serialNumber','loading'])
    },
    methods: {
      ...mapActions('InvoicesIndex', ['getserialNumber','createInvoces']),
      submitForm() {
            this.createInvoces(this.item)
                .then(() => {
                    this.$router.push({ name: 'InvoicesIndex' })
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        validateSupplier(value) {
            // if the field is empty
            if (!value) {
                return 'This field is required';
            }
            // All is good
            return true;
        },
        validateSupplierName(value) {
            // if the field is empty
            if (!value) {
                return 'This field is required';
            }
            // All is good
            return true;
        },
        validateInvoiceDate(value) {
            // if the field is empty
            if (!value) {
                return 'This field is required';
            }
            // All is good
            return true;
        },
    }
  }
  </script>