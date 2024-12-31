import { LightningElement, track } from 'lwc';
import getRecords from '@salesforce/apex/getData.getRecords';
export default class Display extends LightningElement {
    @track recordsList = [];
    @track numberOfRecords = null;
    @track recordsList;
    @track error;
    receivedrecord=false
    textHandler(event) {
        this.numberOfRecords = event.target.value;
    }
    handleButtonClick() {
    if (this.numberOfRecords > 30) {
        this.recordsList = null;
        this.error = this.numberOfRecords+' is greater than  30. It should be less than or equal to 30';
    }
    else {
        this.receivedrecord =true;
        getRecords().then((response) => {
             this.error=null;
             let resultedRecords = []
              resultedRecords = response;
              let len = resultedRecords.length;
              if(len<this.numberOfRecords){
                  this.numberOfRecords = len;
                }
     this.recordsList = resultedRecords.slice(0, this.numberOfRecords);
     })
     .catch((error) => {
         console.log(error);
        })
    }
}
}