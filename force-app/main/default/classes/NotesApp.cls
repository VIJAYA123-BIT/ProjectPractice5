public with sharing class NotesApp {
//    @AuraEnabled
//     public static List<Note__c> getRecords(){
//         //return [Select Id,Name,Content__c  from Note__c LIMIT 10];
//     }
       @AuraEnabled
    public static void NotesApp(String Name ,String Content){
        Note__c obj=new Note__c();
        obj.Name=Name;
        obj.Content__c =Content ;
        insert obj;
    }

    
    }