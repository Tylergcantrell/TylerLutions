<template>
    <div class="row">
        <div class="col-md-12">
            <button @click="$router.push('plc')" class="btn btn-primary">Add Personnel</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Director</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pers in Perss" :key="pers.key">
                        <td>{{ pers.name }}</td>
                        <td v-html="pers.director"></td>
                        <td>
                            <router-link :to="{name: 'persEdit', params: { id: pers.key }}" class="btn btn-primary">Edit
                            </router-link>
                            <button @click.prevent="deletePers(pers.key)" class="btn btn-danger">Delete</button>
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
                Perss: []
            }
        },
        created() {
            db.collection('perss').orderBy('name').onSnapshot((snapshotChange) => {
                this.Perss = [];
                snapshotChange.forEach((doc) => {
                    this.Perss.push({
                        key: doc.id,
                        name: doc.data().name,
                        director: this.format(doc.data().director),
                        
                    })
                });
            })
        },
        methods: {
            format(dir) {
                let formatted = ""
                if(dir) {
                    formatted = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'
                }
                return formatted
            },
            deletePers(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("perss").doc(id).delete().then(() => {
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