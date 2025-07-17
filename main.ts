namespace SpriteKind {
    export const WallTester = SpriteKind.create()
    export const FrogBunny = SpriteKind.create()
    export const Ghost = SpriteKind.create()
    export const Sword = SpriteKind.create()
    export const Health = SpriteKind.create()
    export const CHOMP = SpriteKind.create()
    export const Plant = SpriteKind.create()
    export const PitTrap = SpriteKind.create()
    export const Pit = SpriteKind.create()
    export const Decoration = SpriteKind.create()
    export const Minotaur = SpriteKind.create()
    export const SpikeTrap = SpriteKind.create()
    export const Spike = SpriteKind.create()
    export const Pot = SpriteKind.create()
    export const HealthThing = SpriteKind.create()
    export const FakeWhiteWall = SpriteKind.create()
    export const FakeOrangeWall = SpriteKind.create()
    export const LazerBoy = SpriteKind.create()
    export const LazerCrystal = SpriteKind.create()
    export const LazerTarget = SpriteKind.create()
    export const FelineWizard = SpriteKind.create()
    export const BallOPower = SpriteKind.create()
    export const Attacking = SpriteKind.create()
    export const PowerBit = SpriteKind.create()
}
/**
 * Cat Wizard Phases:
 * 
 * 1. Intro
 * 
 * 2. Swipin' Paws
 * 
 * 3. Fire Magic
 * 
 * 4. Ball o' Power
 */
function loadMapAtLocation (column: number, row: number) {
    tiles.loadMap(currentMap[row][column])
    currentColumn = column
    currentRow = row
}
function moveToAtSpeed (sprite: Sprite, x: number, y: number, speed: number, pause2: boolean) {
    spriteutils.setVelocityAtAngle(sprite, Math.atan2(y - sprite.y, x - sprite.x), speed)
    if (pause2) {
        pause(Math.sqrt((sprite.x - x) ** 2 + (sprite.y - y) ** 2) / speed * 1000)
        sprite.setPosition(x, y)
        sprite.setVelocity(0, 0)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile35`, function (sprite, location) {
    tiles.setTileAt(location, overworldGold.mySprite56)
    numberOfKeys += 1
    updateKeyUI()
})
sprites.onOverlap(SpriteKind.LazerTarget, SpriteKind.Player, function (sprite, otherSprite) {
    dealDamageToHero(sprite, false)
})
sprites.onCreated(SpriteKind.CHOMP, function (sprite) {
    sprites.setDataNumber(sprite, "health", 6)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile30`, function (sprite, location) {
    currentMap = tilemapMap
    loadMapAtLocation(1, 0)
    onTilemapLoaded()
    hero.setPosition(88, 73)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Spike, function (sprite, otherSprite) {
    dealDamageToHero(sprite, false)
})
sprites.onCreated(SpriteKind.Minotaur, function (sprite) {
    sprites.setDataNumber(sprite, "health", 4)
})
function damageEnemy (enemy: Sprite) {
    sprites.changeDataNumberBy(enemy, "health", -1)
    if (sprites.readDataNumber(enemy, "health") == 0) {
        enemy.destroy(effects.disintegrate, 200)
        if (Math.percentChance(50)) {
            mySprite2 = sprites.create(img`
                . . . f f . f f . . . 
                . . f 1 1 f 1 1 f . . 
                . f 1 d d 1 d d 1 f . 
                f 1 d d d d d 1 d 1 f 
                f 1 d d d d 1 d d 1 f 
                . f 1 d d d d d 1 f . 
                . . f 1 d d d 1 f . . 
                . . . f 1 d 1 f . . . 
                . . . . f 1 f . . . . 
                . . . . . f . . . . . 
                `, SpriteKind.HealthThing)
            mySprite2.setPosition(enemy.x, enemy.y)
        }
    } else {
        spriteutils.setVelocityAtAngle(enemy, spriteutils.angleFrom(swordSprite, enemy), 50)
        animation.runImageAnimation(
        enemy,
        makeBlinkingAnimation(enemy),
        100,
        true
        )
        enemy.setFlag(SpriteFlag.GhostThroughSprites, true)
        timer.after(500, function () {
            animation.stopAnimation(animation.AnimationTypes.All, enemy)
            enemy.setVelocity(0, 0)
            enemy.setFlag(SpriteFlag.GhostThroughSprites, false)
        })
    }
}
sprites.onOverlap(SpriteKind.CHOMP, SpriteKind.Player, function (sprite, otherSprite) {
    dealDamageToHero(sprite, false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    dealDamageToHero(sprite, false)
})
function updateKeyUI () {
    if (keyLabel) {
        keyLabelNumber.setOutline(1, 15)
        keyLabel.destroy()
        keyLabelNumber.destroy()
    }
    keyLabel = sprites.create(img`
        . f f f . . . . . . . . . 
        f 1 1 1 f . . . . . . . . 
        f 1 f 1 f . . . . . . . . 
        f 1 1 1 f . . . f . f . . 
        . f 1 f . . . f 1 f 1 f . 
        . f 1 1 f . . . f 1 f . . 
        . f 1 f . . . f 1 f 1 f . 
        . f 1 1 f . . . f . f . . 
        . f 1 f . . . . . . . . . 
        . . f . . . . . . . . . . 
        `, SpriteKind.Player)
    keyLabel.top = 2
    keyLabel.left = 140
    keyLabelNumber = textsprite.create("" + numberOfKeys)
    keyLabelNumber.setOutline(1, 15)
    keyLabelNumber.top = 2
    keyLabelNumber.left = 153
}
function createBat () {
    newEnemy = sprites.create(assets.image`bat`, SpriteKind.FrogBunny)
    character.loopFrames(
    newEnemy,
    assets.animation`myAnim2`,
    100,
    character.rule(Predicate.FacingLeft)
    )
    character.loopFrames(
    newEnemy,
    assets.animation`myAnim3`,
    100,
    character.rule(Predicate.FacingRight)
    )
    return newEnemy
}
sprites.onOverlap(SpriteKind.FrogBunny, SpriteKind.Player, function (sprite, otherSprite) {
    dealDamageToHero(sprite, false)
})
function updateHealth (current: number, max: number) {
    maxHealth = max
    currentHealth = current
    tiles.destroySpritesOfKind(SpriteKind.Health)
    for (let index = 0; index <= max / 2 - 1; index++) {
        newHeart = sprites.create(img`
            . . . f f . f f . . . 
            . . f 1 1 f 1 1 f . . 
            . f 1 f f 1 f f 1 f . 
            f 1 f f f f f 1 f 1 f 
            f 1 f f f f 1 f f 1 f 
            . f 1 f f f f f 1 f . 
            . . f 1 f f f 1 f . . 
            . . . f 1 f 1 f . . . 
            . . . . f 1 f . . . . 
            . . . . . f . . . . . 
            `, SpriteKind.Health)
        newHeart.setFlag(SpriteFlag.RelativeToCamera, true)
        newHeart.top = 3
        newHeart.left = 2 + index * 10
        if (index < Math.floor(current / 2)) {
            newHeart.setImage(img`
                . . . f f . f f . . . 
                . . f 1 1 f 1 1 f . . 
                . f 1 d d 1 d d 1 f . 
                f 1 d d d d d 1 d 1 f 
                f 1 d d d d 1 d d 1 f 
                . f 1 d d d d d 1 f . 
                . . f 1 d d d 1 f . . 
                . . . f 1 d 1 f . . . 
                . . . . f 1 f . . . . 
                . . . . . f . . . . . 
                `)
        } else if (index == Math.floor(current / 2) && current % 2 == 1) {
            newHeart.setImage(img`
                . . . f f . f f . . . 
                . . f 1 1 f 1 1 f . . 
                . f 1 d d 1 f f 1 f . 
                f 1 d d d d f 1 f 1 f 
                f 1 d d d d 1 f f 1 f 
                . f 1 d d d f f 1 f . 
                . . f 1 d d f 1 f . . 
                . . . f 1 d 1 f . . . 
                . . . . f 1 f . . . . 
                . . . . . f . . . . . 
                `)
        }
    }
}
sprites.onOverlap(SpriteKind.Sword, SpriteKind.FrogBunny, function (sprite, otherSprite) {
    damageEnemy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile42`, function (sprite, location) {
    tiles.setTileAt(location, overworldGold.mySprite56)
    if (tiles.tileIs(tiles.getTileLocation(tiles.locationXY(location, tiles.XY.column), 7), assets.tile`myTile40`)) {
        projectile = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 1 f . . . . . . . 
            . . . . . f 1 1 1 f . . . . . . 
            . . . . . f 1 1 1 f . . . . . . 
            . . . . f 1 1 1 1 1 f . . . . . 
            . . . . . f f d f f . . . . . . 
            . . . . . . f d f . . . . . . . 
            . . . . . . f d f . . . . . . . 
            . . . . . . f d f . . . . . . . 
            . . . . . . f d f . . . . . . . 
            . . . . . . f d f . . . . . . . 
            . . . . . f 1 d 1 f . . . . . . 
            . . . . . f 1 d 1 f . . . . . . 
            . . . . . f 1 d 1 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            `, 0, -100)
        tiles.placeOnTile(projectile, tiles.getTileLocation(tiles.locationXY(location, tiles.XY.column), 7))
    }
    if (tiles.tileIs(tiles.getTileLocation(tiles.locationXY(location, tiles.XY.column), 0), assets.tile`myTile44`)) {
        projectile = sprites.createProjectileFromSide(img`
            . . . . . . f f f . . . . . . . 
            . . . . . f 1 d 1 f . . . . . . 
            . . . . . f 1 d 1 f . . . . . . 
            . . . . . f 1 d 1 f . . . . . . 
            . . . . . . f d f . . . . . . . 
            . . . . . . f d f . . . . . . . 
            . . . . . . f d f . . . . . . . 
            . . . . . . f d f . . . . . . . 
            . . . . . . f d f . . . . . . . 
            . . . . . f f d f f . . . . . . 
            . . . . f 1 1 1 1 1 f . . . . . 
            . . . . . f 1 1 1 f . . . . . . 
            . . . . . f 1 1 1 f . . . . . . 
            . . . . . . f 1 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 0, 100)
        tiles.placeOnTile(projectile, tiles.getTileLocation(tiles.locationXY(location, tiles.XY.column), 0))
    }
    if (tiles.tileIs(tiles.getTileLocation(0, tiles.locationXY(location, tiles.XY.row)), assets.tile`myTile41`)) {
        projectile = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . f . . . . . 
            . f f f . . . . . f 1 f f . . . 
            f 1 1 1 f f f f f f 1 1 1 f . . 
            f d d d d d d d d d 1 1 1 1 f . 
            f 1 1 1 f f f f f f 1 1 1 f . . 
            . f f f . . . . . f 1 f f . . . 
            . . . . . . . . . . f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 100, 0)
        tiles.placeOnTile(projectile, tiles.getTileLocation(0, tiles.locationXY(location, tiles.XY.row)))
    }
    if (tiles.tileIs(tiles.getTileLocation(9, tiles.locationXY(location, tiles.XY.row)), assets.tile`myTile43`)) {
        projectile = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f . . . . . . . . . . 
            . . . f f 1 f . . . . . f f f . 
            . . f 1 1 1 f f f f f f 1 1 1 f 
            . f 1 1 1 1 d d d d d d d d d f 
            . . f 1 1 1 f f f f f f 1 1 1 f 
            . . . f f 1 f . . . . . f f f . 
            . . . . . f . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, -100, 0)
        tiles.placeOnTile(projectile, tiles.getTileLocation(9, tiles.locationXY(location, tiles.XY.row)))
    }
})
function dealDamageToHero (source: Sprite, dontKb: boolean) {
    currentHealth += -1
    updateHealth(currentHealth, maxHealth)
    controller.moveSprite(hero, 0, 0)
    character.setCharacterAnimationsEnabled(hero, false)
    if (currentHealth == 0) {
        hero.setFlag(SpriteFlag.Ghost, true)
        tiles.destroySpritesOfKind(SpriteKind.FrogBunny)
        animation.runImageAnimation(
        hero,
        [img`
            . . . f f f f f f . . . . . . . 
            . . f 1 1 1 1 1 d f . . . . . . 
            . f 1 1 d d d 1 d d f . . . . . 
            . f 1 d d d d d 1 d f . . . . . 
            . f 1 d d d d d 1 1 f f f . . . 
            . f 1 d d d d d 1 1 1 1 1 f f f 
            . f 1 1 d d d 1 1 1 f 1 1 1 1 d 
            . . f 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . . . f 1 1 1 1 1 1 1 1 1 1 f . 
            . . . . f 1 1 1 1 1 f f f f . . 
            . . . f 1 1 1 1 1 1 1 f . . . . 
            . f f 1 f 1 1 1 1 1 f 1 f . . . 
            f 1 f 1 f 1 1 1 1 1 f 1 f . . . 
            f 1 f f 1 1 1 1 1 1 f f . . . . 
            . f 1 1 f 1 1 1 1 1 f . . . . . 
            . . f f . f 1 f 1 f . . . . . . 
            `,img`
            . . f f . . . . . . . . . . . . 
            . f 1 1 f . . . . f f f f f . . 
            f 1 f f f . . . f 1 1 1 1 1 f . 
            f 1 f 1 1 f . f 1 1 d d d 1 1 f 
            . f 1 f f 1 f 1 1 d d d d d 1 f 
            f 1 1 1 1 1 1 1 1 d d d d d 1 f 
            1 1 1 1 1 1 1 1 1 d d d d d 1 f 
            f 1 1 1 1 1 1 1 1 1 d d d 1 1 f 
            1 1 1 1 1 1 1 1 1 1 1 1 1 d d f 
            f 1 1 1 1 1 1 1 1 1 1 1 d d f . 
            . f f f f 1 f 1 1 f 1 f f f . . 
            . . f 1 1 f f 1 1 1 1 f . . . . 
            . . . f f . f 1 1 1 1 f . . . . 
            . . . . . . f 1 1 1 f . . . . . 
            . . . . . . . f 1 1 f . . . . . 
            . . . . . . . . f d f . . . . . 
            `,img`
            . . . . . . f 1 f 1 f . f f . . 
            . . . . . f 1 1 1 1 1 f 1 1 f . 
            . . . . f f 1 1 1 1 1 1 f f 1 f 
            . . . f 1 f 1 1 1 1 1 f 1 f 1 f 
            . . . f 1 f 1 1 1 1 1 f 1 f f . 
            . . . . f 1 1 1 1 1 1 1 f . . . 
            . . f f f f 1 1 1 1 1 f . . . . 
            . f 1 1 1 1 1 1 1 1 1 1 f . . . 
            f 1 1 1 1 1 1 1 1 1 1 1 1 f . . 
            d 1 1 1 1 f 1 1 1 d d d 1 1 f . 
            f f f 1 1 1 1 1 d d d d d 1 f . 
            . . . f f f 1 1 d d d d d 1 f . 
            . . . . . f d 1 d d d d d 1 f . 
            . . . . . f d d 1 d d d 1 1 f . 
            . . . . . . f d 1 1 1 1 1 f . . 
            . . . . . . . f f f f f f . . . 
            `,img`
            . . . . . f d f . . . . . . . . 
            . . . . . f 1 1 f . . . . . . . 
            . . . . . f 1 1 1 f . . . . . . 
            . . . . f 1 1 1 1 f . f f . . . 
            . . . . f 1 1 1 1 f f 1 1 f . . 
            . . f f f 1 f 1 1 f 1 f f f f . 
            . f d d 1 1 1 1 1 1 1 1 1 1 1 f 
            f d d 1 1 1 1 1 1 1 1 1 1 1 1 1 
            f 1 1 d d d 1 1 1 1 1 1 1 1 1 f 
            f 1 d d d d d 1 1 1 1 1 1 1 1 1 
            f 1 d d d d d 1 1 1 1 1 1 1 1 f 
            f 1 d d d d d 1 1 f 1 f f 1 f . 
            f 1 1 d d d 1 1 f . f 1 1 f 1 f 
            . f 1 1 1 1 1 f . . . f f f 1 f 
            . . f f f f f . . . . f 1 1 f . 
            . . . . . . . . . . . . f f . . 
            `],
        100,
        true
        )
        timer.after(1500, function () {
            game.reset()
        })
    } else {
        if (!(dontKb)) {
            spriteutils.setVelocityAtAngle(hero, spriteutils.angleFrom(source, hero), 50)
        }
        animation.runImageAnimation(
        hero,
        makeBlinkingAnimation(hero),
        100,
        true
        )
        hero.setFlag(SpriteFlag.GhostThroughSprites, true)
        timer.after(500, function () {
            animation.stopAnimation(animation.AnimationTypes.All, hero)
            hero.setVelocity(0, 0)
            controller.moveSprite(hero)
            character.setCharacterAnimationsEnabled(hero, true)
            hero.setFlag(SpriteFlag.GhostThroughSprites, false)
        })
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.PitTrap, function (sprite, otherSprite) {
    if (!(sprites.readDataBoolean(otherSprite, "falling"))) {
        sprites.setDataBoolean(otherSprite, "falling", true)
        animation.runImageAnimation(
        otherSprite,
        assets.animation`myAnim`,
        100,
        false
        )
        otherSprite.lifespan = 800
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile31`, function (sprite, location) {
    for (let value of tiles.getTilesByType(assets.tile`myTile32`)) {
        tiles.setWallAt(value, false)
    }
    tiles.destroySpritesOfKind(SpriteKind.Decoration)
    tiles.setTileAt(location, assets.tile`myTile33`)
})
sprites.onOverlap(SpriteKind.Sword, SpriteKind.Pot, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
    tiles.setWallAt(tiles.locationOfSprite(otherSprite), false)
    if (Math.percentChance(30)) {
        mySprite = sprites.create(img`
            . . . f f . f f . . . 
            . . f 1 1 f 1 1 f . . 
            . f 1 d d 1 d d 1 f . 
            f 1 d d d d d 1 d 1 f 
            f 1 d d d d 1 d d 1 f 
            . f 1 d d d d d 1 f . 
            . . f 1 d d d 1 f . . 
            . . . f 1 d 1 f . . . 
            . . . . f 1 f . . . . 
            . . . . . f . . . . . 
            `, SpriteKind.HealthThing)
        tiles.placeOnTile(mySprite, tiles.locationOfSprite(otherSprite))
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(isSlashing)) {
        isSlashing = true
        if (character.matchesRule(hero, character.rule(Predicate.FacingUp))) {
            animation.runImageAnimation(
            swordSprite,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . f . . . . . . 
                . f f f f f f f f 1 f f . . . . 
                f 1 1 1 1 1 1 1 1 1 f 1 f . . . 
                . f f f f f f f f 1 f f . . . . 
                . . . . . . . . . f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . f . . . . . . . . . . . . 
                . . f 1 f . . . . . . . . . . . 
                . f d d 1 f . . . . . . . . . . 
                . f d d d 1 f . . . . . . . . . 
                . f d d d d 1 f . . . . . . . . 
                f d d d d d d 1 f . . . . . . . 
                f d d d d d d d 1 f . f . . . . 
                f d d d d d d d d 1 f 1 f . . . 
                f d d d d f f f f d 1 f . . . . 
                f d d d f . . . f 1 f f . . . . 
                f d f f . . . . . f f 1 f . . . 
                f d f . . . . . . . . f . . . . 
                . f . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . f f f f . . . . 
                . . . . . . f f d d d 1 f . . . 
                . . . . . f d d d d d 1 f . . . 
                . . . f f d d d d d d 1 f . . . 
                . . f d d d d d d d d 1 f . . . 
                . . f d d d d d d d d 1 f . . . 
                . f d d d d d d d d d 1 f . . . 
                . f d d d d d d d d d 1 f . . . 
                . f d d d d d d d d d 1 f . . . 
                f d d d d d d d d d d 1 f . . . 
                f d d d d d f f f f 1 1 1 f . . 
                f d d d d f . . . . f f f . . . 
                f d d f f . . . . . f 1 f . . . 
                f d f . . . . . . . . f . . . . 
                . f . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . f . . . . 
                . . . . . . . . . . f 1 f . . . 
                . . . . . . . . . . f 1 f . . . 
                . . . . . . . . . . f 1 f . . . 
                . . . . . . . . . . f 1 f . . . 
                . . . . . . . . . . f 1 f . . . 
                . . . . . . . . . . f 1 f . . . 
                . . . . . . . . . . f 1 f . . . 
                . . . . . . . . . . f 1 f . . . 
                . . . . . . . . . . f 1 f . . . 
                . . . . . . . . . f 1 1 1 f . . 
                . . . . . . . . . . f f f . . . 
                . . . . . . . . . . f 1 f . . . 
                . . . . . . . . . . . f . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            50,
            false
            )
        } else if (character.matchesRule(hero, character.rule(Predicate.FacingRight))) {
            animation.runImageAnimation(
            swordSprite,
            [img`
                . . f . . . . . . . . . . . . . 
                . f 1 f . . . . . . . . . . . . 
                . f 1 f . . . . . . . . . . . . 
                . f 1 f . . . . . . . . . . . . 
                . f 1 f . . . . . . . . . . . . 
                . f 1 f . . . . . . . . . . . . 
                . f 1 f . . . . . . . . . . . . 
                . f 1 f . . . . . . . . . . . . 
                . f 1 f . . . . . . . . . . . . 
                f 1 1 1 f . . . . . . . . . . . 
                . f f f . . . . . . . . . . . . 
                . f 1 f . . . . . . . . . . . . 
                . . f . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . f f f f f f f . . . . . . . . 
                f d d d d d d d f f f . . . . . 
                . f f d d d d d d d d f . . . . 
                . . f d d d d d d d d 1 f . . . 
                . . . f d d d d d d 1 f . . . . 
                . . . . f d d d d 1 f . . . . . 
                . . . . f d d d 1 f . . . . . . 
                . . . . f d d 1 f . . . . . . . 
                . . . f f d 1 f . . . . . . . . 
                . . f 1 d 1 f . . . . . . . . . 
                . . f f 1 f . . . . . . . . . . 
                . f 1 f f 1 f . . . . . . . . . 
                . . f . . f . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . f f f f f . . . . . . . . . . 
                f d d d d d f f f . . . . . . . 
                . f d d d d d d d f f . . . . . 
                . . f d d d d d d d d f . . . . 
                . . f d d d d d d d d f . . . . 
                . . . f d d d d d d d d f . . . 
                . . . . f d d d d d d d d f . . 
                . . . . f d d d d d d d d f . . 
                . . . . f d d d d d d d d d f . 
                . . . . f d d d d d d d d d f . 
                . . f f 1 d d d d d d d d d f . 
                . f 1 f 1 1 1 1 1 1 1 1 1 1 f . 
                . . f f 1 f f f f f f f f f . . 
                . . . . f . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . f . . . . . . . . . . . 
                . . f f 1 f f f f f f f f f . . 
                . f 1 f 1 1 1 1 1 1 1 1 1 1 f . 
                . . f f 1 f f f f f f f f f . . 
                . . . . f . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            50,
            false
            )
        } else if (character.matchesRule(hero, character.rule(Predicate.FacingDown))) {
            animation.runImageAnimation(
            swordSprite,
            [img`
                . . . . . . f . . . . . . . . . 
                . . . . f f 1 f f f f f f f f . 
                . . . f 1 f 1 1 1 1 1 1 1 1 1 f 
                . . . . f f 1 f f f f f f f f . 
                . . . . . . f . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . f . 
                . . . . f . . . . . . . . f d f 
                . . . f 1 f f . . . . . f f d f 
                . . . . f f 1 f . . . f d d d f 
                . . . . f 1 d f f f f d d d d f 
                . . . f 1 f 1 d d d d d d d d f 
                . . . . f . f 1 d d d d d d d f 
                . . . . . . . f 1 d d d d d d f 
                . . . . . . . . f 1 d d d d f . 
                . . . . . . . . . f 1 d d d f . 
                . . . . . . . . . . f 1 d d f . 
                . . . . . . . . . . . f 1 f . . 
                . . . . . . . . . . . . f . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . f . 
                . . . . f . . . . . . . . f d f 
                . . . f 1 f . . . . . f f d d f 
                . . . f f f . . . . f d d d d f 
                . . f 1 1 1 f f f f d d d d d f 
                . . . f 1 d d d d d d d d d d f 
                . . . f 1 d d d d d d d d d f . 
                . . . f 1 d d d d d d d d d f . 
                . . . f 1 d d d d d d d d d f . 
                . . . f 1 d d d d d d d d f . . 
                . . . f 1 d d d d d d d d f . . 
                . . . f 1 d d d d d d f f . . . 
                . . . f 1 d d d d d f . . . . . 
                . . . f 1 d d d f f . . . . . . 
                . . . . f f f f . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . f . . . . . . . . . . . 
                . . . f 1 f . . . . . . . . . . 
                . . . f f f . . . . . . . . . . 
                . . f 1 1 1 f . . . . . . . . . 
                . . . f 1 f . . . . . . . . . . 
                . . . f 1 f . . . . . . . . . . 
                . . . f 1 f . . . . . . . . . . 
                . . . f 1 f . . . . . . . . . . 
                . . . f 1 f . . . . . . . . . . 
                . . . f 1 f . . . . . . . . . . 
                . . . f 1 f . . . . . . . . . . 
                . . . f 1 f . . . . . . . . . . 
                . . . f 1 f . . . . . . . . . . 
                . . . . f . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            50,
            false
            )
        } else {
            animation.runImageAnimation(
            swordSprite,
            [img`
                . . . . . . . . . . . . . f . . 
                . . . . . . . . . . . . f 1 f . 
                . . . . . . . . . . . . f 1 f . 
                . . . . . . . . . . . . f 1 f . 
                . . . . . . . . . . . . f 1 f . 
                . . . . . . . . . . . . f 1 f . 
                . . . . . . . . . . . . f 1 f . 
                . . . . . . . . . . . . f 1 f . 
                . . . . . . . . . . . . f 1 f . 
                . . . . . . . . . . . f 1 1 1 f 
                . . . . . . . . . . . . f f f . 
                . . . . . . . . . . . . f 1 f . 
                . . . . . . . . . . . . . f . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . f f f f f f f . 
                . . . . . f f f d d d d d d d f 
                . . . . f d d d d d d d d f f . 
                . . . f 1 d d d d d d d d f . . 
                . . . . f 1 d d d d d d f . . . 
                . . . . . f 1 d d d d f . . . . 
                . . . . . . f 1 d d d f . . . . 
                . . . . . . . f 1 d d f . . . . 
                . . . . . . . . f 1 d f f . . . 
                . . . . . . . . . f 1 d 1 f . . 
                . . . . . . . . . . f 1 f f . . 
                . . . . . . . . . f 1 f f 1 f . 
                . . . . . . . . . . f . . f . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . f f f f f . 
                . . . . . . . f f f d d d d d f 
                . . . . . f f d d d d d d d f . 
                . . . . f d d d d d d d d f . . 
                . . . . f d d d d d d d d f . . 
                . . . f d d d d d d d d f . . . 
                . . f d d d d d d d d f . . . . 
                . . f d d d d d d d d f . . . . 
                . f d d d d d d d d d f . . . . 
                . f d d d d d d d d d f . . . . 
                . f d d d d d d d d d 1 f f . . 
                . f 1 1 1 1 1 1 1 1 1 1 f 1 f . 
                . . f f f f f f f f f 1 f f . . 
                . . . . . . . . . . . f . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . f . . . . 
                . . f f f f f f f f f 1 f f . . 
                . f 1 1 1 1 1 1 1 1 1 1 f 1 f . 
                . . f f f f f f f f f 1 f f . . 
                . . . . . . . . . . . f . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `],
            50,
            false
            )
        }
        character.setCharacterAnimationsEnabled(hero, false)
        timer.after(200, function () {
            character.setCharacterAnimationsEnabled(hero, true)
            swordSprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
            isSlashing = false
        })
    }
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (tiles.tileIs(location, assets.tile`myTile34`) && numberOfKeys > 0) {
        numberOfKeys += -1
        updateKeyUI()
        tiles.setWallAt(location, false)
        tiles.setTileAt(location, overworldGold.mySprite56)
        surroundingLocations = [
        tiles.locationInDirection(location, CollisionDirection.Top),
        tiles.locationInDirection(location, CollisionDirection.Left),
        tiles.locationInDirection(location, CollisionDirection.Right),
        tiles.locationInDirection(location, CollisionDirection.Bottom)
        ]
        for (let value of surroundingLocations) {
            if (tiles.tileIs(value, assets.tile`myTile34`)) {
                tiles.setTileAt(value, overworldGold.mySprite56)
                tiles.setWallAt(value, false)
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, overworldGold.mySprite28, function (sprite, location) {
    currentMap = dungeonMap
    loadMapAtLocation(2, 5)
    onTilemapLoaded()
    hero.setPosition(80, 103)
})
function makeBlinkingAnimation (sprite: Sprite) {
    animationArray = []
    animationArray.push(sprite.image)
    picture = sprite.image.clone()
    animationArray.push(picture)
    picture.replace(1, 3)
    picture.replace(15, 1)
    picture.replace(3, 15)
    return animationArray
}
sprites.onOverlap(SpriteKind.Sword, SpriteKind.BallOPower, function (sprite, otherSprite) {
    ballIsHandled = true
    didBallGetHit = true
    story.cancelSpriteMovement(currentBallOfPower)
    currentBallOfPower.setFlag(SpriteFlag.GhostThroughSprites, true)
})
function startBossPhase () {
    fakeFloor.setFlag(SpriteFlag.Invisible, true)
    currentBossPhase = ["Swipin'", "Bat Spell", "Ball o' Power"]._pickRandom()
    if (currentBossPhase == "Bat Spell") {
        for (let index = 0; index < 4; index++) {
            batSpell = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . 4 5 5 4 . . . . . . 
                . . . . . . 2 5 5 2 . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Decoration)
            animation.runImageAnimation(
            batSpell,
            [img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . d d . . . . . . . 
                . . . . . . d 1 1 d . . . . . . 
                . . . . . . d 1 1 d . . . . . . 
                . . . . . . . d d . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . d . . . . . 
                . . . . d . . . . d d . . . . . 
                . . . . d d . . d 1 d . . . . . 
                . . . . . d d d 1 1 d . . . . . 
                . . . . . d 1 1 1 1 d . . . . . 
                . . . . . . d 1 1 1 1 d . . . . 
                . . . . . . d 1 d d d d . . . . 
                . . . . . . d d . . d d d . . . 
                . . . . . d d . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . d . . . . . . . . . . . d . . 
                . d d . . . . . . . . . d d . . 
                . d d d . . d d . . d d d d . . 
                . . d 1 d d 1 1 d d d d d d . . 
                . . d d 1 d 1 1 d 1 1 d d d . . 
                . . d 1 1 1 1 1 1 1 1 1 1 d . . 
                . d 1 1 1 1 1 1 1 1 1 1 d d d . 
                . d d 1 1 1 1 1 1 1 1 1 1 1 d . 
                . d d 1 1 1 1 1 1 1 1 d 1 1 d . 
                . . d 1 d 1 1 1 d 1 1 d d d d . 
                . d 1 1 d 1 1 1 d d d 1 1 d . . 
                . d 1 1 d 1 1 d d 1 d 1 1 d . . 
                . d d d d d d d d d 1 d d d . . 
                . . d 1 d d d d d d d d d . . . 
                . d 1 d . . d d d . . . d d . . 
                . d d . . . . . . . . . . d d . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . d d . d d d . . . . . 
                . . . . d 1 1 d 1 1 1 1 . . . . 
                . . d d 1 1 1 d d 1 d d d d . . 
                . d 1 1 d d d d d d d 1 1 d . . 
                . d 1 1 1 d . . . . . d d d d . 
                . . 1 d d d . . . . . d d 1 1 d 
                . d 1 d d . . . . . . . d 1 1 d 
                . d 1 1 d . . . . . . d d 1 d d 
                . d 1 d d . . . . . . d d 1 d d 
                . d d d d d . . . . d d d d d . 
                . d d d d d d . d d 1 d d 1 d . 
                . . d d d 1 1 d d 1 1 d d d . . 
                . . . d d d d d d d d d . . . . 
                . . . . . . d d d d d . . . . . 
                `],
            100,
            false
            )
            tiles.placeOnRandomTile(batSpell, overworldGold.mySprite56)
            batSpell.lifespan = 500
            pause(500)
            newEnemy = createBat()
            newEnemy.setPosition(batSpell.x, batSpell.y)
        }
    } else if (currentBossPhase == "Ball o' Power") {
        currentBallOfPower = sprites.create(img`
            . . . . . f f f f f f f . . . . . 
            . . . f f d d d d d d d f f . . . 
            . . f d d d d d d d d d d d f . . 
            . f d d d d d d d d d d d d d f . 
            . f d d d d d d d d d d d d d f . 
            f d d d d d 1 1 1 1 1 d d d d d f 
            f d d d d 1 1 d d 1 1 1 d d d d f 
            f d d d d 1 d 1 1 1 1 1 d d d d f 
            f d d d d 1 d 1 1 1 1 1 d d d d f 
            f d d d d 1 1 1 1 1 1 1 d d d d f 
            f d d d d 1 1 1 1 1 1 1 d d d d f 
            f d d d d d 1 1 1 1 1 d d d d d f 
            . f d d d d d d d d d d d d d f . 
            . f d d d d d d d d d d d d d f . 
            . . f d d d d d d d d d d d f . . 
            . . . f f d d d d d d d f f . . . 
            . . . . . f f f f f f f . . . . . 
            `, SpriteKind.BallOPower)
        currentBallVelocity = 40
        currentBallOfPower.setFlag(SpriteFlag.GhostThroughWalls, true)
        currentBallOfPower.setPosition(catBoss.x, catBoss.y)
        currentAngle = 0
        for (let index = 0; index < 60; index++) {
            currentAngle += 0.4
            aBitOfPower = sprites.create(img`
                . f f . 
                f 1 1 f 
                f 1 1 f 
                . f f . 
                `, SpriteKind.PowerBit)
            aBitOfPower.follow(currentBallOfPower, 150)
            aBitOfPower.setFlag(SpriteFlag.Ghost, true)
            aBitOfPower.lifespan = 500
            spriteutils.placeAngleFrom(
            aBitOfPower,
            currentAngle,
            60,
            currentBallOfPower
            )
            pause(50)
        }
        pause(1000)
        for (let index = 0; index < requiredDeflections; index++) {
            didBallGetHit = false
            currentBallOfPower.setFlag(SpriteFlag.GhostThroughSprites, false)
            moveToAtSpeed(currentBallOfPower, hero.x, hero.y, currentBallVelocity, false)
            currentBallVelocity += 10
            ballIsHandled = false
            while (!(ballIsHandled)) {
                pause(100)
            }
            if (didBallGetHit) {
                moveToAtSpeed(currentBallOfPower, catBoss.x, catBoss.y, currentBallVelocity, true)
                currentBallVelocity += 10
            } else {
                break;
            }
        }
        currentBallOfPower.destroy()
        if (didBallGetHit) {
            catBoss.setImage(img`
                ...........................ddd...............
                .......................ddddfffddd............
                .....................ddffffffffffd...........
                ....................dfffffffffffffd..........
                ...................dffffffffffffffd..........
                ..................dffffffffffffddfd..........
                .................dffffffffffffd..d...........
                .................dffffffffffffd..............
                ................dffffffffffffd...............
                ...............dfddfffffffddfd...............
                ...............dfdddddddddddfd...............
                ...............dfdddddddddddfdddddd..........
                ..........dddddffddddddddddffdfffffd.........
                .....ddddd11111fffffffffffffff11111fdddd.....
                ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
                .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
                dfffffffff1dddd111fffffffff111dddd1fffffffffd
                .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
                ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
                .....ddddfffffffffffffffffffffffffffdddd.....
                .........ddd11fffffffffffffffff11ddd.........
                ..........d111111111f111f111111111d..........
                ..........d1111111f11f1f11f1111111d..........
                ..........d111111f1f1f1f1f1f111111d..........
                ..........d111111f1f11111f1f111111d..........
                .........d1111111fff11111fff1111111d.........
                .........d1111111fdf11111fdf1111111d.........
                .........d1111111fdf11111fdf1111111d.........
                .........d11111111f11ddd11f11111111d.........
                .........d111ffff111ddddd111ffff111d.........
                .........d1ff1111f1111f1111f1111ff1d.........
                .........d1111fff11111f11111fff1111d.........
                .........d11ff11111f11f11f11111ff11d.........
                .........d11111fff1dffdffd1fff11111d.........
                ..........d1fff1111d1ddd1d1111fff1d..........
                ...........d1111111ddddddd1111111d...........
                ............d1111111ddddd1111111d............
                .............d1111111ddd1111111d.............
                ............ddd111111111111111ddd............
                ..........dddddddd111111111dddddddd..........
                .........ddddddddddddddddddddddddddd.........
                ........ddddddddddddddddddddddddddddd........
                ........ddddddddddddddddddddddddddddd........
                .......ddddddddddddddddddddddddddddddd.......
                ......ddddddddddddddddddddddddddddddddd......
                ......ddddddddddddddddddddddddddddddddd......
                .....ddddddddddddddddddddddddddddddddddd.....
                .....ddddddddddddddddddddddddddddddddddd.....
                `)
            animation.runImageAnimation(
            catBoss,
            makeBlinkingAnimation(catBoss),
            100,
            true
            )
            pause(1000)
            animation.stopAnimation(animation.AnimationTypes.All, catBoss)
            catBoss.setImage(assets.image`myImage0`)
            catBossHealth += -1
            requiredDeflections += 3
            if (catBossHealth == 0) {
                scene.cameraShake(2, 5000)
                fakeFloor.setFlag(SpriteFlag.Invisible, false)
                catBoss.setImage(assets.image`myImage1`)
                animation.runMovementAnimation(
                catBoss,
                "v 46",
                4000,
                false
                )
                for (let index = 0; index < 40; index++) {
                    mySprite = sprites.create(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `, SpriteKind.Player)
                    mySprite.setPosition(catBoss.x + randint(-20, 20), catBoss.y + randint(-30, 30))
                    animation.runImageAnimation(
                    mySprite,
                    [img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . d d . . . . . . . 
                        . . . . . . d 1 1 d . . . . . . 
                        . . . . . . d 1 1 d . . . . . . 
                        . . . . . . . d d . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . d . . . . . 
                        . . . . d . . . . d d . . . . . 
                        . . . . d d . . d 1 d . . . . . 
                        . . . . . d d d 1 1 d . . . . . 
                        . . . . . d 1 1 1 1 d . . . . . 
                        . . . . . . d 1 1 1 1 d . . . . 
                        . . . . . . d 1 d d d d . . . . 
                        . . . . . . d d . . d d d . . . 
                        . . . . . d d . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        `,img`
                        . d . . . . . . . . . . . d . . 
                        . d d . . . . . . . . . d d . . 
                        . d d d . . d d . . d d d d . . 
                        . . d 1 d d 1 1 d d d d d d . . 
                        . . d d 1 d 1 1 d 1 1 d d d . . 
                        . . d 1 1 1 1 1 1 1 1 1 1 d . . 
                        . d 1 1 1 1 1 1 1 1 1 1 d d d . 
                        . d d 1 1 1 1 1 1 1 1 1 1 1 d . 
                        . d d 1 1 1 1 1 1 1 1 d 1 1 d . 
                        . . d 1 d 1 1 1 d 1 1 d d d d . 
                        . d 1 1 d 1 1 1 d d d 1 1 d . . 
                        . d 1 1 d 1 1 d d 1 d 1 1 d . . 
                        . d d d d d d d d d 1 d d d . . 
                        . . d 1 d d d d d d d d d . . . 
                        . d 1 d . . d d d . . . d d . . 
                        . d d . . . . . . . . . . d d . 
                        `,img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . d d . d d d . . . . . 
                        . . . . d 1 1 d 1 1 1 1 . . . . 
                        . . d d 1 1 1 d d 1 d d d d . . 
                        . d 1 1 d d d d d d d 1 1 d . . 
                        . d 1 1 1 d . . . . . d d d d . 
                        . . 1 d d d . . . . . d d 1 1 d 
                        . d 1 d d . . . . . . . d 1 1 d 
                        . d 1 1 d . . . . . . d d 1 d d 
                        . d 1 d d . . . . . . d d 1 d d 
                        . d d d d d . . . . d d d d d . 
                        . d d d d d d . d d 1 d d 1 d . 
                        . . d d d 1 1 d d 1 1 d d d . . 
                        . . . d d d d d d d d d . . . . 
                        . . . . . . d d d d d . . . . . 
                        `],
                    100,
                    false
                    )
                    mySprite.lifespan = 400
                    pause(100)
                }
                pause(2000)
                game.over(true)
            }
        }
    } else if (currentBossPhase == "Swipin'") {
        for (let index = 0; index < randint(2, 5); index++) {
            catBoss.setImage(img`
                ...........................ddd...............
                .......................ddddfffddd............
                .....................ddffffffffffd...........
                ....................dfffffffffffffd..........
                ...................dffffffffffffffd..........
                ..................dffffffffffffddfd..........
                .................dffffffffffffd..d...........
                .................dffffffffffffd..............
                ................dffffffffffffd...............
                ...............dfddfffffffddfd...............
                ...............dfdddddddddddfd...............
                ...............dfdddddddddddfdddddd..........
                ..........dddddffddddddddddffdfffffd.........
                .....ddddd11111fffffffffffffff11111fdddd.....
                ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
                .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
                dfffffffff1dddd111fffffffff111dddd1fffffffffd
                .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
                ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
                .....ddddfffffffffffffffffffffffffffdddd.....
                .........ddd11fffffffffffffffff11ddd.........
                ..........d111111111f111f111111111d..........
                ..........d1111111f11f1f11f1111111d..........
                ..........d111111f1f1f1f1f1f111111d..........
                ..........d111111f1f11111f1f111111d..........
                .........d1111111fff11111fff1111111d.........
                .........d1111111fdf11111fdf1111111d.........
                .........d1111111fdf11111fdf1111111d.........
                .........d11111111f11ddd11f11111111d.........
                .........d111ffff111ddddd111ffff111d.........
                .........d1ff1111f1111f1111f1111ff1d.........
                .........d1111fff11111f11111fff1111d.........
                .........d11ff11111f11f11f11111ff11d.........
                .........d11111fff1dffdffd1fff11111d.........
                ..........d1fff1111d1ddd1d1111fff1d..........
                ...........d1111111ddddddd1111111d...........
                ............d1111111ddddd1111111d............
                .............d1111111ddd1111111d.............
                ............ddd111111111111111ddd............
                ..........dddddddd111111111dddddddd..........
                .........ddddddddddddddddddddddddddd.........
                ........ddddddddddddddddddddddddddddd........
                ........ddddddddddddddddddddddddddddd........
                .......ddddddddddddddddddddddddddddddd.......
                ......ddddddddddddddddddddddddddddddddd......
                ......ddddddddddddddddddddddddddddddddd......
                .....ddddddddddddddddddddddddddddddddddd.....
                .....ddddddddddddddddddddddddddddddddddd.....
                `)
            if (Math.percentChance(50)) {
                leftPaw.setFlag(SpriteFlag.Invisible, false)
                attackingPaw = sprites.create(img`
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    `, SpriteKind.Attacking)
                attackingPaw.top = leftPaw.top + 6
                attackingPaw.z = 5
                attackingPaw.left = leftPaw.left - 48
                animation.runMovementAnimation(
                leftPaw,
                "h -32",
                100,
                false
                )
                pause(100)
                leftPaw.setImage(img`
                    . . . . . f f f f f . . . . . . 
                    . . . f f 1 1 1 1 1 f . . . . . 
                    . . f 1 1 1 1 1 1 1 1 f . . . . 
                    . . f 1 1 1 1 1 1 1 1 f . . . . 
                    . f 1 1 1 1 1 1 1 1 1 f . . . . 
                    . f 1 1 1 1 1 1 1 1 1 f . . . . 
                    f 1 1 1 1 1 1 1 1 1 1 f . . . . 
                    f 1 1 1 1 1 1 1 1 1 1 f . . . . 
                    f 1 1 1 1 1 1 1 1 1 1 f . . . . 
                    f 1 1 1 1 d 1 1 1 d f f . . . . 
                    f 1 1 1 1 f 1 1 1 f f f . . . . 
                    . f 1 1 1 f 1 1 1 f f f . . . . 
                    . f f d f f 1 1 1 f f f . . . . 
                    . . f d f . f d f . f f . . . . 
                    . . . f . . f d f . . f . . . . 
                    . . . . . . . f . . . . . . . . 
                    `)
                animation.runImageAnimation(
                attackingPaw,
                assets.animation`myAnim12`,
                100,
                false
                )
                pause(1600)
                animation.runMovementAnimation(
                attackingPaw,
                "h 32",
                500,
                false
                )
                animation.runMovementAnimation(
                leftPaw,
                "h 32",
                500,
                false
                )
                pause(500)
                leftPaw.setImage(img`
                    . . . . . f f f f f . . . . . . 
                    . . . f f 1 1 1 1 1 f f . . . . 
                    . . f 1 1 1 1 1 1 1 1 1 f . . . 
                    . . f 1 1 1 1 1 1 1 1 1 f . . . 
                    . f 1 1 1 1 1 1 1 1 1 1 1 f . . 
                    . f 1 1 1 1 1 1 1 1 1 1 1 f . . 
                    f 1 1 1 1 1 1 1 1 1 1 1 1 1 f . 
                    f 1 1 1 1 1 1 1 1 1 1 1 1 1 f . 
                    f 1 1 1 1 1 1 1 1 1 1 1 1 1 f . 
                    f 1 1 1 1 d 1 1 1 d 1 1 1 1 f . 
                    f 1 1 1 1 f 1 1 1 f 1 1 1 f . . 
                    . f 1 1 1 f 1 1 1 f 1 1 1 f . . 
                    . f f d f f 1 1 1 f f d f . . . 
                    . . f d f . f d f . f d f . . . 
                    . . . f . . f d f . . f . . . . 
                    . . . . . . . f . . . . . . . . 
                    `)
                attackingPaw.destroy()
            } else {
                rightPaw.setFlag(SpriteFlag.Invisible, false)
                attackingPaw = sprites.create(img`
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    ................................................
                    `, SpriteKind.Attacking)
                attackingPaw.top = rightPaw.top + 6
                attackingPaw.z = 5
                attackingPaw.right = rightPaw.right + 48
                animation.runMovementAnimation(
                rightPaw,
                "h 32",
                100,
                false
                )
                pause(100)
                rightPaw.setImage(img`
                    . . . . . . f f f f f . . . . . 
                    . . . . . f 1 1 1 1 1 f f . . . 
                    . . . . f 1 1 1 1 1 1 1 1 f . . 
                    . . . . f 1 1 1 1 1 1 1 1 f . . 
                    . . . . f 1 1 1 1 1 1 1 1 1 f . 
                    . . . . f 1 1 1 1 1 1 1 1 1 f . 
                    . . . . f 1 1 1 1 1 1 1 1 1 1 f 
                    . . . . f 1 1 1 1 1 1 1 1 1 1 f 
                    . . . . f 1 1 1 1 1 1 1 1 1 1 f 
                    . . . . f f d 1 1 1 d 1 1 1 1 f 
                    . . . . f f f 1 1 1 f 1 1 1 1 f 
                    . . . . f f f 1 1 1 f 1 1 1 f . 
                    . . . . f f f 1 1 1 f f d f f . 
                    . . . . f f . f d f . f d f . . 
                    . . . . f . . f d f . . f . . . 
                    . . . . . . . . f . . . . . . . 
                    `)
                animation.runImageAnimation(
                attackingPaw,
                assets.animation`myAnim13`,
                100,
                false
                )
                pause(1600)
                animation.runMovementAnimation(
                attackingPaw,
                "h -32",
                500,
                false
                )
                animation.runMovementAnimation(
                rightPaw,
                "h -32",
                500,
                false
                )
                pause(500)
                rightPaw.setImage(img`
                    . . . . . . f f f f f . . . . . 
                    . . . . f f 1 1 1 1 1 f f . . . 
                    . . . f 1 1 1 1 1 1 1 1 1 f . . 
                    . . . f 1 1 1 1 1 1 1 1 1 f . . 
                    . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
                    . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
                    . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
                    . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
                    . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
                    . f 1 1 1 1 d 1 1 1 d 1 1 1 1 f 
                    . . f 1 1 1 f 1 1 1 f 1 1 1 1 f 
                    . . f 1 1 1 f 1 1 1 f 1 1 1 f . 
                    . . . f d f f 1 1 1 f f d f f . 
                    . . . f d f . f d f . f d f . . 
                    . . . . f . . f d f . . f . . . 
                    . . . . . . . . f . . . . . . . 
                    `)
                attackingPaw.destroy()
            }
            catBoss.setImage(assets.image`myImage0`)
            pause(100)
        }
    } else {
    	
    }
    animation.runImageAnimation(
    catBoss,
    assets.animation`Temporary asset1`,
    100,
    true
    )
    pause(2000)
    animation.stopAnimation(animation.AnimationTypes.All, catBoss)
    catBoss.setImage(img`
        ...........................ddd...............
        .......................ddddfffddd............
        .....................ddffffffffffd...........
        ....................dfffffffffffffd..........
        ...................dffffffffffffffd..........
        ..................dffffffffffffddfd..........
        .................dffffffffffffd..d...........
        .................dffffffffffffd..............
        ................dffffffffffffd...............
        ...............dfddfffffffddfd...............
        ...............dfdddddddddddfd...............
        ...............dfdddddddddddfdddddd..........
        ..........dddddffddddddddddffdfffffd.........
        .....ddddd11111fffffffffffffff11111fdddd.....
        ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
        .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
        dfffffffff1dddd111fffffffff111dddd1fffffffffd
        .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
        ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
        .....ddddfffffffffffffffffffffffffffdddd.....
        .........ddd11fffffffffffffffff11ddd.........
        ..........d111111111f111f111111111d..........
        ..........d1111111f11f1f11f1111111d..........
        ..........d111111f1f1f1f1f1f111111d..........
        ..........d111111f1f11111f1f111111d..........
        .........d1111111fff11111fff1111111d.........
        .........d1111111fdf11111fdf1111111d.........
        .........d1111111fdf11111fdf1111111d.........
        .........d11111111f11ddd11f11111111d.........
        .........d111ffff111ddddd111ffff111d.........
        .........d1ff1111f1111f1111f1111ff1d.........
        .........d1111fff11111f11111fff1111d.........
        .........d11ff11111f11f11f11111ff11d.........
        .........d11111fff1dffdffd1fff11111d.........
        ..........d1fff1111d1ddd1d1111fff1d..........
        ...........d1111111ddddddd1111111d...........
        ............d1111111ddddd1111111d............
        .............d1111111ddd1111111d.............
        ............ddd111111111111111ddd............
        ..........dddddddd111111111dddddddd..........
        .........ddddddddddddddddddddddddddd.........
        ........ddddddddddddddddddddddddddddd........
        ........ddddddddddddddddddddddddddddd........
        .......ddddddddddddddddddddddddddddddd.......
        ......ddddddddddddddddddddddddddddddddd......
        ......ddddddddddddddddddddddddddddddddd......
        .....ddddddddddddddddddddddddddddddddddd.....
        .....ddddddddddddddddddddddddddddddddddd.....
        `)
    startBossPhase()
}
/**
 * The moods of CHOMP:
 * 
 * 1. lil' hops
 * 
 * 2. lookin at ya'
 * 
 * 3. lunging
 */
/**
 * TODO List:
 * 
 *     1. (DONE) Dahbix's enemy
 * 
 *     2. (DONE) Plants you can cut
 * 
 *     3. Random item drops (money/health)
 * 
 *     4. NPCs
 * 
 *     5. Indoor locations
 * 
 *     6. Blocks you can push
 * 
 *     7. Buttons you can press
 * 
 *     8. Traps
 * 
 *     9. Dungeon!
 * 
 *     10. Bow+Arrows
 * 
 *     11. Shop
 * 
 *     12. Sound/Music
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.SpikeTrap, function (sprite, otherSprite) {
    otherSprite.setImage(img`
        1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 d 
        1 d d d d d 1 1 1 d d d d d 1 1 
        d d f f f d d 1 d d f f f d d 1 
        d f f f f f d 1 d f f f f f d 1 
        d f f f f f d 1 d f f f f f d 1 
        d f f 1 f f d 1 d f f 1 f f d 1 
        d d f f f d d 1 d d f f f d d 1 
        1 d d d d d 1 1 1 d d d d d 1 1 
        1 1 1 1 1 1 1 d 1 1 1 1 1 1 1 d 
        1 d d d d d 1 1 1 d d d d d 1 1 
        d d f f f d d 1 d d f f f d d 1 
        d f f f f f d 1 d f f f f f d 1 
        d f f f f f d 1 d f f f f f d 1 
        d f f 1 f f d 1 d f f 1 f f d 1 
        d d f f f d d 1 d d f f f d d 1 
        1 d d d d d 1 1 1 d d d d d 1 1 
        `)
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    timer.after(500, function () {
        otherSprite.setKind(SpriteKind.Spike)
        otherSprite.setFlag(SpriteFlag.Ghost, false)
        animation.runImageAnimation(
        otherSprite,
        assets.animation`myAnim0`,
        70,
        false
        )
        timer.after(700, function () {
            otherSprite.setKind(SpriteKind.SpikeTrap)
        })
    })
})
sprites.onCreated(SpriteKind.FrogBunny, function (sprite) {
    sprites.setDataNumber(sprite, "health", 1)
})
spriteutils.createRenderable(3, function (screen2) {
    for (let value of sprites.allOfKind(SpriteKind.LazerCrystal)) {
        screen2.drawLine(value.x, value.y, sprites.readDataSprite(value, "target").x, sprites.readDataSprite(value, "target").y, lazerColor)
        screen2.drawLine(value.x - 0, value.y - 1, sprites.readDataSprite(value, "target").x, sprites.readDataSprite(value, "target").y, lazerColor)
        screen2.drawLine(value.x + 1, value.y - 0, sprites.readDataSprite(value, "target").x, sprites.readDataSprite(value, "target").y, lazerColor)
        screen2.drawLine(value.x - 1, value.y + 0, sprites.readDataSprite(value, "target").x, sprites.readDataSprite(value, "target").y, lazerColor)
        screen2.drawLine(value.x - 0, value.y + 1, sprites.readDataSprite(value, "target").x, sprites.readDataSprite(value, "target").y, lazerColor)
        if (sprites.readDataSprite(value, "target").y < value.y) {
            value.z = 4
        } else {
            value.z = 1
        }
        if (Math.percentChance(35)) {
            newHeart = sprites.create(img`
                f f 
                f f 
                `, SpriteKind.Decoration)
            newHeart.lifespan = 400
            newHeart.setPosition(sprites.readDataSprite(value, "target").x, sprites.readDataSprite(value, "target").y)
            newHeart.setFlag(SpriteFlag.Ghost, true)
        }
        if (Math.percentChance(50)) {
            newHeart = sprites.create(img`
                1 
                `, SpriteKind.Decoration)
        } else {
            newHeart = sprites.create(img`
                f 
                `, SpriteKind.Decoration)
        }
        newHeart.setFlag(SpriteFlag.Ghost, true)
        newHeart.lifespan = 500
        newHeart.setPosition(sprites.readDataSprite(value, "target").x, sprites.readDataSprite(value, "target").y)
        spriteutils.setVelocityAtAngle(newHeart, spriteutils.degreesToRadians(randint(250, 290)), 20)
    }
})
function moveTo (sprite: Sprite, x: number, y: number, time: number) {
    spriteutils.setVelocityAtAngle(sprite, Math.atan2(y - sprite.y, x - sprite.x), Math.sqrt((sprite.x - x) ** 2 + (sprite.y - y) ** 2) / time * 1000)
    timer.after(time, function () {
        sprite.setVelocity(0, 0)
    })
}
sprites.onOverlap(SpriteKind.Sword, SpriteKind.CHOMP, function (sprite, otherSprite) {
    damageEnemy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Pit, function (sprite, otherSprite) {
    if (spriteutils.distanceBetween(sprite, otherSprite) < 9) {
        hero.setFlag(SpriteFlag.Ghost, true)
        hero.setPosition(otherSprite.x, otherSprite.y)
        controller.moveSprite(hero, 0, 0)
        animation.runImageAnimation(
        hero,
        assets.animation`myAnim1`,
        100,
        false
        )
        character.setCharacterAnimationsEnabled(hero, false)
        timer.after(1000, function () {
            hero.setImage(img`
                . . . f f f f f f . . . . . . . 
                . . f 1 1 1 1 1 d f . . . . . . 
                . f 1 1 d d d 1 d d f . . . . . 
                . f 1 d d d d d 1 d f . . . . . 
                . f 1 d d d d d 1 1 f f f . . . 
                . f 1 d d d d d 1 1 1 1 1 f f f 
                . f 1 1 d d d 1 1 1 f 1 1 1 1 d 
                . . f 1 1 1 1 1 1 1 1 1 1 1 1 f 
                . . . f 1 1 1 1 1 1 1 1 1 1 f . 
                . . . . f 1 1 1 1 1 f f f f . . 
                . . . f 1 1 1 1 1 1 1 f . . . . 
                . f f 1 f 1 1 1 1 1 f 1 f . . . 
                f 1 f 1 f 1 1 1 1 1 f 1 f . . . 
                f 1 f f 1 1 1 1 1 1 f f . . . . 
                . f 1 1 f 1 1 1 1 1 f . . . . . 
                . . f f . f 1 f 1 f . . . . . . 
                `)
            hero.setFlag(SpriteFlag.Ghost, false)
            controller.moveSprite(hero)
            character.setCharacterAnimationsEnabled(hero, true)
            tiles.placeOnTile(hero, lastSafeTile)
            dealDamageToHero(hero, true)
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BallOPower, function (sprite, otherSprite) {
    dealDamageToHero(otherSprite, false)
    ballIsHandled = true
})
scene.onOverlapTile(SpriteKind.Sword, assets.tile`myTile48`, function (sprite, location) {
    timer.throttle("toggle-wall", 500, function () {
        setToggleableWallState(true, true)
    })
})
function moveInDirection (direction: number, time: number, sprite: Sprite) {
    if (direction == 0) {
        if (tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.row) > 0 && !(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Top)))) {
            animation.runMovementAnimation(
            sprite,
            "v -16",
            time,
            false
            )
        }
    } else if (direction == 1) {
        if (tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.column) < 9 && !(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Right)))) {
            animation.runMovementAnimation(
            sprite,
            "h 16",
            time,
            false
            )
        }
    } else if (direction == 2) {
        if (tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.row) < 6 && !(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Bottom)))) {
            animation.runMovementAnimation(
            sprite,
            "v 16",
            time,
            false
            )
        }
    } else {
        if (tiles.locationXY(tiles.locationOfSprite(sprite), tiles.XY.column) > 0 && !(tiles.tileIsWall(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Left)))) {
            animation.runMovementAnimation(
            sprite,
            "h -16",
            time,
            false
            )
        }
    }
}
scene.onOverlapTile(SpriteKind.Sword, assets.tile`myTile49`, function (sprite, location) {
    timer.throttle("toggle-wall", 500, function () {
        setToggleableWallState(false, true)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Attacking, function (sprite, otherSprite) {
    dealDamageToHero(otherSprite, false)
})
function onTilemapLoaded () {
    for (let value of sprites.allOfKind(SpriteKind.PitTrap)) {
        sprites.setDataBoolean(value, "falling", false)
    }
    tiles.coverAllTiles(assets.tile`myTile19`, overworldGold.mySprite78)
    tiles.coverAllTiles(assets.tile`myTile0`, overworldGold.mySprite78)
    tiles.coverAllTiles(assets.tile`myTile24`, overworldGold.mySprite78)
    tiles.coverAllTiles(assets.tile`myTile20`, overworldGold.mySprite71)
    tiles.coverAllTiles(assets.tile`myTile45`, overworldGold.mySprite56)
    tiles.coverAllTiles(assets.tile`myTile30`, overworldGold.mySprite56)
    tiles.coverAllTiles(assets.tile`myTile32`, overworldGold.mySprite56)
    tiles.coverAllTiles(assets.tile`myTile1`, overworldGold.mySprite56)
    tiles.coverAllTiles(assets.tile`myTile42`, overworldGold.mySprite56)
    tiles.coverAllTiles(assets.tile`myTile50`, overworldGold.mySprite56)
    tiles.coverAllTiles(assets.tile`myTile51`, overworldGold.mySprite71)
    tiles.replaceAllTiles(assets.tile`myTile33`, assets.tile`myTile31`)
    tiles.destroySpritesOfKind(SpriteKind.FrogBunny)
    tiles.destroySpritesOfKind(SpriteKind.CHOMP)
    tiles.destroySpritesOfKind(SpriteKind.Plant)
    tiles.destroySpritesOfKind(SpriteKind.PitTrap)
    tiles.destroySpritesOfKind(SpriteKind.Pit)
    tiles.destroySpritesOfKind(SpriteKind.Decoration)
    tiles.destroySpritesOfKind(SpriteKind.SpikeTrap)
    tiles.destroySpritesOfKind(SpriteKind.Minotaur)
    tiles.destroySpritesOfKind(SpriteKind.Pot)
    tiles.destroySpritesOfKind(SpriteKind.HealthThing)
    tiles.destroySpritesOfKind(SpriteKind.Spike)
    tiles.destroySpritesOfKind(SpriteKind.FakeWhiteWall)
    tiles.destroySpritesOfKind(SpriteKind.LazerCrystal)
    tiles.destroySpritesOfKind(SpriteKind.LazerTarget)
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        newEnemy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f . . . . . . f f . . . 
            . . f d d f . . . . f d d f . . 
            . . f d 1 f . . . . f 1 d f . . 
            . . f d 1 f f f f f f 1 d f . . 
            . f d d d d d d d d d d d d f . 
            f f d d 1 1 d d d 1 1 d d d f f 
            f d d d 1 1 d d d 1 1 d d d d f 
            f d d d 1 f d d d 1 f d d d d f 
            f f d d d d d d d d d d d d f f 
            . f f f f f f d d f f f f f f . 
            . . . f d d d f f d d d f . . . 
            . . . f f d d d d d d f f . . . 
            . . . . f d d f f d d f . . . . 
            . . . . f f f . . f f f . . . . 
            `, SpriteKind.FrogBunny)
        tiles.placeOnTile(newEnemy, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile24`)) {
        newEnemy = createBat()
        tiles.placeOnTile(newEnemy, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile19`)) {
        newEnemy = sprites.create(img`
            ................................
            ...........11111111111..........
            .........11fffffffffff11........
            .......11fffffffffffffff11......
            ......1fffffffffffffffffff1.....
            .....1fffffffffffffffffffff1....
            ....1ffffffffff1111fffffffff1...
            ...1ffffffffff1ffff1fffffffff1..
            ...1fffffffff1ffffff1ffffffff1..
            ..1ffffffffff1ffffff1fffffffff1.
            ..1ffffffffff1ffffff1fffffffff1.
            .1fffffffffff1ffffff1ffffffffff1
            .1ffffffffffff1ffff1fffffffffff1
            .11ffffffffffff1111ffffffffffff1
            .dd111fffffffffffffffffffffffff1
            .11ddd11fffffffffffffffffffffff1
            .11111dd11fffffffffffffffffffff1
            .111f111dd1ffffffffffffffffffff1
            ..1.f11f11d1fffffffffffffffffff1
            .....1ff1ffd1ffffffffffffffffff1
            .....ffffff1d1fffffffffffffffff1
            .....ffff11d1ffffffffffffffffff1
            .....f1ff1d1ffffffffffffffffff1.
            ...1ff111d1fffffffffffffffffff1.
            ...1111dd1ffffffffffffffffffff..
            ...11dd1fffffffffffffffffffff1..
            ....d11fffffffffffffffffffff1...
            .....1fffffffffffffffffffff1....
            ......1fffffffffffffffffff1.....
            .......11fffffffffffffff11......
            .........11fffffffffff11........
            ...........11111111111..........
            `, SpriteKind.CHOMP)
        tiles.placeOnTile(newEnemy, value)
        sprites.setDataString(newEnemy, "state", "lil' hops")
        sprites.setDataNumber(newEnemy, "stateCounter", 0)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile20`)) {
        newEnemy = sprites.create(assets.tile`myTile20`, SpriteKind.Plant)
        tiles.placeOnTile(newEnemy, value)
        tiles.setWallAt(value, true)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile45`)) {
        newEnemy = sprites.create(assets.tile`myTile45`, SpriteKind.Pot)
        tiles.placeOnTile(newEnemy, value)
        tiles.setWallAt(value, true)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile23`)) {
        newEnemy = sprites.create(assets.tile`myTile23`, SpriteKind.PitTrap)
        tiles.placeOnTile(newEnemy, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile37`)) {
        newEnemy = sprites.create(img`
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            `, SpriteKind.Pit)
        tiles.placeOnTile(newEnemy, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile32`)) {
        newEnemy = sprites.create(assets.tile`transparency16`, SpriteKind.Decoration)
        tiles.placeOnTile(newEnemy, value)
        tiles.setWallAt(value, true)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile50`)) {
        newEnemy = sprites.create(img`
            . . . . . . . f f . . . . . . . 
            . . . . . . f d d f . . . . . . 
            . . . . . f d d 1 d f . . . . . 
            . . . . f d d 1 d d d f . . . . 
            . . . . f f d d d d f f . . . . 
            . . . f d d f d d f d d f . . . 
            . . . f d d d f f d d 1 f . . . 
            . . . f d d f d d f 1 d f . . . 
            . . . f d d f d d f d d f . . . 
            . . . f d d d f f d d d f . . . 
            . . . f d d f d d f d d f . . . 
            . . . . f f d d 1 d f f . . . . 
            . . . . f d d 1 d d d f . . . . 
            . . . . . f d d d d f . . . . . 
            . . . . . . f d d f . . . . . . 
            . . . . . . . f f . . . . . . . 
            `, SpriteKind.LazerCrystal)
        tiles.placeOnTile(newEnemy, value)
        newEnemy.x += 8
        newEnemy.y += 8
        lazerTarget = sprites.create(img`
            . d . 
            d d d 
            . d . 
            `, SpriteKind.LazerTarget)
        tiles.placeOnTile(lazerTarget, value)
        sprites.setDataSprite(newEnemy, "target", lazerTarget)
        lazerTarget.setFlag(SpriteFlag.GhostThroughWalls, true)
        lazerTarget.follow(hero, 30)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile1`)) {
        newEnemy = sprites.create(img`
            ....................
            ..........f.........
            .........f1ffffff...
            ........fdd1dddddf..
            .......fddddddddddf.
            .......fddfdddddddf.
            .......fdfdddfdddddf
            .......fdddddfdddddf
            .......f11dffddddddf
            ....ff..fff.fddddddf
            ..ffff......fdfdddf.
            fffffffffffffdfdddf.
            ..ffff.....fddfdddf.
            ....ff......ffddddf.
            ............fddddddf
            .............fddfddf
            .............fdffdf.
            ..............f..f..
            `, SpriteKind.Minotaur)
        character.loopFrames(
        newEnemy,
        assets.animation`myAnim6`,
        200,
        character.rule(Predicate.FacingRight)
        )
        character.loopFrames(
        newEnemy,
        assets.animation`myAnim7`,
        200,
        character.rule(Predicate.FacingLeft)
        )
        tiles.placeOnTile(newEnemy, value)
        newEnemy.follow(hero, 20)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile22`)) {
        newEnemy = sprites.create(assets.tile`myTile22`, SpriteKind.SpikeTrap)
        tiles.placeOnTile(newEnemy, value)
    }
    if (areWeOnDoorTile()) {
        surroundingLocations = [
        tiles.locationInDirection(tiles.locationOfSprite(hero), CollisionDirection.Top),
        tiles.locationInDirection(tiles.locationOfSprite(hero), CollisionDirection.Left),
        tiles.locationInDirection(tiles.locationOfSprite(hero), CollisionDirection.Right),
        tiles.locationInDirection(tiles.locationOfSprite(hero), CollisionDirection.Bottom)
        ]
        for (let value of surroundingLocations) {
            if (!(tiles.tileIsWall(value))) {
                tiles.placeOnTile(hero, value)
            }
        }
    }
    setToggleableWallState(isWhiteToggleUp, false)
    if (tiles.getTilesByType(assets.tile`myTile51`).length > 0) {
        startBossFight()
    }
}
sprites.onOverlap(SpriteKind.Sword, SpriteKind.Plant, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
    tiles.setWallAt(tiles.locationOfSprite(otherSprite), false)
})
function setToggleableWallState (whiteIsUp: boolean, animate: boolean) {
    isWhiteToggleUp = whiteIsUp
    if (whiteIsUp) {
        tiles.replaceAllTiles(assets.tile`myTile48`, assets.tile`myTile49`)
    } else {
        tiles.replaceAllTiles(assets.tile`myTile49`, assets.tile`myTile48`)
    }
    tiles.destroySpritesOfKind(SpriteKind.FakeWhiteWall)
    for (let value of tiles.getTilesByType(assets.tile`myTile38`)) {
        newEnemy = sprites.create(assets.tile`myTile38`, SpriteKind.FakeWhiteWall)
        if (animate) {
            if (whiteIsUp) {
                animation.runImageAnimation(
                newEnemy,
                assets.animation`myAnim10`,
                75,
                false
                )
            } else {
                animation.runImageAnimation(
                newEnemy,
                assets.animation`myAnim8`,
                75,
                false
                )
            }
        } else {
            if (whiteIsUp) {
                newEnemy.setImage(assets.tile`myTile38`)
            } else {
                newEnemy.setImage(assets.tile`myTile39`)
            }
        }
        tiles.placeOnTile(newEnemy, value)
        tiles.setWallAt(value, whiteIsUp)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile46`)) {
        newEnemy = sprites.create(assets.tile`myTile46`, SpriteKind.FakeWhiteWall)
        if (animate) {
            if (whiteIsUp) {
                animation.runImageAnimation(
                newEnemy,
                assets.animation`myAnim9`,
                75,
                false
                )
            } else {
                animation.runImageAnimation(
                newEnemy,
                assets.animation`myAnim11`,
                75,
                false
                )
            }
        } else {
            if (whiteIsUp) {
                newEnemy.setImage(assets.tile`myTile47`)
            } else {
                newEnemy.setImage(assets.tile`myTile46`)
            }
        }
        tiles.placeOnTile(newEnemy, value)
        tiles.setWallAt(value, !(whiteIsUp))
    }
    if (animate) {
        scene.cameraShake(2, 500)
    }
}
sprites.onOverlap(SpriteKind.Minotaur, SpriteKind.Player, function (sprite, otherSprite) {
    dealDamageToHero(sprite, false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.HealthThing, function (sprite, otherSprite) {
    otherSprite.destroy()
    updateHealth(Math.min(currentHealth + 2, maxHealth), maxHealth)
})
sprites.onDestroyed(SpriteKind.PitTrap, function (sprite) {
    if (sprites.readDataBoolean(sprite, "falling")) {
        newEnemy = sprites.create(img`
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            f f f f f f f f f f f f f f f f 
            `, SpriteKind.Pit)
        newEnemy.setPosition(sprite.x, sprite.y)
    }
})
function startBossFight () {
    inBossFight = true
    scene.cameraFollowSprite(hero)
    tiles.placeOnTile(hero, tiles.getTileLocation(5, 8))
    hero.x = 96
    fakeFloor = sprites.create(img`
        1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d1111111d
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1ddd1
        d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1d1ddd1d1
        dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1dd1d1dd1
        1ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd111ddddd11
        `, SpriteKind.Decoration)
    fakeFloor.setFlag(SpriteFlag.Ghost, true)
    fakeFloor.z = 2
    fakeFloor.top = 48
    fakeFloor.left = 16
    catBoss = sprites.create(assets.image`myImage0`, SpriteKind.FelineWizard)
    catBoss.setFlag(SpriteFlag.GhostThroughWalls, true)
    catBoss.x = 96
    catBoss.top = 48
    leftPaw = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.FelineWizard)
    leftPaw.setPosition(76, 44)
    leftPaw.z = 4
    leftPaw.setFlag(SpriteFlag.GhostThroughWalls, true)
    rightPaw = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.FelineWizard)
    rightPaw.setPosition(116, 44)
    rightPaw.z = 4
    rightPaw.setFlag(SpriteFlag.GhostThroughWalls, true)
    story.startCutscene(function () {
        controller.moveSprite(hero, 0, 0)
        character.setCharacterAnimationsEnabled(hero, false)
        story.spriteMoveToLocation(hero, 96, 60, 100)
        animation.runImageAnimation(
        rightPaw,
        [img`
            . . . . . . . . f . . . . . . . 
            . . . . f . . f d f . . f . . . 
            . . . f d f f 1 1 1 f f d f . . 
            . . f 1 1 1 f d d 1 f 1 1 1 f . 
            . . f d d 1 f d d 1 f d d 1 1 f 
            . f 1 d d 1 1 d d 1 1 d d 1 1 f 
            . f 1 d d 1 1 1 1 1 1 d d 1 1 f 
            . f 1 d d 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . . . f 1 1 1 1 1 1 1 1 1 f . . 
            . . . f 1 1 1 1 1 1 1 1 f . . . 
            . . . . f f f f f f f f f . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . f f f f 1 d 1 f f f f . . 
            . . f 1 d 1 f 1 1 1 f 1 d 1 f . 
            . . f 1 1 1 f d d 1 f 1 1 1 1 f 
            . f 1 d d 1 1 d d 1 1 d d 1 1 f 
            . f 1 d d 1 1 d d 1 1 d d 1 1 f 
            . f 1 d d 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . . . f 1 1 1 1 1 1 1 1 1 f . . 
            . . . f 1 1 1 1 1 1 1 1 f . . . 
            . . . . f f f f f f f f f . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . f f f f f f f f f f f . . 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f f 1 1 1 f 1 1 1 f 1 1 1 1 f 
            . . f 1 1 1 f 1 1 1 f 1 1 1 f . 
            . . . f d f f 1 1 1 f f d f f . 
            . . . . f . . f d f . . f . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . f f f f f f f f f f f . . 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 d 1 1 1 d 1 1 1 1 f 
            . . f 1 1 1 f 1 1 1 f 1 1 1 1 f 
            . . f 1 1 1 f 1 1 1 f 1 1 1 f . 
            . . . f d f f 1 1 1 f f d f f . 
            . . . f d f . f d f . f d f . . 
            . . . . f . . f d f . . f . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . f f f f f . . . . . 
            . . . . f f 1 1 1 1 1 f f . . . 
            . . . f 1 1 1 1 1 1 1 1 1 f . . 
            . . . f 1 1 1 1 1 1 1 1 1 f . . 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 d 1 1 1 d 1 1 1 1 f 
            . . f 1 1 1 f 1 1 1 f 1 1 1 1 f 
            . . f 1 1 1 f 1 1 1 f 1 1 1 f . 
            . . . f d f f 1 1 1 f f d f f . 
            . . . f d f . f d f . f d f . . 
            . . . . f . . f d f . . f . . . 
            . . . . . . . . f . . . . . . . 
            `],
        100,
        false
        )
        story.spriteMoveToLocation(rightPaw, 116, 50, 30)
        pause(500)
        animation.runImageAnimation(
        leftPaw,
        [img`
            . . . . . . . f . . . . . . . . 
            . . . f . . f d f . . f . . . . 
            . . f d f f 1 1 1 f f d f . . . 
            . f 1 1 1 f 1 d d f 1 1 1 f . . 
            f 1 1 d d f 1 d d f 1 d d f . . 
            f 1 1 d d 1 1 d d 1 1 d d 1 f . 
            f 1 1 d d 1 1 1 1 1 1 d d 1 f . 
            f 1 1 1 1 1 1 1 1 1 1 d d 1 f . 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 1 1 1 f . . 
            . . f 1 1 1 1 1 1 1 1 1 f . . . 
            . . . f 1 1 1 1 1 1 1 1 f . . . 
            . . . f f f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . f f f f 1 d 1 f f f f . . . 
            . f 1 d 1 f 1 1 1 f 1 d 1 f . . 
            f 1 1 1 1 f 1 d d f 1 1 1 f . . 
            f 1 1 d d 1 1 d d 1 1 d d 1 f . 
            f 1 1 d d 1 1 d d 1 1 d d 1 f . 
            f 1 1 1 1 1 1 1 1 1 1 d d 1 f . 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 1 1 1 f . . 
            . . f 1 1 1 1 1 1 1 1 1 f . . . 
            . . . f 1 1 1 1 1 1 1 1 f . . . 
            . . . f f f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . f f f f f f f f f f f . . 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f f 1 1 1 f 1 1 1 f 1 1 1 1 f 
            . . f 1 1 1 f 1 1 1 f 1 1 1 f . 
            . . . f d f f 1 1 1 f f d f f . 
            . . . . f . . f d f . . f . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . f f f f f f f f f f f . . 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . . f 1 1 1 1 1 1 1 1 1 1 1 f . 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
            . f 1 1 1 1 d 1 1 1 d 1 1 1 1 f 
            . . f 1 1 1 f 1 1 1 f 1 1 1 1 f 
            . . f 1 1 1 f 1 1 1 f 1 1 1 f . 
            . . . f d f f 1 1 1 f f d f f . 
            . . . f d f . f d f . f d f . . 
            . . . . f . . f d f . . f . . . 
            . . . . . . . . f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . f f f f f . . . . . . 
            . . . f f 1 1 1 1 1 f f . . . . 
            . . f 1 1 1 1 1 1 1 1 1 f . . . 
            . . f 1 1 1 1 1 1 1 1 1 f . . . 
            . f 1 1 1 1 1 1 1 1 1 1 1 f . . 
            . f 1 1 1 1 1 1 1 1 1 1 1 f . . 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            f 1 1 1 1 1 1 1 1 1 1 1 1 1 f . 
            f 1 1 1 1 d 1 1 1 d 1 1 1 1 f . 
            f 1 1 1 1 f 1 1 1 f 1 1 1 f . . 
            . f 1 1 1 f 1 1 1 f 1 1 1 f . . 
            . f f d f f 1 1 1 f f d f . . . 
            . . f d f . f d f . f d f . . . 
            . . . f . . f d f . . f . . . . 
            . . . . . . . f . . . . . . . . 
            `],
        100,
        false
        )
        story.spriteMoveToLocation(leftPaw, 76, 50, 30)
        pause(500)
        scene.cameraShake(4, 5000)
        pause(500)
        story.spriteMoveToLocation(catBoss, 96, 27, 15)
        pause(1000)
        animation.runImageAnimation(
        catBoss,
        [img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f11111f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11fff111f1111111f111fff11d.........
            .........d11111ff1111ddd1111ff11111d.........
            .........d1ffff11f11ddddd11f11ffff1d.........
            .........d11111ff11111f11111ff11111d.........
            .........d11fff1111111f1111111fff11d.........
            .........d11111fff1111f1111fff11111d.........
            ..........d11111111f11f11f11111111d..........
            ...........d11111111ffdff11111111d...........
            ............d11111111ddd11111111d............
            .............d11111111111111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f11111f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d1ffffff111ddddd111ffffff1d.........
            .........d1111111f1111f1111f1111111d.........
            .........d11fffff11111f11111fffff11d.........
            .........d111111111111f111111111111d.........
            .........d11ffffff1f11f11f1ffffff11d.........
            ..........d111111111ffdff111111111d..........
            ...........d11111111ddddd11111111d...........
            ............d11111111ddd11111111d............
            .............d11111111111111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f1f1f1f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d111ffff111ddddd111ffff111d.........
            .........d1ff1111f1111f1111f1111ff1d.........
            .........d1111fff11111f11111fff1111d.........
            .........d11ff11111f11f11f11111ff11d.........
            .........d11111fff1dffdffd1fff11111d.........
            ..........d1fff1111d1ddd1d1111fff1d..........
            ...........d1111111ddddddd1111111d...........
            ............d1111111ddddd1111111d............
            .............d1111111ddd1111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f1f1f1f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d111ffff111ddddd111ffff111d.........
            .........d1ff1111f1111f1111f1111ff1d.........
            .........d1111fff11111f11111fff1111d.........
            .........d11ff11111f11f11f11111ff11d.........
            .........d11111fff1dffdffd1fff11111d.........
            ..........d1fff1111d1ddd1d1111fff1d..........
            ...........d1111111ddddddd1111111d...........
            ............d1111111ddddd1111111d............
            .............d1111111ddd1111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f1f1f1f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d111ffff111ddddd111ffff111d.........
            .........d1ff1111f1111f1111f1111ff1d.........
            .........d1111fff11111f11111fff1111d.........
            .........d11ff11111f11f11f11111ff11d.........
            .........d11111fff1dffdffd1fff11111d.........
            ..........d1fff1111d1ddd1d1111fff1d..........
            ...........d1111111ddddddd1111111d...........
            ............d1111111ddddd1111111d............
            .............d1111111ddd1111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f1f1f1f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d111ffff111ddddd111ffff111d.........
            .........d1ff1111f1111f1111f1111ff1d.........
            .........d1111fff11111f11111fff1111d.........
            .........d11ff11111f11f11f11111ff11d.........
            .........d11111fff1dffdffd1fff11111d.........
            ..........d1fff1111d1ddd1d1111fff1d..........
            ...........d1111111ddddddd1111111d...........
            ............d1111111ddddd1111111d............
            .............d1111111ddd1111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f1f1f1f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d111ffff111ddddd111ffff111d.........
            .........d1ff1111f1111f1111f1111ff1d.........
            .........d1111fff11111f11111fff1111d.........
            .........d11ff11111f11f11f11111ff11d.........
            .........d11111fff1dffdffd1fff11111d.........
            ..........d1fff1111d1ddd1d1111fff1d..........
            ...........d1111111ddddddd1111111d...........
            ............d1111111ddddd1111111d............
            .............d1111111ddd1111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f1f1f1f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d111ffff111ddddd111ffff111d.........
            .........d1ff1111f1111f1111f1111ff1d.........
            .........d1111fff11111f11111fff1111d.........
            .........d11ff11111f11f11f11111ff11d.........
            .........d11111fff1dffdffd1fff11111d.........
            ..........d1fff1111d1ddd1d1111fff1d..........
            ...........d1111111ddddddd1111111d...........
            ............d1111111ddddd1111111d............
            .............d1111111ddd1111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f1f1f1f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d111ffff111ddddd111ffff111d.........
            .........d1ff1111f1111f1111f1111ff1d.........
            .........d1111fff11111f11111fff1111d.........
            .........d11ff11111f11f11f11111ff11d.........
            .........d11111fff1dffdffd1fff11111d.........
            ..........d1fff1111d1ddd1d1111fff1d..........
            ...........d1111111ddddddd1111111d...........
            ............d1111111ddddd1111111d............
            .............d1111111ddd1111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f1f1f1f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d111ffff111ddddd111ffff111d.........
            .........d1ff1111f1111f1111f1111ff1d.........
            .........d1111fff11111f11111fff1111d.........
            .........d11ff11111f11f11f11111ff11d.........
            .........d11111fff1dffdffd1fff11111d.........
            ..........d1fff1111d1ddd1d1111fff1d..........
            ...........d1111111ddddddd1111111d...........
            ............d1111111ddddd1111111d............
            .............d1111111ddd1111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f1f1f1f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d111ffff111ddddd111ffff111d.........
            .........d1ff1111f1111f1111f1111ff1d.........
            .........d1111fff11111f11111fff1111d.........
            .........d11ff11111f11f11f11111ff11d.........
            .........d11111fff1dffdffd1fff11111d.........
            ..........d1fff1111d1ddd1d1111fff1d..........
            ...........d1111111ddddddd1111111d...........
            ............d1111111ddddd1111111d............
            .............d1111111ddd1111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f1f1f1f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d111ffff111ddddd111ffff111d.........
            .........d1ff1111f1111f1111f1111ff1d.........
            .........d1111fff11111f11111fff1111d.........
            .........d11ff11111f11f11f11111ff11d.........
            .........d11111fff1dffdffd1fff11111d.........
            ..........d1fff1111d1ddd1d1111fff1d..........
            ...........d1111111ddddddd1111111d...........
            ............d1111111ddddd1111111d............
            .............d1111111ddd1111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f11111f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11111111f11ddd11f11111111d.........
            .........d1ffffff111ddddd111ffffff1d.........
            .........d1111111f1111f1111f1111111d.........
            .........d11fffff11111f11111fffff11d.........
            .........d111111111111f111111111111d.........
            .........d11ffffff1f11f11f1ffffff11d.........
            ..........d111111111ffdff111111111d..........
            ...........d11111111ddddd11111111d...........
            ............d11111111ddd11111111d............
            .............d11111111111111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `,img`
            ...........................ddd...............
            .......................ddddfffddd............
            .....................ddffffffffffd...........
            ....................dfffffffffffffd..........
            ...................dffffffffffffffd..........
            ..................dffffffffffffddfd..........
            .................dffffffffffffd..d...........
            .................dffffffffffffd..............
            ................dffffffffffffd...............
            ...............dfddfffffffddfd...............
            ...............dfdddddddddddfd...............
            ...............dfdddddddddddfdddddd..........
            ..........dddddffddddddddddffdfffffd.........
            .....ddddd11111fffffffffffffff11111fdddd.....
            ..dddffff1ddd111fffffffffffff111ddd1ffffddd..
            .dffffffff1ddd1111fffffffff1111ddd1ffffffffd.
            dfffffffff1dddd111fffffffff111dddd1fffffffffd
            .dfffffffff1ddd1ffffffffffff11ddd1fffffffffd.
            ..dddffffff1dd1ffffffffffffff11dd1ffffffddd..
            .....ddddfffffffffffffffffffffffffffdddd.....
            .........ddd11fffffffffffffffff11ddd.........
            ..........d111111111f111f111111111d..........
            ..........d1111111f11f1f11f1111111d..........
            ..........d111111f1f11111f1f111111d..........
            ..........d111111f1f11111f1f111111d..........
            .........d1111111fff11111fff1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d1111111fdf11111fdf1111111d.........
            .........d11fff111f1111111f111fff11d.........
            .........d11111ff1111ddd1111ff11111d.........
            .........d1ffff11f11ddddd11f11ffff1d.........
            .........d11111ff11111f11111ff11111d.........
            .........d11fff1111111f1111111fff11d.........
            .........d11111fff1111f1111fff11111d.........
            ..........d11111111f11f11f11111111d..........
            ...........d11111111ffdff11111111d...........
            ............d11111111ddd11111111d............
            .............d11111111111111111d.............
            ............ddd111111111111111ddd............
            ..........dddddddd111111111dddddddd..........
            .........ddddddddddddddddddddddddddd.........
            ........ddddddddddddddddddddddddddddd........
            ........ddddddddddddddddddddddddddddd........
            .......ddddddddddddddddddddddddddddddd.......
            ......ddddddddddddddddddddddddddddddddd......
            ......ddddddddddddddddddddddddddddddddd......
            .....ddddddddddddddddddddddddddddddddddd.....
            .....ddddddddddddddddddddddddddddddddddd.....
            `],
        200,
        false
        )
        animation.runMovementAnimation(
        catBoss,
        "v -3 v 1 v 1 v 0 v 0",
        1000,
        false
        )
        pause(500)
        scene.cameraShake(4, 2000)
        pause(1000)
        controller.moveSprite(hero)
        character.setCharacterAnimationsEnabled(hero, true)
        catBossHealth = 3
        requiredDeflections = 4
        startBossPhase()
    })
}
function tryLoadMapAtLocation (column: number, row: number, oldColumn: number, oldRow: number) {
    loadMapAtLocation(column, row)
    if (tiles.tileIsWall(tiles.locationOfSprite(hero))) {
        loadMapAtLocation(oldColumn, oldRow)
        return false
    }
    tiles.placeOnTile(hero, tiles.locationOfSprite(hero))
    onTilemapLoaded()
    return true
}
sprites.onOverlap(SpriteKind.Sword, SpriteKind.Minotaur, function (sprite, otherSprite) {
    damageEnemy(otherSprite)
})
function areWeOnDoorTile () {
    return hero.tileKindAt(TileDirection.Center, assets.tile`myTile32`)
}
let randomNumber = 0
let inBossFight = false
let lazerTarget: Sprite = null
let lastSafeTile: tiles.Location = null
let lazerColor = 0
let rightPaw: Sprite = null
let attackingPaw: Sprite = null
let leftPaw: Sprite = null
let catBossHealth = 0
let requiredDeflections = 0
let aBitOfPower: Sprite = null
let currentAngle = 0
let catBoss: Sprite = null
let currentBallVelocity = 0
let batSpell: Sprite = null
let currentBossPhase = ""
let fakeFloor: Sprite = null
let currentBallOfPower: Sprite = null
let didBallGetHit = false
let ballIsHandled = false
let picture: Image = null
let animationArray: Image[] = []
let surroundingLocations: tiles.Location[] = []
let isSlashing = false
let mySprite: Sprite = null
let projectile: Sprite = null
let newHeart: Sprite = null
let currentHealth = 0
let maxHealth = 0
let newEnemy: Sprite = null
let keyLabelNumber: TextSprite = null
let keyLabel: Sprite = null
let mySprite2: Sprite = null
let numberOfKeys = 0
let currentRow = 0
let currentColumn = 0
let isWhiteToggleUp = false
let currentMap: tiles.WorldMap[][] = []
let dungeonMap: tiles.WorldMap[][] = []
let tilemapMap: tiles.WorldMap[][] = []
let swordSprite: Sprite = null
let hero: Sprite = null
tiles.setTilemap(tilemap`level1`)
hero = sprites.create(img`
    . . . f f f f f f . . . . . . . 
    . . f 1 1 1 1 1 d f . . . . . . 
    . f 1 1 d d d 1 d d f . . . . . 
    . f 1 d d d d d 1 d f . . . . . 
    . f 1 d d d d d 1 1 f f f . . . 
    . f 1 d d d d d 1 1 1 1 1 f f f 
    . f 1 1 d d d 1 1 1 f 1 1 1 1 d 
    . . f 1 1 1 1 1 1 1 1 1 1 1 1 f 
    . . . f 1 1 1 1 1 1 1 1 1 1 f . 
    . . . . f 1 1 1 1 1 f f f f . . 
    . . . f 1 1 1 1 1 1 1 f . . . . 
    . f f 1 f 1 1 1 1 1 f 1 f . . . 
    f 1 f 1 f 1 1 1 1 1 f 1 f . . . 
    f 1 f f 1 1 1 1 1 1 f f . . . . 
    . f 1 1 f 1 1 1 1 1 f . . . . . 
    . . f f . f 1 f 1 f . . . . . . 
    `, SpriteKind.Player)
hero.z = 10
swordSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Sword)
swordSprite.setFlag(SpriteFlag.GhostThroughWalls, true)
swordSprite.z = 5
controller.moveSprite(hero)
tilemapMap = [
[
tiles.createMap(tilemap`level7`),
tiles.createMap(tilemap`level2`),
tiles.createMap(tilemap`level10`),
tiles.createMap(tilemap`level8`),
tiles.createMap(tilemap`level29`)
],
[
tiles.createMap(tilemap`level3`),
tiles.createMap(tilemap`level4`),
tiles.createMap(tilemap`level5`),
tiles.createMap(tilemap`level16`),
tiles.createMap(tilemap`level42`)
],
[
tiles.createMap(tilemap`level11`),
tiles.createMap(tilemap`level6`),
tiles.createMap(tilemap`level11`),
tiles.createMap(tilemap`level17`),
tiles.createMap(tilemap`level41`)
],
[
tiles.createMap(tilemap`level37`),
tiles.createMap(tilemap`level38`),
tiles.createMap(tilemap`level39`),
tiles.createMap(tilemap`level30`),
tiles.createMap(tilemap`level31`)
],
[
tiles.createMap(tilemap`level40`),
tiles.createMap(tilemap`level23`),
tiles.createMap(tilemap`level25`),
tiles.createMap(tilemap`level32`),
tiles.createMap(tilemap`level33`)
],
[
tiles.createMap(tilemap`level9`),
tiles.createMap(tilemap`level19`),
tiles.createMap(tilemap`level19`),
tiles.createMap(tilemap`level26`),
tiles.createMap(tilemap`level27`)
]
]
dungeonMap = [
[
tiles.createMap(tilemap`level39`),
tiles.createMap(tilemap`level95`),
tiles.createMap(tilemap`level82`),
tiles.createMap(tilemap`level83`),
tiles.createMap(tilemap`level39`)
],
[
tiles.createMap(tilemap`level39`),
tiles.createMap(tilemap`level88`),
tiles.createMap(tilemap`level89`),
tiles.createMap(tilemap`level90`),
tiles.createMap(tilemap`level39`)
],
[
tiles.createMap(tilemap`level100`),
tiles.createMap(tilemap`level101`),
tiles.createMap(tilemap`level60`),
tiles.createMap(tilemap`level24`),
tiles.createMap(tilemap`level97`)
],
[
tiles.createMap(tilemap`level39`),
tiles.createMap(tilemap`level43`),
tiles.createMap(tilemap`level44`),
tiles.createMap(tilemap`level44`),
tiles.createMap(tilemap`level39`)
],
[
tiles.createMap(tilemap`level39`),
tiles.createMap(tilemap`level99`),
tiles.createMap(tilemap`level45`),
tiles.createMap(tilemap`level98`),
tiles.createMap(tilemap`level39`)
],
[
tiles.createMap(tilemap`level39`),
tiles.createMap(tilemap`level38`),
tiles.createMap(tilemap`level102`),
tiles.createMap(tilemap`level38`),
tiles.createMap(tilemap`level37`)
]
]
currentMap = tilemapMap
character.loopFrames(
hero,
[img`
    . . . f f f f f f . . . . . . . 
    . . f 1 1 1 1 1 d f . . . . . . 
    . f 1 1 d d d 1 d d f . . . . . 
    . f 1 d d d d d 1 d f . . . . . 
    . f 1 d d d d d 1 1 f f f . . . 
    . f 1 d d d d d 1 1 1 1 1 f f f 
    . f 1 1 d d d 1 1 1 f 1 1 1 1 d 
    . . f 1 1 1 1 1 1 1 1 1 1 1 1 f 
    . . . f 1 1 1 1 1 1 1 1 1 1 f . 
    . . . . f 1 1 1 1 1 f f f f . . 
    . . . f 1 1 1 1 1 1 1 f . . . . 
    . f f 1 f 1 1 1 1 1 f 1 f . . . 
    f 1 f 1 f 1 1 1 1 1 f 1 f . . . 
    f 1 f f 1 1 1 1 1 1 f f . . . . 
    . f 1 1 f 1 1 1 1 1 f . . . . . 
    . . f f . f 1 f 1 f . . . . . . 
    `,img`
    . . . f f f f f f . . . . . . . 
    . . f 1 1 1 1 1 d f . . . . . . 
    . f 1 1 d d d 1 d d f . . . . . 
    . f 1 d d d d d 1 d f . . . . . 
    . f 1 d d d d d 1 1 f f f . . . 
    . f 1 d d d d d 1 1 1 1 1 f f f 
    . f 1 1 d d d 1 1 1 f 1 1 1 1 d 
    . . f 1 1 1 1 1 1 1 1 1 1 1 1 f 
    . . . f 1 1 1 1 1 1 1 1 1 1 f . 
    . . . . f 1 1 1 1 1 f f f f . . 
    . f . f 1 1 1 1 1 1 1 f . . . . 
    f 1 f 1 f 1 1 1 1 1 f 1 f . . . 
    f 1 f 1 f 1 1 1 1 1 f 1 f . . . 
    . f 1 f 1 1 1 1 1 1 f f . . . . 
    . . f 1 f 1 1 1 1 1 f . . . . . 
    . . . f f 1 f f f 1 f . . . . . 
    `],
200,
character.rule(Predicate.FacingRight, Predicate.Moving)
)
character.loopFrames(
hero,
[img`
    . . . . . . . f f f f f f . . . 
    . . . . . . f d 1 1 1 1 1 f . . 
    . . . . . f d d 1 d d d 1 1 f . 
    . . . . . f d 1 d d d d d 1 f . 
    . . . f f f 1 1 d d d d d 1 f . 
    f f f 1 1 1 1 1 d d d d d 1 f . 
    d 1 1 1 1 f 1 1 1 d d d 1 1 f . 
    f 1 1 1 1 1 1 1 1 1 1 1 1 f . . 
    . f 1 1 1 1 1 1 1 1 1 1 f . . . 
    . . f f f f 1 1 1 1 1 f . . . . 
    . . . . f 1 1 1 1 1 1 1 f . . . 
    . . . f 1 f 1 1 1 1 1 f 1 f f . 
    . . . f 1 f 1 1 1 1 1 f 1 f 1 f 
    . . . . f f 1 1 1 1 1 1 f f 1 f 
    . . . . . f 1 1 1 1 1 f 1 1 f . 
    . . . . . . f 1 f 1 f . f f . . 
    `,img`
    . . . . . . . f f f f f f . . . 
    . . . . . . f d 1 1 1 1 1 f . . 
    . . . . . f d d 1 d d d 1 1 f . 
    . . . . . f d 1 d d d d d 1 f . 
    . . . f f f 1 1 d d d d d 1 f . 
    f f f 1 1 1 1 1 d d d d d 1 f . 
    d 1 1 1 1 f 1 1 1 d d d 1 1 f . 
    f 1 1 1 1 1 1 1 1 1 1 1 1 f . . 
    . f 1 1 1 1 1 1 1 1 1 1 f . . . 
    . . f f f f 1 1 1 1 1 f . . . . 
    . . . . f 1 1 1 1 1 1 1 f . f . 
    . . . f 1 f 1 1 1 1 1 f 1 f 1 f 
    . . . f 1 f 1 1 1 1 1 f 1 f 1 f 
    . . . . f f 1 1 1 1 1 1 f 1 f . 
    . . . . . f 1 1 1 1 1 f 1 f . . 
    . . . . . f 1 f f f 1 f f . . . 
    `],
200,
character.rule(Predicate.FacingLeft, Predicate.Moving)
)
character.loopFrames(
hero,
[img`
    . . . f f f . f f . f f f . . . 
    . . f 1 1 1 f d d f 1 1 1 f . . 
    . f 1 1 1 1 1 d d 1 1 1 1 1 f . 
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
    . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
    . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
    . . f 1 1 1 1 1 1 1 1 1 1 f . . 
    . . . f f 1 1 1 1 1 1 f f . . . 
    . . . f 1 1 1 1 1 1 1 1 f . . . 
    . . f 1 f 1 1 1 1 1 1 f 1 f . . 
    . . f 1 f 1 1 1 1 1 1 f 1 f . . 
    . . . f f 1 1 1 1 1 1 f f . . . 
    . . . . f 1 f f f f 1 f . . . . 
    `,img`
    . . . f f f . f f . f f f . . . 
    . . f 1 1 1 f d d f 1 1 1 f . . 
    . f 1 1 1 1 1 d d 1 1 1 1 1 f . 
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f 
    . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
    . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
    . . f 1 1 1 1 1 1 1 1 1 1 f . . 
    . . . f f 1 1 1 1 1 1 f f . . . 
    . . f 1 1 1 1 1 1 1 1 1 1 f . . 
    . . f 1 f 1 1 1 1 1 1 f 1 f . . 
    . . . f f 1 1 1 1 1 1 f f . . . 
    . . . . f 1 1 1 1 1 1 f . . . . 
    . . . . . f 1 f f 1 f . . . . . 
    `],
200,
character.rule(Predicate.FacingUp, Predicate.Moving)
)
character.loopFrames(
hero,
[img`
    . . . f f f . . . . f f f . . . 
    . . f 1 1 1 f . . f 1 1 1 f . . 
    . f 1 d d d 1 f f 1 d d d 1 f . 
    f 1 d d d d 1 f f 1 d d d d 1 f 
    f 1 d d d d d 1 1 d d d d d 1 f 
    f 1 d d d d d 1 1 d d d d d 1 f 
    f 1 1 d d d 1 1 1 1 d d d 1 1 f 
    . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
    . f f 1 1 1 f 1 1 f 1 1 1 f . . 
    . . . f 1 1 1 1 1 1 1 1 f . . . 
    . . . f f 1 1 d 1 1 1 f f . . . 
    . . . f 1 1 1 1 1 1 1 1 f . . . 
    . . f 1 f 1 1 1 1 1 1 f 1 f . . 
    . . f 1 f 1 1 1 1 1 1 f 1 f . . 
    . . . f f 1 1 1 1 1 1 f f . . . 
    . . . . f 1 f f f f 1 f . . . . 
    `,img`
    . . . f f f . . . . f f f . . . 
    . . f 1 1 1 f . . f 1 1 1 f . . 
    . f 1 d d d 1 f f 1 d d d 1 f . 
    f 1 d d d d 1 f f 1 d d d d 1 f 
    f 1 d d d d d 1 1 d d d d d 1 f 
    f 1 d d d d d 1 1 d d d d d 1 f 
    f 1 1 d d d 1 1 1 1 d d d 1 1 f 
    . f 1 1 1 1 1 1 1 1 1 1 1 1 f . 
    . f f 1 1 1 f 1 1 f 1 1 1 f . . 
    . . . f 1 1 1 1 1 1 1 1 f . . . 
    . . . f f 1 1 1 d 1 1 f f . . . 
    . . . f 1 1 1 1 1 1 1 1 f . . . 
    . . f 1 f 1 1 1 1 1 1 f 1 f . . 
    . . f 1 f 1 1 1 1 1 1 f 1 f . . 
    . . . f f 1 1 1 1 1 1 f f . . . 
    . . . . . f 1 f f 1 f . . . . . 
    `],
200,
character.rule(Predicate.FacingDown, Predicate.Moving)
)
loadMapAtLocation(0, 0)
onTilemapLoaded()
let frogBunnyInterval = 1500
color.setPalette(
color.Arcade
)
color.setColor(1, color.rgb(255, 175, 176))
color.setColor(13, color.rgb(255, 113, 97))
color.setColor(15, color.rgb(112, 93, 91))
updateHealth(6, 6)
isWhiteToggleUp = true
scene.setBackgroundColor(15)
game.onUpdateInterval(200, function () {
    if (lazerColor == 1) {
        lazerColor = 13
    } else {
        lazerColor = 1
    }
})
game.onUpdate(function () {
    if (character.matchesRule(hero, character.rule(Predicate.FacingUp))) {
        swordSprite.setPosition(hero.x, hero.y - 16)
    } else if (character.matchesRule(hero, character.rule(Predicate.FacingRight))) {
        swordSprite.setPosition(hero.x + 16, hero.y)
    } else if (character.matchesRule(hero, character.rule(Predicate.FacingDown))) {
        swordSprite.setPosition(hero.x, hero.y + 16)
    } else {
        swordSprite.setPosition(hero.x - 16, hero.y)
    }
})
game.onUpdateInterval(frogBunnyInterval, function () {
    for (let value of sprites.allOfKind(SpriteKind.FrogBunny)) {
        randomNumber = randint(0, 3)
        moveInDirection(randomNumber, frogBunnyInterval / 2, value)
    }
})
game.onUpdate(function () {
    if (hero.tileKindAt(TileDirection.Center, overworldGold.mySprite56)) {
        lastSafeTile = tiles.locationOfSprite(hero)
    }
})
game.onUpdate(function () {
    if (!(inBossFight)) {
        if (hero.top < 1 && currentRow > 0) {
            hero.bottom = 118
            if (!(tryLoadMapAtLocation(currentColumn, currentRow - 1, currentColumn, currentRow))) {
                hero.top = 1
            }
        } else if (hero.bottom > 118 && currentRow < tilemapMap.length - 1) {
            hero.top = 1
            if (!(tryLoadMapAtLocation(currentColumn, currentRow + 1, currentColumn, currentRow))) {
                hero.bottom = 118
            }
        } else if (hero.left < 1 && currentColumn > 0) {
            hero.right = 158
            if (!(tryLoadMapAtLocation(currentColumn - 1, currentRow, currentColumn, currentRow))) {
                hero.left = 1
            } else {
                hero.right = 158
            }
        } else if (hero.right > 158 && currentColumn < tilemapMap[0].length - 1) {
            hero.left = 1
            if (!(tryLoadMapAtLocation(currentColumn + 1, currentRow, currentColumn, currentRow))) {
                hero.right = 158
            }
        }
    }
})
game.onUpdateInterval(2000, function () {
    for (let value of sprites.allOfKind(SpriteKind.CHOMP)) {
        if (sprites.readDataString(value, "state") == "lil' hops") {
            animation.stopAnimation(animation.AnimationTypes.All, value)
            if (Math.percentChance(50)) {
                if (value.right < 138) {
                    value.setImage(img`
                        ................................
                        ..........11111111111...........
                        ........11fffffffffff11.........
                        ......11fffffffffffffff11.......
                        .....1fffffffffffffffffff1......
                        ....1fffffffffffffffffffff1.....
                        ...1fffffffff1111ffffffffff1....
                        ..1fffffffff1ffff1ffffffffff1...
                        ..1ffffffff1ffffff1fffffffff1...
                        .1fffffffff1ffffff1ffffffffff1..
                        .1fffffffff1ffffff1ffffffffff1..
                        1ffffffffff1ffffff1fffffffffff1.
                        1fffffffffff1ffff1ffffffffffff1.
                        1ffffffffffff1111ffffffffffff11.
                        1fffffffffffffffffffffffff111dd.
                        1fffffffffffffffffffffff11ddd11.
                        1fffffffffffffffffffff11dd11111.
                        1ffffffffffffffffffff1dd111f111.
                        1fffffffffffffffffff1d11f11f.1..
                        1ffffffffffffffffff1dff1ff1.....
                        1fffffffffffffffff1d1ffffff.....
                        1ffffffffffffffffff1d11ffff.....
                        .1ffffffffffffffffff1d1ff1f.....
                        .1fffffffffffffffffff1d111ff1...
                        ..ffffffffffffffffffff1dd1111...
                        ..1fffffffffffffffffffff1dd11...
                        ...1fffffffffffffffffffff11d....
                        ....1fffffffffffffffffffff1.....
                        .....1fffffffffffffffffff1......
                        ......11fffffffffffffff11.......
                        ........11fffffffffff11.........
                        ..........11111111111...........
                        `)
                    animation.runMovementAnimation(
                    value,
                    "q 5 -5 10 0 q 5 -5 10 0 q 5 -5 10 0",
                    500,
                    false
                    )
                }
            } else {
                if (value.left > 22) {
                    value.setImage(img`
                        ................................
                        ...........11111111111..........
                        .........11fffffffffff11........
                        .......11fffffffffffffff11......
                        ......1fffffffffffffffffff1.....
                        .....1fffffffffffffffffffff1....
                        ....1ffffffffff1111fffffffff1...
                        ...1ffffffffff1ffff1fffffffff1..
                        ...1fffffffff1ffffff1ffffffff1..
                        ..1ffffffffff1ffffff1fffffffff1.
                        ..1ffffffffff1ffffff1fffffffff1.
                        .1fffffffffff1ffffff1ffffffffff1
                        .1ffffffffffff1ffff1fffffffffff1
                        .11ffffffffffff1111ffffffffffff1
                        .dd111fffffffffffffffffffffffff1
                        .11ddd11fffffffffffffffffffffff1
                        .11111dd11fffffffffffffffffffff1
                        .111f111dd1ffffffffffffffffffff1
                        ..1.f11f11d1fffffffffffffffffff1
                        .....1ff1ffd1ffffffffffffffffff1
                        .....ffffff1d1fffffffffffffffff1
                        .....ffff11d1ffffffffffffffffff1
                        .....f1ff1d1ffffffffffffffffff1.
                        ...1ff111d1fffffffffffffffffff1.
                        ...1111dd1ffffffffffffffffffff..
                        ...11dd1fffffffffffffffffffff1..
                        ....d11fffffffffffffffffffff1...
                        .....1fffffffffffffffffffff1....
                        ......1fffffffffffffffffff1.....
                        .......11fffffffffffffff11......
                        .........11fffffffffff11........
                        ...........11111111111..........
                        `)
                    animation.runMovementAnimation(
                    value,
                    "q -5 -5 -10 0 q -5 -5 -10 0 q -5 -5 -10 0",
                    500,
                    false
                    )
                }
            }
            sprites.changeDataNumberBy(value, "stateCounter", 1)
            if (sprites.readDataNumber(value, "stateCounter") > randint(2, 6)) {
                sprites.setDataNumber(value, "stateCounter", 0)
                sprites.setDataString(value, "state", "lookin at ya'")
            }
        } else if (sprites.readDataString(value, "state") == "lookin at ya'") {
            if (value.x > hero.x) {
                value.setImage(img`
                    ................................
                    ...........11111111111..........
                    .........11fffffffffff11........
                    .......11fffffffffffffff11......
                    ......1fffffffffffffffffff1.....
                    .....1fffffffffffffffffffff1....
                    ....1ffffffffff1111fffffffff1...
                    ...1ffffffffff1ffff1fffffffff1..
                    ...1fffffffff1ffffff1ffffffff1..
                    ..1ffffffffff1ffffff1fffffffff1.
                    ..1ffffffffff1ffffff1fffffffff1.
                    .1fffffffffff1ffffff1ffffffffff1
                    .1ffffffffffff1ffff1fffffffffff1
                    .11ffffffffffff1111ffffffffffff1
                    .dd111fffffffffffffffffffffffff1
                    .11ddd11fffffffffffffffffffffff1
                    .11111dd11fffffffffffffffffffff1
                    .111f111dd1ffffffffffffffffffff1
                    ..1.f11f11d1fffffffffffffffffff1
                    .....1ff1ffd1ffffffffffffffffff1
                    .....ffffff1d1fffffffffffffffff1
                    .....ffff11d1ffffffffffffffffff1
                    .....f1ff1d1ffffffffffffffffff1.
                    ...1ff111d1fffffffffffffffffff1.
                    ...1111dd1ffffffffffffffffffff..
                    ...11dd1fffffffffffffffffffff1..
                    ....d11fffffffffffffffffffff1...
                    .....1fffffffffffffffffffff1....
                    ......1fffffffffffffffffff1.....
                    .......11fffffffffffffff11......
                    .........11fffffffffff11........
                    ...........11111111111..........
                    `)
                animation.runImageAnimation(
                value,
                assets.animation`myAnim4`,
                100,
                true
                )
            } else {
                value.setImage(img`
                    ................................
                    ..........11111111111...........
                    ........11fffffffffff11.........
                    ......11fffffffffffffff11.......
                    .....1fffffffffffffffffff1......
                    ....1fffffffffffffffffffff1.....
                    ...1fffffffff1111ffffffffff1....
                    ..1fffffffff1ffff1ffffffffff1...
                    ..1ffffffff1ffffff1fffffffff1...
                    .1fffffffff1ffffff1ffffffffff1..
                    .1fffffffff1ffffff1ffffffffff1..
                    1ffffffffff1ffffff1fffffffffff1.
                    1fffffffffff1ffff1ffffffffffff1.
                    1ffffffffffff1111ffffffffffff11.
                    1fffffffffffffffffffffffff111dd.
                    1fffffffffffffffffffffff11ddd11.
                    1fffffffffffffffffffff11dd11111.
                    1ffffffffffffffffffff1dd111f111.
                    1fffffffffffffffffff1d11f11f.1..
                    1ffffffffffffffffff1dff1ff1.....
                    1fffffffffffffffff1d1ffffff.....
                    1ffffffffffffffffff1d11ffff.....
                    .1ffffffffffffffffff1d1ff1f.....
                    .1fffffffffffffffffff1d111ff1...
                    ..ffffffffffffffffffff1dd1111...
                    ..1fffffffffffffffffffff1dd11...
                    ...1fffffffffffffffffffff11d....
                    ....1fffffffffffffffffffff1.....
                    .....1fffffffffffffffffff1......
                    ......11fffffffffffffff11.......
                    ........11fffffffffff11.........
                    ..........11111111111...........
                    `)
                animation.runImageAnimation(
                value,
                assets.animation`myAnim5`,
                100,
                true
                )
            }
            sprites.setDataNumber(value, "LungeX", hero.x)
            sprites.setDataNumber(value, "LungeY", hero.y)
            sprites.setDataString(value, "state", "lunging")
        } else {
            moveTo(value, sprites.readDataNumber(value, "LungeX"), sprites.readDataNumber(value, "LungeY"), 300)
            sprites.setDataString(value, "state", "lil' hops")
        }
    }
})
game.onUpdate(function () {
    if (currentBallOfPower) {
        if (currentBallOfPower.y > tiles.tilemapRows() * 16) {
            ballIsHandled = true
        }
    }
})
