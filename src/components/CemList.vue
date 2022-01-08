<template>
    <div class="row">
        <div class="col-md-12">
            <button @click="$router.push('cemCreate')" class="btn btn-primary">Add Cemetery Location</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cem in Cems" :key="cem.key">
                        <td>{{ cem.name }}</td>
                        <td>{{ cem.notes }}</td>
                        <td>{{ cem.phone }}</td>
                        <td>
                            <router-link :to="{name: 'cemEdit', params: { id: cem.key }}" class="btn btn-primary">Edit
                            </router-link>
                            <button @click.prevent="deleteCem(cem.key)" class="btn btn-danger">Delete</button>
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
                Cems: []
            }
        },
        created() {
            db.collection('cems').orderBy('name').onSnapshot((snapshotChange) => {
                this.Cems = [];
                snapshotChange.forEach((doc) => {
                    this.Cems.push({
                        key: doc.id,
                        name: doc.data().name,
                        notes: doc.data().notes,
                        phone: doc.data().phone,
                        
                    })
                });
            })
        },
        methods: {
            deleteCem(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("cems").doc(id).delete().then(() => {
                    console.log("Cemetery deleted!");
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