import React from 'react';

import { gridRows } from '../constants/Grid';
import Synth from '../utils/synth';

import GridRow from './GridRow';
import MidiSelect from '../components/MidiSelect';

class Grid extends React.Component {
  componentDidMount() {
    const { setDeviceList, setSynth } = this.props;
    const synth = new Synth();

    setSynth(synth);

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false,
      }).then((midiAccess) => {
        setDeviceList(this.getLaunchPads(midiAccess));
      });
    }
  }

  componentWillUpdate(props) {
    const { grid, launchpad } = props;

    if (launchpad) {
      Object.keys(grid).forEach((noteIndex) => {
        const note = grid[noteIndex];

        if (note.enabled) {
          switch (note.color) {
            case 'green': {
              launchpad.output.send([0x90, noteIndex.toString(16), 0x3C]);
              break;
            }
            default: {
              launchpad.output.send([0x90, noteIndex.toString(16), 0x3C]);
            }
          }
        } else {
          launchpad.output.send([0x90, noteIndex.toString(16), 0x0C]);
        }
      });
    }
  }

  getLaunchPads = (midiAccess) => {
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

  render() {
    const { devices, selectDevice, grid, onButtonClick } = this.props;
    const rows = gridRows.map((row) => (
      <GridRow
        clickHandler = {onButtonClick}
        startNote={row[0]}
        endNote={row[1]}
        grid={grid}
        key={row[0]}
      />
    ));

    return (
      <div>
        <MidiSelect devices={devices} callback={selectDevice} />
        <div id="music-grid">
          {rows}
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  setDeviceList: React.PropTypes.func,
  devices: React.PropTypes.array,
  grid: React.PropTypes.object,
  selectDevice: React.PropTypes.func,
  onButtonClick: React.PropTypes.func,
  setSynth: React.PropTypes.func,
};

export default Grid;
