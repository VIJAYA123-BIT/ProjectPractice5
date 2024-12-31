// public with sharing class ProjectTasks {
//     public ProjectTasks() {

//     }
// }
// public with sharing class ProjectTasks {
//     @AuraEnabled(cacheable = true)
//     public static List<Contact> getContactRecords(Id accountId){
//         return [Select Id, Name, Tool__c, Email, Department, Account.Name from Contact where AccountId = :accountId];
//     }
// }
public with sharing class ProjectTasks {
    @AuraEnabled(cacheable = true)
    public static List<ProjectTask__c> getContactRecords(){
        return [Select Id, Name, Tool__c from ProjectTask__c];
    }
}