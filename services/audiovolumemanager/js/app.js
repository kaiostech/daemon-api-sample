/* global utils, AudioVolumeServiceManager, naviBoard */

const AudioVolume = {
  _audioVolumeService: null,
  _focusIndex: 0,
  _rootTarget: null,
  _service: '',
  _buttons: [],
  item: {
    left: '',
    center: 'Execute',
    right: 'Back',
  },
  audioVolumeChangeCallback: (data) => {
    console.log('audio volume change callback', data);
  },
  eventHandler: (event) => {
    utils.serviceDomEventHandler(event, AudioVolume);
  },
  init: function init(service) {
    utils.servicePreInit(this, service);
    naviBoard.setNavigation('audiovolumeNavigationArea');
    utils.renderSoftKey(this.item);
    this._buttons.map((element) => element.addEventListener('click', () => {
      const key = element.getAttribute('key');
      console.log(`button ${key} is pressed`);
      switch (key) {
        case 'requestVolumeUp':
          this._audioVolumeService.requestVolumeUp((status) => {
            console.log(`call requestVolumeUp status ${status}`);
          });
          break;
        case 'requestVolumeDown':
          this._audioVolumeService.requestVolumeDown((status) => {
            console.log(`call requestVolumeDown status ${status}`);
          });
          break;
        case 'requestVolumeShow':
          this._audioVolumeService.requestVolumeShow((status) => {
            console.log(`call requestVolumeShow status ${status}`);
          });
          break;
        case 'observeAudioVolumeChange':
          this._audioVolumeService.observeAudioVolumeChange(this.audioVolumeChangeCallback);
          break;
        case 'unobserveAudioVolumeChange':
          this._audioVolumeService.unobserveAudioVolumeChange(this.audioVolumeChangeCallback);
          break;
        default:
          break;
      }
    }));

    this._audioVolumeService = new AudioVolumeServiceManager();
  },
  destroy: function destroy() {
    naviBoard.destroyNavigation('audiovolumeNavigationArea');
    this._audioVolumeService.closeSession();
    utils.destroyService(this);
  },
};
