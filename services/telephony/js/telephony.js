/* global lib_session, lib_telephony */

(function (exports) {
  let _telephonyService = null;
  let session = null;
  /**
   * lib_session
   * lib_telephony.Telephony
   * lib_telephony.telephonyService
   *
   * */

  function TelephonyServiceManager() {
    session = new lib_session.Session();
    const sessionstate = {};

    sessionstate.onsessionconnected = function () {
      console.log('[TelephonyServiceManager] onsessionconnected');
      lib_telephony.Telephony.get(session).then((telephonyService) => {
        console.log(`Got telephonyService : #${telephonyService.service_id}`);
        _telephonyService = telephonyService;
      }).catch((e) => {
        console.log(
          `Error calling telephonyService service${JSON.stringify(e)}`,
        );
        _telephonyService = null;
      });
    };

    sessionstate.onsessiondisconnected = function () {
      console.log(
        '[TelephonyServiceManager] onsessiondisconnected Daemon Crashed',
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

  TelephonyServiceManager.prototype = {
    setCallState: function setCallState(value) {
      _telephonyService.callState = value;
      console.log('set callState to', value);
    },

    getCallState: function getCallState(callback) {
      _telephonyService.callState.then((state) => {
        callback('success', state);
      }, () => {
        callback('error');
      });
    },

    observeCallStateChange: function observeCallStateChange(callback) {
      _telephonyService.addEventListener(
        _telephonyService.CALLSTATE_CHANGE_EVENT,
        callback,
      );
      console.log('added observer');
    },

    unobserveCallStateChange: function unobserveCallStateChange(callback) {
      _telephonyService.removeEventListener(
        _telephonyService.CALLSTATE_CHANGE_EVENT,
        callback,
      );
      console.log('removed observer');
    },

    closeSession: function closeSession() {
      if (session) {
        session.close();
        console.log('[TelephonyServiceManager] session successfully closed');
        session = null;
      }
    },
  };
  exports.TelephonyServiceManager = TelephonyServiceManager;
}(window));
