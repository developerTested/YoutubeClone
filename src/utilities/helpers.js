export function getInitials(inputName) {
    const names = inputName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
}

export const pluralize = (word, count) => count === 1 ? word : word + 's';

export function formatCompactNumber(number, text) {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });

    const formatNum = formatter.format(number);
    
    if(text){
        text = formatNum + " " + pluralize(text, number);
    }

    return text || formatter.format(number);
}