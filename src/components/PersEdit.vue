<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Update</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="pers.name" required>
                </div>
                <br>
                <div class="form-group">
                    <label> Director:    .</label>
                    <input type="checkbox" class="form-check-input" :id="pers.name" v-on:click="addPers(pers.name, $event)" :checked="this.pers.director" >
                </div>
                <br>
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
                pers: {
                }
            }
        },
        methods: {
            addPers(theName, event) {
                if(event.target.checked) {
                    this.pers.director = true;
                }
                else {
                    this.pers.director = false;
                }
            },
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('perss').doc(this.$route.params.id)
                .update(this.pers).then(() => {
                    console.log("Updated!");
                    this.$router.push('/pl')
                }).catch((error) => {
                    console.log(error);
                });
            },
        },
        created() {
            let dbRef = db.collection('perss').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.pers = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        }
    }
</script>