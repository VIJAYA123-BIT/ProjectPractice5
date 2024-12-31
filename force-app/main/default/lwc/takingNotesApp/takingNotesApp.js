import { createRecord, deleteRecord, updateRecord } from 'lightning/uiRecordApi';
import { LightningElement, track } from 'lwc';
import getNotes from '@salesforce/apex/NotesFetch.getNotes';
export default class Notes extends LightningElement {
    @track name;
    @track note;
    @track date;
    @track notesList=[];
    @track editEnabled=false;
    @track editId;
    newnoteData;
    newNameData;
    nameHanlder(event){
        this.name=event.target.value;
    }
    noteHandler(event) {
        this.note=event.target.value;
    }
    addHanlder(){
        const fields={
            Name:this.name,
           Content__c :this.note,
            CreatedDate__c:new Date().toJSON()
        };
        console.log(fields.CreatedDate__c)
        const noteInput={
            apiName:'Note__c',
            fields
        }
        console.log('name',this.name)
        createRecord(noteInput)
        .then((result)=>{
            console.log('inside');
            //this.notesList.push(result.id);
            console.log('successful')
            this.name='';
            this.note='';
            this.date='';
        })
        .catch((error)=>{
             console.error(error);
            });
        }
    
        fetchHandler(){
            getNotes().then(response=>{
                this.notesList=response;
                this.notesRecived=true;
                console.log('fetch');
            })
            .catch(error=>{
                console.log(error);
            })
        }
        deleteHandler(event){
            console.log('delete clicked');
            const noteId=event.target.dataset.id;
            console.log(noteId)
            deleteRecord(noteId)
            .then(()=>{
                this.fetchHandler();
                console.log('deleted succesfull')
            }).catch((error)=>{
                console.log(error);
            });
        }
        editHandler(event){
            console.log('edit button');
            this.editId=event.target.dataset.id;
            console.log(this.editId)
            const noteIndex = this.notesList.find(not => not.Id == this.editId);
            console.log(noteIndex)
            
            this.newnoteData =noteIndex.Content__c;
            this.newNameData=noteIndex.Name;
            console.log('name',this.newNameData);
            console.log(this.newnoteData);
            this.editEnabled=true;
        }
        newChangeHandler(event) {
            this.newnoteData = event.target.value;
        }
        nameChangeHanlder(event){
            this.newNameData=event.target.value;
        }
    updateHandler(event) {
        const recid = this.editId;
        
        const fields={
            
            Content__c:this.newnoteData,
                Name:this.newNameData
            }
            const updatedRecord={
                fields,
                recordId:this.editId
            }
            updateRecord(updatedRecord).then(response => {
                
                this.fetchHandler();
                console.log("record succesfully updated",recid);
            }).catch(error => {
                console.log(error.body.message);
            })
            this.editEnabled = false;

        }
        handleSortAsc() {
            this.notesList = [...this.notesList.sort((a, b) => new Date(a.CreatedDate__c) - new Date(b.CreatedDate__c))];
            }
            handleSortDesc() {
                this.notesList = [...this.notesList.sort((a, b) => new Date(b.CreatedDate__c) - new Date(a.CreatedDate__c))];
                
            }
        }