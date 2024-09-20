const width = 1024;
const height = 300;
const chunk_height = height / 3;
const chunk_width = 80;

let level_description = {
  level: 1,
  max_program_length: 3,
  layout: ["_", "_", "A", "_", "_", "A", "_", "_"],
};

let assets = {
  solid_floor_img: null,
  level_layout: {
    _: null,
    A: null,
  },
};

let robot = {
  img: null,
  img_scale: null,
  position: 0,
  program: [],
  program_counter: 0,
};

function preload() {
  robot.img = loadImage("./images/robot.png");
  assets.level_layout["_"] = loadImage("./images/floor-solid.png");
  assets.level_layout["A"] = loadImage("./images/floor-spikes.png");
}

function setup() {
  let canvas = createCanvas(width, height);
  canvas.parent("sketch-container");

  robot.img_scale = 1 / (robot.img.height / height) / 3;
}

function draw() {
  background(color("rgb(51, 65, 85)"));
  draw_level();
  draw_robot();
}

function draw_level() {
  level_description.layout.forEach((element, i) => {
    image(assets.level_layout[element], chunk_width * i, chunk_height * 2);
  });
}

function draw_robot() {
  image(
    robot.img,
    0,
    chunk_height,
    robot.img.width * robot.img_scale,
    robot.img.height * robot.img_scale
  );
}
