<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Update</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="sr.name" required>
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <input type="text" class="form-control" v-model="sr.notes">
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
                sr: {
                    name: '',
                    notes: '',
                    done: false,
                },
            }
        },
        created() {
            let dbRef = db.collection('srs').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.sr = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('srs').doc(this.$route.params.id)
                .update(this.sr).then(() => {
                    console.log("Updated!");
                    this.$router.push('/srl')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>