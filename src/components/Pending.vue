<template>
    <br>
<h2 style="width: 75%; margin-left:auto;
margin-right:auto;"><button @click="$router.push('/')" class="btn btn-primary">Current Services</button></h2>
<h3 style="width: 75%; margin-left:auto;
margin-right:auto;"><input type='text' class="form-control" placeholder="Search in services" v-model="search"/></h3>
    <div class="card-columns" v-for="service in filteredSearch" :key="service.key">
    <div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h2 v-if="tempService.covid == true" class="modal-title covid">{{tempService.name}}</h2>
        <h2 v-if="tempService.covid != true" class="modal-title">{{tempService.name}}</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-header" style="padding:1px">
          <body><div>
    <div v-if="tempService.date != 'TBD'" class="card-body"><b>Date:</b> {{ new Date(tempService.date).toLocaleString([], {weekday: 'long'}) }}
                        {{ new Date(tempService.date).toLocaleString([], {year: 'numeric', month: 'short', day: 'numeric'}) }} at
                        {{ new Date(tempService.date).toLocaleString([], {hour: '2-digit', minute: '2-digit'}) }}</div>
    <div v-if="tempService.date == 'TBD'" class="card-body"><b>Date: </b> TBD</div>
    </div></body>
    </div>
      <div class="modal-body" style="padding: 1px">
    <div v-if="tempService.bl != null">
    <div class="card-body"><b>Body Location:</b> <br>{{tempService.bl}}</div>
    </div>
    <div v-if="tempService.serviceLoc != null">
    <div class="card-body" v-html="tempService.serviceLoc"></div>
    </div>
    <div v-if="tempService.cem != null">
    <div class="card-body" v-html="tempService.cem"></div>
    </div>
    <h5><b>&nbsp;&nbsp;&nbsp;Vehicles/Personnel:&nbsp;&nbsp;</b></h5>
    <div>
    <div class="card-body" v-html="tempService.veh"></div>
    </div>
    <div>
    <div class="card-body" v-html="tempService.pers"></div>
    </div>
    <div class="card-body" v-if="tempService.setUp != null && tempService.setUp != ''" v-html="tempService.setUp"></div>
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>


  <div class="card text-dark card bg-light" style="width: 75%; margin-left:auto;
margin-right:auto;">
    <div v-if="service.covid == true" class="card-header covid whitebg"><h2>{{service.name}}</h2></div>
    <div v-if="service.covid != true" class="card-header"><h2>{{service.name}}</h2></div>
    <div v-if="service.date != 'TBD'" class="card-body"><b>Date:</b> {{ new Date(service.date).toLocaleString([], {weekday: 'long'}) }}
                        {{ new Date(service.date).toLocaleString([], {year: 'numeric', month: 'short', day: 'numeric'}) }} at
                        {{ new Date(service.date).toLocaleString([], {hour: '2-digit', minute: '2-digit'}) }}</div>
    <div v-if="service.date == 'TBD'" class="card-body"><b>Date: </b> TBD</div>
    <div v-if="service.serviceLocCol != null">
    <div class="card-body"><b>Service Location:  </b>{{service.serviceLocCol}}</div>
    </div>
    <div v-if="service.bl != null">
    <div class="card-body"><b>Body Location:  </b>{{service.bl}}</div>
    </div>
    <div v-if="service.cemCol != null">
    <div class="card-body"><b>Cemetery:  </b>{{service.cemCol}} <svg v-if="service.contacted == true" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>
                        </div>
    </div>
    <div class="card-footer"><router-link :to="{name: 'theEdit', params: { id: service.key }}" class="btn btn-primary">Edit</router-link>
                            &nbsp;
                            <button @click.prevent="deleteService(service.key)" class="btn btn-danger">Delete</button></div>
                            <button @click.prevent="details(service.name)" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#myModal">More</button>
</div>
<br>
<br>
</div>
</template>

<script>
    import { db } from '../firebaseDb';
    
    export default {
        data() {
            return {
                Services: [],
                FullServices: [],
                tempService: "",
                ServiceLocs: [],
                search: "",
            }
        },
        computed: {
            filteredSearch:function() {
                return this.FullServices.filter((service) => {
                    var theService = service.name + service.serviceLocCol + service.cemCol;
                    return theService.toLowerCase().match(this.search.toLowerCase());
                })
            }
        },
        created() {
            db.collection('cems').onSnapshot((snapshotChange) => {
                this.Cems = [];
                snapshotChange.forEach((doc) => {
                    this.Cems.push({
                        key: doc.id,
                        name: doc.data().name,
                        phone: doc.data().phone,
                        address: doc.data().notes,
                    })
                });
            })
            db.collection('serviceLocs').onSnapshot((snapshotChange) => {
                this.ServiceLocs = [];
                snapshotChange.forEach((doc) => {
                    this.ServiceLocs.push({
                        key: doc.id,
                        name: doc.data().name,
                        phone: doc.data().phone,
                        address: doc.data().notes,
                    })
                });
            })
            db.collection('services').orderBy('date').onSnapshot((snapshotChange) => {
                this.Services = [];
                snapshotChange.forEach((doc) => {
                    if(doc.data().pending == true) {
                    this.FullServices.splice(0, 0, {
                        key: doc.id,
                        name: doc.data().name,
                        date: doc.data().date,
                        serviceLocCol: doc.data().serviceLoc,
                        cemCol: doc.data().cem,
                        serviceLoc: this.formatSL(doc.data().serviceLoc, doc.data().music, doc.data().notes, this.viewservicerequirements(doc.data().srs)),
                        cem: this.formatCL(doc.data().cem, doc.data().container, doc.data().casket, doc.data().cremation, doc.data().cemContacted, doc.data().containerDone),
                        veh: this.vehFormat(doc.data().veh, doc.data().limocount),
                        pers: this.persFormat(doc.data().pers, doc.data().dir),
                        setUp: this.setupPersFormat(doc.data().pers),
                        bl: doc.data().bl,
                        covid: doc.data().covid,
                        contacted: doc.data().cemContacted,
                    })
                    }
                });
            })
        },
        methods: {
            details(name) {
                this.tempService = this.FullServices.find(x => x.name === name);
                console.log(this.tempService);
            },
            formatSL(aName, music, cnotes, sr) {
                if(this.ServiceLocs.find(x => x.name === aName) != null || cnotes != null || music != null || sr != null) {
                    console.log(aName);
                    let sl = this.ServiceLocs.find(x => x.name === aName);
                    let formatted = "";
                    formatted += "<h5><b>Service:</b> </h5>";
                    if(this.ServiceLocs.find(x => x.name === aName) != null) {
                        sl.phone = sl.phone.replace(/-/g, "");
                        var address = sl.address.replace(/,/g, ' '); // get rid of commas
                        var url = address.replace(/ /g, '%20'); // convert address into approprite URI for google maps
                        formatted += "<body><b>Location: </b></body>"+sl.name;
                        if(sl.phone != 'None Listed') {
                        formatted += "<br><body><b>Phone: </b></body> "+"<a href=tel:"+sl.phone+">"+sl.phone.slice(0, 3)+"-"+sl.phone.slice(3, 6)+"-"+sl.phone.slice(6, 10)+"</a>"
                        }
                        if(sl.address != 'None Listed') {
                            formatted += "<br><body><b>Address: </b></body>"+'<a href="http://maps.google.com/maps?q=' + url + '" target="_blank">'+sl.address+'</a>'
                        }
                    }
                    if(sr != null) {
                        formatted += "<br>"+sr;
                    }
                    if(music != null) {
                        formatted += "<br>"+"<body><b>Music: </b></body>"+music;
                    }
                    if(cnotes != null) {
                        formatted += "<br>"+"<body><b>Notes: </b></body> "+cnotes;
                    }
                    return formatted;
                }
            },
            formatCL(aName, cnotes, casket, cremation, contacted, containerDone) {
                if(this.Cems.find(x => x.name === aName) != null || cnotes != null || casket != null || cremation != null) {
                    console.log(this.Cems);
                    console.log(aName);
                    let cl = this.Cems.find(x => x.name === aName);
                    console.log("SLL: ",cl)
                    let formatted = "";
                    formatted += "<h5><b>Cemetery:</b> </h5>";
                    if(this.Cems.find(x => x.name === aName) != null) {
                        cl.phone = cl.phone.replace(/-/g, "");
                        formatted += "<body><b>Name: </b></body>"+cl.name
                        if(contacted) {
                            formatted += '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'
                        }
                        var address = cl.address.replace(/,/g, ' '); // get rid of commas
                        var url = address.replace(/ /g, '%20'); // convert address into approprite URI for google maps
                        
                        if(cl.phone != 'None Listed') {
                        formatted += "<br><body><b>Phone: </b></body> "+"<a href=tel:"+cl.phone+">"+cl.phone.slice(0, 3)+"-"+cl.phone.slice(3, 6)+"-"+cl.phone.slice(6, 10)+"</a>"
                        }
                        if(cl.address != 'None Listed') {
                            formatted += "<br><body><b>Address: </b></body>"+'<a href="http://maps.google.com/maps?q=' + url + '" target="_blank">'+cl.address+'</a>'
                        }
                        
                    }
                    console.log("TEEEEEEEEEMP",this.tempService);
                    if(cnotes != null && cnotes != "") {
                        formatted += "<br>"+"<body><b>Container: </b></body> "+cnotes;
                        if(containerDone) {
                            formatted += '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'
                        }
                    }
                    if(casket != null && casket != "") {
                        formatted += "<br>"+"<body><b>Casket: </b></body> "+casket;
                    }
                    if(cremation != null && cremation != "") {
                        formatted += "<br>"+"<body><b>Cremation: </b></body> "+cremation;
                    }
                    return formatted;
                }
            },
            viewservicerequirements(srs) {
                if(srs != null && srs != "" && srs != "{}") {
                console.log(this.ServiceLocs);
               console.log("AAAAAAAAAAAA", srs) 
               let reqs = srs
               let formatted = ""
               formatted += "<b>Service Requirements:</b> <br>"
               for(let i = 0; i < reqs.length; i++) {
                   if(reqs[i].done) {
                       formatted += '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'
                   }
                   formatted += reqs[i].name
                   formatted += "<br>"
               }
               return formatted
                }
            },
            persFormat(people, director) {
                if(people != "" && people != null) {
                   let reqs = people
                   console.log("PERSSSSSSSS: ",reqs)
                   let formatted = ""
                   formatted += "<b>Personnel</b> <br>"
                   if(director != null && director != "") {
                   formatted += director+" (D) <br>"
                   }
                   for(let i = 0; i < reqs.length; i++) {
                       if(reqs[i].name != director) {
                           formatted += reqs[i].name
                           formatted += "<br> "
                       }
                       
                   }
                   return formatted
                }
                else {
                    return "<b>Personnel</b> <br> None"
                }
            },
            setupPersFormat(people) {
                if(people != "" && people != null) {
                   let reqs = people
                   console.log("PERSSSSSSSS: ",reqs)
                   let formatted = ""
                   formatted += "<b>Set Up Personnel</b> <br>"
                   for(let i = 0; i < reqs.length; i++) {
                       if(reqs[i].setup) {
                           formatted += reqs[i].name
                           formatted += "<br> "
                       }
                       
                   }
                   return formatted
                }
                else {
                    return "<b>Set Up Personnel</b> <br> None"
                }
            },
            vehFormat(vehs, lcount) {
                if(vehs != "None") {
                   let reqs = vehs.split(', ')
                   let formatted = ""
                   formatted += "<b>Vehicles: </b> <br>"
                   if(vehs.includes('Limo')) {
                   formatted += "Limo("+lcount +")<br>"
                   }
                   for(let i = 0; i < reqs.length; i++) {
                       if(reqs[i].trim() != 'Limo') {
                           formatted += reqs[i]
                           formatted += "<br> "
                       }
                       
                   }
                   return formatted
                }
                else {
                    return "<b>Vehicles: </b> <br> None"
                }
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
    .float-container {
    padding: 20px;
}

.float-child {
    float: left;
    padding: 10px;
}  
.covid {
    color: red;
}
</style>