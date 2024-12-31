import { LightningElement, track } from 'lwc';
import getRecords from '@salesforce/apex/Bmiclass.getRecords';
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Weight', fieldName: 'Weight__c', type: 'number' },
    { label: 'Height', fieldName: 'Height__c', type: 'number' },
    { label: 'BMI', fieldName: 'Result__c', type: 'Formula' }
]
export default class task6aPagerouting extends LightningElement { 
    cols=columns;
    @track bmiValues=[];
    connectedCallback(){
        getRecords().then(response => {
            console.log(response);
            this.bmiValues = response;
            console.log(this.bmiValues);
        }).catch(error => { 
            console.log(error);
        })
    }
}