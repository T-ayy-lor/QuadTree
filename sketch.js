let attractors = [];
let attractorCount = 500;

function setup() {
  // Called once when sketch begins running
  createCanvas(500, 500);
  background(255, 255, 255);

  // Generate attractors
  for (let i = 0; i < attractorCount; i++) {
    attractors.push(new Attractor());
  }

  // Create a Quadtree that covers entire canvas
  let boundary = new AABB(0, 0, width, height);
  qt = new QuadTree(boundary, 4); // Capacity 4

  // Insert attractors into the QuadTree
  for (let a of attractors) {
    qt.insert(a.position);
  }
}

function draw() {
  // Called repeatedly while sketch runs

  // Display all attractors
  // for (let attractor of attractors) {
  //   attractor.show()
  // }

  // Show the QuadTree
  qt.show();

  let queryBox = new AABB(width/2 - 75, height/2 - 75, 150, 150);
  stroke('blue');
  noFill();
  rect(queryBox.x, queryBox.y, queryBox.width, queryBox.height);

  let found = qt.query(queryBox);
  for (let p of found) {
    // Highlight found points
    stroke('blue');
    strokeWeight(3);
    point(p.x, p.y);
  }
}
