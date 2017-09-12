class GuaImage {
	constructor(game,name) {
		this.game = game
		this.texture = game.textureByName(name)
		this.x = 0
		this.y = 0 
		this.w = this.texture.width
		this.h = this.texture.height
	}
	static new(game,name) {
		var i = new this(game,name)
		return i
	}
	draw() {
		this.game.drawImage(this)
	}
	update() {

	}
	aINb(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    collide(img) {
        var a = this
        var b = img
        if (this.aINb(a.x, b.x, b.x + b.w) || this.aINb(b.x, a.x, a.x + a.w)) {
            if (this.aINb(a.y, b.y, b.y + b.h) || this.aINb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    kill(img) {
        this.life = false
        img.life = false
    }
}

/*class Player extends GuaImage{
	constructor(game,name){
		super(game,name)

	}
}*/