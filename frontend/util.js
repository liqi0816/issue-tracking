var its = (() => {
    try {
        return JSON.parse(sessionStorage.its || {});
    }
    catch {
        return {};
    }
})();

var sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

var yield = () => new Promise(setTimeout);

var headersDefault = { 'x-requested-with': 'fetch' };

var htmlEscape = str => ('' + str)
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;');

var htmlTmpl = (literals, ...variables) => {
    const result = [];

    for (let i = 0; i < variables.length; i++) {
        result.push(literals[i]);
        result.push(htmlEscape(variables[i]));
    }
    result.push(literals[literals.length - 1]);
    return result.join('');
};

var urlTmpl = (literals, ...variables) => {
    const result = [];

    for (let i = 0; i < variables.length; i++) {
        result.push(literals[i]);
        result.push(encodeURIComponent(variables[i]));
    }
    result.push(literals[literals.length - 1]);
    return result.join('');
};
