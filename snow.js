class snowFlake{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;
    this.alpha = 0;
    this.segmentLength = 0;
    this.branchLength = 0;

    this.reset();
  }

  reset(){
    this.x = this.randBetween(0, window.innerWidth);
    this.y = this.randBetween(0, -window.innerHeight);
    this.vx = this.randBetween(-2, 2);
    this.vy = this.randBetween(2, 5);
    this.radius = this.randBetween(1, 5);
    this.alpha = this.randBetween(0.1, 0.9);
    this.segmentLength = this.randBetween(1.5, 2.5);
    this.branchLength = this.randBetween(0, 2);
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

  createVignette(){
    const xMid = this.width/2;
    const yMid = this.height/2;
    const radius = Math.sqrt(xMid*xMid + yMid*yMid);
    this.vignette = this.context.createRadialGradient(xMid, yMid, 0, xMid, yMid, radius);


    this.vignette.addColorStop(0.49, `rgba(0, 0, 0, 0)`);
    for(let i=0; i<=1; i+=0.1){
      const alpha = Math.pow(i,3);
      this.vignette.addColorStop(0.5+i*0.5, `rgba(0, 0, 0, ${alpha})`);
    }
  }


  onResize(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.createVignette();
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

    this.context.fillStyle=this.vignette;
    this.context.fillRect(0, 0, this.width, this.height);

    requestAnimationFrame(this.updateBound);
  }
}

new Snow();