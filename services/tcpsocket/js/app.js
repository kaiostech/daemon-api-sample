/* global utils, TcpSocketServiceManager, naviBoard */

const TcpSocketService = {
  _tcpSocketService: null,
  _focusIndex: 0,
  _rootTarget: null,
  _service: '',
  _buttons: [],
  item: {
    left: '',
    center: 'Execute',
    right: 'Back',
  },
  dataChangeCallback: (data) => {
    console.log('data change callback', data);
  },
  closeCallback: () => {
    console.log('close callback');
  },
  drainCallback: (res) => {
    console.log('drain callback', res);
  },
  errorCallback: (e) => {
    console.log('error callback', e);
  },
  eventHandler: (event) => {
    utils.serviceDomEventHandler(event, TcpSocketService);
  },
  init: function init(service) {
    utils.servicePreInit(this, service);
    naviBoard.setNavigation('tcpsocketNavigationArea');
    utils.renderSoftKey(this.item);
    this._buttons.map((element) => element.addEventListener('click', () => {
      const key = element.getAttribute('key');
      console.log(`button ${key} is pressed`);
      switch (key) {
        case 'open': {
          const port = {
            host: '127.0.0.1',
            port: 80,
          };
          this._tcpSocketService.open(port, (status, res) => {
            console.log(`call tcpSocket open interface status ${status}`, res);
          });
          break;
        }
        case 'send': {
          const enc = new TextEncoder('utf-8');
          const buff = enc.encode('test tcpsocket send');
          this._tcpSocketService.send(buff);
          break;
        }
        case 'observeDataChange': {
          this._tcpSocketService.observeDataChange(this.dataChangeCallback);
          break;
        }
        case 'unobserveDataChange': {
          this._tcpSocketService.unobserveDataChange(this.dataChangeCallback);
          break;
        }
        case 'suspend': {
          this._tcpSocketService.suspend();
          break;
        }
        case 'resume': {
          this._tcpSocketService.resume();
          break;
        }
        case 'close': {
          this._tcpSocketService.close();
          break;
        }
        case 'observeClose': {
          this._tcpSocketService.observeClose(this.closeCallback);
          break;
        }
        case 'unobserveClose': {
          this._tcpSocketService.unobserveClose(this.closeCallback);
          break;
        }
        case 'observeDrain': {
          this._tcpSocketService.observeDrain(this.drainCallback);
          break;
        }
        case 'unobserveDrain': {
          this._tcpSocketService.unobserveDrain(this.drainCallback);
          break;
        }
        case 'observeError': {
          this._tcpSocketService.observeError(this.errorCallback);
          break;
        }
        case 'unobserveError': {
          this._tcpSocketService.unobserveError(this.errorCallback);
          break;
        }
        default:
          break;
      }
    }));

    this._tcpSocketService = new TcpSocketServiceManager();
  },
  destroy: function destroy() {
    naviBoard.destroyNavigation('tcpsocketNavigationArea');
    utils.destroyService(this);
    this._tcpSocketService.closeSession();
  },
};
