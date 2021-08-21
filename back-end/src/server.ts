import {app} from './app';

const port = 3001;

const server = app.listen(port, ()=> console.log(`App listen port ${port}`))

process.on('SIGINT', () => {
    server.close()
    console.log('App closed!')
})