var config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 5,
    fire_cooldown: 9,
}

class Boom extends GuaImage {
    constructor(game) {
        super(game, 'hit')
        this.setup()
    }
    setup() {
        this.speed = 10
        this.life = true
        // this.player = this.game.scene.player
    }
    update() {
        this.y += this.speed
        if (this.life == false) {
            return
        }
    }

}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed
    }
    update() {
        if (this.life == false) {
            return
        }
        this.y -= this.speed
        //log(this.game.scene.enemies.fire)
        /*  if (this.game.scene.EnmyBullet && this.collide(this.game.scene.EnmyBullet)) {
              var s = SceneEnd.new(this.game)
              this.game.replaceScene(s)
              return
          }*/

    }

}

class EnmyBullet extends GuaImage {
    constructor(game) {
        super(game, 'enmybullet')
        this.setup()
    }
    setup() {
        this.speed = 10
        // this.player = this.game.scene.player
    }
    update() {
        this.y += this.speed
        if (this.game.scene.player && this.collide(this.game.scene.player)) {
            var s = SceneEnd.new(this.game)
            this.game.replaceScene(s)
            return
        }
        // log(this.game.scene.herobullets)
        var ele = this.scene.elements.Enemy
        log(ele)
        /*if (ele) {
            for (var i = 0; i < ele.length; i++) {
                if (this.collide(ele[i])) {
                    var e = Boom.new(this.game)
                    e.x = ele[i].x
                    e.y = ele[i].y
                    this.scene.addElement(e)
                    ele[i].life = false
                    ele.splice(i, 1)
                    log(ele)
                }
            }
        }*/

    }

}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
            this.game.scene.herobullets && this.game.scene.herobullets.push(b)
        }
    }

    moveLeft() {
        this.x -= config.player_speed
    }
    moveRight() {
        this.x += config.player_speed
    }
    moveUp() {
        this.y -= config.player_speed
    }
    moveDown() {
        this.y += config.player_speed
    }
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    update() {
        this.y += config.enemy_speed
        if (this.y > 700) {
            this.setup()
        }
        if (this.count < 30) {
            this.count++
        }

        if (this.count == 30) {
            this.count = 1
            this.fire()
        }
        //log(this.game.scene.player)
        if (this.game.scene.player && this.collide(this.game.scene.player)) {
            var s = SceneEnd.new(this.game)
            this.game.replaceScene(s)
        }
        var ele = this.game.scene.herobullets
        if (ele) {
            for (var i = 0; i < ele.length; i++) {
                if (this.collide(ele[i])) {
                    var pas = ParticleSystem.new(this.game)
                    pas.x = ele[i].x
                    pas.y = ele[i].y
                    this.scene.addElement(pas)
                    log('before', this.life)
                    this.life = false
                    log('after', this.life)
                }
            }
        }

        //  this.game.scene.enmy.push([this.x,this.y])
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 450)
        this.y = -randomBetween(0, 200)
        this.count = 1
        this.life = true
    }
    fire() {
        var x = this.x
        var y = this.y
        var b = EnmyBullet.new(this.game)
        b.x = x
        b.y = y + 150 * this.count
        this.scene.addElement(b)
        this.game.scene.enmybullets.push(b)
    }

}

class Cloud extends GuaImage {
    constructor(game) {
        var type = randomBetween(1, 3)
        var name = 'cloud' + type
        super(game, name)
        this.setup()
    }
    update() {
        this.y += config.cloud_speed
        if (this.y > 700) {
            this.setup()
        }
    }
    setup() {
        this.speed = config.cloud_speed
        this.x = randomBetween(0, 500)
        this.y = -randomBetween(0, 200)
    }
}



class Scene extends mainScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInput()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = randomBetween(3, 6)
        this.numberOfCloud = randomBetween(1, 4)
        this.bg = GuaImage.new(game, 'sky')
        this.enmybullets = [] //用来存页面中的敌军子弹
        this.herobullets = [] // 用来存页面中飞机的子弹
        this.enmy = [] //用来存敌人的数组
        this.boom = GuaImage.new(game, 'boom')

        this.player = Player.new(game)
        this.enmy = Enemy.new(game)
        this.player.x = 100
        this.player.y = 700

        this.addElement(this.bg)
        this.addElement(this.player)
        this.addClouds()
        this.addEnemies()

        /* var pas = ParticleSystem.new(this.game)
         this.addElement(pas)*/

    }
    /* judge() {
         for (var p of this.enemies) {
             if (this.player.collide(p)) {
                 var s = SceneEnd.new(this.game)
                 this.game.replaceScene(s)
             }
         }


     }*/
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    addClouds() {
        var es = []
        for (var i = 0; i < this.numberOfCloud; i++) {
            var e = Cloud.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.clouds = es
    }
    setupInput() {
        var g = this.game

        var s = this

        g.registerAction('a', function() {
            s.player.moveLeft()
        })
        g.registerAction('d', function() {
            s.player.moveRight()
        })
        g.registerAction('w', function() {
            s.player.moveUp()
        })
        g.registerAction('s', function() {
            s.player.moveDown()
        })
        g.registerAction('j', function() {
            s.player.fire()
        })

    }
    /* aINb(x, x1, x2) {
         return x >= x1 && x <= x2
     }
     collide(a, b) {
         var a = a
         var b = b
         if (this.aINb(a.x, b.x, b.x + b.w) || this.aINb(b.x, a.x, a.x + a.w)) {
             if (this.aINb(a.y, b.y, b.y + b.h) || this.aINb(b.y, a.y, a.y + a.h)) {
                 return true
             }
         }
         return false
     }
     judgeBullet(a, b) {
         for (var i = 0; i < a.length; i++) {
             for (var j = 0; j < b.length; j++) {
                 if (this.collide(a[i], b[j])) {
                     var e = Boom.new(this.game)
                     e.x = b[j].x
                     e.y = b[j].y
                     this.addElement(e)
                     a.splice(i, 1)
                     b.splice(j, 1)
                 }
             }
         }
     }
     judgeEnmy(a, b) {
         for (var i = 0; i < a.length; i++) {
             for (var j = 0; j < b.length; j++) {
                 if (this.collide(a[i], b[j])) {
                     var pas = ParticleSystem.new(this.game)
                     e.x = b[j].x
                     e.y = b[j].y
                     this.addElement(pas)
                     a.splice(i, 1)
                     b.splice(j, 1)
                 }
             }
         }
     }*/
    update() {
        super.update()
        //log(this.game.scene)
        //this.judgeBullet(this.enmybullets, this.herobullets)
        // this.judgeEnmy(this.herobullets, this.enemies)
    }

}