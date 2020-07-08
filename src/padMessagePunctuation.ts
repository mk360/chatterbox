
/**
 * Process a message to make it suitable to learn. Involves replacing newlines, carriage returns, etc.... as well as surrounding punctuation marks with spaces.
 * @example padMessagePunctuation("Jellow! Welcome!") => "jellow ! welcome !"
 * @param message 
 * @returns The cleaned message
 */
function padMessagePunctuation(message: string) {
    let lowercased = message.toLowerCase();
    lowercased = lowercased.replace(/[\n\r\(\)]/g, " ");
    lowercased = lowercased.replace(/"/g, "");
    lowercased = lowercased.replace(/;/g, ",");
    lowercased = lowercased.replace(/[',?!.:]/g, match => ` ${match} `); // "bruh." => "bruh . "
    return lowercased.trim();
};

export default padMessagePunctuation;