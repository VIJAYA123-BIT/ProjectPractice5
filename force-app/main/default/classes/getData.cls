public with sharing class getData {
     @AuraEnabled
     public static List<Map<String,Object>> getRecords(){
        Http http=new Http();HttpRequest httpRequest=new HttpRequest();
        
        httpRequest.setEndpoint('https://newsapi.org/v2/everything?q=tesla&from=2023-05-15&sortBy=publishedAt&apiKey=b876896f118944c3b6d5d46cbc6d4632');
        httpRequest.setMethod('GET');
        HttpResponse httpResponse=http.send(httpRequest);
        List<Map<String,Object>> recordsList=new List<Map<String,Object>>();
        Map<String,Object> recordsMap= new Map<String,Object>();
        if(httpResponse.getStatusCode()==200){
                Map<String,Object> responseMap=(Map<String,Object>) JSON.deserializeUntyped(httpResponse.getBody());
                List<Object> records=(List<Object>) responseMap.get('articles');
        for(Object record:records){
                recordsMap=(Map<String,Object>)record;
                recordsList.add(recordsMap);
        }
        }
        return recordsList;
     }
    
    }
    