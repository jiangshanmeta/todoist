import Datastore from 'nedb';
import path from 'path';
import {
    remote,
} from 'electron';

export const projectDB = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/project.db'),
});

export const taskDB = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/task.db'),
});
