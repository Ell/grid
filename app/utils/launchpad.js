export class Launchpad {
  constructor() {
    this.device = null;
    this.devices = [];
  }

  static getLaunchPads(midiAccess) {
    const inputs = midiAccess.inputs.values();
    const outputs = midiAccess.outputs.values();

    const devices = [];

    const inputDevices = [...inputs]
      .filter((input) => input.name.split(' ')[0] === 'Launchpad');
    const outputDevices = [...outputs]
      .filter((output) => output.name.split(' ')[0] === 'Launchpad');

    inputDevices.forEach((input) => {
      outputDevices.forEach((output) => {
        if (input.name === output.name) {
          devices.push({
            name: output.name,
            input,
            output,
          });
        }
      });
    });

    return devices;
  }

}

const launchpadInstance = new Launchpad;
export default launchpadInstance;
