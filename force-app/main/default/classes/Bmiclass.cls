public with sharing class Bmiclass  {
            @AuraEnabled
            public static List<BMI__c> getRecords(){
                return [Select Name,Weight__c,Height__c,Result__c  from BMI__c ];
            }
            
} 