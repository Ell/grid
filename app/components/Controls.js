import React from 'react';

import Range from './Range';
import WaveSelect from './WaveSelect';
import MidiSelect from './MidiSelect';

const Controls = ({
  params,
  setVolume,
  setAttack,
  setDecay,
  setSustain,
  setRelease,
  setWaveType,
  selectDevice,
  devices,
}) => (
  <div id="controls">
    <form className="ui form">
      <h4 className="ui dividing header">Controls</h4>
      <div className="two fields">
        <div className="field">
          <label>MIDI Device</label>
          <MidiSelect devices={devices} callback={selectDevice} />
        </div>
        <div className="field">
          <label>Waveform Type ({params.waveType})</label>
          <WaveSelect callback={setWaveType} />
        </div>
      </div>
      <div className="field">
        <label>Gain ({params.volume})</label>
        <Range
          currentValue={params.volume}
          callback={setVolume}
          start={-50}
          end={50}
          step={1}
        />
      </div>
      <div className="field">
        <label>Attack ({params.attack})</label>
        <Range
          currentValue={params.attack}
          callback={setAttack}
          start={0.00}
          end={2}
          step={0.01}
        />
      </div>
      <div className="field">
        <label>Decay ({params.decay})</label>
        <Range
          currentValue={params.decay}
          callback={setDecay}
          start={0.00}
          end={2}
          step={0.01}
        />
      </div>
      <div className="field">
        <label>Sustain ({params.sustain})</label>
        <Range
          currentValue={params.sustain}
          callback={setSustain}
          start={0.00}
          end={2}
          step={0.01}
        />
      </div>
      <div className="field">
        <label>Release ({params.release})</label>
        <Range
          currentValue={params.release}
          callback={setRelease}
          start={0.00}
          end={2}
          step={0.01}
        />
      </div>
    </form>
  </div>
);

export default Controls;
