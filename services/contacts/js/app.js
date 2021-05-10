/* global utils, ContactsServiceManager, naviBoard, lib_contacts */

const ContactsService = {
  _contactsService: null,
  _focusIndex: 0,
  _rootTarget: null,
  _service: '',
  _buttons: [],
  item: {
    left: '',
    center: 'Execute',
    right: 'Back',
  },
  blockedNumberChangeCallback: () => {
    console.log('blocked number change callback');
  },
  contactsChangeCallback: () => {
    console.log('contacts change callback');
  },
  groupChangeCallback: () => {
    console.log('group change callback');
  },
  speeddialChangeCallback: () => {
    console.log('speeddial change callback');
  },
  eventHandler: (event) => {
    utils.serviceDomEventHandler(event, ContactsService);
  },
  init: function init(service) {
    utils.servicePreInit(this, service);
    naviBoard.setNavigation('contactsNavigationArea');
    utils.renderSoftKey(this.item);
    this._buttons.map((element) => element.addEventListener('click', async () => {
      const key = element.getAttribute('key');
      console.log(`button ${key} is pressed`);
      const contact1 = {
        id: '',
        published: new Date(),
        updated: new Date(),
        bday: new Date(),
        anniversary: new Date(),
        sex: 'man',
        genderIdentity: '456',
        ringtone: '789',
        photoType: 'jpeg',
        photoBlob: [],
        addresses: [{ streetAddress: 'TIAN WANG GAI DIHU', countryName: 'China' }],
        email: [{ type: 'office', value: 'test@mail.com', pref: false }],
        url: [{ type: 'home', value: 'www.kaiostech.com', pref: true }],
        name: 'Ted',
        tel: [{
          type: 'student', value: '6666666', pref: true, carrier: 'china mobile',
        }, {
          type: 'student', value: '181777777', pref: true, carrier: 'china mobile',
        },
        {
          type: 'student', value: '9999181', pref: true, carrier: 'china mobile',
        }],
        honorificPrefix: ['Great'],
        givenName: 'LTed',
        phoneticGivenName: 'test',
        additionalName: ['d', 'ffffffffff'],
        familyName: 'Big',
        phoneticFamilyName: 'HAHAHAHAHAHA',
        honorificSuffix: ['x'],
        nickname: ['zxzxzxzxzxzxzx'],
        category: ['device', 'favorite'],
        org: ['kaios'],
        jobTitle: ['engineer'],
        note: ['hello world', 'JK'],
        groups: [],
      };

      const contact2 = {
        id: '',
        published: new Date(),
        updated: new Date(),
        bday: new Date(),
        anniversary: new Date(),
        sex: 'man',
        genderIdentity: 'gender',
        ringtone: '000',
        photoType: 'jpeg',
        photoBlob: [],
        addresses: [{ streetAddress: '', countryName: 'Uk' }],
        email: [{ type: 'office', value: 'hp@mail.com', pref: false }],
        url: [{ type: 'home', value: 'www.os.com', pref: true }],
        name: 'HP',
        tel: [{
          type: 'student', value: '999999', pref: true, carrier: 'china unicom',
        }],
        honorificPrefix: ['honour'],
        givenName: 'bob',
        phoneticGivenName: 'given',
        additionalName: ['bbd', '00000000000000000000000'],
        familyName: 'Wang',
        phoneticFamilyName: 'SSS',
        honorificSuffix: ['ss'],
        nickname: ['w'],
        category: ['device', 'sim', 'favorite'],
        org: ['kaiorg'],
        jobTitle: ['pm', 'engineer'],
        note: ['hello', 'world'],
        groups: [],
      };

      switch (key) {
        case 'add': {
          this._contactsService.add([contact1], (status) => {
            console.log(`call add status ${status}`);
          });
          this._contactsService.add([contact2], (status) => {
            console.log(`call add status ${status}`);
          });
          break;
        }
        case 'getAll':
          this._contactsService.getAll({
            sortBy: lib_contacts.SortOption.FAMILY_NAME,
            sortOrder: lib_contacts.Order.DESCENDING,
          }, 2, false, (cursor) => {
            const fetchData = () => {
              cursor
                .next()
                .then(contacts => {
                  this._contacts = this._contacts.concat(contacts);
                  console.log('fetching');
                  fetchData();
                })
                .catch(error => {
                  cursor.release();
                  console.log('All contacts fetched:', this._contacts);
                });
            };
            fetchData();
          });
          break;
        case 'getCount':
          this._contactsService.getCount((status, date) => {
            console.log(`call getCount status ${status} date:${date}`);
          });
          break;
        case 'addBlockedNumber':
          this._contactsService.addBlockedNumber('2226662222', (status) => {
            console.log(`call addBlockedNumber status ${status}`);
          });
          break;
        case 'addGroup':
          this._contactsService.addGroup('colleague', (status) => {
            console.log(`call addGroup status ${status}`);
          });
          break;
        case 'addSpeedDial':
          this._contactsService.addSpeedDial('2', '18712345678', '11', (status) => {
            console.log(`call addSpeedDial status ${status}`);
          });
          break;
        case 'clearContacts':
          this._contactsService.clearContacts((status) => {
            console.log(`call clearContacts status ${status}`);
          });
          break;
        case 'find':
          this._contactsService.find({
            sortBy: lib_contacts.SortOption.NAME,
            sortOrder: lib_contacts.Order.ASCENDING,
            filterValue: 'wil',
            filterOption: lib_contacts.FilterOption.CONTAINS,
            filterBy: [lib_contacts.FilterByOption.NAME],
            onlyMainData: false,
          }, 20, (cursor) => {
            const fetchData = () => {
              cursor
                .next()
                .then(contacts => {
                  this._contacts = this._contacts.concat(contacts);
                  console.log('fetching');
                  fetchData();
                })
                .catch(error => {
                  cursor.release();
                  console.log('All contacts find', this._contacts);
                });
            };
            fetchData();
          });
          break;
        case 'findBlockedNumbers':
          this._contactsService.findBlockedNumbers({ filterValue: '444', filterOption: 3 }, (status) => {
            console.log(`call findBlockedNumbers status ${status}`);
          });
          break;
        case 'get':
          this._contactsService.get('2', false, (status) => {
            console.log(`call get status ${status}`);
          });
          break;
        case 'getAllBlockedNumbers':
          this._contactsService.getAllBlockedNumbers((status) => {
            console.log(`call getAllBlockedNumbers status ${status}`);
          });
          break;
        case 'getAllGroups':
          this._contactsService.getAllGroups((status) => {
            console.log(`call getAllGroups status ${status}`);
          });
          break;
        case 'getAllIce':
          this._contactsService.getAllIce((status) => {
            console.log(`call getAllIce status ${status}`);
          });
          break;
        case 'getContactidsFromGroup':
          this._contactsService.getContactidsFromGroup('1', (status) => {
            console.log(`call getContactidsFromGroup status ${status}`);
          });
          break;
        case 'getSpeedDials':
          this._contactsService.getSpeedDials((status) => {
            console.log(`call getSpeedDials status ${status}`);
          });
          break;
        case 'importVcf':
          this._contactsService.importVcf(`
            BEGIN:VCARD
            VERSION:3.0
            n:Card;Adam;L.;;;
            FN:Adam L. Card
            NICKNAME:
            CATEGORY:
            ORG:Life Map
            TITLE:Timekeeper
            NOTE:
            BDAY:1955-08-14T00:00:00Z
            EMAIL;TYPE=:AdamLCard@trashymail.com
            TEL;TYPE=:0267397915
            ADR:;;71 Plug Street;PARADISE;NSW;2360;Australia
            END:VCARD
            BEGIN:VCARD`, (status) => {
            console.log(`call importVcf status ${status}`);
          });
          break;
        case 'remove':
          this._contactsService.remove(['1', '6'], (status) => {
            console.log(`call remove status ${status}`);
          });
          break;
        case 'removeBlockedNumber':
          this._contactsService.removeBlockedNumber('1111111111', (status) => {
            console.log(`call removeBlockedNumber status ${status}`);
          });
          break;
        case 'removeGroup':
          this._contactsService.removeGroup('2', (status) => {
            console.log(`call removeGroup status ${status}`);
          });
          break;
        case 'removeIce':
          this._contactsService.removeIce('1', (status) => {
            console.log(`call removeIce status ${status}`);
          });
          break;
        case 'removeSpeedDial':
          this._contactsService.removeSpeedDial('2', (status) => {
            console.log(`call removeSpeedDial status ${status}`);
          });
          break;
        case 'setIce':
          this._contactsService.setIce('1', 1, (status) => {
            console.log(`call setIce status ${status}`);
          });
          break;
        case 'update':
          this._contactsService.update([contact1, contact2], (status) => {
            console.log(`call update status ${status}`);
          });
          break;
        case 'updateGroup':
          this._contactsService.updateGroup('0', 'student', (status) => {
            console.log(`call updateGroup status ${status}`);
          });
          break;
        case 'updateSpeedDial':
          this._contactsService.updateSpeedDial('3', '18787654321', '13', (status) => {
            console.log(`call updateSpeedDial status ${status}`);
          });
          break;
        case 'observeBlockedNumberChange':
          this._contactsService
            .observeBlockedNumberChange(this.blockedNumberChangeCallback);
          break;
        case 'unobserveBlockedNumberChange':
          this._contactsService
            .unobserveBlockedNumberChange(this.blockedNumberChangeCallback);
          break;
        case 'observeContactsChange':
          this._contactsService
            .observeContactsChange(this.contactsChangeCallback);
          break;
        case 'unobserveContactsChange':
          this._contactsService
            .unobserveContactsChange(this.contactsChangeCallback);
          break;
        case 'observeGroupChange':
          this._contactsService
            .observeGroupChange(this.groupChangeCallback);
          break;
        case 'unobserveGroupChange':
          this._contactsService
            .unobserveGroupChange(this.groupChangeCallback);
          break;
        case 'observeSpeeddialChange':
          this._contactsService
            .observeSpeeddialChange(this.speeddialChangeCallback);
          break;
        case 'unobserveSpeeddialChange':
          this._contactsService
            .unobserveSpeeddialChange(this.speeddialChangeCallback);
          break;
        default:
          break;
      }
    }));

    this._contactsService = new ContactsServiceManager();
  },
  destroy: function destroy() {
    naviBoard.destroyNavigation('contactsNavigationArea');
    this._contactsService.closeSession();
    utils.destroyService(this);
  },
};
