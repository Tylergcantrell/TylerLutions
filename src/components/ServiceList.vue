<template>
    <div class="row">
        <div class="table">
            <button @click="$router.push('tv')" class="btn btn-primary">TV Display</button>
            <button @click="$router.push('mobile')" class="btn btn-primary">Mobile Display</button>
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date/Time</th>
                        <th>Body Location</th>
                        <th>Service Location</th>
                        <th>Cemetery</th>
                        <th>Vehicles</th>
                        <th>Director</th>
                        <th>Personnel</th>
                        <th>Casket</th>
                        <th>Cremation</th>
                        <th>Service Requirements</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody  v-for="service in Services" :key="service.key">
                    <tr class="no-border">
                        <td>{{ service.name }}</td>
                        <td>{{ new Date(service.date).toLocaleString([], {weekday: 'long'}) }}<br>
                        {{ new Date(service.date).toLocaleString([], {year: 'numeric', month: 'short', day: 'numeric'}) }}<br>
                        {{ new Date(service.date).toLocaleString([], {hour: '2-digit', minute: '2-digit'}) }}</td>
                        <td>{{ service.bl }}</td>
                        <td>{{ service.serviceLoc }}</td>
                        <td>{{ service.cem }}</td>
                        <td>{{ service.veh }}</td>
                        <td>{{service.dir}}</td>
                        <td>{{service.pers}}</td>
                        <td>{{service.casket}}</td>
                        <td>{{service.cremation}}</td>
                        <td v-html="service.sr"></td>
                        <td>
                            <router-link :to="{name: 'edit', params: { id: service.key }}" class="btn btn-primary">Edit
                            </router-link>
                             <br>
                             <br>
                            <button @click.prevent="deleteService(service.key)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    <tr class="borderBottom">
                        <td colspan=4><b>Service Notes:</b> {{ service.notes }}</td> 
                        <td colspan=4><b>Music Notes:</b> {{ service.music }}</td>
                        <td colspan=4><b>Cemetery Notes:</b> {{ service.cemnotes }}</td>
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
                Services: []
            }
        },
        created() {
            db.collection('services').orderBy('date').onSnapshot((snapshotChange) => {
                this.Services = [];
                snapshotChange.forEach((doc) => {
                    console.log("AAAAAAAAAAAAAAAA",doc.data().date, new Date())
                    if(doc.data().date >= new Date()) {
                    
                    this.Services.push({
                        key: doc.id,
                        name: doc.data().name,
                        notes: doc.data().notes,
                        date: doc.data().date,
                        serviceLoc: doc.data().serviceLoc,
                        cem: doc.data().cem,
                        veh: doc.data().veh,
                        dir: doc.data().dir,
                        pers: doc.data().pers,
                        bl: doc.data().bl,
                        sr: this.viewservicerequirements(doc.data().srs),
                        music: doc.data().music,
                        casket: doc.data().casket,
                        cemnotes: doc.data().cemnotes,
                        cremation: doc.data().cremation,
                    })
                    }
                });
                
            })
        },
        methods: {
            viewservicerequirements(srs) {
               console.log("AAAAAAAAAAAA", srs) 
               let reqs = JSON.parse(srs)
               let formatted = ""
               for(let i = 0; i < reqs.length; i++) {
                   if(reqs[i].done) {
                       formatted += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'
                   }
                   formatted += reqs[i].name
                   formatted += "<br>"
               }
               return formatted
            },
            deleteService(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("services").doc(id).delete().then(() => {
                    console.log("Service deleted!");
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
    table{
    table-layout: fixed;
    }

    td{
    word-wrap:break-word
    }
    tr.no-border td {
        border: 0px;
    }
    tr.borderBottom td {
        border-bottom: 2px solid black;
    }

</style>