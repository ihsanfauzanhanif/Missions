class Movable {
    obj = null
    ready = false

    constructor (obj) {
        this.obj = obj
    }

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

    getWidth() {
        let width = parseFloat(this.obj.style.top)
        if (isNaN(width)) {
            width = parseFloat(window.getComputedStyle(this.obj, null).width)
        }
        return width
    }

    async moveY(yFrom, yTo, speed) {
        let animate
        this.setY(yFrom)
        return new Promise(resolve => {
        let step = () => {
            if (yFrom > yTo && this.getY() >= yTo || yFrom < yTo && this.getY() <= yTo) {
                this.setY(yFrom > yTo? this.getY() - speed : this.getY() + speed)
                animate = requestAnimationFrame(step)
            }
            else {
                cancelAnimationFrame(animate)
                resolve()
            }
        }
        animate = requestAnimationFrame(step)
        })
    }
}

class Balloon extends Movable {
    constructor(obj) {
        super(obj)
    }
}

class Mountain extends Movable {
    constructor(obj) {
        super(obj)
    }
}

class Sea extends Movable {
    constructor(obj) {
        super(obj)
    }
}

class Moon extends Movable {
    constructor(obj) {
        super(obj)
    }
}

class Cloud extends Movable {
    x_min = 0

    constructor(obj) {
        super(obj)
    }
    
    setXMin(x) {
        this.x_min = -x
    }
    
    getXMin() {
        return this.x_min
    }

    async moveX(xFrom, xTo, speed) {
        let animate
        this.setX(xFrom)
        return new Promise(resolve => {
            let step = () => {
                if (xFrom > xTo && this.getX() > xTo || xFrom < xTo && this.getX() < xTo) {
                    this.setX(xFrom > xTo? this.getX() - speed : this.getX() + speed)
                    animate = requestAnimationFrame(step)
                }
                else {
                    cancelAnimationFrame(animate)
                    resolve()
                }
            }
            animate = requestAnimationFrame(step)
        })
    }
}

const viewWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const viewHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

let balloon = new Balloon(document.getElementById('balloon'))
let balloon2 = new Balloon(document.getElementById('balloon2'))

let mountain = new Mountain(document.getElementById('mountain'))
let mountain2 = new Mountain(document.getElementById('mountain2'))

let sea = new Sea(document.getElementById('sea'))
let moon = new Moon(document.getElementById('moon'))

let cloud = new Cloud(document.getElementById('cloud'))
let cloud2 = new Cloud(document.getElementById('cloud2'))
let cloud3 = new Cloud(document.getElementById('cloud3'))
let cloud4 = new Cloud(document.getElementById('cloud4'))
HTMLDocument.prototype.ready = new Promise(function(resolve, reject) {
    if (document.readyState != "loading") {
        return resolve();
    }
    else {
        document.addEventListener("DOMContentLoaded", async function () {
            
            cloud.setXMin(100 + cloud.getWidth())
            cloud2.setXMin(100 + cloud2.getWidth())
            cloud3.setXMin(100 + cloud3.getWidth())
            cloud4.setXMin(100 + cloud4.getWidth())
            cloud4.setX(cloud4.getXMin())
            
            balloon.moveY(viewHeight, balloon.getY(), 7.5)
            balloon2.moveY(viewHeight, balloon2.getY(), 8)
        
            mountain.moveY(viewHeight, mountain.getY(), 5.5)
            mountain2.moveY(viewHeight, mountain2.getY(), 8)
            
            sea.moveY(viewHeight, sea.getY(), 4)
            moon.moveY(-moon.getWidth(), moon.getY(), 6)
        
            cloud.moveX(cloud.getXMin(), cloud.getX(), 10)
            cloud2.moveX(cloud2.getXMin(), cloud2.getX(), 16)
            await cloud3.moveX(cloud3.getXMin(), cloud3.getX(), 18)
            resolve();
        });
    }
})

async function executeAnimation() {
    return new Promise(async (resolve, reject) => {
        done = false
        
        async function pCloud1() {
            await cloud.moveX(cloud.getX(), viewWidth, 2.5)
            if (cloud.getX() >= viewWidth) cloud.setX(cloud.getXMin())
            pCloud1()
        }
        async function pCloud2() {
            await cloud2.moveX(cloud2.getX(), viewWidth, 1.5)
            if (cloud2.getX() >= viewWidth) cloud2.setX(cloud2.getXMin())
            pCloud2()
        }
        async function pCloud3() {
            await cloud3.moveX(cloud3.getX(), viewWidth, 2.75)
            if (cloud3.getX() >= viewWidth) cloud3.setX(cloud3.getXMin())
            pCloud3()
        }
        async function pCloud4() {
            await cloud4.moveX(cloud4.getX(), viewWidth, 1.5)
            if (cloud4.getX() >= viewWidth) cloud4.setX(cloud4.getXMin())
            pCloud4()
        }
        async function pBalloon1() {
            let yFrom = balloon.getY()
            let yTo = balloon.getY() + 40
            await balloon.moveY(yFrom, yTo, 0.2)
            if (balloon.getY() > yTo) {
                await balloon.moveY(yTo, yFrom, 0.2)
            }
            if (balloon.getY() != yFrom) {
                await balloon.moveY(balloon.getY(), yFrom, 0.2)
                balloon.setY(yFrom)
            }
            pBalloon1()
        }
        async function pBalloon2() {
            let yFrom = balloon2.getY()
            let yTo = balloon2.getY() + 40
            await balloon2.moveY(yFrom, yTo, 0.2)
            if (balloon2.getY() > yTo) {
                await balloon2.moveY(yTo, yFrom, 0.2)
            }
            if (balloon2.getY() != yFrom) {
                await balloon2.moveY(balloon2.getY(), yFrom, 0.2)
                balloon2.setY(yFrom)
            }
            pBalloon2()
        }


        pCloud1()
        pCloud2()
        pCloud3()
        pCloud4()
        pBalloon1()
        pBalloon2()
    })
}

document.ready.then(async () => {
    console.log("Resolved!")
    await executeAnimation()
})