import { LightningElement} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
export default class Task6Pagerouting extends NavigationMixin(LightningElement){
    name;
    Height;
    Weight;
    // bmiData = [];
    ist=false
    // input(event){
        // type:"comm__namedPage",
    //     // var inp=event.target.label;
    //     // this[inp]=event.target.value;
    //     this.name=event.target.value;
    //     this.Height=event.target.value;
    //     this.Weight=event.target.value;
    // }
    inputname(event){
        this.name=event.target.value;
    }
    inputheight(event){
        this.Height=event.target.value;
    }
    inputweight(event){
        this.Weight =event.target.value;
    }
    handleButtonClick(){
        this.ist=true
        const fields = {    
            Name: this.name,
            Weight__c: this.Weight,
            Height__c:this.Height
        }
         const objectRecord = {
            apiName : 'BMI__c',
            fields
    };
    createRecord(objectRecord).then(response => {
            console.log('Bmi get saved !');
    }).catch(error => {
            console.log(error);
    })
        // this.name = '';
        // this.Weight = '';
        // this.Height = '';
    }
    fetchBmis(){
        this[NavigationMixin.Navigate](
            {
        //type:"standard__navItemPage",
        // type:"comm__namedPage",
        //  apiName:"BmiApp",
        // name: "BmiApp__c"
       type:'standard__webPage',
        attributes: {
            url:'/bmiresult'
          
    } 
    }
        )
        
        }
    


}