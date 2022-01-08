<template>
    <div class="row" style="padding: 0px">
        <div>
            <table class="table table-sm" style="font-size: 50%">
                <thead>
                    <tr>
                        <th>Date/Time</th>
                        <th>Name</th>
                        <th>Body Location</th>
                        <th>Service Location</th>
                        <th>Cemetery</th>
                        <th>Casket</th>
                        <th>Cremation</th>
                    </tr>
                </thead>
                <tbody  v-for="service in Services" :key="service.key">
                    <tr class="borderBottom">
                        <td rowspan=4 colspan=1>
                            <b>{{ new Date(service.date).toLocaleString([], {weekday: 'long'}) }} <br>
                        {{ new Date(service.date).toLocaleString([], {year: 'numeric', month: 'short', day: 'numeric'}) }}<br>
                        {{ new Date(service.date).toLocaleString([], {hour: '2-digit', minute: '2-digit'}) }}</b></td>
                    </tr>
                    <tr class="borderSmall">
                        <td v-if="service.covid == true" class="covid"><b>{{ service.name }}</b></td>
                        <td v-if="service.covid != true"><b>{{ service.name }}</b></td>
                        <td>{{ service.bl }}</td>
                        <td>{{ service.serviceLoc }}</td>
                        <td>{{ service.cem }}</td>
                        <td>{{service.casket}}</td>
                        <td>{{service.cremation}}</td>
                    </tr>
                    <tr class="borderSmall">
                        <td colspan=3 v-html="service.sr"></td> 
                        <td colspan=2 v-html="service.veh"></td>
                        <td colspan=2 v-html="service.pers"></td>
                    </tr>
                    <tr class="borderBottom">
                        <td colspan=3><b>Service Notes:</b> {{ service.notes }}</td> 
                        <td colspan=2><b>Music Notes:</b> {{ service.music }}</td>
                        <td colspan=1><b>Cemetery Notes:</b> {{ service.cemnotes }}</td>
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
                Services: [],
                timer: ''
            }
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
                        veh: this.vehFormat(doc.data().veh),
                        pers: this.persFormat(doc.data().pers, doc.data().dir),
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
        mounted: function () {
        window.setInterval(() => {
            this.autorefresh()
        }, 300000)
        },
        methods: {
            autorefresh() {
                this.$router.go()
            },
            vehFormat(vehicle) {
                return "<b>Vehicles: </b>"+vehicle+""
            },
            persFormat(people, director) {
                if(people != "" && people != null) {
                   let reqs = people
                   console.log("PERSSSSSSSS: ",reqs)
                   let formatted = ""
                   formatted += "<b>Personnel</b> <br>"
                   if(director != null && director != "") {
                   formatted += director+" (D), "
                   }
                   for(let i = 0; i < reqs.length; i++) {
                       if(reqs[i].name != director) {
                           formatted += reqs[i].name
                           if(i+1 < reqs.length) {
                            formatted += ", "
                           }
                       }
                       
                   }
                   return formatted
                }
                else {
                    return "<b>Personnel</b> <br> None"
                }
            },
            viewservicerequirements(srs) {
               console.log("AAAAAAAAAAAA", srs) 
               let reqs = srs
               let formatted = ""
               formatted += "<b>Service Requirements: </b>"
               for(let i = 0; i < reqs.length; i++) {
                   if(reqs[i].done) {
                       formatted += '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'
                   }
                   formatted += reqs[i].name
                   if(i+1 < reqs.length) {
                            formatted += ", "
                           }
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
    table{
    /*table-layout: fixed;*/
    }
    td{
    word-wrap:break-word;
    }
    .no-border td {
        border: 0px;
    }
    .borderBottom td {
        border-bottom: 2px solid black;
    }
    .borderSmall td {
        border-bottom: 1px solid gray;
    }
    .covid {
        color: red;
    }

</style>