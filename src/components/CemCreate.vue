<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Add Cemetery Location</h3>
            <form @submit.prevent="onFormSubmit">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="cem.name" required>
                </div>

                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control" v-model="cem.notes">
                </div>
                                
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" class="form-control" v-model="cem.phone">
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
                cem: {
                }
            }
        },
        methods: {
            onFormSubmit(event) {
                if(this.cem.notes == null || this.cem.notes == "") {
                    this.cem.notes = "None Listed";
                }
                if(this.cem.phone == null || this.cem.phone == "") {
                    this.cem.phone = "None Listed";
                }
                event.preventDefault()
                db.collection('cems').add(this.cem).then(() => {
                    alert("Cemetery Succesfully Added!");
                    this.cem.name = ''
                    this.cem.notes = ''
                    this.cem.phone = ''
                    
                }).catch((error) => {
                    console.log(error);
                });
                this.$router.push('/cl')
            }
        }
    }
</script>