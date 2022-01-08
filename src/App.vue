<template>
  <amplify-authenticatoro>
    <nav class="navbar navbar-expand-md navbar-dark bg-secondary py-1" aria-label="Fourth navbar example" v-if="this.$route.name !== 'tv' && this.$route.name !== 'condensed' && useremail !== 'criswellgh'">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarsExample04">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link pr-3 text-light" to="/add">Add Service</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-light" to="/">View Services</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-light" to="/tv">TV View</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-light" to="/condensed">Condensed View</router-link>
          </li>
          <li class="nav-item dropdown text-light">
              <a class="nav-link dropdown-toggle text-light" href="#" id="dropdown04" data-bs-toggle="dropdown" aria-expanded="false">Settings</a>
              <ul class="dropdown-menu bg-secondary" aria-labelledby="dropdown04">
                <li><router-link to="/sl" class="dropdown-item text-light">Service Locations</router-link></li>
                <li><router-link to="/cl" class="dropdown-item text-light">Cemeteries</router-link></li>
                <li><router-link to="/vl" class="dropdown-item text-light">Vehicles</router-link></li>
                <li><router-link to="/pl" class="dropdown-item text-light">Personnel</router-link></li>
                <li><router-link to="/bll" class="dropdown-item text-light">Body Locations</router-link></li>
                <li><router-link to="/srl" class="dropdown-item text-light">Service Requirements</router-link></li>
                <h4 class="nav-item"><amplify-sign-out></amplify-sign-out></h4>
              </ul>
            </li>
            <li class="nav-item" style="float:right">
              <div class="logo-image">
              <img class="img-fluid" src="img/tylerlutions.png">
              </div>
          </li>
        </ul>
      </div>
      </div>
    </nav>
      <router-view />
      <h4 v-if="useremail == 'criswellgh'" class="nav-item"><amplify-sign-out></amplify-sign-out></h4>
 </amplify-authenticator>
</template>

<script>
import Auth from '@aws-amplify/auth';
import { Hub } from 'aws-amplify';

export default {
  name: "App",
  components: {},
  data() {
            return {
                useremail: ""
            }
        },
  created() {
    const listener = (data) => {
    switch (data.payload.event) {
        case 'signIn':
                Auth.currentAuthenticatedUser().then((user) => {
                this.useremail = user.username;
                });
                if(this.useremail == "criswellgh") {
                  this.$router.push('/condensed')
              }
    }
  }
  Hub.listen('auth', listener);

  Auth.currentAuthenticatedUser().then((user) => {
                this.useremail = user.username;
                console.log(this.useremail);
                });
  if(this.useremail == 'criswellgh') {
      this.$router.push('/condensed')
  }
  },
  methods: {
    CheckGH() {
      if(this.useremail == 'criswellgh') {
        if(this.$route.name !== 'condensed') {
          this.$router.push('/condensed')
        }
      }
    }
  },
  mounted: function () {
  window.setInterval(() => {
    this.CheckGH()
  }, 250)
}
  
};
document.body.style.backgroundColor = "lightgray";
</script>
<style>
.logo-image{
    width: 46px;
    height: 46px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 0px;
}
h4 {
  width: 100%;
  padding: 20px;
}
</style>