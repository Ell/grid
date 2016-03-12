import React from 'react';

import {
  selectDevice,
} from '../actions/GridActions';

import GridRow from './GridRow';
import MidiSelect from '../components/MidiSelect';

class Grid extends React.Component {
  componentDidMount() {
    const { setDeviceList } = this.props;

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
              launchpad.output.send([0x90, noteIndex.toString(16), 0x1C]);
              break;
            }
            default: {
              launchpad.output.send([0x90, noteIndex.toString(16), 0x1C]);
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
    const { devices, selectDevice, grid, dispatch } = this.props;

    return (
      <div>
        <MidiSelect devices={devices} callback={selectDevice} />
        <div id="music-grid">
          <GridRow startNote={0} endNote={7} grid={grid} />
          <GridRow startNote={16} endNote={23} grid={grid} />
          <GridRow startNote={32} endNote={39} grid={grid} />
          <GridRow startNote={48} endNote={55} grid={grid} />
          <GridRow startNote={64} endNote={71} grid={grid} />
          <GridRow startNote={80} endNote={87} grid={grid} />
          <GridRow startNote={96} endNote={103} grid={grid} />
          <GridRow startNote={112} endNote={119} grid={grid} />
        </div>
      </div>
    );
  }
}

export default Grid;
