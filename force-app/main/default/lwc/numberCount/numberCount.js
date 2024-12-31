import { LightningElement,track ,wire} from 'lwc';
import fetchRecords from '@salesforce/apex/Records.fetchRecords'
import refreshfetchRecords from '@salesforce/apex/Records.refreshfetchRecords'
export default class NumberCount extends LightningElement { 
    @track number;
   @wire(refreshfetchRecords) AccountRecords;
    recordList = [];
    recordsReceived =false;
    InputValue(event){
        this.number = event.target.value;
    }
    ShowHandler(){
        console.log('please come up with the answer')
        fetchRecords({Num:this.number}).then(response=>{
            this.recordList=response;
            console.log(this.recordList)
            this.recordsReceived=true;
            console.log('fetch');
        })
        .catch(error=>{
            console.log(error);
        })
        this.number='';

    }
}