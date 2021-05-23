<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>IonVueTunes🎵</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">IonVueTunes🎵</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <ion-searchbar v-on:keyup.enter="getSearch(userInput)" color="light" v-model="userInput" placeholder="Search for an artist or a song 🎵"></ion-searchbar>
        <ion-button v-on:keyup.enter="getSearch(userInput)" @click="getSearch(userInput)">Search</ion-button>
      </div>
      <div class="containerCards" v-if="music.results != ''">
      <ion-card class="card" v-bind:key="music.id" v-for="music in music.results">
        <ion-card-header>
        <ion-card-subtitle>{{music.trackName}}</ion-card-subtitle>
        <ion-card-title>{{music.artistName}}</ion-card-title>
        <img :src="music.artworkUrl60" alt="">
        </ion-card-header>
        <ion-card-content>
          <ion-button v-if="music.previewUrl != ''" @click="onClick($event)" v-model="buttonPlaying">{{buttonPlaying}}</ion-button>
          <audio>
          <source :src="music.previewUrl" type="audio/mp4">
          </audio>
        </ion-card-content>
      </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonInput, toastController, IonSearchbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSearchbar,
  },
  data() {
    return {
      userInput: '',
      trackPreview: '',
      buttonPlaying: 'Play'
    };
  },
  computed: {
...mapGetters("search", [
      "userSearch", "music"
    ])
  },
  methods: {
...mapActions("search", ["musicSearch"]),
async getSearch(payload: any) {
      this.musicSearch(payload).then(async () => {
        console.log(this.music);
        const toast = await toastController
        .create({
          message: 'Operation completed',
          duration: 2000
        });
      return toast.present();
        });
    },
    onClick(event: any) {
      if(this.trackPreview != '') {
        this.buttonPlaying = "Play";
        this.trackPreview.pause();
        this.trackPreview = '';
      }
      this.trackPreview = event.toElement.nextElementSibling;
       if(event.srcElement.innerHTML == "Pause") {
        this.trackPreview.pause();
        event.srcElement.innerHTML = "Play";
      } else {
        event.srcElement.innerHTML = "Pause";
      this.trackPreview.play();
      }
    },
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 20%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}

.containerCards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  top: 25%;
}

.card {
  width: 30%; 
  border-radius: 5%;
}

@media (max-width: 979px) {
 .card {
  width: 45%; 
}
}

@media (max-width: 728px) {
.containerCards {
 justify-content: unset;
}
 .card {
  width: 70%; 
}
}

@media (max-width: 360px) {
.containerCards {
 justify-content: center;
}
}
</style>