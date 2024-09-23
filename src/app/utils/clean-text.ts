/**
 * Returns the last index of . ! ? [ellipsis] in the given string.
 * @param text
 * @returns index of the sign
 */
function getLastCutoffSign(text: String) {
    const singleCharIndex = Math.max(
        text.lastIndexOf('.'),
        text.lastIndexOf('!'),
        text.lastIndexOf('?'),
        text.lastIndexOf('…'),
        text.lastIndexOf("..."),
    );
    const dualCharIndex = text.lastIndexOf('."');

    const calculateIndex = (index: number, addToIndex: number) => {
        if (index > 0) return index + addToIndex;
        return -1;
    }

    const returnIndex = Math.max(calculateIndex(singleCharIndex, 1), calculateIndex(dualCharIndex, 2));
    if (returnIndex < 0) return text.length;

    return returnIndex;
}

/**
 * Removes a colon from the beginning of the text.
 * @param text the dirty text
 * @returns the clean text
 */
function removeColonFromStart(text: string) {
    let returnText = text.trim();
    if (returnText.startsWith(":")) {
        returnText = returnText.substring(1).trim();
    }
    return returnText
}

/**
 * Returns the index where an incomplete numbered markdown list was found.
 * @param text
 * @returns index
 */
function getIncompleteListItemIndex(text: string) {
    const regex = new RegExp(/\n(\d+\.|[\-\+\*]) ?$/);
    const index = text.search(regex);
    return index > 0 ? index : text.length;
}

/**
 * Checks the text for a colon or a semi-colon at the end.
 * If found, trims the text to a previous line break and returns it.
 * @param text the dirty text
 * @returns the clean text
 */
function removeIncompleteText(text: string) {
    if (text.endsWith(":") || text.endsWith(";")) {
        text = text.slice(0, text.lastIndexOf('\n') || text.length);
    }
    return text
}

/**
 * Checks the text for an emoji in the last 6 characters (for unicode support).
 * @param text
 * @returns true or false
 */
function textEndsWithEmoji(text: string) {
    const regex = new RegExp(/\p{Emoji_Presentation}/u);
    return regex.test(text.slice(-6));
}

/**
 * Checks if text starts with | companionName and removes it.
 * @param text
 * @param companionName A companion's name
 * @returns
 */
function cleanCompanionNames(text: string, companionName: string) {
    let cleanedText: string;

    const textToDetect = "| " + companionName.toLowerCase();

    if (text.slice(0, 50).toLowerCase().startsWith(textToDetect)) {
        cleanedText = text.slice(textToDetect.length).trim();
        return cleanedText;
    }

    return text;
}

/**
 * Cleans the input text.
 * @param text the dirty text
 * @param companionName optional companion name
 * @returns the clean text
 */
export function cleanText(text: string, companionName?: string) {
    let cleanedText = removeColonFromStart(text);

    if (companionName) {
        cleanedText = cleanCompanionNames(cleanedText, companionName);
    }

    if (textEndsWithEmoji(cleanedText)) {
        return cleanedText;
    }

    cleanedText = cleanedText.slice(0, getLastCutoffSign(cleanedText)).trim();
    cleanedText = cleanedText.slice(0, getIncompleteListItemIndex(cleanedText)).trim();
    cleanedText = removeIncompleteText(cleanedText).trim();
    cleanedText = !cleanedText.endsWith(",") ? cleanedText : cleanedText.slice(0, -1);
    cleanedText = cleanedText.trim();

    if (cleanedText.length < 5) return text;

    return cleanedText;
}