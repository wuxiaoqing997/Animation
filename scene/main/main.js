var blocks = []
var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            //  blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
}

var __main = function() {

    var images = {
        defen1: 'img/defen/img1.png',
        defen2: 'img/defen/img2.png',
        defen3: 'img/defen/img3.png',
        defen4: 'img/defen/img4.png',
        defen5: 'img/defen/img5.png',
        defen6: 'img/defen/img6.png',
        defen7: 'img/defen/img7.png',
        defen8: 'img/defen/img8.png',
        defen9: 'img/defen/img9.png',
        defen10: 'img/defen/img10.png',
        defen11: 'img/defen/img11.png',

        fight1: 'img/fight/img1.png',
        fight2: 'img/fight/img2.png',
        fight3: 'img/fight/img3.png',
        fight4: 'img/fight/img4.png',
        fight5: 'img/fight/img5.png',
        fight6: 'img/fight/img6.png',
        fight7: 'img/fight/img7.png',
        fight8: 'img/fight/img8.png',

        run1: 'img/run/img1.png',
        run2: 'img/run/img2.png',
        run3: 'img/run/img3.png',
        run4: 'img/run/img4.png',
        run5: 'img/run/img5.png',
        run6: 'img/run/img6.png',

        bk: 'img/bk.jpg',

    }

    var game = GuaGame.instance(30, images, function(g) {
        var s = SceneTitle.new(g)
        log('begin')
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()