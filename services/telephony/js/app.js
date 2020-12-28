/* global utils, TelephonyServiceManager, lib_telephony, naviBoard */

const TelephonyService = {
  _telephonyService: null,
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
    utils.serviceDomEventHandler(event, TelephonyService);
  },
  callback: (result) => {
    console.log('observeCallStateChange callback, result:', result);
  },
  init: function init(service) {
    utils.servicePreInit(this, service);
    naviBoard.setNavigation('telephonyNavigationArea');
    utils.renderSoftKey(this.item);
    this._buttons.map((element) => element.addEventListener('click', () => {
      const key = element.getAttribute('key');
      console.log(`button ${key} is pressed`);
      switch (key) {
        case 'setCallState':
          this._telephonyService.setCallState(lib_telephony.CallState.RINGING);
          break;
        case 'getCallState':
          this._telephonyService.getCallState((status, state) => {
            console.log(`call callState status ${status} state:${state}`);
            console.log(lib_telephony.CallState);
          });
          break;
        case 'observeCallStateChange':
          this._telephonyService.observeCallStateChange(this.callback);
          break;
        case 'unobserveCallStateChange':
          this._telephonyService.unobserveCallStateChange(this.callback);
          break;
        default:
          break;
      }
    }));

    this._telephonyService = new TelephonyServiceManager();
  },
  destroy: function destroy() {
    naviBoard.destroyNavigation('telephonyNavigationArea');
    utils.destroyService(this);
    this._telephonyService.closeSession();
  },
};
