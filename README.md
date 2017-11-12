# homebridge-rcswitch
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
