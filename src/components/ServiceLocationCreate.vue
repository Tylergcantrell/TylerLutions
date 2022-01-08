<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Add Service Location</h3>
            <form @submit.prevent="onFormSubmit">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="serviceLoc.name" required>
                </div>

                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" v-model="serviceLoc.notes">
                </div>
                                
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" class="form-control" v-model="serviceLoc.phone">
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { db } from '../firebaseDb';

    export default {
        data() {
            return {
                serviceLoc: {
                }
            }
        },
        methods: {
            onFormSubmit(event) {
                if(this.serviceLoc.notes == null || this.serviceLoc.notes == "") {
                    this.serviceLoc.notes = "None Listed";
                }
                if(this.serviceLoc.phone == null || this.serviceLoc.phone == "") {
                    this.serviceLoc.phone = "None Listed";
                }
                event.preventDefault()
                db.collection('serviceLocs').add(this.serviceLoc).then(() => {
                    alert("Service Location Succesfully Added!");
                    this.serviceLoc.name = ''
                    this.serviceLoc.notes = ''
                    this.serviceLoc.phone = ''
                    
                }).catch((error) => {
                    console.log(error);
                });
                this.$router.push('/sl')
            }
        }
    }
</script>