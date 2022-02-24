/**
 * shitty logger class
 */
export default new class VueSocketIOLogger {

    constructor() {
        this.debug = false;
        this.prefix = '%cVue-Socket.io: ';
    }

    info(text, data = '') {

        if(this.debug) window.console.info(this.prefix+`%c${text}`, 'color: lightgreen; font-weight: 600', 'color: white', data);

    }

    error(text) {

        if(this.debug) window.console.error(this.prefix, '', ...arguments);

    }

    warn() {

        if(this.debug) window.console.warn(this.prefix, '', ...arguments);

    }

    event(text, data = ''){

        if(this.debug) window.console.info(this.prefix+`%c${text}`, 'color: lightgreen; font-weight: 600', 'color: white', data);

    }

}
