import Tone from 'tone';

class Synth {
  constructor() {
    const chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster();
    this.instance = new Tone.PolySynth(8, Tone.SimpleSynth).connect(chorus);
  }
}

const synth = new Synth;

export default synth;
