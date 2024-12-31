import { LightningElement, track } from 'lwc';

export default class Task2a extends LightningElement {
    @track ap;
    
    handleoutput(){
        if(localStorage.getItem('tasks')){
            this.ap=JSON.parse(localStorage.getItem('tasks'));

        }
    }
    
}