<template>
    <div>
        <GoogleMap :api-key="apiKey" style="width: 100%; height: 450px" :center="{ lat: lat, lng: lng }" :zoom="16">
            <Marker :options="{ position: { lat: lat, lng: lng }, label }"/>
        </GoogleMap>
    </div>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map'
import axios from 'axios'

export default {
    components: {
        GoogleMap,
        Marker
    },

    data() {
        return {
            label: "COMBOI",
            apiKey: "api_key",
            lat: null,
            lng: null,
            admin: [],
            dir: '',
        }
    },

    methods: {
        async carregarCoordenadasDesdeDireccion() {
            try {
                const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: this.dir,
                        key: this.apiKey
                    }
                });

                const results = response.data.results;
                if (results.length > 0) {
                    this.lat = results[0].geometry.location.lat;
                    this.lng = results[0].geometry.location.lng;
                }
            } catch (error) {
                console.error(error);
            }
        },

        async carregarDatos() {
            const token = localStorage.getItem('user-token');
            fetch(`http://127.0.0.1:8000/api/user/admin`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.admin = data;
                    const direccionArray = [this.admin.direccion, this.admin.codigopostal, this.admin.poblacion, this.admin.provincia];
                    this.dir = direccionArray.join(", ");
                    console.log(this.dir);
                    this.carregarCoordenadasDesdeDireccion();
                })
                .catch(error => {
                    console.error(error);
                });

        },
    },

    mounted() {
        this.carregarDatos();
    }
}
</script>
<style>
    .comboi-label {
        background-color: yellow;
        color: black;
    }
</style>
