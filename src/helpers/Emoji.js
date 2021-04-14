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
    new Emoji( '<3', '❤' ),
    new Emoji( 'xD', '🤣' ),
    new Emoji( ':)', '😊' ),
    new Emoji( ';P', '😜' ),
];

export default parseEmoji;
