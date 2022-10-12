import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      popupStyle: "popup/getPopupStyle",
      popupContent: "popup/getPopupContent",
      popupItems: "popup/getPopupOrder",
    }),
  },
  methods: {
    generatePopup() {
      // Create CSS File
      const css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = `.pt_popup,.pt_popup_input_submit{text-align:center;width:100%;color:#fff}@keyframes fadeIn{0%{opacity:0;visibility:hidden;transform:translateY(20px)}100%{opacity:1;visibility:visible;transform:translateY(0)}}.pt_popup{animation:1s linear 1s forwards fadeIn;opacity:0;visibility:hidden;position:relative;border-radius:100%;max-width:500px;aspect-ratio:1;display:flex;justify-content:center;padding-top:calc($popup-size * .15)}.pt_popup_content{max-width:60%}.pt_popup_content>:not(:last-child){margin-bottom:20px}.pt_popup_icons{display:flex;align-items:center;justify-content:center}.pt_popup_icons.icons-top>svg:nth-child(2):not(:last-child){transform:scale(1.6) translateY(-8px)}.pt_popup_icons.icons-bottom>svg:nth-child(2):not(:last-child){transform:scale(1.6) translateY(8px)}.pt_popup_icons>svg{transform:scale(1.2);transform-origin:center}.pt_popup_icons>svg:nth-child(2):not(:last-child){transform:scale(1.6)}.pt_popup_icons>svg:not(:last-child){margin-right:30px}.pt_popup_title{font-size:24px;font-weight:600}.pt_popup_input_submit{cursor:pointer;text-transform:uppercase;padding:12px 10px;font-size:12px;border-radius:10px;display:block;font-weight:600;background:#000;border:1px solid transparent}@media only screen and (max-width:768px){.pt_popup{padding-top:calc($popup-size * .15)}.pt_popup_content{max-width:65%}.pt_popup_title{font-size:22px}}@media only screen and (max-width:480px){.pt_popup{padding-top:calc($popup-size * .07)}.pt_popup_content{max-width:60%}.pt_popup_title{font-size:18px}}`;
      document.getElementsByTagName("head")[0].appendChild(css);

      // Create a element with params
      function createElement(elementObj) {
        const { elem, className, style, innerHTML, placeholder, type } =
          elementObj;
        let element = document.createElement(elem);
        Object.assign(element, {
          className: className || "",
          style: style || "",
          innerHTML: innerHTML || "",
          placeholder: placeholder || "",
          type: type || "",
        });
        return element;
      }

      let star = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="${this.popupStyle.content.stars}" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"></path>
        </svg>`;

      // Popup Wrapper
      let popup = createElement({
        elem: "DIV",
        className: "pt_popup",
        style: `background-color: ${this.popupStyle.body.bgColor}`,
      });
      const children = [
        {
          id: "pt-icons",
          item: () => {
            const container = createElement({
              elem: "DIV",
              className: "icons-top pt_popup_icons",
            });
            for (let i = 0; i < this.popupContent.stars; i++) {
              container.innerHTML += star;
            }
            return container;
          },
        },
        {
          id: "pt-heading",
          item: () => {
            return createElement({
              elem: "H2",
              className: "pt_popup_title",
              style: `color: ${this.popupStyle.content.heading}`,
              innerHTML: this.popupContent.heading,
            });
          },
        },
        {
          id: "pt-input",
          item: () => {
            return createElement({
              elem: "INPUT",
              type: "text",
              className: "pt_popup_input form-control",
              style: `
              background-color: ${this.popupStyle.form.input};
              color: ${this.popupStyle.form.inputText};
            `,
              placeholder: this.popupContent.emailPlaceholder,
            });
          },
        },
        {
          id: "pt-button",
          item: () => {
            return createElement({
              elem: "BUTTON",
              type: "submit",
              className: "pt_popup_input_submit",
              style: `background-color: ${this.popupStyle.form.btn};`,
              innerHTML: this.popupContent.btnText,
            });
          },
        },
        {
          id: "pt-footer",
          item: () => {
            return createElement({
              elem: "p",
              style: `color: ${this.popupStyle.content.text};`,
              innerHTML: this.popupContent.footerText,
            });
          },
        },
      ];

      // Popup Inner
      let popupContent = createElement({
        elem: "DIV",
        className: "pt_popup_content",
      });
      [...children]
        .map((t1) => ({
          ...t1,
          ...this.popupItems.find((t2) => t2.id === t1.id),
        }))
        .sort((a, b) => a.order - b.order)
        .forEach((e) => {
          popupContent.appendChild(e.item());
        });
      popup.appendChild(popupContent);
      return popup;
    },
  },
};