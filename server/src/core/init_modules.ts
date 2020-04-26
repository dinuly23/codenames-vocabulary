import { OnApplicationInit } from './on_application_init';

/**
 * Helper for bootstrapping Application async modules
 * @param {OnApplicationInit} args
 * @returns {Promise<void>}
 */
export async function initModules(...args: OnApplicationInit[]) {
    for (const module of args) {
        console.debug('Starting module: ' + module.constructor.name);
        await module.init();
    }
}
