class SceneTitle extends mainScene {
    constructor(game) {
        super(game)
        var label = Label.new(game, 'hello')
        this.addElement(label)

        var bk = GuaImage.new(game,'bk')
        this.addElement(bk)

        var w = Animation.new(game)
        w.x = 100
        w.y = 400
        this.player = w
        this.addElement(w)

        this.setupInputs()
    }
    setupInputs() {
        var self = this
        this.game.registerAction('a', function(keystatus) {
            self.player.move(-10, keystatus)
        })
        this.game.registerAction('d', function(keystatus) {
            self.player.move(10, keystatus)
        })
    }
}