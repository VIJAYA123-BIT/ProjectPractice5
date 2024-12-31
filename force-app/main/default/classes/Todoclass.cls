public with sharing class Todoclass {
    @AuraEnabled
    public static List<Todo_Task__c> getRecords(){
        return [Select Id,Name,Task_Completed__c  from Todo_Task__c LIMIT 10];
    }
    @AuraEnabled
    public static void addItemToObject(String Namce){
        Todo_Task__c obj=new Todo_Task__c();
        obj.Name=Namce;
        insert obj;
    }
    
}