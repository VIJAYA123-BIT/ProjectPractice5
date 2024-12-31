import { LightningElement,track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import addItemToObject from '@salesforce/apex/Todoclass.addItemToObject';
export default class task3 extends LightningElement {
    @track Task1='';
    @track done=false
    inputHandler(event){
        this.Task1 = event.target.value;
    } 
    handleButtonClick(){
        addItemToObject( {Namce:this.Task1}).then(()=>{
            console.log('item Inserted Successfully')
                this.Task1=''
                const t = new ShowToastEvent({
                title:'Success',
                message: 'Record created Successfully',
                variant: 'success'
            });
            this.dispatchEvent(t);
        }).catch(error => {
            console.log('Error message', error.body.message);
            const toastEvent = new ShowToastEvent({
                title : 'Error',
                message: error.body.message,
                variant:'error'
            });
            this.dispatchEvent(toastEvent);
        })

    }
}
