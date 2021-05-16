

<div style="text-align:center"><img src="https://raw.githubusercontent.com/sopra-fs21-group-4/client/master/src/image/logo/doyouevenmeme.png"/></div>
[toc]
# Project-Description
In this game players submit titles for images and gifs that are collected from a specified subreddit. A normal game flow looks something like this.

1. A user creates a game and enters a subreddit.
2. With the Reddit API the game master can define what type of memes are taken. For example these are the last 25 currently best posts of subreddit r/memes: https://www.reddit.com/r/memes/top.json
3. Because Reddit gives the possibility to filter the posts for specific parameters like time or upvotes we can give the users the possibility to set those. (hot/rising/new/etc.)
4. Other players join the game
5. The game begins and a meme is shown to all users. Those users have to enter a title that they find funny and fitting
6. As soon as the time is up all players vote on which is the best title for the meme. Then the players receive points according to the votes recieved. Steps 5 and 6 get repeated until the total number of rounds are played.

# Technologies
The client is written in JavaScript using React.

To establish a connection between the front- and backend REST is used. 
# High-Level Components
The [GameList](https://github.com/sopra-fs21-group-4/client/blob/master/src/components/lobby/GameList.js) and [GameInfoItem](https://github.com/sopra-fs21-group-4/client/blob/master/src/components/lobby/GameInfoItem.js) display all currently open lobbies. To implement this we used REST-Requests to update the list. 
When a User clicks on a open lobby the user then gets forwarded to the game. Where they then either have to enter the lobby password or if no password was set they just enter the lobby.

# TODO  2 more high level components


# Launch and Development

* `npm run dev`

  Runs the app in the development mode.<br />
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  The page will reload if you make edits.<br />
  You will also see any lint errors in the console.

* `npm run build`

  Builds the app for production to the `build` folder.<br />
  It correctly bundles React in production mode and optimizes the build for the best performance.

  The build is minified and the filenames include the hashes.<br />
  Your app is ready to be deployed!

  See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Screenshots
## Lobby creation
Below you can see how a lobby can be set up and then will displayed on the Dashboard.
<div><img src="https://marock.li/cloud-storage/sopra.gif" width="250" allign="center"/></div>

## Login
When visiting our project the user is prompted with a login/registration screen.

![login](https://marock.li/cloud-storage/login.png)

## Dashboard
After the login the user is prompted with the dashboard. Where the user sees the currently open games and can create his own new game.

![login](https://marock.li/cloud-storage/dashboard.png)

## Lobby
When in game and waiting for players the Game master sees the below screen. Here he can edit the settings, chat with the other players, set their own status to ready or not ready and ban Players that he doesnt want in his game. 

The game then can only start, when at least 3 Players and at most the maximum amount of Players are in the Lobby. If this condidition is met every player needs to be ready then the game will automatically start. 
![login](https://marock.li/cloud-storage/lobby.png)

## In Game
During the game there are three different phases to the game.
1. The suggestion phase where every Players is prompted with the same meme. They then have a certain amount of time to think of a title and enter/submit it. If a player does not submit a title they will get points deducted for not entering a title.
![login](https://marock.li/cloud-storage/submitting.png)
2. After the time has run out all players can then vote for the titles that were submited. A player can never vote for their own title. If a player does not vote or can not vote for a other title the player will also get point deducted.
![login](https://marock.li/cloud-storage/voting.png)
3. When the time has run out the points given will be calculated and displayed. 
After the time has run out the next round will start or if the last round just happened the Game Summurary will be displayed. 
![login](https://marock.li/cloud-storage/results.png)


# Roadmap
1. extend the resources where memes could be collected for the game
2. making sure that no meme is displayed to a player twice


# Authors and Acknowledgments
## Authors
The authors of this project are:
[Florian Herzog](https://github.com/Stud-FH), [Aljoscha Schnider](https://github.com/plexinio), [Max-Zurbriggen](https://github.com/Max-Zurbriggen), [Cyrill Hidber](https://github.com/Aece96), [Philipp Marock](https://github.com/Sahibabdul)

## Acknowledgments
We would like to thank our tutors for providing us with a starting point and continued support. 
Further we would like to thank our friends for testing our game and providing us with ideas for improvement.

# License

MIT License

Copyright (c) [2021] [SoPra Group 04]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.