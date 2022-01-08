<template>
    <div class="row">
        <div class="col-md-12">
            <button @click="$router.push('blc')" class="btn btn-primary">Add Body Location</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bl in Bls" :key="bl.key">
                        <td>{{ bl.name }}</td>
                        <td>{{ bl.notes }}</td>
                        <td>
                            <router-link :to="{name: 'BLEdit', params: { id: bl.key }}" class="btn btn-primary">Edit
                            </router-link>
                            <button @click.prevent="deleteBl(bl.key)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { db } from '../firebaseDb';
    
    export default {
        data() {
            return {
                Bls: []
            }
        },
        created() {
            db.collection('bls').orderBy('name').onSnapshot((snapshotChange) => {
                this.Bls = [];
                snapshotChange.forEach((doc) => {
                    this.Bls.push({
                        key: doc.id,
                        name: doc.data().name,
                        notes: doc.data().notes,
                    })
                });
            })
        },
        methods: {
            deleteBL(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("bls").doc(id).delete().then(() => {
                    console.log("Deleted!");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
            }
        }
    }
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>