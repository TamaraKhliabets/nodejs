const clean = obj => {
    for (const propName in obj) {
        if (obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
};

const permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

const getFormattedDateTime = date => `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

module.exports = {
    clean,
    permissions,
    getFormattedDateTime
};
