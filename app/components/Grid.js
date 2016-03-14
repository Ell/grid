import React from 'react';

import { gridRows } from '../constants/Grid';
import synthInstance from '../utils/synth';

import GridRow from './GridRow';
import Controls from './Controls';

class Grid extends React.Component {
  componentDidMount() {
    const { setDeviceList, startSequencer } = this.props;

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false,
      }).then((midiAccess) => {
        setDeviceList(this.getLaunchPads(midiAccess));
      });
    }

    startSequencer();
  }

  componentWillUpdate(props) {
    const { grid, launchpad, sendMidiMessage, params } = props;

    const synth = synthInstance.instance;

    synth.set({
      oscillator: {
        type: params.waveType,
      },
      envelope: {
        attack: params.attack,
        decay: params.decay,
        sustain: params.sustain,
        release: params.release,
      },
    });

    synth.volume.value = params.volume;

    if (launchpad) {
      Object.keys(grid).forEach((noteIndex) => {
        const note = grid[noteIndex];

        if (note.enabled) {
          switch (note.color) {
            case 'green': {
              sendMidiMessage([0x90, noteIndex.toString(16), 0x3C]);
              break;
            }
            default: {
              sendMidiMessage([0x90, noteIndex.toString(16), 0x3C]);
            }
          }
        } else {
          sendMidiMessage([0x90, noteIndex.toString(16), 0x0C]);
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
    const {
      devices,
      selectDevice,
      grid,
      onButtonClick,
      params,
      setVolume,
      setAttack,
      setDecay,
      setSustain,
      setRelease,
      setWaveType,
    } = this.props;

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
      <div id="grid-container" className="ui container grid">
        <div id="controls" className="five wide column">
          <Controls
            selectDevice={selectDevice}
            devices={devices}
            params={params}
            setVolume={setVolume}
            setAttack={setAttack}
            setDecay={setDecay}
            setSustain={setSustain}
            setRelease={setRelease}
            setWaveType={setWaveType}
          />
        </div>
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
  startSequencer: React.PropTypes.func,
  params: React.PropTypes.object,
  setVolume: React.PropTypes.func,
  setAttack: React.PropTypes.func,
  setDecay: React.PropTypes.func,
  setSustain: React.PropTypes.func,
  setRelease: React.PropTypes.func,
  setWaveType: React.PropTypes.func,
};

export default Grid;
