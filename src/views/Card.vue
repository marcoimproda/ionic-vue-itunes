<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
          <ion-buttons slot="start">
          <ion-back-button @click="goBack()">
                    <ion-icon :icon="arrowBackOutline"></ion-icon>
                </ion-back-button>
                <ion-title>IonVueTunes🎵</ion-title>
                </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">IonVueTunes🎵</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="container" v-if="track">
      <ion-card class="card" v-bind:key="track.id" v-for="track in track.results">
        <ion-card-header>
        <ion-card-subtitle>🎵 Album: <strong>{{track.collectionName}}</strong></ion-card-subtitle>
        <ion-card-subtitle>🎵 Song: <strong>{{track.trackName}}</strong></ion-card-subtitle>
        <ion-card-title>🎤 {{track.artistName}}</ion-card-title>
        <img class="artwork" :src="track.artworkUrl60" alt="Image">
        </ion-card-header>
        <ion-card-content>
          <h3>💲 Price: <strong>{{track.trackPrice}} $</strong></h3>
          <ion-datetime class="time" display-format="MMM DD, DDD. YY" :value="track.releaseDate" disabled></ion-datetime>
          <audio controls v-if="track.previewUrl">
          <source :src="track.previewUrl" type="audio/mp4">
          </audio>
          <div class="ion-text-center">
                      <a :href="track.trackViewUrl" target="_blank"><ion-button>More</ion-button></a>
          </div>
        </ion-card-content>
      </ion-card>
      </div>
      <div class="container" v-if="!track">
      <ion-card class="card">
        <ion-card-header>
        <ion-card-title>Track not found</ion-card-title>
        </ion-card-header>
      </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonInput, toastController, IonSearchbar } from '@ionic/vue';
import { ref, defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: 'Card',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const id = ref(route.params.id || null);
    return {
      router,
      route,
      id
    };
  },
  data() {
    return {
      trackPreview: '',
      buttonPlaying: 'Play'
    };
  },
  computed: {
...mapGetters("search", [
      "userTrack", "track"
    ])
  },
  mounted() {
        this.getTrack(this.id);
    },
  methods: {
...mapActions("search", ["trackSearch"]),
async getTrack(id: any) {
      this.trackSearch(id).then(async () => {
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
    goBack() {
      this.router.back();
    },
  }
});
</script>

<style scoped>
/* Card */
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  top: 25%;
}

.card {
  width: 30%; 
  border-radius: 5%;
}

.artwork {
  border-radius: 25px;
}

.time {
  font-size: medium;
  font-style: normal;
  color: black;
  font-weight: 600;
}

/* Audio Player */

audio {
  position: relative;
  right: 3%;
  width: 100%;
}

/* Back button */

ion-back-button {
  width: 20%;
}

/* Mobile CSS */

@media (max-width: 979px) {
 .card {
  width: 45%; 
}
}

@media (max-width: 728px) {
.containerCards {
 justify-content: center;
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