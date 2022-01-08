<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Update</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="bl.name" required>
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <input type="text" class="form-control" v-model="bl.notes">
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
                bl: {
                },
            }
        },
        created() {
            let dbRef = db.collection('bls').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.bl = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('bls').doc(this.$route.params.id)
                .update(this.bl).then(() => {
                    console.log("Updated!");
                    this.$router.push('/bll')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>