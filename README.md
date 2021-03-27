# SoPra FS21 - Client 
## Do you even meme -- Group 04
## Project-Description
1. A user creates a game and gives a subreddit from which memes or any pictures are taken and displayed.
2. With the Reddit API the game master can define which memes are taken. For example these are the last 20 currently best posts of subreddit r/memes: https://www.reddit.com/r/memes/top.json
3. Because Reddit gives the possibility to filter the posts for specific parameters like time or upvotes we can give the users the possibility to set those.
4. The other players enter the game
5. The game begins and a meme/picture is shown to all users. Those users have to create a title for this meme. A timer is running.
6. As soon as the time is up all players vote on which is the best title for the meme. The winner of this vote receives points. Then the next round begins.
7. Once a certain number of rounds is played the game ends and the player with the most points wins.
8. There are a lot of possibilities to expand the game if needed:
9. User profile and History (to prevent the same meme from appearing again)
10. Post the winning meme with title directly to social media
11. See the Rankings from the current Lobby and the best memes from other lobbies
12. Join Lobbies from your friends and see all open lobbies

## User stories 

### Story 1: (Registration/User/Homescreen)
**Story**:
As a user I want to create an account 
As a user I want to be able to edit my information.
**Acceptance Criteria**:
There is a create user button on the home page which links to a register page.
On the registration page you can create a new user.
When logged in you can edit only your own user information via a edit userprofile button.
**Role**: user
**Goal**: Create user & maintain user
**Benefit**: customizable account
**Limitations**: only own user
**Notes**: User class
**Cost**: +1 User saving

### Story 2: (User/Homescreen/utility)
**Story**:
As a user I want to send and receive friend requests from other users.
As a user I want to see if a friend has created a lobby or is already in-game. 
**Acceptance Criteria**:
The user can send a friend request to another user if he knows the username.
The user could accept a friend request from another user if he received one.
The user can see the state of users in his friend list (in a lobby, in game, online, offline).
**Role**: Friend list
**Goal**: See status of befriended users
**Benefit**: know who I can play with, easier invitation
**Limitations**: only befriended players visible
**Notes**: Friend list class, user class (for status)
**Cost**: +1 updating friend list

### Story 3: (Homescreen/utility)
**Story:**
As a user I want to have access to my statistics/game histories.
**Acceptance Criteria:**
There is a button in the main page to go to the statistics page/game history of your account.
The statistics from the database are displayed in a table.
**Role**: game history
**Goal**: can review statistics of past games
**Benefit**: can check for highlights
**Limitations**: only a certain amount of games will be visible
**Notes**: game history class, user class
**Cost**: +1 game history control




### Story 4: (Lobby/Gamemaster)
**Story:** 
As a user I want to create a lobby and become its game master so that other people can join my lobby.
**Acceptance Criteria:**
A user can press a button to create a new lobby and therefore become its game master.
This user can see a link to his lobby which he can copy.
**Role: **Game master
**Goal:** Create a Lobby as a game master
**Benefit:** Lobby for preparing game
**Limitations: -**
**Notes:** Lobby class, Game master
**Cost:** +1 Button control, +1 game master creation, +1 lobby creation


### Story 5: (Lobby/Gamemaster)
**Story:**
As a user I want to be able to see the players in the lobby and see which of them is the game master.
**Acceptance Criteria:**
A user can see players in the same lobby in a list.
A user can see which player in the lobby is the game master.
**Role:** Player list
**Goal:** See other players
**Benefit:** overview of participants
**Limitations:** only same lobby
**Notes:** Player list class, Game master class
**Cost:** +1 Player list control, +1 Game master status


### Story 6: (Lobby/Gamemaster)
**Story:**
As a game master I want to be able to specify the game settings in the lobby.
**Acceptance Criteria:**
The game master can see additional information in the lobby.
The additional information contains settings regarding the game, like how many members are allowed and/or needed in one session.
**Role:** game settings
**Goal:** specify game settings in lobby
**Benefit:** control the mode of the game
**Limitations:** only game master changes settings before the game starts
**Notes:** Setting class, game master class
**Cost:** +1 game settings control


### Story 7: (Game master/Lobby/Lobbysettings)
**Story**:
As a game master I want to be able to specify a time limit in the lobby settings for each voting round.
**Acceptance Criteria**:
The time limit is set for only the current game.
The time setting option is displayed in the game settings.
**Role**: lobby settings
**Goal**: specify a time limit for each round
**Benefit:** customization of rounds based on #of players
**Limitations:** only game master can adapt settings
**Notes:** game master class, lobby settings class
**Cost:** +1 lobby setting control


### Story 8: (Homescreen – lobby)
**Story:**
As a user I want to be able to join an existing lobby. 
After joining a lobby, a user will become a player.
**Acceptance Criteria:**
A user can join a lobby by accessing the URL of the lobby.
A player can see himself and any other players in the players list.
If the maximum player count is reached the user gets a message that the lobby is full. 
**Role:** Lobby 
**Goal:** Join a lobby and become a player
**Benefit:** join a group for a game
**Limitations:** only one player-id means only one lobby, only logged in users, only with link/invite
**Notes:** Link class, lobby class, user class, player class, player list class
**Cost:** +1 user invitation, +1 player status


### Story 9: (Game master/lobby/Reddit)
**Story:**
As the game master I can specify in a subreddit for my lobby from which the posts will be taken. The options available are:
•	/hot
•	/new
•	/random
•	/rising
•	/top
**Acceptance Criteria**:
The settings for the game contain an input field for the “r/”-name (every subreddit is defined by its name and has a prefix “r/”) of the subreddit from which the memes for the game will be taken. The program will grab only the pictures. This can be extended to gifs and videos.
**Role:** Lobby class
**Goal:** choose a subreddit from which to pull memes
**Benefit:** specify the origin of main game component
**Limitations:** only one subreddit, only game master can choose, only pictures
**Notes:** Lobby class, game master class
**Cost:** +1 reddit control



### Story 10: (Lobby-Gamemaster-Game)
**Story:**
As a game master I want to be able to start the game, as soon as 3 or more players have joined.
**Acceptance Criteria**:
There is a start button for the game master to proceed to the game phase.
The game proceeds to the game phase (for all users).
**Role:** game master
**Goal:** start the game
**Benefit:** game can be played
**Limitations:** only game master can start game, at least 3 players required
**Notes:** game master class
**Cost:** +1 game starting control


### Story 11: (Game/Naming Round)
**Story:**
As a player I want to be able to enter my title to the meme as soon as a new naming round starts.
**Acceptance Criteria:**
There’s an input field under each meme and there I can write my title; it should be saved after clicking on enter.
When every player is done the naming round is over.
**Role:** Player
**Goal:** enter a title
**Benefit:** participate in the game
**Limitations:** only one title at once
**Notes:** Game class
**Cost:** +1 Naming operation, +1 Saving operation


### Story 12: (Game/voting Round)
**Story:**
After the naming round has concluded, as a player I want to be able to rate the titles of the other players but not my own. 
In the voting round I have one vote to give.
each player will then receive points according to the vote.
**Acceptance Criteria:**
Either the time runs out or all users have given their vote, then the game proceeds for all players either to the rankings or to the next round.
If the time runs out the player will get -1 point as a punishment. 
**Role:** Round class
**Goal:** switch between naming round, voting round and Finish Round
**Benefit:** round based game 
**Limitations:** only one round at a time
**Notes:** round class
**Cost:** +1 Round control


### Story 13: (Game/Update Round)
**Story:**
As a player I want to see after each round which title got the most points as well as the current ranking.
**Acceptance Criteria:**
After the voting round has terminated, the players see on the screen the points of all titles. 
The current ranking is also presented on a scoreboard, when changes happen, they must be seen here.
The update round terminates automatically after a fixed duration.
**Role:** Update Round class
**Goal:** after each voting round, the players see the scoreboard in the update round. 
**Benefit:** you keep track after each round who is ahead by how much.
**Limitations:** only displayed for a fixed duration
**Notes:** update round class, game class
**Cost:** +1 update round control


### Story 14:(Game/Finish round)
**Story:**
As a user I want to see how many points the players have once the game is over to know who has won.
**Acceptance Criteria:**
In the finish round, a user can see the final scoreboard.
**Role:** Finish round
**Goal:** display the final update of the scoreboard
**Benefit:** winner is distinguished, game ends
**Limitations:** only one finish round per game
**Notes:** Finish round class, game class
**Cost:** +1 game control


### Story 15: (Game/Scoreboard)
**Story:**
As a user I want to be able to see how many rounds are left until the game is over and how many points each player has.
**Acceptance Criteria:**
A user can see a counter of how many rounds are left. (Roundcounter)
A user can see the points of each player next to their name. (Pointcounter)
**Role:** Scoreboard 
**Goal:** track current game values
**Benefit:** game can have a winner
**Limitations:** only certain metrics are of concern (points per player, remaining rounds)
**Notes:** Scoreboard class
**Cost:** +1 Scoreboard control

### Story 16: (Game/ utility)
**Story: **
As a player I want to be able to emote on my fellow players which are in the same game.
**Acceptance Criteria:**
Every player can see the emote (an icon with a meaning behind it. E.g. a thumbs up or a laughing face), and it can’ t be spammed by a single user.
After 3 emotes there has to be a pause of several seconds, which is stated as a fade-out pop-up.
Emotes will be displayed next to the name of the player.
**Role:** Player
**Goal:** being able to express oneself without using the chat or voice options
**Benefit:** game becomes more interactive
**Limitations:** no spam allowed
**Notes:** Player class
**Cost:** +1 Emote control



## Getting started with React

Read and go through those Tutorials, It will make your life easier!

- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](http://localhost:3000) and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Once you have done all of this, in the template there are two main external dependencies that you should look at:

- [styled-components](https://www.styled-components.com/docs)
  It removes the mapping between components and styles (i.e. external css files). This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it
* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) Declarative routing for React being a collection of navigational components that compose declaratively with your application. 
* [react-hooks](https://reactrouter.com/web/api/Hooks) Let's you access the state of the router and perform navigation from inside your components.



## Prerequisites and Installation

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

### `npm install`

This has to be done before starting the application for the first time (only once).

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into an 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).


>Thanks to Lucas Pelloni for the template
