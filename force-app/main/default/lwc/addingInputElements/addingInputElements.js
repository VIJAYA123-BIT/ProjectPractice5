import { LightningElement ,api,track,wire } from 'lwc';
import SHOW_ARRAY_MESSAGE from '@salesforce/messageChannel/ShowArray__c';
import {subscribe, MessageContext} from 'lightning/messageService';

export default class AddingInputElements extends LightningElement {
    @track array = [];
    // @wire (arrayList) arrayList;
    // array =[];
    // connectedCallback(){
    //     this.subscribeToMessageChannel();
    // }
    // subscribeToMessageChannel(){
    //     subscribe(
    //         this.arrayList,
            
    //     )
    // }

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeHandler();
    }

    subscribeHandler(){
        subscribe(this.messageContext,SHOW_ARRAY_MESSAGE,(message) => this.showArrayHandler(message))
    }

    showArrayHandler(message){
        this.array = message.arrayElems;
        console.log(this.array);
    }
}
























// OutputPage.js

// import { LightningElement, wire } from 'lwc';
// import { addingElements } from 'lightning/navigation';

// export default class OutputPage extends LightningElement {
//   @wire(addingElements)
//   addingElements;

//   array = [];

//   connectedCallback() {
//     const state = this.addingElements.state;
//     if (state && state.array) {
//       this.array = state.array;
//     }
//   }
// }
