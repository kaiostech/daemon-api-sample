/* global utils, PowerServiceManager, naviBoard */

const Power = {
  _powerService: null,
  _screenEnabled: true,
  _extScreenEnabled: true,
  _keyLightEnabled: true,
  _cpuSleepAllowed: true,
  _focusIndex: 0,
  _rootTarget: null,
  _service: '',
  _buttons: [],
  item: {
    left: '',
    center: 'Execute',
    right: 'Back',
  },
  eventHandler: (event) => {
    utils.serviceDomEventHandler(event, Power);
  },
  init: function init(service) {
    utils.servicePreInit(this, service);
    naviBoard.setNavigation('powermanagerNavigationArea');
    utils.renderSoftKey(this.item);
    this._buttons.map((element) => element.addEventListener('click', () => {
      const key = element.getAttribute('key');
      console.log(`button ${key} is pressed`);
      switch (key) {
        case 'powerOff':
          this._powerService.powerOff((result) => {
            console.log(`call powerOff ${result.status}`);
          });
          break;
        case 'reboot':
          this._powerService.reboot((result) => {
            console.log(`call reboot ${result.status}`);
          });
          break;
        case 'factoryReset':
          this._powerService.factoryReset('normal');
          console.log('call factoryReset normal');
          break;
        case 'getScreenEnabled':
          this._powerService.getScreenEnabled((enabled, status) => {
            console.log(`call getScreenEnabled ${enabled} status ${status}`);
          });
          break;
        case 'setScreenEnabled':
          this._powerService.setScreenEnabled(this._screenEnabled);
          console.log(`call setScreenEnabled ${this._screenEnabled}`);
          this._screenEnabled = !this._screenEnabled;
          break;
        case 'getExtScreenEnabled':
          this._powerService.getExtScreenEnabled((enabled, status) => {
            console.log(`call getExtScreenEnabled ${enabled} status ${status}`);
          });
          break;
        case 'setExtScreenEnabled':
          this._powerService.setExtScreenEnabled(this._extScreenEnabled);
          console.log(`call setExtScreenEnabled ${this._extScreenEnabled}`);
          this._extScreenEnabled = !this._extScreenEnabled;
          break;
        case 'getKeyLightEnabled':
          this._powerService.getKeyLightEnabled((enabled, status) => {
            console.log(`call getKeyLightEnabled = ${enabled} status ${status}`);
          });
          break;
        case 'setKeyLightEnabled':
          this._powerService.setKeyLightEnabled(this._keyLightEnabled);
          console.log(`call setKeyLightEnabled ${this._keyLightEnabled}`);
          this._keyLightEnabled = !this._keyLightEnabled;
          break;
        case 'getScreenBrightness':
          this._powerService.getScreenBrightness((brightness, status) => {
            console.log(`call getScreenBrightness ${brightness} status ${status}`);
          });
          break;
        case 'setScreenBrightness':
          this._powerService.setScreenBrightness(80);
          console.log('setScreenBrightness to 80');
          setTimeout(() => {
            this._powerService.setScreenBrightness(40);
            console.log('setScreenBrightness to 40');
          }, 2000);
          break;
        case 'getExtScreenBrightness':
          this._powerService.getExtScreenBrightness((brightness, status) => {
            console.log(`call getExtScreenBrightness ${brightness} status ${status}`);
          });
          break;
        case 'setExtScreenBrightness':
          this._powerService.setExtScreenBrightness(50);
          console.log('call setExtScreenBrightness 50');
          break;
        case 'getKeyLightBrightness':
          this._powerService.getKeyLightBrightness((brightness, status) => {
            console.log(`call getKeyLightBrightness ${brightness} status ${status}`);
          });
          break;
        case 'setKeyLightBrightness':
          this._powerService.setKeyLightBrightness(5);
          console.log('call setKeyLightBrightness 5');
          break;
        case 'getCpuSleepAllowed':
          this._powerService.getCpuSleepAllowed((enabled, status) => {
            console.log(`call getCpuSleepAllowed ${enabled} status ${status}`);
          });
          break;
        case 'setCpuSleepAllowed':
          this._powerService.setCpuSleepAllowed(this._cpuSleepAllowed);
          console.log(`call setCpuSleepAllowed ${this._cpuSleepAllowed}`);
          this._cpuSleepAllowed = !this._cpuSleepAllowed;
          break;
        default:
          break;
      }
    }));

    this._powerService = new PowerServiceManager();
  },
  destroy: function destroy() {
    naviBoard.destroyNavigation('powermanagerNavigationArea');
    utils.destroyService(this);
    this._powerService.closeSession();
  },
};
