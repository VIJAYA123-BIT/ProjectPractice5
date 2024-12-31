import { LightningElement, track } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import Todo_Task__c from '@salesforce/schema/Todo_Task__c';
import Name from '@saleforce/schema/Todo_Task__c';
//import Todoclass from '@salesforce/apex/Todoclass.todoclassMethod';
export default class Task2 extends LightningElement {
   @track Task1='';
    input(event){
        this.Task1 =event.target.value;
    }
    // handleButtonClick(){
    //     if(this.Task1!= ''){
    //         let tasks =JSON.parse(localStorage.getItem('tasks'))|| [];
    //         tasks.push(this.Task1);
    //         localStorage.setItem('tasks',JSON.stringify(tasks));
    //         this.Task1='';
    //     }
        
    // }
    handleButtonClick(){
        const fields ={};
        fields[FIELD1_FIELD.fieldApiName] = this.field1Value;
        // Set other field values

        const recordInput = { apiName: YOUR_SOBJECT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then((record) => {
                console.log('Record created:', record.id);
                // Perform any desired actions after successful record creation
            })
            .catch((error) => {
                console.error('Error creating record:', error);
                // Handle error
            });

    }
}