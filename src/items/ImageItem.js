/**
 * Created by Kyle on 2016-11-28.
 */
import GalleryItem from "./GalleryItem.js";
export default class ImageItem extends GalleryItem {
    constructor (title, url) {
        super("image", title);
        this._url = url;

        //Build Image
        this._element = document.createElement('img');
        this._element.onload = (e) => {
            this.reset();
        };
        this._element.src = this._url;
    }

    get url () {
        return this._url;
    }

    onHidden () {
        this.reset();
    }

}