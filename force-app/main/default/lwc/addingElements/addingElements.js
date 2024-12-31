import { LightningElement ,api,track, wire} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import SHOW_ARRAY_MESSAGE from '@salesforce/messageChannel/ShowArray__c';
import {publish, MessageContext} from 'lightning/messageService';


export default class AddingElements extends NavigationMixin(LightningElement) {
    @track input=''
    @track array =[];    
    addHandler(event){
        this.input=event.target.value;
    }

    @wire(MessageContext)
    messageContext;

    addButtonHandler(){
        if(this.input){
            this.array.push(this.input);
            this.input='';
            console.log(this.array.length);
            publish(this.messageContext,SHOW_ARRAY_MESSAGE,{
                arrayElems:this.array
            })
          
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                // CustomTabs from managed packages are identified by their
                // namespace prefix followed by two underscores followed by the
                // developer name. E.g. 'namespace__TabName'
                apiName: 'navigationWorks'
            }
        });

    }}
        }
            
   
     
    


