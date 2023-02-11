function changeColor() {
   document.getElementById("pip").style.color = "red";
}

window.onload = function () {
   // doing coordinate rotation ahve to choose which axis
   // in this one we do y
   // but on page 373 we can see how to do the other Angles
   var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      mouse = utils.captureMouse(canvas),
      balls = [],
      numBalls = 10,
      fl = 250,
      vpX = canvas.width / 2,
      vpY = canvas.height / 2,
      angleX,
      angleY; // referenced in drawFrame and move

   for (var ball, i = 0; i < numBalls; i++) {
      ball = new Ball3d(15);
      ball.xpos = Math.random() * 200 - 100;
      ball.ypos = Math.random() * 200 - 100;
      ball.zpos = Math.random() * 200 - 100;
      balls.push(ball)
   }

   function rotateY(ball, angle) {
      var cos = Math.cos(angle),
         sin = Math.sin(angle),
         x1 = ball.xpos * cos - ball.zpos * sin;
      z1 = ball.zpos * cos + ball.xpos * sin;

      ball.xpos = x1;
      ball.zpos = z1;
   }

   function rotateX(ball, angle) {
      var cos = Math.cos(angle),
         sin = Math.sin(angle),
         y1 = ball.ypos * cos - ball.zpos * sin;
      z1 = ball.zpos * cos + ball.ypos * sin;

      ball.ypos = y1;
      ball.zpos = z1;
   }

   function setPerspective(ball) {
      if (ball.zpos > -fl) {
         var scale = fl / (fl + ball.zpos);
         ball.scaleX = ball.scaleY = scale;
         ball.x = vpX + ball.xpos * scale;
         ball.y = vpY + ball.ypos * scale;
         ball.visible = true;
      } else {
         ball.visible = false;
      }
   }

   function move(ball) {
      rotateX(ball, angleX);
      rotateY(ball, angleY);
      setPerspective(ball);
   }

   function zSort(a, b) {
      return (b.zpos - a.zpos);
   }

   function draw(ball) {
      if (ball.visible) {
         ball.draw(context);
      }
   }

   (function drawFrame() {
      window.requestAnimationFrame(drawFrame, canvas);
      context.clearRect(0, 0, canvas.width, canvas.height);

      angleY = (mouse.x - vpX) * 0.0001;
      angleX = (mouse.y - vpY) * 0.0001;

      balls.forEach(move);
      balls.sort(zSort);
      balls.forEach(draw);

   }());
};