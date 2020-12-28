# Sample APPs for daemon Apis

This is a sample APP for usage of api-daemon. Details usage of every service under ***services*** folder
, To keep it simple we use vanillaJS(no other framework).

## Usage
Install it to KaiOS 3.0 device or simulator.
### Use appscmd to install to real device:
- Download appscmd code, and compile it.
- Install app use below script:
    ```shell script
    adb root
    ```

    ```shell script
    path/to/appscmd install app/path
    ```

    such as:
    
    ```shell script
    target/debug/appscmd install ~/work/sfp-next-api-changes/
    ```

- Reboot device to take effect.

## Submodules
### appmanager
Sample: ***services/appmanger***

### audiovolumemanager
Sample: ***services/audiovolumemanager***

### device-capability
Sample: ***services/devicecapbility***

### powermanager
Sample: ***services/powermanager***

### settings
Sample: ***services/settings***

### tcpsocket
Sample: ***services/tcpsocket***

### telephony
Sample: ***services/telephony***

### time-service
Sample: ***services/timeservice***

### contacts
Sample: ***services/contacts***

### timeservice
Sample: ***services/timeservice***
