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
  this.pin = config.pin['pin'] || 0;
  this.switches = config.switches || [];
  this.switchStates = Array(this.switches.length).fill(false);
}

Platform.prototype.configureAccessory = function (accessory) {
  this.log("Enable transmit on pin " + this.pin);
  rcswitch.enableTransmit(this.pin);
}

// Platform.prototype.getServices = function () {
//     let informationService = new Service.AccessoryInformation();
//     informationService
//       .setCharacteristic(Characteristic.Manufacturer, "RCSwitch")
//       .setCharacteristic(Characteristic.Model, "RCSwitch")
//       .setCharacteristic(Characteristic.SerialNumber, "123-456-789");
    
//     let switchServices = this.switches.map(function(currentValue, index) { 
//         let switchService = new Service.Switch(currentValue.name);
//         return switchService.getCharacteristic(Characteristic.On)
//           .on('get', this.getSwitchOnCharacteristic.bind(this, index))
//           .on('set', this.setSwitchOnCharacteristic.bind(this, index));
//     });
       
//     this.informationService = informationService;
//     this.switchServices = switchServices;
//     return [informationService] + switchServices;
// };

// Platform.prototype = {
//   getSwitchOnCharacteristic: function (index, next) {
//     let isOn = this.switchStates[index];
//     next(null, isOn);
//   },
   
//   setSwitchOnCharacteristic: function (index, on, next) {
//     let isOn = this.switchStates[index];
//     let currentSwitch = this.switches[index];
//     if (isOn) {
//       rcswitch.switchOff(currentSwitch.group, currentSwitch.switch);
//     } else {
//       rcswitch.switchOn(currentSwitch.group, currentSwitch.switch);
//     }
//     this.switchStates[index] = !isOn;
//     next();
//   }
// };
