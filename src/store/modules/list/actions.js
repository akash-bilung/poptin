import axios from "axios";

export default {
  async fetchItems({ commit }) {
    try {
      const { data } = await axios.get("/popups?sort=createdAt:DESC");
      const items = (data || {}).data || {};
      commit("setItems", items);
    } catch (error) {
      return error;
    }
  },
  async createItem({ rootGetters }, { Slug, Name, Code }) {
    const data = {
      popupStyle: rootGetters["popup/getPopupStyle"],
      popupContent: rootGetters["popup/getPopupContent"],
      popupItems: rootGetters["popup/getPopupOrder"],
    };

    const paramObj = {
      Name,
      Slug,
      Style: this.popupStyle,
      Content: this.popupContent,
      Order: this.popupItems,
      Code,
    };
    paramObj.Code = `(function(){
      let e = ${JSON.stringify(data)}
      ${paramObj.Code.replace("function(){const", "function initFunc(){const")}
      initFunc()
    })();`;

    try {
      const { data } = await axios.post("/popups", {
        data: paramObj,
      });
      const { Code: snippet, Slug: fileTitle } =
        ((data || {}).data || {}).attributes || {};

      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        "/process-form.php",
        { snippet, fileTitle: `${fileTitle}.js`, popupName: this.popupName },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          baseURL: "https://proj-021.azurewebsites.net",
        }
      );
      return { isSuccess: true };
    } catch (error) {
      return { isSuccess: false, message: error.message };
    }
  },
};
