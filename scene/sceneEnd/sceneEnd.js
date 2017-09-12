class SceneEnd extends mainScene {
	constructor(game) {
		super(game)
		game.registerAction('r', function() {
			var s = SceneTitle.new(game)
			game.replaceScene(s)
			log('title')
		})
	}
	draw() {
		this.game.context.fillText('Game Over , Press r restart!', 200, 200)

	}
	update() {}

}