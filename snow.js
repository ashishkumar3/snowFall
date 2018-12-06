class snowFlake{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;
    this.alpha = 0;

    this.reset();
  }

  reset(){
    this.x = this.randBetween(0, window.innerWidth);
    this.y = this.randBetween(0, -window.innerHeight);
    this.vx = this.randBetween(-2, 2);
    this.vy = this.randBetween(2, 5);
    this.radius = this.randBetween(1, 5);
    this.alpha = this.randBetween(0.1, 0.9);
  }
  
  randBetween(min, max){
    return min + Math.random() * (max - min);
  }

  update(){
    this.x += this.vx;
    this.y += this.vy;

    if(this.y + this.radius > window.innerHeight){
      this.reset();
    }
  }
}

class Snow{
  constructor(){
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);
    
    window.addEventListener('resize', () => this.onResize())
    this.onResize();
    
    this.updateBound = this.update.bind(this);
    requestAnimationFrame(this.updateBound);

    this.createSnowFlakes();
  }
  
  createSnowFlakes(){
    const flakes = window.innerWidth / 4;
    this.snowFlakes = [];

    for(let s = 0; s < flakes; s++){
      this.snowFlakes.push(new snowFlake());
    }
  }

  onResize(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  update(){
    this.context.clearRect(0, 0, this.width, this.height);

    for(const flake of this.snowFlakes){
      flake.update();

      this.context.save();
      this.context.fillStyle = '#FFF';
      this.context.beginPath();
      this.context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      this.context.closePath();
      this.context.globalAlpha = flake.alpha;
      this.context.fill();
      this.context.restore();
    }

    requestAnimationFrame(this.updateBound);
  }
}

new Snow();