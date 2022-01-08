<template>
    <div class="row">
        <div class="col-md-12">
            <button @click="$router.push('slc')" class="btn btn-primary">Add Service Location</button>
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
                    <tr v-for="serviceLoc in ServiceLocs" :key="serviceLoc.key">
                        <td>{{ serviceLoc.name }}</td>
                        <td>{{ serviceLoc.notes }}</td>
                        <td>{{ serviceLoc.phone }}</td>
                        <td>
                            <router-link :to="{name: 'serviceLocEdit', params: { id: serviceLoc.key }}" class="btn btn-primary">Edit
                            </router-link>
                            <button @click.prevent="deleteServiceLoc(serviceLoc.key)" class="btn btn-danger">Delete</button>
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
                ServiceLocs: []
            }
        },
        created() {
            db.collection('serviceLocs').orderBy('name').onSnapshot((snapshotChange) => {
                this.ServiceLocs = [];
                snapshotChange.forEach((doc) => {
                    this.ServiceLocs.push({
                        key: doc.id,
                        name: doc.data().name,
                        notes: doc.data().notes,
                        phone: doc.data().phone,
                        
                    })
                });
            })
        },
        methods: {
            deleteServiceLoc(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("serviceLocs").doc(id).delete().then(() => {
                    console.log("Service location deleted!");
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