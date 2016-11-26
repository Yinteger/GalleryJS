"use strict";

import Gallery from "./Gallery/Gallery.js";
// import LightBox from "LightBox/LightBox.js";

export default class EasyGallery {
    //Display an image or a collection of images in the lightbox
    static lightbox(images) {
        LightBox.show(image);
    }

    //Display an image/videos or a collection of images/videos in a gallery
    static gallery(parent, content) {
        parent.appendChild(new Gallery(content));
    }
}

//Global reference for non-node users
window.EasyGallery = EasyGallery;