import { LightningElement ,track} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';

export default class Task10NotesTakingApp extends LightningElement {
    name;
    content;
    @track tasklist=[];
    @track NotesReceived=false;
    inputHandler(event){
        this.name=event.target.value;
    }
    contentHandler(event){
        this.content=event.target.value;
    }
    // handleButtonClick(){
    //     const f= {
    //         Name:this.name,
    //         Content__c :this.content
    //     }
    //     const objectRecord={
    //         apiName: 'Note__c',f 
    //     }
    //     createRecord(objectRecord).then(response =>{
    //         console.log('data got saved');

    //     }).catch(error=>{
    //         console.log(error);
    //     })
    //     this.name='';
    //     this.content='';
        
    // }
    handleButtonClick(){
        NotesApp({Name:this.name ,Content: this.content}).then(()=>{
            console.log('item Inserted Successfully')
                this.name=''
                this.content=''
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
    handleFetch(){
        getRecords().then(response=>{
            this.tasklist=response;
            this.NotesReceived=true;
        }).catch(error =>{
            console.log(error);
        })
    }

    
    
}