var users = {
    'enlore': {
        username    : 'enlore',
        id          : 1,
        password    : 'butts',
        byLine      : 'N. E. Lorenson'
    },

    'theeinel': {
        username    : 'theeinel',
        id          : 2,
        password    : 'superpoop',
        byLine      : 'W. A. Elliott'
    }
}

exports.getUser = function (username) {
    // will return undefined if no user
    return users[username]
}
