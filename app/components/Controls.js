import React from 'react';

import Range from './Range';
import WaveSelect from './WaveSelect';
import MidiSelect from './MidiSelect';
import ScaleSelect from './ScaleSelect';

const Controls = ({
  params,
  setVolume,
  setAttack,
  setDecay,
  setSustain,
  setRelease,
  setWaveType,
  selectDevice,
  resetGrid,
  resetParams,
  devices,
  generateGridUrl,
  gridUrl,
  setScale,
  scale,
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
            <label>Waveform Type</label>
            <WaveSelect waveForm={params.waveType} callback={setWaveType} />
          </div>
        </div>
        <div className="field">
          <label>Scale</label>
          <ScaleSelect scale={scale} callback={setScale} />
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
        <div className="field">
          <div className="ui large buttons" style={{ width: '50%' }}>
            <button
              type="button"
              className="fluid ui small button"
              onClick={resetGrid}
            >
              Reset Grid
            </button>
            <div className="or"></div>
            <button
              type="button"
              className="fluid ui small button"
              onClick={resetParams}
            >
              Reset Params
            </button>
          </div>
        </div>
        <h4 className="ui dividing header">Share Your Grid</h4>
        <div className="field">
          <button
            onClick={generateGridUrl}
            type="button"
            className="fluid ui sma;; button"
          >
            Generate Grid URL
          </button>
        </div>
        <div className="field">
          <input value={gridUrl} readOnly type="text" placeholder="Grid URL"></input>
        </div>
      </form>
    </div>
  );

Controls.propTypes = {
  params: React.PropTypes.object,
  setVolume: React.PropTypes.func,
  setAttack: React.PropTypes.func,
  setDecay: React.PropTypes.func,
  setSustain: React.PropTypes.func,
  setRelease: React.PropTypes.func,
  setWaveType: React.PropTypes.func,
  setDevice: React.PropTypes.func,
  selectDevice: React.PropTypes.func,
  resetParams: React.PropTypes.func,
  resetGrid: React.PropTypes.func,
  devices: React.PropTypes.array,
  gridUrl: React.PropTypes.string,
  generateGridUrl: React.PropTypes.func,
  scale: React.PropTypes.object,
  setScale: React.PropTypes.func,
};

export default Controls;
