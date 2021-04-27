const FourthLevel = [
  {
    id: 1,
    x1: 75,
    get x2() {
      return this.x1 + 150;
    },

    y1: 150,

    type: "keyBlock",
    direction: "horizontal",
  },
  {
    id: 2,
    x1: 225,

    y1: 150,

    get y3() {
      return this.y1 + 150;
    },

    type: "blocker",
    direction: "vertical",
  },
  {
    id: 3,
    x1: 300,

    y1: 150,

    get y3() {
      return this.y1 + 150;
    },

    type: "blocker",
    direction: "vertical",
  },
  {
    id: 4,
    x1: 0,
    get x2() {
      return this.x1 + 150;
    },

    y1: 300,

    type: "blocker",
    direction: "horizontal",
  },
  {
    id: 5,
    x1: 225,
    get x2() {
      return this.x1 + 150;
    },

    y1: 300,

    type: "blocker",
    direction: "horizontal",
  },
  {
    id: 6,
    x1: 225,
    get x2() {
      return this.x1 + 150;
    },

    y1: 75,

    type: "blocker",
    direction: "horizontal",
  },
  {
    id: 7,
    x1: 150,

    y1: 0,

    get y3() {
      return this.y1 + 150;
    },

    type: "blocker",
    direction: "vertical",
  },
  {
    id: 8,
    x1: 0,

    y1: 150,

    get y3() {
      return this.y1 + 150;
    },

    type: "blocker",
    direction: "vertical",
  },
  {
    id: 9,
    x1: 0,
    get x2() {
      return this.x1 + 150;
    },

    y1: 0,

    type: "blocker",
    direction: "horizontal",
  },
];

export default FourthLevel;
