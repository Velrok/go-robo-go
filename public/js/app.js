const width = 1024;
const height = 300;
const chunk_height = height / 3;
const chunk_width = 80;

let level_description = {
  level: 1,
  max_program_length: 3,
  layout: ["_", "_", "_", "A", "_", "_", "_", "A", "_", "_", "_", "A"],
};

let map_instruction_to_img_path = {
  M: "./images/ins_move.png",
  J: "./images/ins_jump.png",
};

let assets = {
  goal_img: null,
  level_layout: {
    _: null,
    A: null,
  },
};

let robot = {
  img: null,
  img_scale: null,
  position: 0,
  program: ["M", "M", "J"],
  program_counter: 0,
};

function preload() {
  robot.img = loadImage("./images/robot.png");
  assets.level_layout["_"] = loadImage("./images/floor-solid.png");
  assets.level_layout["A"] = loadImage("./images/floor-spikes.png");
  assets.goal_img = loadImage("./images/goal.png");
}

function setup() {
  let canvas = createCanvas(width, height);
  canvas.parent("sketch-container");

  robot.img_scale = 1 / (robot.img.height / height) / 3;

  hydrate_robot_programm();
}

function hydrate_robot_programm() {
  const instructions_div = document.querySelector("#instructions");
  robot.program.forEach((instruction) => {
    instructions_div.insertAdjacentHTML(
      "beforeend",
      `<div class='w-12 inline-block container origin-bottom hover:rotate-12 hover:scale-125 transition-all'>
       <img class='object-contain' src='${map_instruction_to_img_path[instruction]}'>
     </div>`
    );
  });
}

function draw() {
  background(color("rgb(51, 65, 85)"));
  draw_level();
  draw_goal();
  draw_robot();
}

function draw_level() {
  level_description.layout.forEach((element, i) => {
    image(assets.level_layout[element], chunk_width * i, chunk_height * 2);
  });
}

function draw_goal() {
  const x = chunk_width * 12;
  const w = chunk_width - 15;
  const h = chunk_height;
  image(assets.level_layout["_"], x, chunk_height * 2, w, h);
  image(assets.goal_img, x, chunk_height, w, h);
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
