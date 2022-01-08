<template>
    <div class="row">
        <div class="col-md-12">
            <button @click="$router.push('src')" class="btn btn-primary">Add Service Requirement</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sr in Srs" :key="sr.key">
                        <td>{{ sr.name }}</td>
                        <td>{{ sr.notes }}</td>
                        <td>
                            <router-link :to="{name: 'SREdit', params: { id: sr.key }}" class="btn btn-primary">Edit
                            </router-link>
                            <button @click.prevent="deleteSr(sr.key)" class="btn btn-danger">Delete</button>
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
                Srs: []
            }
        },
        created() {
            db.collection('srs').orderBy('name').onSnapshot((snapshotChange) => {
                this.Srs = [];
                snapshotChange.forEach((doc) => {
                    this.Srs.push({
                        key: doc.id,
                        name: doc.data().name,
                        notes: doc.data().notes,
                    })
                });
            })
        },
        methods: {
            deleteSr(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("srs").doc(id).delete().then(() => {
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