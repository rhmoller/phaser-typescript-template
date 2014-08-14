/// <reference path="../lib/phaser.d.ts" />
/// <reference path="hello.ts" />

var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-example", {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image("osaa", "OSAA_LOGO.png");
    var msg = new hello.Greeter().hello();
}

var sprite;

function create() {
    sprite = game.add.sprite(210, 120, 'osaa');
    sprite.anchor.set(0.5);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(sprite);    
    
    
}

function update() {
    if (game.physics.arcade.distanceToPointer(sprite, game.input.activePointer) > 8) {
        game.physics.arcade.moveToPointer(sprite, 300);
    } else {
        sprite.body.velocity.set(0);
    }
}
