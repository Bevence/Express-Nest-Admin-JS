import { ComponentLoader, OverridableComponent } from "adminjs";
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const componentLoader = new ComponentLoader();

export const add = (url: string, componentName: string): string =>
  componentLoader.add(componentName, path.join(__dirname, url));

export const override = (
  url: string,
  componentName: OverridableComponent
): string => componentLoader.override(componentName, path.join(__dirname, url));

/**
 * Overridable components
 */
override("components/top-bar", "Version");
override("components/login", "Login");
override("components/sidebar-resource-section", "SidebarResourceSection");
override("components/sidebar-footer", "SidebarFooter");

/**
 * Common components
 */
export const DASHBOARD = add("components/dashboard", "Dashboard");
export const IMAGE_UPLOADER = add("components/image-uploader", "ImageUploader");
export const IMAGE_THUMBNAIL = add("components/thumbnail", "Thumbnail");
export const TEXT_EDITOR = add("components/text-editor", "TextEditor");
export const NUMBER_INPUT = add("components/number-input", "NumberInput");

export const VIEW_GALLERY_IMAGES = add(
  "components/gallery-view",
  "GalleryView"
);

// export const PRODUCTS_LIST = add('components/products-list', 'ProductList');
export const DONT_TOUCH_THIS_ACTION = add(
  "components/dont-touch-this-action",
  "CustomAction"
);
export const DETAILED_STATS = add("components/detailed-stats", "DetailedStats");
export const THUMB = add("components/thumb", "Thumb");

/**
 * Pages
 */
export const CUSTOM_PAGE = add("pages/custom-page", "CustomPage");
export const DESIGN_SYSTEM_PAGE = add(
  "pages/design-system-examples/index",
  "DesignSystemPage"
);

export default componentLoader;
