const clean = obj => {
    for (const propName in obj) {
        if (obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
};

module.exports = {
    clean
};
