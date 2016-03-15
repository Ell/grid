import React from 'react';
import queryString from 'query-string';
import _ from 'lodash';

import { gridRows } from '../constants/Grid';
import { Launchpad } from '../utils/launchpad';

import GridRow from './GridRow';
import Controls from './Controls';

class Grid extends React.Component {
  componentDidMount() {
    const { setDeviceList, startSequencer, setupSynth, hydrateGrid } = this.props;

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false,
      }).then((midiAccess) => {
        setDeviceList(Launchpad.getLaunchPads(midiAccess));
      });
    }

    setupSynth();
    startSequencer();

    if (window.location.search && window.location.search !== undefined) {
      const query = queryString.parse(window.location.search);
      if (_.has(query, 'state')) {
        hydrateGrid(query.state);
      }
    }
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
      resetGrid,
      resetParams,
      generateGridUrl,
      gridUrl,
      setScale,
      scale,
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
            resetGrid={resetGrid}
            resetParams={resetParams}
            generateGridUrl={generateGridUrl}
            gridUrl={gridUrl}
            scale={scale}
            setScale={setScale}
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
  setupSynth: React.PropTypes.func,
  resetParams: React.PropTypes.func,
  resetGrid: React.PropTypes.func,
  hydrateGrid: React.PropTypes.func,
  generateGridUrl: React.PropTypes.func,
  gridUrl: React.PropTypes.string,
  scale: React.PropTypes.object,
};

export default Grid;
