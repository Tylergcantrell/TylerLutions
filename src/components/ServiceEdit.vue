<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h1 class="text-center">Update</h1>
                <form @submit.prevent="onUpdateForm" style="padding: 30px">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="service.name" required>
                               <label style="color: red"><b>COVID: </b></label>&nbsp;&nbsp;<input class="form-check-input" type="checkbox" :id="1234" v-model="service.covid"><br><br>
                                <label style="color: black"><b>Pending: </b></label>&nbsp;&nbsp;<input class="form-check-input" type="checkbox" :id="1234" v-model="service.pending">
                            </div>
                            <br>
                            <div class="form-group">
                                <label>Date/Time</label>
                                <input type="datetime-local" class="form-control" v-model="service.date">
                            </div>
                            <br>
                            <label>Body Location:</label>
                            <br>
                            <select class=form-control v-model="service.bl">
                                <option v-for="(bl, id) in BLs" :key="id" :value="bl.name">{{bl.name}}</option>
                            </select>
                            <br>
                            <div class="theService">
                            <h3><b>Service</b></h3>
                            <label>Service Location:</label>
                            <br>
                            <select class=form-control v-model="service.serviceLoc">
                                <option v-for="(serviceLoc, id) in ServiceLocs" :key="id" :value="serviceLoc.name">{{serviceLoc.name}}</option>
                            </select>
                            <br>
                            <label><b>Service Requirements:</b></label>
                            <table class="table">
                                <thead><td></td><td></td></thead>
                                 <tr v-for="(sr, id) in Srs" :key="id">
                                     <td v-if="sr.name != 'None'"><input class="form-check-input" type="checkbox" :id="sr.name" v-on:click="addSR(sr, $event)" :checked="this.checkedSR.find(x => x.name === sr.name)"></td>
                                     <td><input v-if="this.checkedSR.find(x => x.name === sr.name) && sr.name != 'None'" class="form-check-input" type="checkbox" :name="sr.done" :id="sr.done" v-on:click="checkSR(sr, $event)" :checked="this.checkedSR.find(x => x.name === sr.name).done"></td>
                                     <td v-if="sr.name != 'None'"><label :for="sr.name">{{ sr.name }}</label></td>
                                </tr>
                            </table>
                            <div class="form-group">
                                <label>Music Notes</label>
                                <textarea name="text" rows="3" cols="10" wrap="soft" class="form-control" v-model="service.music"> </textarea>
                             </div>
                             <div class="form-group">
                                <label>Other Service Notes</label>
                                <textarea name="text" rows="3" cols="10" wrap="soft" class="form-control" v-model="service.notes"> </textarea>
                            </div>
                             </div>
                             <br>
                             <div class="theCem">
                            <h3><b>Cemetery</b></h3>
                            <label>Cemetery Location: &nbsp;&nbsp; Contacted: &nbsp;<input class="form-check-input" type="checkbox" :id="1234" v-model="service.cemContacted"></label>
                            <br>
                            <select class=form-control v-model="service.cem">
                                <option v-for="(cem, id) in Cems" :key="id" :value="cem.name">{{cem.name}}</option>
                            </select>
                            <div class="form-group">
                                <br>
                                <label>Container &nbsp;&nbsp; Done: &nbsp;<input class="form-check-input" type="checkbox" :id="1234" v-model="service.containerDone"></label>
                                <input type="text" class="form-control" v-model="service.container">
                            </div>
                            <div class="form-group">
                                <label>Casket</label>
                                <input type="text" class="form-control" v-model="service.casket">
                            </div>
                            <div class="form-group">
                                <label>Cremation</label>
                                <input type="text" class="form-control" v-model="service.cremation">
                            </div>
                            </div>
                            <br>
                            <div>
                            <h3><b>Vehicles/Personnel</b></h3>
                            <label>Director:</label>
                            <br>
                            <select class=form-control v-model="service.dir">
                                <option v-for="(pers, id) in Perss" :key="id" :value="pers.name">{{pers.name}}</option>
                            </select>
                             </div>
                            <br>
                            <table style="width: 100%">
                                <tr>
                                    <td valign=top>
                                        <label><b>Select Vehicles:</b></label>
                                        <table class="table" style="width: 50%">
                                            <thead><td></td><td></td></thead>
                                            <tr v-for="(veh, id) in Vehs" :key="id">
                                              <td v-if="veh.name != 'Limo'"><input class="form-check-input" type="checkbox" :id="veh.name" v-on:click="addVeh(veh.name, $event)" :checked="this.service.veh.includes(veh.name)"></td>
                                              <td v-if="veh.name != 'Limo'"><label :for="veh.name">{{ veh.name }}</label></td>
                                              <td v-if="veh.name == 'Limo'"><input class="form-check-input" type="checkbox" :id="veh.name" v-on:click="addVeh(veh.name, $event)" :checked="this.service.veh.includes(veh.name)"></td>
                                              <td style="white-space: nowrap" v-if="veh.name == 'Limo'"><label :for="veh.name">{{ veh.name }}</label></td>
                                              <td v-if="veh.name == 'Limo'"><label>Number Needed: <input type="text" class="form-control" placeholder="1" v-model="service.limocount"></label></td>
                                             </tr>
                                        </table>
                                    </td>
                                    <td valign=top>
                                    <label><b>Select Personnel:</b></label>
                                    <table class="table" style="width: 50%">
                                        <thead><td>Select</td><td></td><td>Setup</td></thead>
                                         <tr v-for="(pers, id) in Perss" :key="id">
                                             <td><input class="form-check-input" type="checkbox" :id="pers.name" v-on:click="addPers(pers, $event)" :checked="this.checkedPers.find(x => x.name === pers.name)"></td>
                                             <td v-if="pers.name != 'None'"><label :for="pers.name">{{ pers.name }}</label></td>
                                             <td><input v-if="this.checkedPers.find(x => x.name === pers.name) && pers.name != 'None'" class="form-check-input" type="checkbox" :name="pers.setup" :id="pers.setup" v-on:click="checkPers(pers, $event)" :checked="this.checkedPers.find(x => x.name === pers.name).setup"></td>
                                             
                                        </tr>
                                    </table>
                                     </td>
                                </tr>
                            </table>
        
                        
                             <br>
                             <br>
                            <div class="form-group" align=center>
                                <button class="btn btn-primary btn-block">Save Service</button>
                            </div>
                            <br>
                        </form>
                        </div>
                        </div>
</template>

<script>
    import { db } from '../firebaseDb';

    export default {
        data() {
            return {
                checkedVehs: [],
                checkedPers: [],
                checkedSR: [],
                service: {
                },
                ServiceLocs: [],
                Cems: [],
                Vehs: [],
                Perss: [],
                BLs: [],
                Srs: [{}],
                x_count: 0,
            }
        },
        created() {
            let dbRef = db.collection('services').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.service = doc.data();
                this.checkedSR = doc.data().srs;
                this.checkedVehs = this.service.veh.split(",");
                this.checkedPers = doc.data().pers;
                console.log("CSRRRRR: ", this.checkedSR)
            }).catch((error) => {
                console.log(error)
            })
            db.collection('serviceLocs').orderBy('name').onSnapshot((snapshotChange) => {
                this.ServiceLocs = [];
                snapshotChange.forEach((doc) => {
                    this.ServiceLocs.push({
                        key: doc.id,
                        name: doc.data().name,
                    })
                });
            })
            db.collection('vehs').orderBy('name').onSnapshot((snapshotChange) => {
                this.Vehs = [];
                snapshotChange.forEach((doc) => {
                    this.Vehs.push({
                        key: doc.id,
                        name: doc.data().name,
                    })
                });
            })
            db.collection('cems').orderBy('name').onSnapshot((snapshotChange) => {
                this.Cems = [];
                snapshotChange.forEach((doc) => {
                    this.Cems.push({
                        key: doc.id,
                        name: doc.data().name,
                    })
                });
            })
            db.collection('perss').orderBy('name').onSnapshot((snapshotChange) => {
                this.Perss = [];
                snapshotChange.forEach((doc) => {
                    this.Perss.push({
                        key: doc.id,
                        name: doc.data().name,
                        setup: doc.data().setup
                    })
                });
            })
            db.collection('bls').orderBy('name').onSnapshot((snapshotChange) => {
                this.BLs = [];
                snapshotChange.forEach((doc) => {
                    this.BLs.push({
                        key: doc.id,
                        name: doc.data().name,
                    })
                });
            })
            db.collection('srs').orderBy('name').onSnapshot((snapshotChange) => {
                this.Srs = [];
                snapshotChange.forEach((doc) => {
                    this.Srs.push({
                        name: doc.data().name,
                        done: doc.data().done,
                    })
                });
            })
        },
        methods: {
            addVeh(theName, event) {
                if(this.checkedVehs == "") {
                    this.checkedVehs = this.service.veh.split(",");
                }
                if(this.checkedVehs.find(element => element === "None") != null) {
                    this.checkedVehs.splice(this.checkedVehs.indexOf('None'), 1)
                 }
                var index = this.checkedVehs.indexOf(theName);
                if(event.target.checked) {
                    this.checkedVehs.push(theName);
                }
                else {
                    this.checkedVehs.splice(index, 1)
                }
                console.log("Veh: "+this.checkedVehs);
            },
            
            addPers(pers, event) {
                if(this.checkedPers.find(element => element === "None") != null) {
                    this.checkedPers.splice(this.checkedPers.indexOf('None'), 1)
                 }
                console.log("CSR: ",this.checkedPers)
                var index = this.checkedPers.map((el) => el.name).indexOf(pers.name);
                if(event.target.checked) {
                    let entry = { name: pers.name, setup: false };
                    this.checkedPers.push(entry);
                }
                else {
                    this.checkedPers.splice(index, 1)
                }
            },
            checkPers(pers, event) {
                var index = this.checkedPers.map((el) => el.name).indexOf(pers.name);
                console.log(index)
                if(event.target.checked) {
                    this.checkedPers.splice(index, 1)
                    let entry = { name: pers.name, setup: true };
                    this.checkedPers.push(entry);
                }
                else {
                    this.checkedPers.splice(index, 1)
                     let entry = { name: pers.name, setup: false };
                     this.checkedPers.push(entry);
                }
            },
            addSR(sr, event) {
                console.log("CSR: ",this.checkedSR)
                var index = this.checkedSR.map((el) => el.name).indexOf(sr.name);
                if(event.target.checked) {
                    let entry = { name: sr.name, done: false };
                    this.checkedSR.push(entry);
                }
                else {
                    this.checkedSR.splice(index, 1)
                }
            },
            checkSR(sr, event) {
                var index = this.checkedSR.map((el) => el.name).indexOf(sr.name);
                console.log(index)
                if(event.target.checked) {
                    this.checkedSR.splice(index, 1)
                    let entry = { name: sr.name, done: true };
                    this.checkedSR.push(entry);
                }
                else {
                    this.checkedSR.splice(index, 1)
                     let entry = { name: sr.name, done: false };
                     this.checkedSR.push(entry);
                }
            },
            onUpdateForm(event) {
                if(this.service.limocount == null || this.service.limocount == "") {
                    this.service.limocount = 1;
                }
                console.log(this.checkedVehs)
                if(this.checkedVehs.length == 0) {
                    this.checkedVehs.push('None')
                }
                if(this.service.date == null || this.service.date == "") {
                    this.service.date = "TBD";
                }
                this.service.pers = this.checkedPers;
                this.service.veh = this.checkedVehs.join(', ')
                this.service.srs = this.checkedSR;
                console.log(this.service.srs);
                event.preventDefault()
                db.collection('services').doc(this.$route.params.id)
                .update(this.service).then(() => {
                    console.log("Service successfully updated!");
                    this.$router.push('/')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>