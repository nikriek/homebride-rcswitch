var rcswitch = require('rcswitch');
var Accessory, Service, Characteristic, UUIDGen;

module.exports = function(homebridge) {
  Accessory = homebridge.platformAccessory;

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  UUIDGen = homebridge.hap.uuid;
  
  homebridge.registerPlatform("homebridge-rcswitch", "RCSwitch", RCSwitch, true);
}

function RCSwitch(log, config) {
  this.log = log;
  this.config = config;
  this.pin = config['pin'];
  this.name = config['name'];
  this.group = config['group'];
  this.switch = config['switch'];
}

RCSwitch.prototype = {
  getServices: function () {
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
  }
};

mySwitch.prototype = {
 
  getSwitchOnCharacteristic: function (next) {
    next(null, true);
  },
   
  setSwitchOnCharacteristic: function (on, next) {
    rcswitch.switchOn(this.group, this.switch)
    next();
  }
};
