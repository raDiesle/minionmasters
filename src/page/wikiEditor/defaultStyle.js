export default {
  control: {
    backgroundColor: "#000",
    fontSize: 14,
    fontWeight: "normal",
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace",
      minHeight: 200,
      maxWidth: 1000,
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: 9,
      border: "1px solid silver",
    },
  },

  "&singleLine": {
    display: "inline-block",
    width: 180,

    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
      border: "2px inset",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "#000",
      border: "1px solid yellow",
      fontSize: 14,
      display: "flex",
      flexWrap: "wrap",
    },
    item: {
      padding: "0px 0px",
      borderBottom: "1px solid #fff",
      "&focused": {
        backgroundColor: "#444",
      },
    },
  },
};
