import p5 = require("p5");

export const backgroundBalls = () => {
    new p5((_p5) => {
        const balls: Ball[] = [];
        _p5.setup = () => {
            _p5.createCanvas(window.innerWidth, window.innerHeight);
            for (let i = 0; i < 50; i++) {
                const r = _p5.random(30) + 20;
                balls.push(new Ball(_p5.random(_p5.width - 2 * r) + r,
                    _p5.random(_p5.height - 2 * r) + r,
                    _p5.random(12) - 6, _p5.random(12) - 6, r,
                    _p5.color(_p5.random(255), _p5.random(255), _p5.random(255))));
            }
        };
        _p5.draw = () => {
            _p5.background(0);
            for (let i = 0; i < balls.length; i++) {
                const ball = balls[i];
                _p5.fill(ball.fill);
                _p5.stroke(ball.fill);
                _p5.ellipse(ball.x, ball.y, ball.r * 2, ball.r * 2);
                ball.move();
                ball.bounce();
            }
        };
        document.getElementById('btnLogin')!.addEventListener('click', () => {
            _p5.remove();
        });
        class Ball {
            constructor(
                public x: number,
                public y: number,
                public xspeed: number,
                public yspeed: number,
                public r: number,
                public fill: p5.Color) {
            }

            move() {
                this.x += this.xspeed;
                this.y += this.yspeed;
            }

            bounce() {
                if (this.x > _p5.width - this.r || this.x < this.r) {
                    this.xspeed = -this.xspeed;
                }
                if (this.y > _p5.height - this.r || this.y < this.r) {
                    this.yspeed = -this.yspeed;
                }
            }
        }
    });
};
