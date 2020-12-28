/* global lib_session, lib_contacts */

(function (exports) {
  let _contactsService = null;
  let session = null;

  /**
   * lib_contacts
   * lib_contacts.ContactsManager
   * */

  function ContactsServiceManager() {
    session = new lib_session.Session();
    const sessionstate = {};

    sessionstate.onsessionconnected = function () {
      console.log('[ContactsServiceManager] onsessionconnected');
      lib_contacts.ContactsManager.get(session).then((contacts) => {
        console.log(`Got ContactsService : #${contacts.service_id}`);
        _contactsService = contacts;
      }).catch((e) => {
        console.log(`Error calling ContactsService service${JSON.stringify(e)}`);
        _contactsService = null;
      });
    };

    sessionstate.onsessiondisconnected = function () {
      console.log('[ContactsServiceManager] onsessiondisconnected Daemon Crashed');
    };

    // On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
    session.open('websocket', 'localhost', 'secrettoken', sessionstate, true);
  }

  ContactsServiceManager.prototype = {
    add: function set(contact, callback) {
      _contactsService.add(contact).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    getAll: function getAll(options, batchSize, onlyMainData, callback) {
      _contactsService.getAll(options, batchSize, onlyMainData).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    getCount: function getCount(callback) {
      _contactsService.getCount().then((date) => {
        callback('success', date);
      }, () => {
        callback('error');
      });
    },

    addBlockedNumber: function addBlockedNumber(number, callback) {
      _contactsService.addBlockedNumber(number).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    addGroup: function addGroup(name, callback) {
      _contactsService.addGroup(name).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    addSpeedDial: function addSpeedDial(dialKey, tel, contactId, callback) {
      _contactsService.addSpeedDial(dialKey, tel, contactId).then((data) => {
        callback(`success:${data}`);
      }, () => {
        callback('error: please remove SpeedDial first');
      });
    },

    clearContacts: function clearContacts(callback) {
      _contactsService.clearContacts().then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    find: function find(params, batchSize, callback) {
      _contactsService.find(params, batchSize).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    findBlockedNumbers: function findBlockedNumbers(options, callback) {
      _contactsService.findBlockedNumbers(options).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    get: function get(id, onlyMainData, callback) {
      _contactsService.get(id, onlyMainData).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    getAllBlockedNumbers: function getAllBlockedNumbers(callback) {
      _contactsService.getAllBlockedNumbers().then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    getAllGroups: function getAllGroups(callback) {
      _contactsService.getAllGroups().then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    getAllIce: function getAllIce(callback) {
      _contactsService.getAllIce().then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    getContactidsFromGroup: function getContactidsFromGroup(groupId, callback) {
      _contactsService.getContactidsFromGroup(groupId).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    getSpeedDials: function getSpeedDials(callback) {
      _contactsService.getSpeedDials().then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    importVcf: function importVcf(vcf, callback) {
      _contactsService.importVcf(vcf).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    remove: function remove(contactIds, callback) {
      _contactsService.remove(contactIds).then((data) => {
        callback(`success:${data}`);
      }, () => {
        callback('error:Db side will remove nothing when provide a none exist contact id');
      });
    },

    removeBlockedNumber: function removeBlockedNumber(number, callback) {
      _contactsService.removeBlockedNumber(number).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    removeGroup: function removeGroup(id, callback) {
      _contactsService.removeGroup(id).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    removeIce: function removeIce(id, callback) {
      _contactsService.removeIce(id).then((data) => {
        callback(`success:data:${data}`);
      }, () => {
        callback("error:can't removeIce with invalid contact id");
      });
    },

    removeSpeedDial: function removeSpeedDial(dialKey, callback) {
      _contactsService.removeSpeedDial(dialKey).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    setIce: function setIce(contactId, position, callback) {
      _contactsService.setIce(contactId, position).then(() => {
        callback('success');
      }, () => {
        callback("error:can't setIce with invalid contact id/position");
      });
    },

    update: function update(contacts, callback) {
      _contactsService.update(contacts).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    updateGroup: function updateGroup(id, name, callback) {
      _contactsService.updateGroup(id, name).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    updateSpeedDial: function updateSpeedDial(dialKey, tel, contactId, callback) {
      _contactsService.updateSpeedDial(dialKey, tel, contactId).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    observeBlockedNumberChange: function observeBlockedNumberChange(callback) {
      _contactsService.addEventListener(
        _contactsService.BLOCKEDNUMBER_CHANGE_EVENT,
        callback,
      );
      console.log('start observeBlockedNumberChange');
    },

    unobserveBlockedNumberChange: function unobserveBlockedNumberChange(callback) {
      _contactsService.removeEventListener(
        _contactsService.BLOCKEDNUMBER_CHANGE_EVENT,
        callback,
      );
      console.log('stop observeBlockedNumberChange');
    },

    observeContactsChange: function observeContactsChange(callback) {
      _contactsService.addEventListener(
        _contactsService.CONTACTS_CHANGE_EVENT,
        callback,
      );
      console.log('start observeContactsChange');
    },

    unobserveContactsChange: function unobserveContactsChange(callback) {
      _contactsService.removeEventListener(
        _contactsService.CONTACTS_CHANGE_EVENT,
        callback,
      );
      console.log('stop observeContactsChange');
    },

    observeGroupChange: function observeGroupChange(callback) {
      _contactsService.addEventListener(
        _contactsService.GROUP_CHANGE_EVENT,
        callback,
      );
      console.log('start observeGroupChange');
    },

    unobserveGroupChange: function unobserveGroupChange(callback) {
      _contactsService.removeEventListener(
        _contactsService.GROUP_CHANGE_EVENT,
        callback,
      );
      console.log('stop observeGroupChange');
    },

    observeSpeeddialChange: function observeSpeeddialChange(callback) {
      _contactsService.addEventListener(
        _contactsService.SPEEDDIAL_CHANGE_EVENT,
        callback,
      );
      console.log('start observeSpeeddialChange');
    },

    unobserveSpeeddialChange: function unobserveSpeeddialChange(callback) {
      _contactsService.removeEventListener(
        _contactsService.SPEEDDIAL_CHANGE_EVENT,
        callback,
      );
      console.log('stop observeSpeeddialChange');
    },

    closeSession: function closeSession() {
      if (session) {
        session.close();
        console.log('[ContactsServiceManager] session successfully closed');
        session = null;
      }
    },
  };
  exports.ContactsServiceManager = ContactsServiceManager;
}(window));
