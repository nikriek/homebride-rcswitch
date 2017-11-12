# homebridge-rcswitch
Operate 433/315Mhz devices using the [RCSwitch](https://github.com/sui77/rc-switch) library in [homebridge](https://github.com/nfarina/homebridge) (Apple Homekit). 

## Installation
```bash
$ npm install -g nikriek/homebridge-rcswitch
```

## Configuration
Add your switch as new accessory:
```json
{
  "accessories": [{
    "accessory": "RCSwitch",
    "pin": 0,
    "name": "Backlight",
    "group": 1,
    "switch": 2
  }]
}
```
