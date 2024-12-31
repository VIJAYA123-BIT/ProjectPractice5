public with sharing class AppNotes {
     @AuraEnabled(cacheable=true)
     public static List<Note__c> getNotes() {
         return [SELECT Id,Name, Content__c, CreatedDate__c FROM Note__c ORDER BY CreatedDate__c ASC];
        }
        @AuraEnabled
        public static void createNote(Note__c note) {
            note.CreatedDate__c=Datetime.now();
            insert note;
        }
         @AuraEnabled
         public static void updateNote(Note__c note) {
             update note;
            }
            @AuraEnabled
            public static void deleteNoteById(String noteId) {
                 Note__c note = new Note__c(Id = noteId);
                 delete note;
                }
    }
    
    
    