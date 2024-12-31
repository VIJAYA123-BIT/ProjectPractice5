import { LightningElement, wire } from 'lwc';
import getNotes from '@salesforce/apex/AppNotes.getNotes';
import createNote from '@salesforce/apex/AppNotes.createNote';
import updateNote from '@salesforce/apex/AppNotes.updateNote';
import deleteNoteById from '@salesforce/apex/AppNotes.deleteNoteById';
import { refreshApex } from '@salesforce/apex';
 
export default class   noteTakingApp extends LightningElement {
    noteTitle = '';
    noteContent = '';
    selectedNoteId = '';
    editingNoteId = '';
    editedNoteTitle = '';
    editedNoteContent = '';
    sortedNotes = [];
    sortByColumn = 'CreatedDate__c';
    sortBy = 'asc';
    showEditModal = false;
    isSelected = false;
    notesResult;
 
    columns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Content', fieldName: 'Content__c', type: 'text' },
        {
            label: 'CreatedDate&Time',
            fieldName: 'CreatedDate__c',
            type: 'date',
            typeAttributes: {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            },
            sortable: true
        },
        {
            type: 'action',
            typeAttributes: { rowActions: [{ label: 'Edit', name: 'edit' }, { label: 'Delete', name: 'delete' }] }
        }
    ];
 
    @wire(getNotes)
    wiredNotes(result) {
        this.notesResult = result;
        if (result.data) {
            this.sortedNotes = result.data;
        }
    }
 
    handleTitleChange(event) {
        this.noteTitle = event.target.value;
    }
 
    handleContentChange(event) {
        this.noteContent = event.target.value;
    }
 
    handleAddNote() {
        if (this.noteTitle && this.noteContent) {
            const note = { Name: this.noteTitle, Content__c: this.noteContent };
            createNote({ note: note })
                .then(() => {
                    this.noteTitle = '';
                    this.noteContent = '';
                    return refreshApex(this.notesResult);
                })
                .catch(error => {
                    console.error('Error creating note:', error);
                });
        }
    }
 
    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        console.log(this.fieldName);
        this.sortByColumn = fieldName;
        this.sortBy = sortDirection === 'asc' ? 'asc' : 'desc';
        this.sortData(this.sortByColumn, this.sortBy);
    }
    sortData(fieldName, sortDirection) {
        let sortResult = [...this.notesResult.data]; // Same as Object.assign([], this.data)
        let parser = (v) => v;
        let column = this.columns.find(c => c.fieldName === fieldName);
        if (column.type === 'date' || column.type === 'datetime') {
            parser = (v) => (v && new Date(v));
        }
        let sortMult = sortDirection === 'asc' ? 1 : -1;
        this.sortedNotes = sortResult.sort((a, b) => {
            let a1 = parser(a[fieldName]), b1 = parser(b[fieldName]);
            let r1 = a1 < b1, r2 = a1 === b1;
            return r2 ? 0 : r1 ? -sortMult : sortMult;
        });
    }
 
    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;
 
        switch (action.name) {
            case 'edit':
                this.editingNoteId = row.Id;
                this.editedNoteTitle = row.Name;
                this.editedNoteContent = row.Content__c;
                this.showEditModal = true;
                break;
            case 'delete':
                this.handleDeleteNote(row.Id);
                break;
            default:
                break;
        }
    }
 
    handleEditTitleChange(event) {
        this.editedNoteTitle = event.target.value;
    }
 
    handleEditContentChange(event) {
        this.editedNoteContent = event.target.value;
    }
 
    handleCancelEdit() {
        this.showEditModal = false;
    }
 
    handleSaveEdit() {
        if (this.editedNoteTitle && this.editedNoteContent) {
            const updatedNote = {
                Id: this.editingNoteId,
                Name: this.editedNoteTitle,
                Content__c: this.editedNoteContent
            };
 
            updateNote({ note: updatedNote })
                .then(() => {
                    this.showEditModal = false;
                    this.editingNoteId = '';
                    this.editedNoteTitle = '';
                    this.editedNoteContent = '';
                    return refreshApex(this.notesResult);
                })
                .catch(error => {
                    console.error('Error updating note:', error);
                });
        }
    }
 
    handleDeleteNote(noteId) {
        deleteNoteById({ noteId: noteId })
            .then(() => {
                return refreshApex(this.notesResult);
            })
            .catch(error => {
                console.error('Error deleting note:', error);
            });
    }
 
    handleFetchClick() {
        this.isSelected = !this.isSelected;
    }
 
    connectedCallback() {
        this.loadNotes();
    }
 
    loadNotes() {
        getNotes()
            .then(result => {
                this.sortedNotes = result;
            })
            .catch(error => {
                console.error('Error retrieving notes:', error);
            });
    }
}
