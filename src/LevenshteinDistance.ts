function levenshteinDistance(string1: string, string2: string): number {
    let len1 = string1.length;
    let len2 = string2.length;
    if (!len2 || !len1) return Math.max(len1, len2);
    return Math.min(
        levenshteinDistance(string1.substr(1), string2) + 1,
        levenshteinDistance(string2.substr(1), string1) + 1,
        levenshteinDistance(string1.substr(1), string2.substr(1)) + (string1[0] === string2[0] ? 0 : 1)
    );
};

export default levenshteinDistance;
