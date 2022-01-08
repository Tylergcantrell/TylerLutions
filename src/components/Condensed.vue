<template>
    <div class="row" style="padding: 0px">
        <div class="table-responsive">
            <table class="table" style="font-size: 60%">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Day</th>
                        <th>Date/Time</th>
                        <th>Body Location</th>
                        <th>Service Location</th>
                        <th>Cemetery</th>
                        <th>Director</th>
                    </tr>
                </thead>
                <tbody  v-for="service in Services" :key="service.key">
                    <tr class="no-border">
                        <td v-if="service.covid == true" class="covid">{{ service.name }}</td>
                        <td v-if="service.covid != true">{{ service.name }}</td>
                        <td>{{ new Date(service.date).toLocaleString([], {weekday: 'long'}) }}</td>
                        <td>
                        {{ new Date(service.date).toLocaleString([], {year: 'numeric', month: 'short', day: 'numeric'}) }}<br>
                        {{ new Date(service.date).toLocaleString([], {hour: '2-digit', minute: '2-digit'}) }}</td>
                        <td>{{ service.bl }}</td>
                        <td>{{ service.serviceLoc }}</td>
                        <td>{{ service.cem }}</td>
                        <td>{{service.dir}}</td>
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
        mounted: function () {
        window.setInterval(() => {
            this.autorefresh()
        }, 300000)
        },
        created() {
            db.collection('services').orderBy('date').onSnapshot((snapshotChange) => {
                this.Services = [];
                snapshotChange.forEach((doc) => {
                    if(new Date(doc.data().date).getTime() >= new Date(new Date().setHours(0, 0, 0, 0)).getTime() && doc.data().pending !== true) {
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
                        covid: doc.data().covid,
                    })
                    }
                });
                
            })
        },
        methods: {
            autorefresh() {
                this.$router.go()
            },
            viewservicerequirements(srs) {
               console.log("AAAAAAAAAAAA", srs) 
               let reqs = srs
               let formatted = ""
               for(let i = 0; i < reqs.length; i++) {
                   if(reqs[i].done) {
                       formatted += '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'
                   }
                   formatted += reqs[i].name
                   formatted += ", "
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
        width: 75%;
    }
    table{
        width:1%;
    table-layout: fixed;
    }

    td{
    word-wrap:break-word
    }
    .no-border td {
        border: 0px;
    }
    .borderBottom td {
        border-bottom: 2px solid black;
    }
    .covid {
        color: red;
    }

</style>