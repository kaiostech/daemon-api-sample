/* global naviBoard, utils, AppsManagerService,
          AudioVolume, ContactsService,
          DevicecapabilityService, Power,
          SettingsService, TcpSocketService,
          TelephonyService, TimeService
*/

const App = {
  _focusIndex: 0,
  _rootTarget: document,
  _buttons: [],
  _files: null,
  item: {
    left: '',
    center: 'Enter',
    right: 'Exit',
  },
  eventHandler: (event) => {
    utils.serviceDomEventHandler(event, App);
  },
  init: async function init() {
    naviBoard.setNavigation('navigationArea');
    utils.renderSoftKey(this.item);
    const fetchList = await fetch('filesList/files.json');
    this._files = await fetchList.json();
    const buttons = Array.from(this._rootTarget.getElementsByClassName('button'));
    this._buttons = buttons;
    document.addEventListener('keydown', this.eventHandler);
    document.addEventListener('backToRoot', () => {
      naviBoard.setNavigation('navigationArea');
      utils.renderSoftKey(this.item);
      document.addEventListener('keydown', this.eventHandler);
    });
    const root = document.querySelector('#root');
    buttons.map((element) => element.addEventListener('click', () => {
      const key = element.getAttribute('key');
      console.log(`button ${key} is pressed`);
      fetch(`services/${key}/index.html`)
        .then((res) => res.text())
        .then((text) => {
          root.classList.add('hidden');
          const ele = document.createElement('element');
          ele.innerHTML = text;
          const section = ele.querySelector(`#${key}`);
          root.insertAdjacentElement('afterend', section);
          document.removeEventListener('keydown', this.eventHandler);
          naviBoard.destroyNavigation('navigationArea');
          switch (key) {
            case 'appmanager':
              utils.serviceInit(this._files.app, () => {
                AppsManagerService.init(key);
              });
              break;
            case 'audiovolumemanager':
              utils.serviceInit(this._files.audioVolume, () => {
                AudioVolume.init(key);
              });
              break;
            case 'contacts':
              utils.serviceInit(this._files.contacts, () => {
                ContactsService.init(key);
              });
              break;
            case 'devicecapability':
              utils.serviceInit(this._files.deviceCapability, () => {
                DevicecapabilityService.init(key);
              });
              break;
            case 'powermanager':
              utils.serviceInit(this._files.power, () => {
                Power.init(key);
              });
              break;
            case 'settings':
              utils.serviceInit(this._files.settings, () => {
                SettingsService.init(key);
              });
              break;
            case 'tcpsocket':
              utils.serviceInit(this._files.tcpSocket, () => {
                TcpSocketService.init(key);
              });
              break;
            case 'telephony':
              utils.serviceInit(this._files.telephony, () => {
                TelephonyService.init(key);
              });
              break;
            case 'timeservice':
              utils.serviceInit(this._files.timeService, () => {
                TimeService.init(key);
              });
              break;
            default:
              break;
          }
        });
    }));
  },
  destroy: function destroy() {
    window.close();
  },
};

window.addEventListener('load', () => {
  App.init();
});
