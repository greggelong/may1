let comp;
let gregimg;
let sliderRate;
let sliderPan;
let srate = 1;
let instruct;
let button;

let myseq = [7, 5, 7, 5, 5, 6, 7, 3];
let s; // Synth
let k; // Kick
let b; // Bass
let follow; // Follow object
let speed = [1 / 2, 1 / 4, 1 / 8, 1 / 16];
let ss = 2;

function preload() {
  gregimg = loadImage("monkey.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  imageMode(CENTER);

  comp = loadSound("task1.mp3", loaded);
  comp.setVolume(0.4);

  button = createButton("sound");
  button.position(width / 4, height / 2);
  button.mouseClicked(unlockAudioContext);

  // Set up synth sounds
  s = Synth("bleep").fx.add(Reverb());
  s.note.seq(myseq, [speed[ss], speed[ss + 1]]);
  s.loudness(0.2);

  k = Kick();
  k.note.seq([4], 1 / 4);

  b = FM("bass");
  b.note.seq([-7, -1, -3, -5], 1 / 16);
  b.index.seq([2, 3, 4, 5, 6], 1 / 8);
  b.loudness(1);

  follow = Follow(b);
}

function loaded() {
  comp.loop();
}

function draw() {
  let off = follow.getValue() * 555;
  //print(off);
  background(follow.getValue() * 2055);

  image(gregimg, width / 2, height / 2, 225 / srate + off, 300 / srate + off);

  if (mouseIsPressed) {
    srate = map(mouseX, 0, width, 0.5, 2);
    comp.rate(srate);
  }
}

/*
function mousePressed() {
  if (mouseY < height / 2) {
    ss++;
  } else {
    ss--;
  }
  if (ss > speed.length - 1) ss = 0;
  if (ss < 0) ss = speed.length - 1;

  print(ss);

  s.kill();
  s = Synth("bleep").fx.add(Reverb());
  s.note.seq(myseq, speed[ss]);
  s.loudness(0.7);
}
  */

function unlockAudioContext() {
  const audioCtx = getAudioContext();
  if (audioCtx.state === "suspended") {
    audioCtx
      .resume()
      .then(() => {
        console.log("Audio context unlocked");
      })
      .catch((err) => {
        console.error("Failed to unlock audio context:", err);
      });
  }
  srate = 1;
  button.hide();
}
