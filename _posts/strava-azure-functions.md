---
title: Requesting Strava with Azure Functions
date: '2021-06-05'
coverImage: 'assets/blog/strava-azure-functions/cover.png'
excerpt: 'Strava & Azure Functions. Creating a serverless API to request an OAuth2 based API'
ogImage:
  url: 'assets/blog/strava-azure-functions/cover.png'
---

Few days ago, I wanted to add some Strava infos on this site using [their API](https://developers.strava.com/docs/reference/).

Quickly, I stumbled upon a major issue : Strava uses [OAuth2](https://developers.strava.com/docs/authentication/#:~:text=To%20Get%20Support-,Introduction,keeps%20users'%20authentication%20details%20safe.) for their tokens. This means I needed a way to generate & refresh a token on a regular basis (every 6 hours). 

Since this is a backend-less/static website I had to rely on an external provider. [Azure Functions](https://azure.microsoft.com/fr-fr/services/functions/) had what I was looking for : A Timer Triggered functions (cron-like).   

![logos](/assets/blog/strava-azure-functions/logos.png)

## A First Function : Refresh the tokens
This first function is simple : 
* It takes as input the pair clientId/Client secret and a refresh Token
* It returns a new access token & a new refresh token.

## A Second Function : Retrieve the data
This second function is even simplier : 
Using the access tokens I requests the strava API, like you would any other api. For the purpose of this site, my function make multiple calls to return the data structure I needed. 

## What about the glue between these 2 functions ? 

So, now we have 2 standalone functions, but how do I share the tokens ?  
That's where [Azure Storage](https://azure.microsoft.com/fr-fr/services/storage/) enters the game. 

I used the table storage as a Key-Value Store to store: 
* ClientID
* Client-secret
* Access Token
* Refresh Token 

## Basic Storage read & write

### Read 

To read for the table, their is a service. 

```javascript 
import azure from 'azure-storage';

const tableService = azure.createTableService();
const query = new azure.TableQuery()
    .where("RowKey eq 'ClientID' or RowKey eq 'ClientSecret' or RowKey eq 'RefreshToken'");

tableService.queryEntities<any>('my-table-name', query, null, (error, result, response) => {
  let clientID, refreshToken, clientSecret;
  result.entries.forEach(item => {
      if (item.RowKey._ === 'ClientID') {
          clientID = item.Value._;
      } else if (item.RowKey._ === 'ClientSecret') {
          clientSecret = item.Value._;
      } else if (item.RowKey._ === 'RefreshToken') {
          refreshToken = item.Value._;
      }
    });
```

### Write
Likewise to write into the table. 

```javascript 
const updateRefreshToken = {
    PartitionKey: { '_': 'Token' },
    RowKey: { '_': 'RefreshToken' },
    Value: { '_': response.refresh_token }
};

const updateAccessToken = {
    PartitionKey: { '_': 'Token' },
    RowKey: { '_': 'AccessToken' },
    Value: { '_': response.access_token }
};

const batch = new azure.TableBatch();
batch.replaceEntity(updateRefreshToken);
batch.replaceEntity(updateAccessToken);

tableService.executeBatch(tableName, batch, myCallbackFunc)
```

### It gets better
As Azure Function have a great integration with Azure Storage. A table row can be directely used as input of the function.

#### **`function.json`**
```javascript
  "bindings": [
    ...
    {
      "type": "table",
      "name": "inputTable",
      "tableName": "my-values",
      "connection": "jeanmechestrava_STORAGE",
      "partitionKey": "Token",
      "rowKey": "AccessToken",
      "direction": "in"
    }
  ],
```

#### **`index.ts`**
```typescript
const httpTrigger: AzureFunction = function (context: Context, req: HttpRequest): Promise<void> {
    const accessToken = context.bindings.inputTable.Value;
    ...
};

```

This way I indicate to the Azure Function framework, I want the `AccessToken` field from my table `my-values` and I put it into a variable `inputTable`. 


### To bootstrap everything

As you probably don't missed, this only works when there is initial data in the table. There can be new access token without an initial refresh token. It's even more true for the clientId/Client secret pair ! 

I used [Microsoft Azure Storage Explorer](https://azure.microsoft.com/fr-fr/features/storage-explorer/) to initially put the data in the table 

![Screenshot of Azure Storage Explorer](/assets/blog/strava-azure-functions/azure-storage-explorer.png "Screenshot of Azure Storage Explorer")


I also went on writing 2 others functions for backup reasons : 
* A HTTP Function to request an Authorize to Strava callback
* Another HTTP Function passed as callback to the Strava Auth to trigger a brand new token request (which differ from a token renewal). 


### Final note

As my examples above are only partial, you will find my Azure Functions on **[my repo](https://github.com/kyro38/strava-azure-functions)**.  

Also I would like to thank [Dzhavat](https://dzhavat.github.io/) for sharing with me his implementation of Azure Functions to request the Strava API. 