import { decorate, observable, action, configure } from "mobx";
import debounce from "lodash/debounce";

import response from "./data.json";

configure({ enforceActions: "observed" });

class Store {
  searchKeyword = "";
  response = [];
  data = [];
  loading = false;
  isSearchFilterActive = false;
  newEntryMode = false;
  selectedType = "ALL";

  handleSearch(keyword) {
    this.searchKeyword = keyword;
    if (keyword === "") {
      this.isSearchFilterActive = false;
    } else {
      this.isSearchFilterActive = true;
    }

    this.debouncedFetch();
  }

  handleMenu(type) {
    this.newEntryMode = false;
    this.selectedType = type;

    this.searchKeyword = "";

    this.debouncedFetch();
  }

  setNewEntryMode() {
    this.newEntryMode = true;
  }

  //sidebar controller
  filterByType(type) {
    let container;

    switch (type) {
      case "ALL":
        container = this.response;
        break;
      case "REST":
        container = this.response.filter(item => item.type === "REST");
        break;
      case "SOAP":
        container = this.response.filter(item => item.type === "SOAP");
        break;
      default:
        break;
    }

    return container;
  }

  //search controller
  filterByKeyword(data) {
    let container = data.filter(val => {
      console.log(val);
      return (
        val.name.toLocaleLowerCase("en-EN").includes(this.searchKeyword) ||
        (val.owner &&
          val.owner.toLocaleLowerCase("en-EN").includes(this.searchKeyword)) ||
        (val.squad &&
          val.squad.toLocaleLowerCase("en-EN").includes(this.searchKeyword)) ||
        val.endpoint.toLocaleLowerCase("en-EN").includes(this.searchKeyword) ||
        val.type.toLocaleLowerCase("en-EN").includes(this.searchKeyword) ||
        JSON.stringify(JSON.parse(val.response))
          .toLocaleLowerCase("en-EN")
          .includes(this.searchKeyword)
      );
    });

    return container;
  }

  //data fetching logic
  fetchData() {
    this.response = response.data;
    this.data = this.filterByType(this.selectedType);

    if (this.isSearchFilterActive) {
      this.data = this.filterByKeyword(this.data);
    }
  }

  //to prevent a request at every typing action
  debouncedFetch = debounce(this.fetchData, 1000);

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }
}

decorate(Store, {
  searchKeyword: observable,
  newEntryMode: observable,
  setNewEntryMode: action,
  selectedType: observable,
  response: observable,
  filterByType: action,
  handleSearch: action,
  handleMenu: action,
  loading: observable,
  data: observable,
  fetchData: action,
  showLoader: action,
  hideLoader: action
});

const appStore = new Store();

export default appStore;
