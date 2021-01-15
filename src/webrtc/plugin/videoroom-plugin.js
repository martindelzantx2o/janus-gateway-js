var Helpers = require('../../helpers');
var Plugin = require('../../plugin');
var MediaAudioPlugin = require('../media-audio-plugin');

function VideoroomPlugin() {
  VideoroomPlugin.super_.apply(this, arguments);
}

VideoroomPlugin.NAME = 'janus.plugin.videoroom';
Helpers.inherits(VideoroomPlugin, MediaAudioPlugin);
Plugin.register(VideoroomPlugin.NAME, VideoroomPlugin);

/**
 * @see https://janus.conf.meetecho.com/docs/janus__audiobridge_8c.html
 * @param {number} roomId
 * @param {Object} [options]
 * @param {boolean} [options.permanent]
 * @param {string} [options.description]
 * @param {string} [options.secret]
 * @param {string} [options.pin]
 * @param {boolean} [options.is_private]
 * @param {number} [options.sampling]
 * @param {boolean} [options.record]
 * @param {string} [options.record_file]
 * @returns {Promise}
 * @fulfilled {JanusPluginMessage} response
 */
VideoroomPlugin.prototype.create = function(roomId, options) {
  return this._create(Helpers.extend({room: roomId}, options));
};

/**
 * @param {number} roomId
 * @param {Object} [options]
 * @param {string} [options.secret]
 * @param {boolean} [options.permanent]
 * @returns {Promise}
 * @fulfilled {JanusPluginMessage} response
 */
VideoroomPlugin.prototype.destroy = function(roomId, options) {
  return this._destroy(roomId, Helpers.extend({room: roomId}, options));
};

/**
 * @param {number} roomId
 * @param {Object} [options]
 * @param {number} [options.id]
 * @param {string} [options.pin]
 * @param {string} [options.display]
 * @param {boolean} [options.muted]
 * @param {number} [options.quality]
 * @returns {Promise}
 * @fulfilled {JanusPluginMessage} response
 */
VideoroomPlugin.prototype.join = function(roomId, options) {
  options = Helpers.extend({room: roomId}, options);
  return this._join(roomId, options);
};

/**
 * @param {number} roomId
 * @param {Object} [options]
 * @param {number} [options.id]
 * @param {string} [options.pin]
 * @param {string} [options.display]
 * @param {boolean} [options.muted]
 * @param {number} [options.quality]
 * @returns {Promise}
 * @fulfilled {JanusPluginMessage} response
 */
VideoroomPlugin.prototype.change = function(roomId, options) {
  options = Helpers.extend({room: roomId}, options);
  return this._change(roomId, options);
};

/**
 * @param {number} roomId
 * @param {Object} [options]
 * @param {number} [options.id]
 * @param {string} [options.display]
 * @param {boolean} [options.muted]
 * @param {number} [options.quality]
 * @returns {Promise}
 * @fulfilled {JanusPluginMessage} response
 */
VideoroomPlugin.prototype.connect = function(roomId, options) {
  options = Helpers.extend({room: roomId}, options);
  return this._connect(roomId, options);
};

/**
 * @param {number} roomId
 * @returns {Promise}
 * @fulfilled {Array} list
 */
VideoroomPlugin.prototype.listParticipants = function(roomId) {
  return this._listParticipants({room: roomId});
};

/**
 * @inheritDoc
 */
VideoroomPlugin.prototype.getResponseAlias = function() {
  return 'videoroom';
};

module.exports = VideoroomPlugin;
