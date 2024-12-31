import { LightningElement, track } from 'lwc';
export default class location extends LightningElement {
    @track mapMarkers;
    @track lat;
    @track long;
    @track locationError = false;
    ist=false
    connectedCallback() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    this.lat = latitude;
                    this.long = longitude;
                    this.mapMarkers = [
                        {
                            location : {
                                Latitude : latitude,
                                Longitude: longitude},
                                title : 'Current location',
                                description:'My office  place'
                            }
                        ]

                    },
                    () => {
                        this.locationError = true;
                                        });
                } else {
                    this.locationError = true;
                }
            }
            showDetails(){
                this.ist=true;
            }
        }