class ItemBuilder {
    build (item) {
        let itemContainer = document.createElement('div');
        itemContainer.appendChild(item.element);
        this._attachEvents(itemContainer, item);
        return itemContainer;
    }

    _attachEvents(itemContainer, item) {
        var mc = new Hammer.Manager(itemContainer);
        var pinch = new Hammer.Pinch();
        var pan = new Hammer.Pan();
        mc.add(pinch);
        mc.add(pan);

        var pinchStartW = 0;
        var pinchStartH = 0;
        var pinchStartX = 0;
        var pinchStartY = 0;
        var pinchStartPointerX = 0;
        var pinchStartPointerY = 0;
        var focusPoint = {};
        var pinchOffset = 0;
        var imageStartX = 0;
        var imageStartY = 0;
        var panStartX = 0;
        var panStartY = 0;

        mc.on("pinchstart", (e) => {
            pinchStartW = item.element.offsetWidth;
            pinchStartH = item.element.offsetHeight;
            pinchStartX = item.element.offsetLeft;
            pinchStartY = item.element.offsetTop;
            pinchStartPointerX = e.pointers[0].clientX;
            pinchStartPointerY = e.pointers[0].clientY;
            imageStartX = item.element.offsetLeft;
            imageStartY = item.element.offsetTop;

            let x1 = e.pointers[0].clientX;
            let x2 = e.pointers[1].clientX;
            let y1 = e.pointers[0].clientY;
            let y2 = e.pointers[1].clientY;
            focusPoint.x = x1 + ((x2 - x1) / 2);
            focusPoint.y = y1 + ((y2 - y1) / 2);
        });

        let pinchFn = (e) => {
            item.resize((pinchStartW * e.scale), (pinchStartH * e.scale), focusPoint, pinchStartX, pinchStartY, pinchOffset);
        };

        mc.on("pinchin", pinchFn);
        mc.on("pinchout",pinchFn);
        mc.on("panstart", (e) => {
            panStartX = e.pointers[0].clientX;
            panStartY = e.pointers[0].clientY;
            imageStartX = item.element.offsetLeft;
            imageStartY = item.element.offsetTop;
        });
        mc.on("pinchmove", (e) => {
            pinchOffset = {x: e.pointers[0].clientX - pinchStartPointerX,y:  e.pointers[0].clientY - pinchStartPointerY};
            // this._moveImage(galleryImage, imageStartX - (startX - e.pointers[0].clientX) , imageStartY - (startY - e.pointers[0].clientY));
        });
        mc.on("panmove", (e) => {
            item.move(imageStartX - (panStartX - e.pointers[0].clientX) , imageStartY - (panStartY - e.pointers[0].clientY));
        });
    }
}

//Singleton export
export default new ItemBuilder();