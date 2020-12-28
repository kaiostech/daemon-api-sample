/* global lib_session, lib_time */

(function (exports) {
  let _timeServiceManager = null;
  let observer = null;
  let session = null;

  /**
   * lib_session
   * lib_time.TimeService
   * lib_time.timeService
   *
   * */

  function createObserver() {
    class Observer extends lib_time.TimeObserverBase {
      // eslint-disable-next-line no-shadow
      constructor(service, session) {
        super(service.id, session);
        this.timechangedTimes = 0;
        this.timezonechangedTimes = 0;
      }

      // eslint-disable-next-line class-methods-use-this
      display() {
        return 'Time observer';
      }

      // eslint-disable-next-line class-methods-use-this
      callback(reason) {
        console.log(`MyObserver::callback${JSON.stringify(reason)}`);
        if (reason.reason === lib_time.CallbackReason.TIME_CHANGED) {
          // eslint-disable-next-line no-plusplus
          this.timechangedTimes++;
        } else if (reason.reason === lib_time.CallbackReason.TIMEZONE_CHANGED) {
          // eslint-disable-next-line no-plusplus
          this.timezonechangedTimes++;
        }
        return Promise.resolve('MyObserver success');
      }

      resolve() {
        return Promise.resolve([this.timechangedTimes, this.timezonechangedTimes]);
      }
    }
    observer = new Observer(_timeServiceManager, session);
  }

  function TimeServiceManager() {
    session = new lib_session.Session();
    const sessionstate = {};

    sessionstate.onsessionconnected = function () {
      console.log('[TimeServiceManager] onsessionconnected');
      lib_time.TimeService.get(session).then((timeService) => {
        console.log(`Got TimeService : #${timeService.service_id}`);
        _timeServiceManager = timeService;
        createObserver();
      }).catch((e) => {
        console.log(`Error calling TimeService service${JSON.stringify(e)}`);
        _timeServiceManager = null;
      });
    };

    sessionstate.onsessiondisconnected = function () {
      console.log('[TimeServiceManager] onsessiondisconnected Daemon Crashed');
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

  TimeServiceManager.prototype = {
    getTime: function getTime(callback) {
      _timeServiceManager.get().then((date) => {
        callback('success', date);
      }, () => {
        callback('error');
      });
    },

    setTime: function setTime(callback) {
      _timeServiceManager.set(new Date('2020-12-17T03:24:00')).then(() => {
        callback('success');
      }, () => {
        callback('error');
      });
    },

    getElapsedRealTime: function getElapsedRealTime(callback) {
      _timeServiceManager.getElapsedRealTime().then((result) => {
        callback(result);
      }, (e) => {
        callback(e);
      });
    },

    setTimezone: function setTimezone(timezone, callback) {
      _timeServiceManager.setTimezone(timezone).then(() => {
        callback('success');
      }, (e) => {
        callback(e);
      });
    },

    observeTimeChange: function observeTimeChange(callback) {
      _timeServiceManager.addObserver(lib_time.CallbackReason.TIME_CHANGED, observer)
        .then(() => {
          callback('success');
        }, (e) => {
          callback(e);
        });
    },

    unobserveTimeChange: function unobserveTimeChange(callback) {
      _timeServiceManager.removeObserver(lib_time.CallbackReason.TIME_CHANGED, observer)
        .then(() => {
          callback('success');
        }, (e) => {
          callback(e);
        });
    },

    observeTimezoneChange: function observeTimezoneChange(callback) {
      _timeServiceManager.addObserver(lib_time.CallbackReason.TIMEZONE_CHANGED, observer)
        .then(() => {
          callback('success');
        }, (e) => {
          callback(e);
        });
    },

    unobserveTimezoneChange: function unobserveTimezoneChange(callback) {
      _timeServiceManager.removeObserver(lib_time.CallbackReason.TIMEZONE_CHANGED, observer)
        .then(() => {
          callback('success');
        }, (e) => {
          callback(e);
        });
    },

    closeSession: function closeSession() {
      if (session) {
        session.close();
        console.log('[TimeServiceManager] session successfully closed');
        session = null;
      }
    },
  };
  exports.TimeServiceManager = TimeServiceManager;
}(window));
