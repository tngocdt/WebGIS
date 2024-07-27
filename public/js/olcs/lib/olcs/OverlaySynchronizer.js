import SynchronizedOverlay from "./SynchronizedOverlay.js";
import { getUid } from "./util.js";
import { unByKey as olObservableUnByKey } from 'ol/Observable.js';
export default class OverlaySynchronizer {
    map;
    scene;
    overlayCollection_;
    overlayContainerStopEvent_;
    overlayContainer_;
    overlayMap_ = new Map();
    overlayEvents = ['click', 'dblclick', 'mousedown', 'touchstart', 'pointerdown', 'mousewheel', 'wheel'];
    listenerKeys_ = [];
    /**
    * @param map
    * @param scene
    * @constructor
    * @api
    */
    constructor(map, scene) {
        this.map = map;
        this.scene = scene;
        this.map = map;
        this.overlayCollection_ = this.map.getOverlays();
        this.scene = scene;
        this.overlayContainerStopEvent_ = document.createElement('div');
        this.overlayContainerStopEvent_.className = 'ol-overlaycontainer-stopevent';
        this.overlayEvents.forEach((name) => {
            this.overlayContainerStopEvent_.addEventListener(name, evt => evt.stopPropagation());
        });
        this.scene.canvas.parentElement.appendChild(this.overlayContainerStopEvent_);
        this.overlayContainer_ = document.createElement('div');
        this.overlayContainer_.className = 'ol-overlaycontainer';
        this.scene.canvas.parentElement.appendChild(this.overlayContainer_);
    }
    /**
    * Get the element that serves as a container for overlays that don't allow
    * event propagation. Elements added to this container won't let mousedown and
    * touchstart events through to the map, so clicks and gestures on an overlay
    * don't trigger any {@link ol.MapBrowserEvent}.
    * @return The map's overlay container that stops events.
    */
    getOverlayContainerStopEvent() {
        return this.overlayContainerStopEvent_;
    }
    /**
    * Get the element that serves as a container for overlays.
    * @return The map's overlay container.
    */
    getOverlayContainer() {
        return this.overlayContainer_;
    }
    /**
    * Destroy all and perform complete synchronization of the overlays.
    * @api
    */
    synchronize() {
        this.destroyAll();
        this.overlayCollection_.forEach((overlay) => { this.addOverlay(overlay); });
        this.listenerKeys_.push(this.overlayCollection_.on('add', (evt) => this.addOverlay(evt.element)));
        this.listenerKeys_.push(this.overlayCollection_.on('remove', (evt) => this.removeOverlay(evt.element)));
    }
    /**
    * @api
    */
    addOverlay(overlay) {
        if (!overlay) {
            return;
        }
        const cesiumOverlay = new SynchronizedOverlay({
            scene: this.scene,
            synchronizer: this,
            parent: overlay
        });
        this.overlayMap_.set(getUid(overlay), cesiumOverlay);
    }
    /**
    * Removes an overlay from the scene
    * @api
    */
    removeOverlay(overlay) {
        const overlayId = getUid(overlay);
        const csOverlay = this.overlayMap_.get(overlayId);
        if (csOverlay) {
            csOverlay.destroy();
            this.overlayMap_.delete(overlayId);
        }
    }
    /**
    * Destroys all the created Cesium objects.
    */
    destroyAll() {
        this.overlayMap_.forEach((overlay) => {
            overlay.destroy();
        });
        this.overlayMap_.clear();
        olObservableUnByKey(this.listenerKeys_);
        this.listenerKeys_.length = 0;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9vbGNzL092ZXJsYXlTeW5jaHJvbml6ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyw0QkFBeUI7QUFDdkQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQVU7QUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDNUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUM7SUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNYLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNiLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2pDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLENBQUMsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFO0lBQ0EsQ0FBQyxDQUFDO0lBQ0YsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDO0lBQ0EsQ0FBQyxDQUFDO0lBQ0YsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQztJQUNBLENBQUMsQ0FBQztJQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNWLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNHO0lBQ0EsQ0FBQyxDQUFDO0lBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2hCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVjtRQUNBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQ7SUFDQSxDQUFDLENBQUM7SUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNuQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEM7SUFDSjtJQUNBLENBQUMsQ0FBQztJQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNsQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDakM7QUFDSiIsImZpbGUiOiJsaWIvb2xjcy9PdmVybGF5U3luY2hyb25pemVyLmpzLm1hcCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTeW5jaHJvbml6ZWRPdmVybGF5IGZyb20gJy4vU3luY2hyb25pemVkT3ZlcmxheSc7XG5pbXBvcnQgeyBnZXRVaWQgfSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHsgdW5CeUtleSBhcyBvbE9ic2VydmFibGVVbkJ5S2V5IH0gZnJvbSAnb2wvT2JzZXJ2YWJsZS5qcyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPdmVybGF5U3luY2hyb25pemVyIHtcbiAgICBtYXA7XG4gICAgc2NlbmU7XG4gICAgb3ZlcmxheUNvbGxlY3Rpb25fO1xuICAgIG92ZXJsYXlDb250YWluZXJTdG9wRXZlbnRfO1xuICAgIG92ZXJsYXlDb250YWluZXJfO1xuICAgIG92ZXJsYXlNYXBfID0gbmV3IE1hcCgpO1xuICAgIG92ZXJsYXlFdmVudHMgPSBbJ2NsaWNrJywgJ2RibGNsaWNrJywgJ21vdXNlZG93bicsICd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNld2hlZWwnLCAnd2hlZWwnXTtcbiAgICBsaXN0ZW5lcktleXNfID0gW107XG4gICAgLyoqXG4gICAgKiBAcGFyYW0gbWFwXG4gICAgKiBAcGFyYW0gc2NlbmVcbiAgICAqIEBjb25zdHJ1Y3RvclxuICAgICogQGFwaVxuICAgICovXG4gICAgY29uc3RydWN0b3IobWFwLCBzY2VuZSkge1xuICAgICAgICB0aGlzLm1hcCA9IG1hcDtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgICAgICB0aGlzLm1hcCA9IG1hcDtcbiAgICAgICAgdGhpcy5vdmVybGF5Q29sbGVjdGlvbl8gPSB0aGlzLm1hcC5nZXRPdmVybGF5cygpO1xuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgICAgIHRoaXMub3ZlcmxheUNvbnRhaW5lclN0b3BFdmVudF8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5vdmVybGF5Q29udGFpbmVyU3RvcEV2ZW50Xy5jbGFzc05hbWUgPSAnb2wtb3ZlcmxheWNvbnRhaW5lci1zdG9wZXZlbnQnO1xuICAgICAgICB0aGlzLm92ZXJsYXlFdmVudHMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vdmVybGF5Q29udGFpbmVyU3RvcEV2ZW50Xy5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGV2dCA9PiBldnQuc3RvcFByb3BhZ2F0aW9uKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zY2VuZS5jYW52YXMucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXlDb250YWluZXJTdG9wRXZlbnRfKTtcbiAgICAgICAgdGhpcy5vdmVybGF5Q29udGFpbmVyXyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLm92ZXJsYXlDb250YWluZXJfLmNsYXNzTmFtZSA9ICdvbC1vdmVybGF5Y29udGFpbmVyJztcbiAgICAgICAgdGhpcy5zY2VuZS5jYW52YXMucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXlDb250YWluZXJfKTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXQgdGhlIGVsZW1lbnQgdGhhdCBzZXJ2ZXMgYXMgYSBjb250YWluZXIgZm9yIG92ZXJsYXlzIHRoYXQgZG9uJ3QgYWxsb3dcbiAgICAqIGV2ZW50IHByb3BhZ2F0aW9uLiBFbGVtZW50cyBhZGRlZCB0byB0aGlzIGNvbnRhaW5lciB3b24ndCBsZXQgbW91c2Vkb3duIGFuZFxuICAgICogdG91Y2hzdGFydCBldmVudHMgdGhyb3VnaCB0byB0aGUgbWFwLCBzbyBjbGlja3MgYW5kIGdlc3R1cmVzIG9uIGFuIG92ZXJsYXlcbiAgICAqIGRvbid0IHRyaWdnZXIgYW55IHtAbGluayBvbC5NYXBCcm93c2VyRXZlbnR9LlxuICAgICogQHJldHVybiBUaGUgbWFwJ3Mgb3ZlcmxheSBjb250YWluZXIgdGhhdCBzdG9wcyBldmVudHMuXG4gICAgKi9cbiAgICBnZXRPdmVybGF5Q29udGFpbmVyU3RvcEV2ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5Q29udGFpbmVyU3RvcEV2ZW50XztcbiAgICB9XG4gICAgLyoqXG4gICAgKiBHZXQgdGhlIGVsZW1lbnQgdGhhdCBzZXJ2ZXMgYXMgYSBjb250YWluZXIgZm9yIG92ZXJsYXlzLlxuICAgICogQHJldHVybiBUaGUgbWFwJ3Mgb3ZlcmxheSBjb250YWluZXIuXG4gICAgKi9cbiAgICBnZXRPdmVybGF5Q29udGFpbmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5Q29udGFpbmVyXztcbiAgICB9XG4gICAgLyoqXG4gICAgKiBEZXN0cm95IGFsbCBhbmQgcGVyZm9ybSBjb21wbGV0ZSBzeW5jaHJvbml6YXRpb24gb2YgdGhlIG92ZXJsYXlzLlxuICAgICogQGFwaVxuICAgICovXG4gICAgc3luY2hyb25pemUoKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveUFsbCgpO1xuICAgICAgICB0aGlzLm92ZXJsYXlDb2xsZWN0aW9uXy5mb3JFYWNoKChvdmVybGF5KSA9PiB7IHRoaXMuYWRkT3ZlcmxheShvdmVybGF5KTsgfSk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJLZXlzXy5wdXNoKHRoaXMub3ZlcmxheUNvbGxlY3Rpb25fLm9uKCdhZGQnLCAoZXZ0KSA9PiB0aGlzLmFkZE92ZXJsYXkoZXZ0LmVsZW1lbnQpKSk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJLZXlzXy5wdXNoKHRoaXMub3ZlcmxheUNvbGxlY3Rpb25fLm9uKCdyZW1vdmUnLCAoZXZ0KSA9PiB0aGlzLnJlbW92ZU92ZXJsYXkoZXZ0LmVsZW1lbnQpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICogQGFwaVxuICAgICovXG4gICAgYWRkT3ZlcmxheShvdmVybGF5KSB7XG4gICAgICAgIGlmICghb3ZlcmxheSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNlc2l1bU92ZXJsYXkgPSBuZXcgU3luY2hyb25pemVkT3ZlcmxheSh7XG4gICAgICAgICAgICBzY2VuZTogdGhpcy5zY2VuZSxcbiAgICAgICAgICAgIHN5bmNocm9uaXplcjogdGhpcyxcbiAgICAgICAgICAgIHBhcmVudDogb3ZlcmxheVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vdmVybGF5TWFwXy5zZXQoZ2V0VWlkKG92ZXJsYXkpLCBjZXNpdW1PdmVybGF5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgKiBSZW1vdmVzIGFuIG92ZXJsYXkgZnJvbSB0aGUgc2NlbmVcbiAgICAqIEBhcGlcbiAgICAqL1xuICAgIHJlbW92ZU92ZXJsYXkob3ZlcmxheSkge1xuICAgICAgICBjb25zdCBvdmVybGF5SWQgPSBnZXRVaWQob3ZlcmxheSk7XG4gICAgICAgIGNvbnN0IGNzT3ZlcmxheSA9IHRoaXMub3ZlcmxheU1hcF8uZ2V0KG92ZXJsYXlJZCk7XG4gICAgICAgIGlmIChjc092ZXJsYXkpIHtcbiAgICAgICAgICAgIGNzT3ZlcmxheS5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlNYXBfLmRlbGV0ZShvdmVybGF5SWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogRGVzdHJveXMgYWxsIHRoZSBjcmVhdGVkIENlc2l1bSBvYmplY3RzLlxuICAgICovXG4gICAgZGVzdHJveUFsbCgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5TWFwXy5mb3JFYWNoKChvdmVybGF5KSA9PiB7XG4gICAgICAgICAgICBvdmVybGF5LmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3ZlcmxheU1hcF8uY2xlYXIoKTtcbiAgICAgICAgb2xPYnNlcnZhYmxlVW5CeUtleSh0aGlzLmxpc3RlbmVyS2V5c18pO1xuICAgICAgICB0aGlzLmxpc3RlbmVyS2V5c18ubGVuZ3RoID0gMDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lUM1psY214aGVWTjVibU5vY205dWFYcGxjaTVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpNHVMeTR1TDNOeVl5OXZiR056TDA5MlpYSnNZWGxUZVc1amFISnZibWw2WlhJdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRMEVzVDBGQlR5eHRRa0ZCYlVJc1RVRkJUU3gxUWtGQmRVSXNRMEZCUXp0QlFVTjRSQ3hQUVVGUExFVkJRVU1zVFVGQlRTeEZRVUZETEUxQlFVMHNVVUZCVVN4RFFVRkRPMEZCUnpsQ0xFOUJRVThzUlVGQlF5eFBRVUZQTEVsQlFVa3NiVUpCUVcxQ0xFVkJRVU1zVFVGQlRTeHJRa0ZCYTBJc1EwRkJRenRCUVVkb1JTeE5RVUZOTEVOQlFVTXNUMEZCVHl4UFFVRlBMRzFDUVVGdFFqdEpRV05vUWp0SlFVRnpRanRKUVdKd1F5eHJRa0ZCYTBJc1EwRkJjMEk3U1VGRGVFTXNNRUpCUVRCQ0xFTkJRV2xDTzBsQlF6TkRMR2xDUVVGcFFpeERRVUZwUWp0SlFVTnNReXhYUVVGWExFZEJRWEZETEVsQlFVa3NSMEZCUnl4RlFVRkZMRU5CUVVNN1NVRkRNVVFzWVVGQllTeEhRVUZITEVOQlFVTXNUMEZCVHl4RlFVRkZMRlZCUVZVc1JVRkJSU3hYUVVGWExFVkJRVVVzV1VGQldTeEZRVUZGTEdGQlFXRXNSVUZCUlN4WlFVRlpMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03U1VGRGRrY3NZVUZCWVN4SFFVRm5RaXhGUVVGRkxFTkJRVU03U1VGRmVFTTdPenM3TzAxQlMwVTdTVUZEUml4WlFVRnpRaXhIUVVGVkxFVkJRVmtzUzBGQldUdFJRVUZzUXl4UlFVRkhMRWRCUVVnc1IwRkJSeXhEUVVGUE8xRkJRVmtzVlVGQlN5eEhRVUZNTEV0QlFVc3NRMEZCVHp0UlFVTjBSQ3hKUVVGSkxFTkJRVU1zUjBGQlJ5eEhRVUZITEVkQlFVY3NRMEZCUXp0UlFVTm1MRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNSMEZCUnl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExGZEJRVmNzUlVGQlJTeERRVUZETzFGQlEycEVMRWxCUVVrc1EwRkJReXhMUVVGTExFZEJRVWNzUzBGQlN5eERRVUZETzFGQlEyNUNMRWxCUVVrc1EwRkJReXd3UWtGQk1FSXNSMEZCUnl4UlFVRlJMRU5CUVVNc1lVRkJZU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzFGQlEyaEZMRWxCUVVrc1EwRkJReXd3UWtGQk1FSXNRMEZCUXl4VFFVRlRMRWRCUVVjc0swSkJRU3RDTEVOQlFVTTdVVUZETlVVc1NVRkJTU3hEUVVGRExHRkJRV0VzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1JVRkJSVHRaUVVOc1F5eEpRVUZKTEVOQlFVTXNNRUpCUVRCQ0xFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1NVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4RFFVRkRMR1ZCUVdVc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRGRrWXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4aFFVRmhMRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5d3dRa0ZCTUVJc1EwRkJReXhEUVVGRE8xRkJSVGRGTEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUjBGQlJ5eFJRVUZSTEVOQlFVTXNZVUZCWVN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xRkJRM1pFTEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eFRRVUZUTEVkQlFVY3NjVUpCUVhGQ0xFTkJRVU03VVVGRGVrUXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zWVVGQllTeERRVUZETEZkQlFWY3NRMEZCUXl4SlFVRkpMRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNRMEZCUXp0SlFVTjBSU3hEUVVGRE8wbEJSVVE3T3pzN096dE5RVTFGTzBsQlEwWXNORUpCUVRSQ08xRkJRekZDTEU5QlFVOHNTVUZCU1N4RFFVRkRMREJDUVVFd1FpeERRVUZETzBsQlEzcERMRU5CUVVNN1NVRkZSRHM3TzAxQlIwVTdTVUZEUml4dFFrRkJiVUk3VVVGRGFrSXNUMEZCVHl4SlFVRkpMRU5CUVVNc2FVSkJRV2xDTEVOQlFVTTdTVUZEYUVNc1EwRkJRenRKUVVWRU96czdUVUZIUlR0SlFVTkdMRmRCUVZjN1VVRkRWQ3hKUVVGSkxFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdVVUZEYkVJc1NVRkJTU3hEUVVGRExHdENRVUZyUWl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRExFOUJRVThzUlVGQlJTeEZRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMUZCUXpWRkxFbEJRVWtzUTBGQlF5eGhRVUZoTEVOQlFVTXNTVUZCU1N4RFFVTnVRaXhKUVVGSkxFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1JVRkJSU3hEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETEVkQlFUWkNMRVZCUVVVc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRExFTkJRM0pITEVOQlFVTTdVVUZEUml4SlFVRkpMRU5CUVVNc1lVRkJZU3hEUVVGRExFbEJRVWtzUTBGRGJrSXNTVUZCU1N4RFFVRkRMR3RDUVVGclFpeERRVUZETEVWQlFVVXNRMEZCUXl4UlFVRlJMRVZCUVVVc1EwRkJReXhIUVVFMlFpeEZRVUZGTEVWQlFVVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1lVRkJZU3hEUVVGRExFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXl4RFFVTXpSeXhEUVVGRE8wbEJRMG9zUTBGQlF6dEpRVWRFT3p0TlFVVkZPMGxCUTBZc1ZVRkJWU3hEUVVGRExFOUJRV2RDTzFGQlEzcENMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF6dFpRVU5pTEU5QlFVODdVVUZEVkN4RFFVRkRPMUZCUTBRc1RVRkJUU3hoUVVGaExFZEJRVWNzU1VGQlNTeHRRa0ZCYlVJc1EwRkJRenRaUVVNMVF5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRXRCUVVzN1dVRkRha0lzV1VGQldTeEZRVUZGTEVsQlFVazdXVUZEYkVJc1RVRkJUU3hGUVVGRkxFOUJRVTg3VTBGRGFFSXNRMEZCUXl4RFFVRkRPMUZCUlVnc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRkxHRkJRV0VzUTBGQlF5eERRVUZETzBsQlEzWkVMRU5CUVVNN1NVRkhSRHM3TzAxQlIwVTdTVUZEUml4aFFVRmhMRU5CUVVNc1QwRkJaMEk3VVVGRE5VSXNUVUZCVFN4VFFVRlRMRWRCUVVjc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlEyeERMRTFCUVUwc1UwRkJVeXhIUVVGSExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNSMEZCUnl4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRE8xRkJRMnhFTEVsQlFVa3NVMEZCVXl4RlFVRkZMRU5CUVVNN1dVRkRaQ3hUUVVGVExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdXVUZEY0VJc1NVRkJTU3hEUVVGRExGZEJRVmNzUTBGQlF5eE5RVUZOTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1VVRkRja01zUTBGQlF6dEpRVU5JTEVOQlFVTTdTVUZGUkRzN1RVRkZSVHRKUVVOUkxGVkJRVlU3VVVGRGJFSXNTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF5eFBRVUUwUWl4RlFVRkZMRVZCUVVVN1dVRkRlRVFzVDBGQlR5eERRVUZETEU5QlFVOHNSVUZCUlN4RFFVRkRPMUZCUTNCQ0xFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEwZ3NTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJReXhMUVVGTExFVkJRVVVzUTBGQlF6dFJRVU42UWl4dFFrRkJiVUlzUTBGQlF5eEpRVUZKTEVOQlFVTXNZVUZCWVN4RFFVRkRMRU5CUVVNN1VVRkRlRU1zU1VGQlNTeERRVUZETEdGQlFXRXNRMEZCUXl4TlFVRk5MRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRMmhETEVOQlFVTTdRMEZEUmlKOSJdfQ==