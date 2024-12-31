import { LightningElement } from 'lwc';
import getContactRecords from '@salesforce/apex/ProjectTasks.getContactRecords'

export default class ProjectTasks extends LightningElement {
    records=[];
    connectedCallback(){
        getRecords().then(response => {
            console.log(response);
            this.records = response;
            console.log(this.records);
        }).catch(error => {
            console.log(error);
        })
    }
    addClass(event){
        let index = event.currentTarget.dataset.rowIndex;
        let flipElement = this.template.querySelector('[data-id="' + index + '"]');
        flipElement.classList.add('class1');
    }

    removeClass(event){
        let index = event.currentTarget.dataset.rowIndex;
        let flipElement = this.template.querySelector('[data-id="' + index + '"]');
        flipElement.classList.remove('class1');
    }

}