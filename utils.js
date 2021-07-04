const clean = obj => {
    for (const propName in obj) {
        if (obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
};

const permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

module.exports = {
    clean,
    permissions
};
