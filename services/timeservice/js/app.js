/* global utils, TimeServiceManager, naviBoard */

const TimeService = {
  _timeService: null,
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
    utils.serviceDomEventHandler(event, TimeService);
  },
  init: function init(service) {
    utils.servicePreInit(this, service);
    naviBoard.setNavigation('timeserviceNavigationArea');
    utils.renderSoftKey(this.item);
    this._buttons.map((element) => element.addEventListener('click', () => {
      const key = element.getAttribute('key');
      switch (key) {
        case 'getTime':
          this._timeService.getTime((status, date) => {
            console.log(`call getTime status ${status} date:${date}`);
          });
          break;
        case 'setTime':
          this._timeService.setTime((status) => {
            console.log(`call setTime status '}${status}`);
          });
          break;
        case 'getElapsedRealTime':
          this._timeService.getElapsedRealTime((status) => {
            console.log('call getElapsedRealTime status', status);
          });
          break;
        case 'setTimezone':
          this._timeService.setTimezone('Asia/Taipei', (status) => {
            console.log('call setTimezone status', status);
          });
          break;
        case 'observeTimeChange':
          this._timeService.observeTimeChange((status) => {
            console.log('call observeTimeChange status', status);
          });
          break;
        case 'unobserveTimeChange':
          this._timeService.unobserveTimeChange((status) => {
            console.log('call unobserveTimeChange status', status);
          });
          break;
        case 'observeTimezoneChange':
          this._timeService.observeTimezoneChange((status) => {
            console.log('call observeTimezoneChange status', status);
          });
          break;
        case 'unobserveTimezoneChange':
          this._timeService.unobserveTimezoneChange((status) => {
            console.log('call unobserveTimezoneChange status', status);
          });
          break;
        default:
          break;
      }
    }));
    this._timeService = new TimeServiceManager();
  },
  destroy: function destroy() {
    naviBoard.destroyNavigation('timeserviceNavigationArea');
    utils.destroyService(this);
    this._timeService.closeSession();
  },
};
