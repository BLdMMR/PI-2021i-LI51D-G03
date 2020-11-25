'use strict'
let groups = [];
let last_idx = -1;
module.exports =  function (urllib) {
    function getAllGroups(cb) {
        cb(groups);
    }

    function createGroup(details, cb) {
        groups.push({
            id: ++last_idx,
            name: details.name,
            description: details.description,
            games: []
        });
        cb(null, groups[last_idx]);
    }

    return {
        getAllGroups: getAllGroups,
        createGroup: createGroup
    }
}