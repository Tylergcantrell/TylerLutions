<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Add Personnel</h3>
            <form @submit.prevent="onFormSubmit">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="pers.name" required>
                </div>
                <br>
                <div class="form-group">
                    <label> Director: </label>
                    <br>
                    <input type="checkbox" class="form-check-input" :id="pers.name" v-on:click="addPers(pers.name, $event)">
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
                    setup: false,
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
            onFormSubmit(event) {
                event.preventDefault()
                db.collection('perss').add(this.pers).then(() => {
                    alert("Added!");
                    this.pers.name = ''
                    this.pers.director = false
                    this.pers.setup = false
                    
                }).catch((error) => {
                    console.log(error);
                });
                this.$router.push('/pl')
            }
        }
    }
</script>