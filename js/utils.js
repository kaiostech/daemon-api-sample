/* global LazyLoader, naviBoard */

// eslint-disable-next-line no-unused-vars
const utils = {
  backToRoot: (key) => {
    document.querySelector(`#${key}`).remove();
    document.querySelector('#root').classList.remove('hidden');
    const event = new Event('backToRoot');
    document.dispatchEvent(event);
  },

  destroyService: (self) => {
    self._appsManagerService = null;
    self._focusIndex = 0;
    self._rootTarget = null;
    document.removeEventListener('keydown', self.eventHandler);
    utils.backToRoot(self._service);
  },

  servicePreInit: (self, service) => {
    self._service = service;
    self._rootTarget = document.getElementById(service).querySelector('.test-area');
    console.log(`${service} init...`);
    const buttons = Array.from(self._rootTarget.getElementsByClassName('button'));
    self._buttons = buttons;
    document.addEventListener('keydown', self.eventHandler);
  },

  serviceInit: (filesNeededLoad, cb) => {
    LazyLoader.load(filesNeededLoad, () => {
      cb();
    });
  },

  serviceDomEventHandler: (event, service) => {
    const { key } = event;
    console.log(key);
    event.stopPropagation();
    event.preventDefault();
    switch (key) {
      case 'Enter':
        naviBoard.getActiveElement().click();
        break;
      case 'SoftRight':
      case 'Backspace':
        service.destroy();
        break;
      default:
        break;
    }
  },

  renderSoftKey: (item) => {
    const root = document.getElementById('softKey');
    root.innerHTML = '';

    const leftEle = document.createElement('button');
    leftEle.className = 'left';
    // eslint-disable-next-line no-unused-expressions
    item.left && (leftEle.innerText = item.left);
    root.appendChild(leftEle);

    const centerEle = document.createElement('button');
    centerEle.className = 'center';
    // eslint-disable-next-line no-unused-expressions
    item.center && (centerEle.innerText = item.center);
    root.appendChild(centerEle);

    const rightEle = document.createElement('button');
    rightEle.className = 'right';
    // eslint-disable-next-line no-unused-expressions
    item.right && (rightEle.innerText = item.right);
    root.appendChild(rightEle);
  },
};
