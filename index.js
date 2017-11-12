var rcswitch = require('rcswitch');
var Accessory, Service, Characteristic, UUIDGen;

module.exports = function(homebridge) {
  Accessory = homebridge.platformAccessory;

  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  UUIDGen = homebridge.hap.uuid;
  
  homebridge.registerAccessory("homebridge-rcswitch", "RCSwitch", Platform);
}

function Platform(log, config) {
  this.log = log;
  this.config = config;
  this.pin = config.pin['pin'] || 0;
  this.name = config['name'];
  this.groupId = config['group'];
  this.switchId = config['switch'];
  this.isOn = false;

  rcswitch.enableTransmit(this.pin);

  this.service = new Service.Switch(this.name);

  this.service.getCharacteristic(Characteristic.On)
    .on('get', this.getSwitchOnCharacteristic.bind(this))
    .on('set', this.setSwitchOnCharacteristic.bind(this))
}

Platform.prototype = {
  getSwitchOnCharacteristic: function (next) {
    next(null, this.isOn);
  },
   
  setSwitchOnCharacteristic: function (on, next) {
    if (this.isOn) {
      rcswitch.switchOff(this.groupId, this.switchId);
    } else {
      rcswitch.switchOn(this.groupId, this.switchId);
    }
    this.isOn = !this.isOn;
    next();
  }
}
