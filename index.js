var rcswitch = require('rcswitch');
var Accessory, Service, Characteristic, UUIDGen;

module.exports = function(homebridge) {
  Accessory = homebridge.platformAccessory;

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  UUIDGen = homebridge.hap.uuid;
  
  homebridge.registerPlatform("homebridge-rcswitch", "RCSwitch", Platform, false);
}

function Platform(log, config, api) {
  this.log = log;
  this.config = config;
  this.api = api;
  this.pin = config.pin'pin'] || 0;
  this.name = config['name'];
  this.group = config['group'];
  this.switch = config['switch'];
  this.isOn = false;
}

Platform.prototype.configureAccessory = function (accessory) {
  rcswitch.enableTransmit(this.pin);
}

Platform.prototype.getServices = function () {
    let informationService = new Service.AccessoryInformation();
    informationService
      .setCharacteristic(Characteristic.Manufacturer, "RCSwitch")
      .setCharacteristic(Characteristic.Model, "RCSwitch")
      .setCharacteristic(Characteristic.SerialNumber, "123-456-789");
 
    let switchService = new Service.Switch(this.name);
    switchService
      .getCharacteristic(Characteristic.On)
        .on('get', this.getSwitchOnCharacteristic.bind(this))
        .on('set', this.setSwitchOnCharacteristic.bind(this));
 
    this.informationService = informationService;
    this.switchService = switchService;
    return [informationService, switchService];
};

Platform.prototype = {
 
  getSwitchOnCharacteristic: function (next) {
    next(null, this.isOn);
  },
   
  setSwitchOnCharacteristic: function (on, next) {
    if (this.isOn) {
      rcswitch.switchOff(this.group, this.switch);
    } else {
      rcswitch.switchOn(this.group, this.switch);
    }
    this.isOn = !this.isOn;
    next();
  }
};
