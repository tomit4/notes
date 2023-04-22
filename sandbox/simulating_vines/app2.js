(function () {
  var canvas = document.getElementById("vines");
  var context = canvas.getContext("2d");
  var canvasb = document.getElementById("leaves");
  var contextb = canvasb.getContext("2d");
  var leaves = [];

  // Resize canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasb.width = window.innerWidth;
  canvasb.height = window.innerHeight;

  // Clear canvas
  context.fillStyle = "#89f1d7";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Calculate distance from point to line
  function distancePointToLine(point, line) {
    var L = Math.sqrt(
      Math.pow(line[1].x - line[0].x, 2) + Math.pow(line[1].y - line[0].y, 2)
    );
    var r =
      ((point.x - line[0].x) * (line[1].x - line[0].x) +
        (point.y - line[0].y) * (line[1].y - line[0].y)) /
      Math.pow(L, 2);
    var s =
      ((line[0].y - point.y) * (line[1].x - line[0].x) -
        (line[0].x - point.x) * (line[1].y - line[0].y)) /
      Math.pow(L, 2);
    if (r >= 0 && r <= 1) {
      return Math.abs(s) * L;
    } else {
      return Math.min(
        Math.sqrt(
          Math.pow(point.x - line[0].x, 2) + Math.pow(point.y - line[0].y, 2)
        ),
        Math.sqrt(
          Math.pow(point.x - line[1].x, 2) + Math.pow(point.y - line[1].y, 2)
        )
      );
    }
  }

  // Draw leaf
  function drawLeaf(leaf) {
    leaf.size = Math.max(10, leaf.size);
    contextb.save();
    contextb.translate(leaf.x, leaf.y);
    contextb.rotate(leaf.angle);
    contextb.translate(-leaf.x, -leaf.y);
    contextb.fillStyle = "#ff0078";
    contextb.beginPath();
    contextb.moveTo(leaf.x, leaf.y);
    contextb.bezierCurveTo(
      leaf.x + leaf.size,
      leaf.y,
      leaf.x + leaf.size * 2,
      leaf.y + leaf.size,
      leaf.x,
      leaf.y + leaf.size * 4
    );
    contextb.bezierCurveTo(
      leaf.x - leaf.size * 2,
      leaf.y + leaf.size,
      leaf.x - leaf.size,
      leaf.y,
      leaf.x,
      leaf.y
    );
    contextb.closePath();
    contextb.fill();
    contextb.restore();
  }

  // Draw vine
  function drawVinesWithLattice(
    lattice,
    seeds,
    interations,
    sort,
    prune,
    minLength,
    maxLength
  ) {
    var t = 1;
    var maxLineWidth = 10;

    // Create initial branches
    var branches = [];
    for (var i in seeds) {
      branches.push({
        points: [
          { x: seeds[i].x, y: seeds[i].y },
          { x: seeds[i].x, y: seeds[i].y },
          { x: seeds[i].x, y: seeds[i].y },
          { x: seeds[i].x, y: seeds[i].y },
        ],
        angle: 0,
        distanceToLattice: 1000,
        lineWidth: 6,
        active: true,
        leaf: false,
      });
    }

    // Animation function
    function tick() {
      // Draw branches
      contextb.clearRect(0, 0, canvasb.width, canvasb.height);
      for (var i in branches) {
        var ax =
          (-branches[i].points[0].x +
            3 * branches[i].points[1].x -
            3 * branches[i].points[2].x +
            branches[i].points[3].x) /
          6;
        var ay =
          (-branches[i].points[0].y +
            3 * branches[i].points[1].y -
            3 * branches[i].points[2].y +
            branches[i].points[3].y) /
          6;
        var bx =
          (branches[i].points[0].x -
            2 * branches[i].points[1].x +
            branches[i].points[2].x) /
          2;
        var by =
          (branches[i].points[0].y -
            2 * branches[i].points[1].y +
            branches[i].points[2].y) /
          2;
        var cx = (-branches[i].points[0].x + branches[i].points[2].x) / 2;
        var cy = (-branches[i].points[0].y + branches[i].points[2].y) / 2;
        var dx =
          (branches[i].points[0].x +
            4 * branches[i].points[1].x +
            branches[i].points[2].x) /
          6;
        var dy =
          (branches[i].points[0].y +
            4 * branches[i].points[1].y +
            branches[i].points[2].y) /
          6;
        context.lineWidth = branches[i].lineWidth;
        context.beginPath();
        context.moveTo(
          ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx,
          ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy
        );
        context.lineTo(
          ax * Math.pow(t + 0.1, 3) +
            bx * Math.pow(t + 0.1, 2) +
            cx * (t + 0.1) +
            dx,
          ay * Math.pow(t + 0.1, 3) +
            by * Math.pow(t + 0.1, 2) +
            cy * (t + 0.1) +
            dy
        );
        context.stroke();
        context.closePath();

        // Draw leaf
        if (branches[i].leaf) {
          if (branches[i].active) {
            var x1 = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx;
            var y1 = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy;
            var x2 =
              ax * Math.pow(t + 0.1, 3) +
              bx * Math.pow(t + 0.1, 2) +
              cx * (t + 0.1) +
              dx;
            var y2 =
              ay * Math.pow(t + 0.1, 3) +
              by * Math.pow(t + 0.1, 2) +
              cy * (t + 0.1) +
              dy;
            branches[i].leaf.x = x2;
            branches[i].leaf.y = y2;
            branches[i].leaf.angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2;
            branches[i].leaf.size = branches[i].lineWidth * 2;
          } else {
            branches[i].leaf.size = (branches[i].lineWidth + t) * 2;
          }
          drawLeaf(branches[i].leaf);
        }
      }

      // Draw leaves
      for (var i in leaves) {
        drawLeaf(leaves[i]);
      }

      // When finished drawing splines, create a new set of branches
      t += 0.02;
      if (t >= 1) {
        var new_branches = [];
        for (var j = branches.length - 1; j >= 0; j--) {
          if (branches[j].active) {
            // Split branch into two
            for (var k = 0; k < 2; k++) {
              // Generate random deviation from previous angle
              var angle = branches[j].angle - (Math.random() * 180 - 90);

              // Determine closest lattice point
              var distance = 100000;
              for (var l in lattice) {
                var result = distancePointToLine(
                  branches[j].points[3],
                  lattice[l]
                );
                if (result < distance) distance = result;
              }

              // Generate random length
              var length = Math.random() * (maxLength - minLength) + minLength;

              // Calculate new point
              var x2 =
                branches[j].points[3].x +
                Math.sin((Math.PI * angle) / 180) * length;
              var y2 =
                branches[j].points[3].y -
                Math.cos((Math.PI * angle) / 180) * length;

              // Add to new branch array
              new_branches.push({
                points: [
                  branches[j].points[1],
                  branches[j].points[2],
                  branches[j].points[3],
                  { x: x2, y: y2 },
                ],
                angle: angle,
                distanceToLattice: distance,
                lineWidth: 6,
                active: true,
                leaf: {
                  x: x2,
                  y: y2,
                  angle: 0,
                },
                parent: branches[j],
              });

              // "Deactivate" branch
              branches[j].active = false;
            }

            // Grow branch
          } else {
            branches[j].lineWidth++;
            if (branches[j].lineWidth > maxLineWidth) {
              leaves.push(branches[j].leaf);
              branches.splice(j, 1);
            }
          }
        }

        // Sort branches by distance to lattice
        new_branches.sort(function (a, b) {
          return a.distanceToLattice - b.distanceToLattice;
        });

        // If over 10 branches, prune the branches furthest from the lattice
        if (prune) {
          if (sort) {
            while (new_branches.length > 20) new_branches.pop();
          } else {
            while (new_branches.length > 20) {
              new_branches.splice(
                Math.floor(Math.random() * new_branches.length),
                1
              );
            }
          }
        }

        // Remove leaves from parent
        for (var i = 0; i < new_branches.length; i++) {
          new_branches[i].parent.leaf = false;
        }

        // Replace old branch array with new
        branches = branches.concat(new_branches);
        interations--;
        t = 0;
      }

      // Keep on animating
      if (interations > 0) {
        requestAnimationFrame(tick);
      }
    }
    tick();
  }

  // Setup lattice
  var space = canvas.height / 3;
  var lattice = [];
  for (var y = -space * 4; y < space * 4; y += space) {
    lattice.push([
      { x: 0, y: y + canvas.height },
      { x: canvas.width, y: y },
    ]);
  }

  // Draw lattice
  context.strokeStyle = "rgba(0, 0, 0, 0.1)";
  context.lineWidth = canvas.height * 0.05;
  context.lineCap = "square";
  for (var i in lattice) {
    context.beginPath();
    context.moveTo(lattice[i][0].x, lattice[i][0].y);
    context.lineTo(lattice[i][1].x, lattice[i][1].y);
    context.stroke();
  }
  context.strokeStyle = "#ff0078";

  // Create vines
  var minLength = canvas.width * 0.05;
  var maxLength = canvas.width * 0.1;
  var iterations = 20;
  var seeds = [
    { x: -5, y: space },
    { x: space, y: -5 },
    { x: -5, y: space * 3 },
    { x: canvas.width + 5, y: space },
    { x: space * 3, y: canvas.height + 5 },
  ];
  drawVinesWithLattice(
    lattice,
    seeds,
    iterations,
    true,
    true,
    minLength,
    maxLength
  );
})();
