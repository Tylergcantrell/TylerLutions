<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Add Vehicle</h3>
            <form @submit.prevent="onFormSubmit">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="veh.name" required>
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <textarea name="text" rows="3" cols="10" wrap="soft" class="form-control" v-model="veh.notes"> </textarea>
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
                veh: {
                }
            }
        },
        methods: {
            onFormSubmit(event) {
                event.preventDefault()
                db.collection('vehs').add(this.veh).then(() => {
                    alert("Added!");
                    this.veh.name = ''
                    this.veh.notes = ''
                    
                }).catch((error) => {
                    console.log(error);
                });
                this.$router.push('/vl')
            }
        }
    }
</script>