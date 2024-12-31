public with sharing class Records {
    @AuraEnabled
    public static List<Account>  fetchRecords(INTEGER Num) {
        return [SELECT Id, Name FROM Account  LIMIT : Num];
    }
    @AuraEnabled(cacheable = true )
    public static List<Account>  refreshfetchRecords() {
        return [SELECT Id, Name,AccountNumber FROM Account  LIMIT 5];
    
    }
}