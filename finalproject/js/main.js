import { setupNavigation } from "./navigation.js";
import { loadServices } from "./services.js";
import { setupFooter } from "./footer.js";

setupNavigation();
setupFooter();

// Only run services page script if container exists
if (document.querySelector("#servicesContainer")) {
  loadServices();
}
