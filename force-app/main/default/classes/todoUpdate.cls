
public with sharing class todoUpdate {
    @AuraEnabled
    public static void updateRecord(Id recordId, Boolean checkboxValue) {
        // Retrieve the record from the custom object
        Todo_Task__c todo = [SELECT Id, Name , Task_Completed__c  FROM Todo_Task__c WHERE Id = :recordId LIMIT 1];
        // Update the checkbox field with the new value
        todo.Task_Completed__c  = checkboxValue;
        // Perform any additional logic or validations
        // Update the record
        update todo;
    }
    
    }