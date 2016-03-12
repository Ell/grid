export default class Synth {
  constructor() {
    this.audioContext = new AudioContext();
    this._setup();
  }

  _setup() {
    const context = this.audioContext;

    this.masterVolume = context.createGain();
    this.masterVolume.connect(context.destination);
  }

  playNote(note) {
    const { audioContext } = this;
    const context = audioContext;

    const osc1 = context.createOscillator();
    osc1.connect(this.masterVolume);

    const osc2 = context.createOscillator();
    osc2.connect(this.masterVolume);

    // C4
    const tempFreq = 291.63;

    osc1.frequency.value = tempFreq;
    osc1.type = 'sine';
    osc1.detune.value = -10;

    osc2.frequency.value = tempFreq;
    osc2.type = 'triangle';
    osc2.detune.value = 10;

    osc1.start(context.currentTime);
    osc2.start(context.currentTime);
    osc1.stop(context.currentTime + 0.5);
    osc2.stop(context.currentTime + 0.5);
  }
}
