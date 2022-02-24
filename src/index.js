import Mixin from './mixin';
import Logger from './logger';
import Listener from './listener';
import Emitter from './emitter';
import SocketIO2 from 'socket.io-client2';
import SocketIO3 from 'socket.io-client3';
import SocketIO4 from 'socket.io-client3';
let SocketIO;

export default class VueSocketIO {

    /**
     * lets take all resource
     * @param io
     * @param vuex
     * @param debug
     * @param options
     */
    constructor({connection, vuex, debug, options,version = 4}){

        Logger.debug = debug;

        switch (version){
            case 2:
                SocketIO = SocketIO2;
                break;
            case 3:
                SocketIO = SocketIO3;
                break;
            case 4:
                SocketIO = SocketIO4;
                break;
            default:
                SocketIO = SocketIO4;
                Logger.warn('Undefined version. Use version 4 by default.');
        }

        this.io = this.connect(connection, options);
        this.emitter = new Emitter(vuex);
        this.listener = new Listener(this.io, this.emitter);

    }

    /**
     * Vue.js entry point
     * @param Vue
     */
    install(Vue){

        const version = Number(Vue.version.split('.')[0])

        if (version >= 3) {
            Vue.config.globalProperties.$socket = this.io;
            Vue.config.globalProperties.$vueSocketIo = this;
        } else {
            Vue.prototype.$socket = this.io;
            Vue.prototype.$vueSocketIo = this;
        }

        Vue.mixin(Mixin);

        Logger.info('Vue-Socket.io plugin enabled');

    }


    /**
     * registering SocketIO instance
     * @param connection
     * @param options
     */
    connect(connection, options){

        if(connection && typeof connection === 'object'){

            Logger.info('Received socket.io-client instance');

            return connection;

        } else if(typeof connection === 'string'){

            Logger.info('Received connection string');

            return this.io = SocketIO(connection, options);

        } else {

            throw new Error('Unsupported connection type');

        }

    }

}
