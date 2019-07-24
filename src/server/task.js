import {
    taskDB,
} from './index';

export function getTaskList (params) {
    return new Promise((resolve, reject) => {
        taskDB.find(params, (err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs);
        });
    });
}

export function doCreateTask (data) {
    return new Promise((resolve, reject) => {
        taskDB.insert(data, (err, newDoc) => {
            if (err) {
                reject(err);
            }
            resolve(newDoc);
        });
    });
}

export function doEditTask (data) {
    return new Promise((resolve, reject) => {
        taskDB.update({
            _id: data._id,
        }, data, {}, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

export function doDeleteTask (_id) {
    return new Promise((resolve, reject) => {
        taskDB.remove({
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
