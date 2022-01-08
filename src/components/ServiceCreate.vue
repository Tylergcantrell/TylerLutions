<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h1 class="text-center">Add Service</h1>
                <form @submit.prevent="onFormSubmit"  style="padding: 30px">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="service.name" required>
                                <br>
                                <label style="color: red"><b>COVID: </b></label>&nbsp;&nbsp;<input class="form-check-input" type="checkbox" :id="1234" v-model="service.covid"><br><br>
                                <label style="color: black"><b>Pending: </b></label>&nbsp;&nbsp;<input class="form-check-input" type="checkbox" :id="1234" v-model="service.pending">
                            </div>
                            <br>
                            <div v-if="service.pending" class="form-group">
                                <label>Date/Time</label>
                                <input type="datetime-local" class="form-control" v-model="service.date">
                            </div>
                            <div v-if="!service.pending" class="form-group">
                                <label>Date/Time</label>
                                <input type="datetime-local" class="form-control" v-model="service.date" required>
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
                                     <td v-if="sr.name != 'None'"><input class="form-check-input" type="checkbox" :id="sr.name" v-on:click="addSR(sr, $event)"></td>
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
                                              <td v-if="veh.name != 'Limo'"><input class="form-check-input" type="checkbox" :id="veh.name" v-on:click="addVeh(veh.name, $event)"></td>
                                              <td v-if="veh.name != 'Limo'"><label :for="veh.name">{{ veh.name }}</label></td>
                                              <td v-if="veh.name == 'Limo'"><input class="form-check-input" type="checkbox" :id="veh.name" v-on:click="addVeh(veh.name, $event)"></td>
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
                                             <td><input class="form-check-input" type="checkbox" :id="pers.name" v-on:click="addPers(pers, $event)"></td>
                                             <td v-if="pers.name != 'None'"><label :for="pers.name">{{ pers.name }}</label></td>
                                             <td><input v-if="this.checkedPers.find(x => x.name === pers.name) && pers.name != 'None'" class="form-check-input" type="checkbox" :name="pers.setup" :id="pers.setup" v-on:click="checkPers(pers, $event)"></td>
                                             
                                        </tr>
                                    </table>
                                     </td>
                                </tr>
                            </table>
                             <br>
                             <br>
                            <div class="form-group" align=center>
                                <button class="btn btn-primary btn-block">Add Service</button>
                            </div>
                        </form>
                        </div>
                        </div>
</template>

<script>
    import { db } from '../firebaseDb';
    import Auth from '@aws-amplify/auth';
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
                Perss: [{}],
                BLs: [],
                Srs: [{}],
            }
        },
        created() {
            Auth.currentAuthenticatedUser().then((user) => {
                    this.service.tenant = user.username;
                    console.log(this.service.tenant)
                });
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
            db.collection('bls').orderBy('name').onSnapshot((snapshotChange) => {
                this.BLs = [];
                snapshotChange.forEach((doc) => {
                    this.BLs.push({
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
            db.collection('srs').orderBy('name').onSnapshot((snapshotChange) => {
                this.Srs = [];
                snapshotChange.forEach((doc) => {
                    this.Srs.push({
                        key: doc.id,
                        name: doc.data().name,
                        done: doc.data().done,
                    })
                });
            })
        },
        methods: {
            addVeh(theName, event) {
                var index = this.checkedVehs.indexOf(theName);
                if(event.target.checked) {
                    this.checkedVehs.push(theName);
                }
                else {
                    this.checkedVehs.splice(index, 1)
                }
                console.log("Veh: "+this.checkedVehs);
                this.service.veh = this.checkedVehs.join(', ')
            },
            addPers(pers, event) {
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
            addPers1(theName, event) {
                var index = this.checkedPers.indexOf(theName);
                if(event.target.checked) {
                    this.checkedPers.push(theName);
                }
                else {
                    this.checkedPers.splice(index, 1)
                }
                console.log("Pers: "+this.checkedPers);
                this.service.pers = this.checkedPers.join(', ')
            },
            addSR(sr, event) {
                var index = this.checkedSR.map((el) => el.name).indexOf(sr.name);
                if(event.target.checked) {
                    let entry = { name: sr.name, done: false };
                    this.checkedSR.push(entry);
                }
                else {
                    this.checkedSR.splice(index, 1)
                }
                console.log("SR: ", this.service.srs);
            },
            onFormSubmit(event) {
                if(this.service.limocount == null || this.service.limocount == "") {
                    this.service.limocount = 1;
                }
                if(this.service.date == null || this.service.date == "") {
                    this.service.date = "TBD";
                }
                if(this.service.veh == null) {
                    this.service.veh = 'None'
                }
                this.service.srs = this.checkedSR;
                this.service.pers = this.checkedPers;
                 console.log(this.service);
                event.preventDefault()
                db.collection('services').add(this.service).then(() => {
                    alert("Service successfully created!");
                    console.log(this.service)
                    this.service.name = ''
                    this.service.notes = ''
                    this.service.music = ''
                    this.service.date = ''
                    this.service.serviceLoc = ''
                    this.service.cem = ''
                    this.service.veh = ''
                    this.service.pers = ''
                    this.service.dir = ''
                    this.service.bl = ''
                    this.service.sr = ''
                }).catch((error) => {
                    console.log(error);
                });
                this.$router.push('/')
            }
        }
    }
</script>