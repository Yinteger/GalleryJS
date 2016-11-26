import Hammer from "hammerjs";
import "./Gallery.less";

import FullScreenIcon from "../assets/fullscreen.png";
import BackNavIcon from "../assets/back-nav.png";
import ForwardNavIcon from "../assets/forward-nav.png";

export default class Gallery {
    constructor (content) {
        this.navigationStatus = null;
        this.galleryContentContainer = null;
        this.content = content;
        this.index = 1;

        return this.build(content);
    }

    build (content) {
        let gallery = document.createElement('div');
        gallery.className = "gallery";

        //Container for the Content (Images/Videos)
        let galleryContentContainer = document.createElement('div');
        this.galleryContentContainer = galleryContentContainer;
        galleryContentContainer.className = "gallery-content";
        gallery.appendChild(galleryContentContainer);
        this._attachEvents(galleryContentContainer);

        //Add Content
        for (var i in content) {
            let item = content[i];

            let galleryItem = document.createElement('div');
            galleryItem.style.backgroundImage = "url('" + item + "')";
            galleryContentContainer.appendChild(galleryItem);
        }

        //Navigation Icons
        let backNavIcon = document.createElement('img');
        backNavIcon.className = "back-nav-icon";
        backNavIcon.src = BackNavIcon;
        gallery.appendChild(backNavIcon);

        let mc1 = new Hammer.Manager(backNavIcon);
        let Tap1 = new Hammer.Tap();
        mc1.add(Tap1);
        mc1.on('tap', (e) => {
            this.previous();
        });

        let forwardNavIcon = document.createElement('img');
        forwardNavIcon.className = "forward-nav-icon";
        forwardNavIcon.src = ForwardNavIcon;
        gallery.appendChild(forwardNavIcon);

        let mc2 = new Hammer.Manager(forwardNavIcon);
        let Tap2 = new Hammer.Tap();
        mc2.add(Tap2);
        mc2.on('tap', (e) => {
            this.next();
        });

        //Status bar for status of gallery navigation and icons for fullscreen, etc
        let statusBar = document.createElement('div');
        statusBar.className = "status-bar";
        gallery.appendChild(statusBar);

        //Navigation status
        let navigationStatus = document.createElement('div');
        this.navigationStatus = navigationStatus;
        statusBar.appendChild(navigationStatus);
        this._updateContentPosition();

        //Full screen icon
        let fullScreenIcon = document.createElement('img');
        fullScreenIcon.className = "fullscreen-icon";
        fullScreenIcon.src = FullScreenIcon;
        statusBar.appendChild(fullScreenIcon);

        let mc3 = new Hammer.Manager(fullScreenIcon);
        let Tap3 = new Hammer.Tap();
        mc3.add(Tap3);
        mc3.on("tap", (e) => {
           //Toggle FullScreen
            gallery.classList.toggle("fullscreen");
        });

        return gallery;
    }

    next () {
        if (this.index < this.content.length) {
            this.index += 1;
            this._updateContentPosition();
        }
    }

    previous () {
        if (this.index > 1) {
            this.index -= 1;
            this._updateContentPosition();
        }
    }

    _attachEvents(galleryContentContainer) {
        var mc = new Hammer.Manager(galleryContentContainer.parentNode);
        var Swipe = new Hammer.Swipe();
        mc.add(Swipe);
        mc.on('swipeleft', (e) => {
            this.next();
        });
        mc.on('swiperight', (e) => {
            this.previous();
        });
    }

    _updateContentPosition () {
        this.navigationStatus.innerHTML = this.index + "/" + this.content.length;
        this.galleryContentContainer.style.left = (((this.index - 1) * 100) * -1) + "%";
    }
}