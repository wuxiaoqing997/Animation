class Animation {
    constructor(game) {
        this.game = game
        this.animations = {
            defen: [],
            fight: [],
            run: [],
        }
        for (var i = 1; i < 11; i++) {
            var name = `defen${i}`
            var t = game.textureByName(name)
            this.animations['defen'].push(t)
        }
        for (var i = 1; i < 8; i++) {
            var name = `fight${i}`
            var t = game.textureByName(name)
            this.animations['fight'].push(t)
        }
        for (var i = 1; i < 6; i++) {
            var name = `run${i}`
            var t = game.textureByName(name)
            this.animations['run'].push(t)
        }

        this.animationName = 'run'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        //当前显示的图片的索引
        this.frameIndex = 0
        //图片切换的帧数间隔
        this.frameCount = 8
        //翻转x轴的标志
        this.flipx = false
    }
    //用于实例化game的一个方法
    //
    static new(game) {
        return new this(game)
    }
    update() {
        this.frameCount--
            if (this.frameCount == 0) {
                this.frameCount = 8
                this.frameIndex = (this.frameIndex + 1) % this.frames().length
                this.texture = this.frames()[this.frameIndex]
            }
    }
    //取出当前动画对象的方法
    frames() {
        return this.animations[this.animationName]
    }
    draw() {
        var context = this.game.context
        if (this.flipx) {
            context.save()
            var x = this.x + this.w / 2
            //将中心点偏移
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)
            log(this.flipx)
            context.drawImage(this.texture, this.x, this.y)
            context.restore()
        } else {
            context.drawImage(this.texture, this.x, this.y)
        }

    }
    move(x, keystatus) {
        this.x += x
        this.flipx = (x < 0)
        var animationNames = {
            down: 'run',
            up: 'defen',
        }
        var name = animationNames[keystatus]
        log(name)

        this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }

}