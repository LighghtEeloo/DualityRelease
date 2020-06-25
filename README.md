# Duality

## Table of Content
- [Title](#Duality)
- [Menu](#Table-of-Content)
- [Description](#Description)
- [Structure](#File-Structure)
- [Usage](#Usage)
- [Story](#Story)
- [Functions](#Functions)
- [History Versions](ChangeLog.md)

## Description
**Duality** is a modified version of *Breakout* game,
and this project is *2020SU VG100 Project One*, made by following members:
- Rundong Tang
- Yuchen Jiang
- Yuchen Zhou
- Zhimin Sun

## File Structure
```
Duality
|- README.md
|- ChangeLog.md
|- Makefile
|- elm.json
|> src
   |> Start0
   |> Stranger1
   |> Friend2
   |> Lovers3
   |> Stranger4
   |> Companion5
   |> Death6
   |> End7
   |- Main.elm
   |- Message.elm
   |- Model.elm
   |- BasicView.elm
   |- Bezier.elm
   |- CollisionBlock.elm
   |- CollisionPoly.elm
   |- Fade.elm
   |- Subscription.elm
   |- Tool.elm
   |- ...
|> public
   |- index.html
   |- main.css
   |- favicon.ico
   |- icon.png
   |- *.mp3
   |- ... (Other sources)
|- ...
```

## Usage
1. User should press **SPACE** to *start or pause* the game.
1. User should press **S** to *skip* the level, **R** to *restart* the level.
1. User should press **G** for god mode. All levels rebound, and the fourth level will automatically catch the ball
    for the game experience.
1. Press the **Left** or **Right** direction button to move the board.
1. Enjoy it!

## Story
Our story is a love story between two people, and our storyline follows the passage of time.
Two strangers met. They got to know each other and became friends. With their relationship closer
and closer, they finally fall in love with each other. However, something happened which made their
relationship lost of control. Their love was destroyed, and they became strangers again. After a long time,
the wound in their relationship was gradually healing. They started to renew their love and eventually became couples.
In the end, they died together, which gave an end to the romantic love story.

Our storyline is divided into several plots, each is shown in one game level.

### Level 1 Strangers
In this level, the player can find that the background is black and there are two shiny white balls, which present two people who haven’t met each other. One ball is moving and can be controlled by the player using the paddle, and the other ball is still behind the bricks. The goal for the player is to use the paddle to help one ball bump into the other one after hitting some bricks. When the two balls meet each other, there will be a small animation and one of the balls turns yellow, while the other turns green.

### Level 2 Friends
In this level, the background becomes lavender, which indicates that the two people get closer. The blue ball is moving controlled by the player using the paddle while the yellow ball is hiding in one brick. Each time the blue ball hits the brick where the yellow ball hides, the yellow ball jumps into another brick. This setting indicates the state that one person chases the other one and the other person flee away shyly. Therefore, the goal for the player is to use the blue ball to hit every brick so that it will finally meet the yellow ball.

### Level 3 Lovers
In this level, the bricks are placed to be like the shape of heart, and they are shrinking and expanding like heartbeats, which shows that the two people fall in love with each other. The bricks are red initially, when hit they become gray. The player can find that the speed of the ball and frequency of the heartbeat become larger and larger, which indicates the relationship between the two people becomes out of control. Finally when all the bricks are hit, the heart becomes gray and the level is over.

### Level 4 Strangers
At the beginning of this level, the ball, which is shining and white like the ball in Level 1, will go through a track in the shape of a heart. There are only 9 bricks in this level, which are placed in the middle of the screen in the shape of a square. The bricks are initially all blue, and a brick hit once will become green; a brick hit twice will become yellow; a brick hit three times will become orange; a brick hit four times will become red; a brick hit five times will finally disappear. The goal for the player is to eliminate all the bricks, which indicates that the estrangement between the two people is finally eliminated.

### Level 5 Companions
The two balls appear again. However, they are no longer balls. Instead, become paddles in this level: the blue ball is on the bottom and the yellow ball is on the top. The player should control both the paddles to let the ball to hit the bricks which are places on the left and right sides of the screen. This setting indicates that the two people live with each other and dealing with everything together as companions.

### Level 6 Death
In this level, there are one word behind each brick. When a brick is hit by the ball, the word behind it appears. The goal for the player is to hit all the bricks and finally find the whole sentence, which presents the epitaph of the two people.


## Features
1. We have set different game levels, and each level has a unique story to tell. The stories of different levels are set to be coherent, which are the plots of a complete story.
1. We have added some animations among the game levels to beautify our game and make our storytelling more fluent.
1. We have added different shapes of paddles instead of just rectangles. The paddles can even be like a ball in some game levels, which can absolutely add more fun to our game.
1. In some game levels, there are 2 balls instead of just one, and the balls are given anthropomorphic meaning, where they represents the pair of lovers.
1. The backgrounds in our game are no longer gray at all time. We give different backgrounds to different game levels to create the atmospheres which can suit the stories in different game levels.
1. Some interesting settings are also applied in our game to better suit the plots of the story, like in one game level, the player may find that he is dealing with two balls and an extra paddle is hidden; in one game level, the game is set to be extremely hard so that the player must fail, which leads to the next plot.
