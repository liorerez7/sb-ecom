export const truncateText = (text, charLimit = 80) => {
    if (text.length > charLimit) {
        return text.substring(0, charLimit) + '...';
    }

    return text;
}