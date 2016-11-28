/**
 * Created by Kyle on 2016-11-28.
 */

import ImageItem from "./ImageItem.js";
import YouTubeItem from "./YouTubeItem.js";

class ItemFactory {
    build (itemStub) {
        switch (itemStub.type) {
            case "image":
                return new ImageItem(itemStub.title, itemStub.url);
                break;
            case "youtube":
                return new YouTubeItem(itemStub.title, itemStub.video_id, itemStub.player_vars);
                break;
            default:
                throw new TypeError("Item Stub Type is an invalid type!");
                break;
        }
    }
}

export default new ItemFactory();