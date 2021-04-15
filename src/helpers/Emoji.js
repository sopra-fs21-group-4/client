function Emoji(keyword, emoji) {
    this.keyword = keyword;
    this.emoji = emoji;
}

const parseEmoji = ( str ) => {

    for (let emoji of ALL) {
        str = str.replaceAll(emoji.keyword, emoji.emoji)
    }
    return str;
}

const ALL = [
    // TODO extendable
    new Emoji( ':)', '😊' ),
    new Emoji( ':D', '😃' ),
    new Emoji( '<3', `❤️` ),
    new Emoji( 'xD', '🤣' ),
    new Emoji( ':)', '😊' ),
    new Emoji( ';)', '😉' ),
    new Emoji( ';P', '😜' ),
    new Emoji( ':(', '🙁' ),
    new Emoji( ':+1:', '👍' ),
    new Emoji( ':-1:', '👎' ),
    new Emoji( ':ok:', '👌' ),
    new Emoji( ':100:', '💯' ),
    new Emoji( ':cool:', '😎' ),
    new Emoji( ':peace:', '✌' ),
    new Emoji( ':party:', '🎉' ),
    new Emoji( ':partyface:', '🥳' ),
    new Emoji( ':y:', '✔' ),
    new Emoji( ':n:', '❌' ),
    new Emoji( ':idk:', '🤷‍♂️' ),
    new Emoji( ':pizza:', '🍕' ),
    new Emoji( ':shit:', '💩' ),
];

export default parseEmoji;
