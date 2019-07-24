import {
    projectDB,
    taskDB,
} from './index';

export function getProjectList (params) {
    const query = {};
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

export function getProjectInfo (_id) {
    return new Promise((resolve, reject) => {
        projectDB.findOne({
            _id,
        }, (err, doc) => {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    });
}

export function doEditProject (data) {
    return new Promise((resolve, reject) => {
        projectDB.update({
            _id: data._id,
        }, data, {}, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

export function doDeleteProject (_id) {
    return new Promise((resolve, reject) => {
        taskDB.count({
            projectId: _id,
        }, (err, count) => {
            if (err) {
                console.error(err);
                return reject(err);
            }
            if (count > 0) {
                return reject(count);
            }
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
    });
}
