import { LightningElement, track } from 'lwc';

export default class ParentProjectTasks extends LightningElement {
    @track records = [
        { Id: '1', Name: 'Record 1', Description: 'Description 1' },
        { Id: '2', Name: 'Record 2', Description: 'Description 2' },
        // ... Add more records
    ];
}
