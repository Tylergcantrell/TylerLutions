<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Update</h3>
            <form @submit.prevent="onUpdateForm">
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
                },
            }
        },
        created() {
            let dbRef = db.collection('serviceLocs').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.serviceLoc = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                if(this.serviceLoc.notes == null) {
                    this.serviceLoc.notes = "None Listed";
                }
                if(this.serviceLoc.phone == null) {
                    this.serviceLoc.phone = "None Listed";
                }
                event.preventDefault()
                db.collection('serviceLocs').doc(this.$route.params.id)
                .update(this.serviceLoc).then(() => {
                    console.log("Service Location successfully updated!");
                    this.$router.push('/sl')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>