import {
    projectDB,
} from './index';

export function getProjectList (params) {
    let query = {};
    if (params.status !== -1) {
        query.status = params.status;
    }
    return new Promise((resolve, reject) => {
        projectDB.find(query, (err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs);
        });
    });
}

export function doCreateProject (data) {
    return new Promise((resolve, reject) => {
        projectDB.insert(data, (err, newDoc) => {
            if (err) {
                reject(err);
            }
            resolve(newDoc);
        });
    });
}

export function doDeleteProject (_id) {
    return new Promise((resolve, reject) => {
        // TODO 没有task的才允许删除

        projectDB.remove({
            _id,
        }, {}, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            resolve();
        });
    });
}
