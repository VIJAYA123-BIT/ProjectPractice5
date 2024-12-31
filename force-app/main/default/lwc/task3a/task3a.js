import { LightningElement,track } from 'lwc';
import getRecords from '@salesforce/apex/Todoclass.getRecords'
import updateRecord from '@salesforce/apex/todoUpdate.updateRecord';
import {deleteRecord} from 'lightning/uiRecordApi';

export default class task3a extends LightningElement {
    @track todoList = [];
    @track todosReceived = false;
    isChecked = false;
    input(event){
    this.isChecked = event.target.checked;
    const recordId = event.target.dataset.id;
    console.log(recordId);
    //this.isChecked = event.target.checked;
    updateRecord({recordId:recordId,checkboxValue: this.isChecked}).then(response =>{
        console.log(this.isChecked);
        console.log('Update done Successfully!')
    }).catch(error => {
        console.log(error);
    })
}
deleteTodo(event){
    const recordId = event.target.dataset.id;
    console.log(recordId);
    deleteRecord(recordId)
    .then(() => {
         // Delete successful, update the UI or perform any additional logic
        console.log('Todo deleted successfully');
    })
    .catch(error => {
        // Handle any error during deletion
        console.error('Error deleting todo:', error);
    });
}
handleFetch() {
    console.log('success')
    getRecords().then(response => {
        this.todoList = response;
        this.todosReceived = true;
    }).catch(error => {
        console.log(error);
    })
}
}
