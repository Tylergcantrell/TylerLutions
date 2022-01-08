<template>
    <div class="row">
        <div class="col-md-12">
            <button @click="$router.push('vlc')" class="btn btn-primary">Add Vehicle</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="veh in Vehs" :key="veh.key">
                        <td>{{ veh.name }}</td>
                        <td>{{ veh.notes }}</td>
                        <td>
                            <router-link :to="{name: 'vehEdit', params: { id: veh.key }}" class="btn btn-primary">Edit
                            </router-link>
                            <button @click.prevent="deleteVeh(veh.key)" class="btn btn-danger">Delete</button>
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
                Vehs: []
            }
        },
        created() {
            db.collection('vehs').orderBy('name').onSnapshot((snapshotChange) => {
                this.Vehs = [];
                snapshotChange.forEach((doc) => {
                    this.Vehs.push({
                        key: doc.id,
                        name: doc.data().name,
                        notes: doc.data().notes,
                        phone: doc.data().phone,
                        
                    })
                });
            })
        },
        methods: {
            deleteVeh(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("vehs").doc(id).delete().then(() => {
                    console.log("Vehicle deleted!");
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