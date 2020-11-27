'use strict'
let groups = [];
let last_idx = -1;
module.exports =  function (urllib) {
    function getAllGroups(cb) {
        let groupNames = []
        groups.forEach(group => groupNames.push(group.name))
        cb(groupNames)
    }

    function createGroup(details, cb) {
        if (findGroup(details.name)) cb('Group Already in DB')
        else {
            groups.push({
                id: ++last_idx,
                name: details.name,
                description: details.description,
                games: []
            });
            cb(null, groups[last_idx]);
        }
    }

    function getGroupInfo(id, cb) {

    }



    return {
        getAllGroups: getAllGroups,
        createGroup: createGroup,
        getGroupInfo: getGroupInfo
    }

    function findGroup(name) {
        return groups.find(grp => grp.name.toUpperCase() === name.toUpperCase());
    }
}