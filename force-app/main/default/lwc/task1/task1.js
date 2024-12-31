import { LightningElement } from 'lwc';

export default class Task1 extends LightningElement {
    firstName= '';
    lastName ='';
    city='';
    state='';
    country='';
    pinCode='';
    ist =false;
    firstNameInput(event){
        this.firstName= event.target.value;
    }
    lastNameInput(event){
        this.lastName = event.target.value;
    }
    cityInput(event){
        this.city =event.target.value;
    }
    stateInput(event){
        this.state =event.target.value;
    }
    countryInput(event){
        this.country =event.target.value;
    }
    pinCodeInput(event){
        this.pinCode =event.target.value;
    }
    handleButtonClick(){
        this.ist =true ;
    }
}