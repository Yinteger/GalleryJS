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
        this._element.addEventListener('dragstart', (e) => {
            //Prevent image dragging.
            e.preventDefault();
            return false;
        });
        this._element.style.visibility = "hidden";
        this._element.onload = (e) => {
            this.setReady()
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