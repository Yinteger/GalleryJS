/**
 * Created by Kyle on 2016-11-28.
 */

import GalleryItem from "./GalleryItem.js";
export default class YouTubeItem extends GalleryItem {
    constructor (title, video_id, player_vars) {
        super("youtube", title);

        this._element = document.createElement('iframe');
        this.element.setAttribute('id', "player");
        this.element.setAttribute('type', 'text/html');
        this.element.setAttribute('frameborder', '0');
        var url = "https://www.youtube.com/embed/" + video_id + "?enablejsapi=1";
        for (var i in player_vars) {
            url += "&" + i + "=" + player_vars[i];
        }
        this.element.setAttribute('src', url);
        this.setReady();
    }

    reset () {
        this.element.width = "100%";
        this.element.height = "100%";
    }

    move () {
        return false;
    }

    resize () {
        return false;
    }

    onHidden () {
        this.element.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
    }
}