import Hammer from "hammerjs";
import "./Gallery.less";

import FullScreenIcon from "../assets/fullscreen.png";
import BackNavIcon from "../assets/back-nav.png";
import ForwardNavIcon from "../assets/forward-nav.png";

export default class Gallery {
    constructor (content) {
        this.navigationStatus = null;
        this.gallery = null;
        this.galleryContentContainer = null;
        this.itemTitle = null;
        this.content = content;
        this.index = 1;
        this.isFullscreen = false;
        this.onKeyUp = this._onKeyUp.bind(this);
        this.images = [];

        window.addEventListener('resize', (e) => {
            for (var i in this.images) {
                this._setInitialImageSize(this.images[i]);
            }
        })

        return this.build(content);
    }

    build (content) {
        let gallery = document.createElement('div');
        this.gallery = gallery;
        gallery.className = "gallery";

        //Container for the Content (Images/Videos)
        let galleryContentContainer = document.createElement('div');
        this.galleryContentContainer = galleryContentContainer;
        galleryContentContainer.className = "gallery-content";
        gallery.appendChild(galleryContentContainer);
        this._attachEvents(galleryContentContainer);

        //Add Content
        for (var i in content) {
            galleryContentContainer.appendChild(this._buildGalleryItem(content[i]));
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
        navigationStatus.className = "navigation-status";
        this.navigationStatus = navigationStatus;
        statusBar.appendChild(navigationStatus);

        //Full screen icon
        let fullScreenIcon = document.createElement('img');
        fullScreenIcon.className = "fullscreen-icon";
        fullScreenIcon.src = FullScreenIcon;
        statusBar.appendChild(fullScreenIcon);

        //Item Title
        let itemTitle = document.createElement('span');
        this.itemTitle = itemTitle;
        statusBar.appendChild(itemTitle);

        let mc3 = new Hammer.Manager(fullScreenIcon);
        let Tap3 = new Hammer.Tap();
        mc3.add(Tap3);
        mc3.on("tap", (e) => {
           //Toggle FullScreen
            this.toggleFullscreen();
        });

        this._onNavigation();


        return gallery;
    }

    next () {
        if (this.index < this.content.length) {
            this.index += 1;
            this._onNavigation();
        }
    }

    previous () {
        if (this.index > 1) {
            this.index -= 1;
            this._onNavigation();
        }
    }

    toggleFullscreen () {
        this.gallery.classList.toggle("fullscreen");
        this.isFullscreen = !this.isFullscreen;
        if (this.isFullscreen) {
            document.body.addEventListener('keyup', this.onKeyUp);
        } else {
            document.body.removeEventListener('keyup', this.onKeyUp);
        }

        for (var i in this.images) {
            this._setInitialImageSize(this.images[i]);
        }
    }

    _buildGalleryItem (item) {
        let itemContainer = document.createElement('div');

        switch (item.type) {
            case "image":
                let galleryImage = document.createElement('img');
                galleryImage.src = item.url;
                itemContainer.appendChild(galleryImage);
                galleryImage.onload = (e) => {
                    this._setInitialImageSize(galleryImage);
                    console.log("Display aspect ratio", this.galleryContentContainer.offsetWidth / this.galleryContentContainer.offsetHeight);

                    console.log("Imagage aspect ratio", galleryImage.offsetWidth / galleryImage.offsetHeight, item.url);
                }
                this.images.push(galleryImage);
                // itemContainer.style.backgroundImage = "url('" + item.url + "')";

                let mc = new Hammer.Manager(itemContainer);
                var pinch = new Hammer.Pinch();
                var pan = new Hammer.Pan();
                mc.add(pinch);
                mc.add(pan);
                var startW;
                var startH;
                var startX;
                var startY;
                var imageStartX;
                var imageStartY;
                var pinchStartX;
                var pinchStartY;
                var focusPoint = {};
                mc.on("pinchstart", (e) => {
                    startW = galleryImage.offsetWidth;
                    startH = galleryImage.offsetHeight;
                    pinchStartX = galleryImage.offsetLeft;
                    pinchStartY = galleryImage.offsetTop;
                    startX = e.pointers[0].clientX;
                    startY = e.pointers[0].clientY;
                    imageStartX = galleryImage.offsetLeft;
                    imageStartY = galleryImage.offsetTop;

                    let x1 = e.pointers[0].clientX;
                    let x2 = e.pointers[1].clientX;
                    let y1 = e.pointers[0].clientY;
                    let y2 = e.pointers[1].clientY;
                    focusPoint.x = x1 + ((x2 - x1) / 2);
                    focusPoint.y = y1 + ((y2 - y1) / 2);
                });
                let pinchFn = (e) => {
                    this._resizeImage(galleryImage, (startW * e.scale), (startH * e.scale), focusPoint, pinchStartX, pinchStartY);
                };
                mc.on("pinchin", pinchFn);
                mc.on("pinchout",pinchFn);
                mc.on("panstart", (e) => {
                    startX = e.pointers[0].clientX;
                    startY = e.pointers[0].clientY;
                    imageStartX = galleryImage.offsetLeft;
                    imageStartY = galleryImage.offsetTop;
                });
                mc.on("pinchmove", (e) => {
                    this._moveImage(galleryImage, imageStartX - (startX - e.pointers[0].clientX) , imageStartY - (startY - e.pointers[0].clientY));
                });
                mc.on("panmove", (e) => {
                    this._moveImage(galleryImage, imageStartX - (startX - e.pointers[0].clientX) , imageStartY - (startY - e.pointers[0].clientY));
                });

                break;
            case "youtube":
                    let yt = document.createElement('iframe');
                    yt.setAttribute('id', "player");
                    yt.setAttribute('type', 'text/html');
                    yt.setAttribute('frameborder', '0');
                    yt.setAttribute('src', "http://www.youtube.com/embed/" + item.video_id + "?enablejsapi=1&origin=http://example.com");
                    itemContainer.appendChild(yt);
                break;
        }

        return itemContainer;
    }

    _moveImage (image, x, y) {
        //Constrain movement...
        if (image.offsetWidth > this.galleryContentContainer.offsetWidth) {
            if (x > 0) {
                x = 0;
            } else if (x < this.galleryContentContainer.offsetWidth - image.offsetWidth) {
                x = this.galleryContentContainer.offsetWidth - image.offsetWidth;
            }
        } else {
            //Don't allow it to move
            x = image.offsetLeft;
        }

        if (image.offsetHeight > this.galleryContentContainer.offsetHeight) {
            if (y > 0) {
                y = 0;
            } else if (y < this.galleryContentContainer.offsetHeight - image.offsetHeight) {
                y = this.galleryContentContainer.offsetHeight - image.offsetHeight;
            }
        } else {
            y = image.offsetTop;
        }

        //Set finalized coordinates
        image.style.left = x + "px";
        image.style.top = y + "px";
    }

    _resizeImage (image, w, h, focusPoint, startX, startY) {
        let x;
        let y;

        //Constrain Image size
        let displayAR = this.galleryContentContainer.offsetWidth / this.galleryContentContainer.offsetHeight;
        let imageAR = image.offsetWidth / image.offsetHeight;

        if (displayAR > imageAR && h < this.galleryContentContainer.offsetHeight) {
            h = this.galleryContentContainer.offsetHeight;
            w = image.offsetWidth;
        } else if (displayAR < imageAR && w < this.galleryContentContainer.offsetWidth) {
            h = image.offsetHeight;
            w = this.galleryContentContainer.offsetWidth;
        }

        //Make sure it doesn't exceed original dimensions x2
        if (h > this.galleryContentContainer.offsetHeight * 2 || w > this.galleryContentContainer.offsetWidth * 2) {
            h = image.offsetHeight;
            w = image.offsetWidth;
        }
        // console.log(focusPoint);
        let scale;
        if (displayAR > imageAR) {
            scale = (image.offsetHeight / this.galleryContentContainer.offsetHeight) - 1;
        } else {
            scale = (image.offsetWidth / this.galleryContentContainer.offsetWidth) - 1;
        }
        console.log(focusPoint, "Focus Point");
        //Recenter image with new dimensions against focus point based on zoom level
        let destination = {x: startX - ( focusPoint.x * 2), y: startY - (focusPoint.y * 2)};
        console.log(destination, "Destination");
        x = (startX + (destination.x)) * scale;
        y = (startY + (destination.y)) * scale;


        //Boundry Enforcement
        if (h < this.galleryContentContainer.offsetHeight) {
            y = (this.galleryContentContainer.offsetHeight - image.offsetHeight) / 2;
        }  else if (h > this.galleryContentContainer.offsetHeight && y > 0) {
            y = 0;
        } else if (h > this.galleryContentContainer.offsetHeight && y < 0-((h - this.galleryContentContainer.offsetHeight))) {
            y = 0-((h - this.galleryContentContainer.offsetHeight));
        }

        if (w < this.galleryContentContainer.offsetWidth) {
            x = (this.galleryContentContainer.offsetWidth - image.offsetWidth) / 2;
        } else if (w > this.galleryContentContainer.offsetWidth && x > 0) {
            x = 0;
        } else if (w > this.galleryContentContainer.offsetWidth && x < 0-((w - this.galleryContentContainer.offsetWidth))) {
            x = 0-((w - this.galleryContentContainer.offsetWidth));
        }

        image.style.display = "none";
        image.style.top = y + "px";
        image.style.left = x + "px";
        image.style.width = w + "px";
        image.style.height = h + "px";
        image.style.display = "block";
    }

    _attachEvents(galleryContentContainer) {
        var mc = new Hammer.Manager(galleryContentContainer.parentNode);
        var Swipe = new Hammer.Swipe();
        mc.add(Swipe);
        mc.on('swipeleft', (e) => {
            // this.next();
        });
        mc.on('swiperight', (e) => {
            // this.previous();
        });
    }

    _setInitialImageSize (galleryImage) {
        //Remove all dimensions styling to insure a fresh slate
        galleryImage.style.removeProperty("height");
        galleryImage.style.removeProperty("width");

        //Compare Aspect Ratios and set the size of the image
        let displayAR = this.galleryContentContainer.offsetWidth / this.galleryContentContainer.offsetHeight;
        let imageAR = galleryImage.offsetWidth / galleryImage.offsetHeight;

        if (displayAR > imageAR) {
            galleryImage.style.top = "0px";
            galleryImage.style.height = this.galleryContentContainer.offsetHeight + "px";
            galleryImage.style.left = ((this.galleryContentContainer.offsetWidth - galleryImage.offsetWidth) / 2) + "px";
        } else if (displayAR < imageAR) {
            galleryImage.style.left = "0px";
            galleryImage.style.width = this.galleryContentContainer.offsetWidth + "px";
            galleryImage.style.top = ((this.galleryContentContainer.offsetHeight - galleryImage.offsetHeight) /2) + "px";
        } else {
            galleryImage.style.top = "0px";
            galleryImage.style.left = "0px";
            galleryImage.style.height = this.galleryContentContainer.offsetHeight + "px";
            galleryImage.style.width = this.galleryContentContainer.offsetWidth + "px";
        }
    }

    _onNavigation () {
        this.navigationStatus.innerHTML = this.index + "/" + this.content.length;
        this.galleryContentContainer.style.left = (((this.index - 1) * 100) * -1) + "%";
        this.itemTitle.innerHTML = this.content[this.index - 1].title || "";
    }

    _onKeyUp (e) {
        switch (e.which) {
            case 37:
                //Left
                this.previous();
                break;
            case 39:
                //Right
                this.next();
                break;
            case 27:
                //Esp
                this.toggleFullscreen();
                break;
        }
    }
}