# ContactsManager service

## Instanciating the service

### Request related permission in APP's manifest file and import needed daemon files

```json
"contacts": { "access": "readwrite" }
``` 
Load the following scripts:

```html
<script src="http://127.0.0.1/api/v1/shared/core.js"></script>
<script src="http://127.0.0.1/api/v1/shared/session.js"></script>
<script src="http://127.0.0.1/api/v1/apps/service.js"></script>
```

You can then get an instance of the service with code similar to:

```javascript
const session = new lib_session.Session();
const sessionstate = {};
let _contactsManager = null;
sessionstate.onsessionconnected = function () {
  console.log(`ContactsManager onsessionconnected`);
  lib_contacts.ContactsManager.get(session).then((ContactsManagerService) => {
  console.log(`Got ContactsManager : #ContactsManagerService.service_id}`);
  _contactsManager = ContactsManagerService;
}).catch((e) => {
  console.log(`Error calling ContactsManager service${JSON.stringify(e)}`);
  _contactsManager = null;
});
};

sessionstate.onsessiondisconnected = function () {
  console.log(`ContactsManager onsessiondisconnected Daemon Crashed`);
};

// On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
```
Then the developer can use **_contactsManager** as ContactsManager service instance.

This service implements the [ContactsFactory](#interface_ContactsFactory) interface.

---

## ChangeReason enumeration
```javascript
{
  CREATE,
  UPDATE,
  REMOVE
}
```

## FilterByOption enumeration
```javascript
{
  NAME,
  GIVEN_NAME,
  FAMILY_NAME,
  TEL,
  EMAIL,
  CATEGORY
}
```

## FilterOption enumeration
```javascript
{
  EQUALS,
  CONTAINS,
  MATCH,
  STARTS_WITH,
  FUZZY_MATCH
}
```

## Order enumeration
```javascript
{
  ASCENDING,
  DESCENDING
}
```

## SortOption enumeration
```javascript
{
  GIVEN_NAME,
  FAMILY_NAME,
  NAME
}
```

---


## Address dictionnary
```javascript
{
  atype: string,
  streetAddress: string?,
  locality: string?,
  region: string?,
  postalCode: string?,
  countryName: string?,
  pref: boolean?
}
```

## BlockedNumberChangeEvent dictionnary
```javascript
{
  reason: <a href="#enumeration_ChangeReason">ChangeReason</a>,
  number: string
}
```

## BlockedNumberFindOptions dictionnary
```javascript
{
  filterValue: string,
  filterOption: <a href="#enumeration_FilterOption">FilterOption</a>
}
```

## ContactField dictionnary
```javascript
{
  atype: string,
  value: string,
  pref: boolean
}
```

## ContactFindSortOptions dictionnary
```javascript
{
  sortBy: <a href="#enumeration_SortOption">SortOption</a>,
  sortOrder: <a href="#enumeration_Order">Order</a>,
  sortLanguage: string,
  filterValue: string,
  filterOption: <a href="#enumeration_FilterOption">FilterOption</a>,
  filterBy: <a href="#enumeration_FilterByOption">[FilterByOption]</a>,
  onlyMainData: boolean
}
```

## ContactInfo dictionnary
```javascript
{
  id: string,
  published: Date,
  updated: Date,
  bday: Date,
  anniversary: Date,
  sex: string,
  genderIdentity: string,
  ringtone: string,
  photoType: string,
  photoBlob: arraybuffer,
  addresses: <a href="#dictionary_Address">[Address]?</a>,
  email: <a href="#dictionary_ContactField">[ContactField]?</a>,
  url: <a href="#dictionary_ContactField">[ContactField]?</a>,
  name: string,
  tel: <a href="#dictionary_ContactTelField">[ContactTelField]?</a>,
  honorificPrefix: [string]?,
  givenName: string,
  phoneticGivenName: string,
  additionalName: [string]?,
  familyName: string,
  phoneticFamilyName: string,
  honorificSuffix: [string]?,
  nickname: [string]?,
  category: [string]?,
  org: [string]?,
  jobTitle: [string]?,
  note: [string]?,
  groups: [string]?,
  icePosition: integer
}
```

## ContactSortOptions dictionnary
```javascript
{
  sortBy: <a href="#enumeration_SortOption">SortOption</a>,
  sortOrder: <a href="#enumeration_Order">Order</a>,
  sortLanguage: string
}
```

## ContactTelField dictionnary
```javascript
{
  atype: string,
  value: string,
  pref: boolean,
  carrier: string
}
```

## ContactsChangeEvent dictionnary
```javascript
{
  reason: <a href="#enumeration_ChangeReason">ChangeReason</a>,
  contacts: <a href="#dictionary_ContactInfo">[ContactInfo]?</a>
}
```

## GroupChangeEvent dictionnary
```javascript
{
  reason: <a href="#enumeration_ChangeReason">ChangeReason</a>,
  group: <a href="#dictionary_GroupInfo">GroupInfo</a>
}
```

## GroupInfo dictionnary
```javascript
{
  id: string,
  name: string
}
```

## IceInfo dictionnary
```javascript
{
  position: integer,
  contactId: string
}
```

## SimContactInfo dictionnary
```javascript
{
  id: string,
  tel: string,
  email: string,
  name: string,
  category: string
}
```

## SimContactLoadedEvent dictionnary
```javascript
{
  removeCount: integer,
  updateCount: integer
}
```

## SpeedDialChangeEvent dictionnary
```javascript
{
  reason: <a href="#enumeration_ChangeReason">ChangeReason</a>,
  speeddial: <a href="#dictionary_SpeedDialInfo">SpeedDialInfo</a>
}
```

## SpeedDialInfo dictionnary
```javascript
{
  dialKey: string,
  tel: string,
  contactId: string
}
```

---




## ContactCursor Interface



### Methods
&nbsp;&nbsp;[next](#interface_ContactCursor_method_next)  


  next()

  Resolves with <a href="#dictionary_ContactInfo">[ContactInfo]</a>

  Rejects with void

---





## ContactsFactory Interface



### Methods
&nbsp;&nbsp;[add](#interface_ContactsFactory_method_add)  [addBlockedNumber](#interface_ContactsFactory_method_addBlockedNumber)  [addGroup](#interface_ContactsFactory_method_addGroup)  [addSpeedDial](#interface_ContactsFactory_method_addSpeedDial)  [clearContacts](#interface_ContactsFactory_method_clearContacts)  [find](#interface_ContactsFactory_method_find)  [findBlockedNumbers](#interface_ContactsFactory_method_findBlockedNumbers)  [get](#interface_ContactsFactory_method_get)  [getAll](#interface_ContactsFactory_method_getAll)  [getAllBlockedNumbers](#interface_ContactsFactory_method_getAllBlockedNumbers)  [getAllGroups](#interface_ContactsFactory_method_getAllGroups)  [getAllIce](#interface_ContactsFactory_method_getAllIce)  [getContactidsFromGroup](#interface_ContactsFactory_method_getContactidsFromGroup)  [getCount](#interface_ContactsFactory_method_getCount)  [getSpeedDials](#interface_ContactsFactory_method_getSpeedDials)  [hasNumber](#interface_ContactsFactory_method_hasNumber)  [importVcf](#interface_ContactsFactory_method_importVcf)  [remove](#interface_ContactsFactory_method_remove)  [removeBlockedNumber](#interface_ContactsFactory_method_removeBlockedNumber)  [removeGroup](#interface_ContactsFactory_method_removeGroup)  [removeIce](#interface_ContactsFactory_method_removeIce)  [removeSpeedDial](#interface_ContactsFactory_method_removeSpeedDial)  [setIce](#interface_ContactsFactory_method_setIce)  [update](#interface_ContactsFactory_method_update)  [updateGroup](#interface_ContactsFactory_method_updateGroup)  [updateSpeedDial](#interface_ContactsFactory_method_updateSpeedDial)  


  add(/* , contacts */ <a href="#dictionary_ContactInfo">[ContactInfo]</a>)

  Resolves with void

  Rejects with void

---

  addBlockedNumber(/* , number */ string)

  Resolves with void

  Rejects with void

---

  addGroup(/* , name */ string)

  Resolves with void

  Rejects with void

---

  addSpeedDial(/* , dialKey */ string/* , tel */ string/* , contactId */ string)

  Resolves with void

  Rejects with void

---

  clearContacts()

  Resolves with void

  Rejects with void

---

  find(/* , params */ <a href="#dictionary_ContactFindSortOptions">ContactFindSortOptions</a>/* , batchSize */ integer)

  Resolves with <a href="#interface_ContactCursor">ContactCursor</a>

  Rejects with void

---

  findBlockedNumbers(/* , options */ <a href="#dictionary_BlockedNumberFindOptions">BlockedNumberFindOptions</a>)

  Resolves with [string]?

  Rejects with void

---

  get(/* , id */ string/* , onlyMainData */ boolean)

  Resolves with <a href="#dictionary_ContactInfo">ContactInfo</a>

  Rejects with void

---

  getAll(/* , options */ <a href="#dictionary_ContactSortOptions">ContactSortOptions</a>/* , batchSize */ integer/* , onlyMainData */ boolean)

  Resolves with <a href="#interface_ContactCursor">ContactCursor</a>

  Rejects with void

---

  getAllBlockedNumbers()

  Resolves with [string]?

  Rejects with void

---

  getAllGroups()

  Resolves with <a href="#dictionary_GroupInfo">[GroupInfo]?</a>

  Rejects with void

---

  getAllIce()

  Resolves with <a href="#dictionary_IceInfo">[IceInfo]?</a>

  Rejects with void

---

  getContactidsFromGroup(/* , groupId */ string)

  Resolves with [string]?

  Rejects with void

---

  getCount()

  Resolves with integer

  Rejects with void

---

  getSpeedDials()

  Resolves with <a href="#dictionary_SpeedDialInfo">[SpeedDialInfo]?</a>

  Rejects with void

---

  hasNumber(/* , number */ string)

  Resolves with boolean

  Rejects with void

---

  importVcf(/* , vcf */ string)

  Resolves with integer

  Rejects with void

---

  remove(/* , contactIds */ [string])

  Resolves with void

  Rejects with void

---

  removeBlockedNumber(/* , number */ string)

  Resolves with void

  Rejects with void

---

  removeGroup(/* , id */ string)

  Resolves with void

  Rejects with void

---

  removeIce(/* , contactId */ string)

  Resolves with void

  Rejects with void

---

  removeSpeedDial(/* , dialKey */ string)

  Resolves with void

  Rejects with void

---

  setIce(/* , contactId */ string/* , position */ integer)

  Resolves with void

  Rejects with void

---

  update(/* , contacts */ <a href="#dictionary_ContactInfo">[ContactInfo]</a>)

  Resolves with void

  Rejects with void

---

  updateGroup(/* , id */ string/* , name */ string)

  Resolves with void

  Rejects with void

---

  updateSpeedDial(/* , dialKey */ string/* , tel */ string/* , contactId */ string)

  Resolves with void

  Rejects with void

---




### Events
&nbsp;&nbsp;[BLOCKEDNUMBER_CHANGE](#interface_ContactsFactory_event_BLOCKEDNUMBER_CHANGE)  [CONTACTS_CHANGE](#interface_ContactsFactory_event_CONTACTS_CHANGE)  [GROUP_CHANGE](#interface_ContactsFactory_event_GROUP_CHANGE)  [SIM_CONTACT_LOADED](#interface_ContactsFactory_event_SIM_CONTACT_LOADED)  [SPEEDDIAL_CHANGE](#interface_ContactsFactory_event_SPEEDDIAL_CHANGE)  


The BLOCKEDNUMBER_CHANGE event emits a <a href="#dictionary_BlockedNumberChangeEvent">BlockedNumberChangeEvent</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_contactsManager.addEventListener(_contactsManager.BLOCKEDNUMBER_CHANGE_EVENT, handleEvent);
_contactsManager.removeEventListener(_contactsManager.BLOCKEDNUMBER_CHANGE_EVENT, handleEvent);
```
---

The CONTACTS_CHANGE event emits a <a href="#dictionary_ContactsChangeEvent">ContactsChangeEvent</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_contactsManager.addEventListener(_contactsManager.CONTACTS_CHANGE_EVENT, handleEvent);
_contactsManager.removeEventListener(_contactsManager.CONTACTS_CHANGE_EVENT, handleEvent);
```
---

The GROUP_CHANGE event emits a <a href="#dictionary_GroupChangeEvent">GroupChangeEvent</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_contactsManager.addEventListener(_contactsManager.GROUP_CHANGE_EVENT, handleEvent);
_contactsManager.removeEventListener(_contactsManager.GROUP_CHANGE_EVENT, handleEvent);
```
---

The SIM_CONTACT_LOADED event emits a <a href="#dictionary_SimContactLoadedEvent">SimContactLoadedEvent</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_contactsManager.addEventListener(_contactsManager.SIM_CONTACT_LOADED_EVENT, handleEvent);
_contactsManager.removeEventListener(_contactsManager.SIM_CONTACT_LOADED_EVENT, handleEvent);
```
---

The SPEEDDIAL_CHANGE event emits a <a href="#dictionary_SpeedDialChangeEvent">SpeedDialChangeEvent</a>

To manage this event, use code similar to:
```javascript
function handleEvent(value) {
    ...
}
_contactsManager.addEventListener(_contactsManager.SPEEDDIAL_CHANGE_EVENT, handleEvent);
_contactsManager.removeEventListener(_contactsManager.SPEEDDIAL_CHANGE_EVENT, handleEvent);
```
---