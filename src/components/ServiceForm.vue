<template>
        <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Add Service</h3>
                <form>
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="service.name" required>
                            </div>
            
                            <div class="form-group">
                                <label>Additional Notes</label>
                                <textarea name="text" rows="3" cols="10" wrap="soft" class="form-control" v-model="service.notes"> </textarea>
                            </div>
                                            
                            <div class="form-group">
                                <label>Date/Time</label>
                                <input type="datetime-local" class="form-control" v-model="service.date">
                            </div>
                            <div>
                            <label>Service Location:</label>
                            <br>
                            <select v-model="service.serviceLoc">
                                <option v-for="(serviceLoc, id) in ServiceLocs" :key="id" :value="serviceLoc.name">{{serviceLoc.name}}</option>
                            </select><br /><br>
                             </div>
                             <br>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block">Submit</button>
                            </div>
                        </form>
                        </div>
                        </div>
                        
                        </template>