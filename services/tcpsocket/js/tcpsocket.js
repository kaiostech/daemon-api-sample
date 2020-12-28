/* global lib_session, lib_tcpsocket */

(function (exports) {
  let _tcpSpcket = null;
  let _socket = null;
  let session = null;

  /**
   * lib_session
   * lib_tcpsocket.TcpSocketManager
   *
   * */

  function TcpSocketServiceManager() {
    session = new lib_session.Session();
    const sessionstate = {};

    sessionstate.onsessionconnected = function () {
      console.log('[TcpSocketServiceManager] onsessionconnected');
      lib_tcpsocket.TcpSocketManager.get(session)
        .then((tcpSpcketService) => {
          console.log(`Got tcpSocketService : #${tcpSpcketService.service_id}`);
          _tcpSpcket = tcpSpcketService;
        }).catch((e) => {
          console.log(`Error calling tcpSocket service${JSON.stringify(e)}`);
          _tcpSpcket = null;
        });
    };

    sessionstate.onsessiondisconnected = function () {
      console.log(
        '[TcpSocketServiceManager] onsessiondisconnected Daemon Crashed',
      );
    };

    // On desktop version, set ENV WS_RUNTIME_TOKEN=secrettoken
    session.open(
      'websocket',
      'localhost',
      'secrettoken',
      sessionstate,
      true,
    );
  }

  TcpSocketServiceManager.prototype = {
    open: function open(port, callback) {
      _tcpSpcket.open(port).then((socket) => {
        _socket = socket;
        callback('success', socket);
      }, (e) => {
        callback('error', e);
      });
    },

    send: async function send(buff) {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      try {
        const bool = await _socket.send(buff);
        console.log('data sent successfully,', bool);
        _socket = null;
      } catch (e) {
        console.log('data sent error,', e);
      }
    },

    suspend: async function suspend() {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      try {
        const res = await _socket.suspend();
        console.log('suspend successfully,', res);
      } catch (e) {
        console.log('suspend error,', e);
      }
    },

    resume: async function resume() {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      try {
        const res = await _socket.resume();
        console.log('resume successfully,', res);
      } catch (e) {
        console.log('resume error,', e);
      }
    },

    close: async function close() {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      try {
        const res = await _socket.close();
        console.log('close successfully,', res);
        _socket = null;
      } catch (e) {
        console.log('close error,', e);
      }
    },

    observeClose: function observeClose(callback) {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      _socket.addEventListener(
        _socket.CLOSE_EVENT,
        callback,
      );
      console.log('start observeClose');
    },

    unobserveClose: function unobserveClose(callback) {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      _socket.removeEventListener(
        _socket.CLOSE_EVENT,
        callback,
      );
      console.log('stop observeClose');
    },

    observeDataChange: function observeDataChange(callback) {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      _socket.addEventListener(
        _socket.CLOSE_EVENT,
        callback,
      );
      console.log('start observeDataChange');
    },

    unobserveDataChange: function unobserveDataChange(callback) {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      _socket.removeEventListener(
        _socket.DATA_EVENT,
        callback,
      );
      console.log('stop observeDataChange');
    },

    observeDrain: function observeDrain(callback) {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      _socket.addEventListener(
        _socket.DRAIN_EVENT,
        callback,
      );
      console.log('start observeDrain');
    },

    unobserveDrain: function unobserveDrain(callback) {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      _socket.removeEventListener(
        _socket.DRAIN_EVENT,
        callback,
      );
      console.log('stop observeDrain');
    },

    observeError: function observeError(callback) {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      _socket.addEventListener(
        _socket.ERROR_EVENT,
        callback,
      );
      console.log('start observeError');
    },

    unobserveError: function unobserveError(callback) {
      if (!_socket) {
        console.error('Please open socket first');
        return;
      }
      _socket.removeEventListener(
        _socket.ERROR_EVENT,
        callback,
      );
      console.log('stop observeError');
    },

    closeSession: async function closeSession() {
      if (session) {
        session.close();
        console.log('[TcpSocketServiceManager] session successfully closed');
        session = null;
      }
    },
  };
  exports.TcpSocketServiceManager = TcpSocketServiceManager;
}(window));
