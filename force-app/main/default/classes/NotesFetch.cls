public with sharing class NotesFetch {
    @AuraEnabled
    public static List<Note__c> getNotes(){
        return [SELECT Name,Content__c,CreatedDate__c FROM Note__c];

    }
}