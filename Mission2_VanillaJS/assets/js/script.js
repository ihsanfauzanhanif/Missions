class Balloon {
    obj = null

    speed = 0.8
    stateY = false

    constructor (obj) {
        this.obj = obj
    }

    toggleY() { this.stateY = !this.stateY }

    getY() {
        let y = parseFloat(this.obj.style.top)
        if (isNaN(y)) {
            y = parseFloat(window.getComputedStyle(this.obj, null).getPropertyValue("top"))
        }
        return y
    }

    setY(y) {
        this.obj.style.top = y + 'px'     
    }

    setSpeed(speed) {this.speed = speed}

    moveY() {
        this.setY(this.stateY? this.getY() + this.speed : this.getY() - this.speed)
    }

    animateY(yLow, yHigh) {
        if (yLow >= yHigh) return console.error('First parameter must be higher than the second')
        if (this.getY() < yLow || this.getY()>= yHigh) this.toggleY()
        this.moveY(this.speed)
    }
}

class Cloud {
    obj = null

    speed = 0.8
    x_min = 0

    constructor(obj) {
        this.obj = obj
    }

    getX() {
        let x = parseFloat(this.obj.style.top)
        if (isNaN(x)) {
            x = parseFloat(window.getComputedStyle(this.obj, null).getPropertyValue("left"))
        }
        return x
        
    }
    setX(x) {
        this.obj.style.left = x + 'px'   
    }
    setXMin(x) {
        this.x_min = x
    }

    setSpeed(speed) {this.speed = speed}

    animateX() {
        this.setX(this.getX() + this.speed)
        let x_max = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        if (this.getX() > x_max) this.setX(this.x_min)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // scroll to the down of the page
    let balloon = new Balloon(document.getElementById('balloon'))
    let balloon2 = new Balloon(document.getElementById('balloon2'))

    let cloud = new Cloud(document.getElementById('cloud'))
    let cloud2 = new Cloud(document.getElementById('cloud2'))
    let cloud3 = new Cloud(document.getElementById('cloud3'))
    let cloud4 = new Cloud(document.getElementById('cloud4'))
    cloud4.setX(-cloud4.getX() * 28)
    
    let y_balloon = balloon.getY()
    let y_ballon2 = balloon2.getY()
    balloon2.setSpeed(0.5)
    let x_cloud = cloud.getX()
    let x_cloud2 = cloud2.getX()
    let x_cloud3 = cloud3.getX()
    cloud.setXMin(-x_cloud * 5)
    cloud2.setXMin(-x_cloud2 * 25)
    cloud4.setXMin(-x_cloud2 * 25)
    cloud4.setXMin(cloud4.getX() * 0.8)
    cloud3.setXMin(-x_cloud3 / 4)
    // cloud.setSpeed(0.8)
    // cloud2.setSpeed(0.8)
    // cloud3.setSpeed(1)

    console.log()
    setInterval(() => {
        balloon.animateY(y_balloon, y_balloon + 30)
        balloon2.animateY(y_ballon2, y_ballon2 + 40)
        cloud.animateX()
        cloud2.animateX()
        cloud3.animateX()
        cloud4.animateX()
    }, 64)
    
});