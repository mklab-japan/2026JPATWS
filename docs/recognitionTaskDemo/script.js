// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.Download",
      "filePrefix": "study",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "",
    "description": "",
    "repository": "",
    "contributors": ""
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "content": "これから，単語を覚えていただき，その後，記憶テストを行っていただきます。\n準備ができた方は「はじめる」をクリックしてください。"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "はじめる",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
window.listA = [
  "リンゴ",
  "オレンジ",
  "スイカ"
]

window.listB = [
  "ブドウ",
  "モモ",
  "イチゴ"
]

window.condition =
  this.random.choice(["A", "B"])

if (window.condition === "A") {
  window.oldItems = window.listA
  window.newItems = window.listB
} else {
  window.oldItems = window.listB
  window.newItems = window.listA
}
}
      },
      "title": "Instruction"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [],
      "sample": {
        "mode": "draw-shuffle"
      },
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
const parameters = []

for (const item of window.oldItems) {
  parameters.push({
    item: item
  })
}

this.options.templateParameters = parameters
}
      },
      "title": "LearningPhase",
      "tardy": true,
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {
          "": ""
        },
        "parameters": {},
        "messageHandlers": {},
        "title": "Trial",
        "content": [
          {
            "type": "lab.html.Page",
            "items": [
              {
                "required": true,
                "type": "html",
                "content": "\u003Cdiv class = \"content-horizontal-center\"\u003E\n  \u003Ch1\u003E${this.parameters.item}\u003C\u002Fh1\u003E\n\u003C\u002Fdiv\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "LearningItem",
            "timeout": "1000"
          }
        ]
      }
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [],
      "sample": {
        "mode": "draw-shuffle"
      },
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {
        "before:prepare": function anonymous(
) {
const recognitionItems = []

for (const item of window.oldItems) {
  recognitionItems.push({
    item: item,
    itemType: "old"
  })
}

for (const item of window.newItems) {
  recognitionItems.push({
    item: item,
    itemType: "new"
  })
}

const shuffledItems =
  this.random.shuffle(recognitionItems)

this.options.templateParameters = shuffledItems
}
      },
      "title": "TestPhase",
      "tardy": true,
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {
          "": ""
        },
        "parameters": {},
        "messageHandlers": {},
        "title": "Trial",
        "content": [
          {
            "type": "lab.html.Page",
            "items": [
              {
                "required": true,
                "type": "html",
                "content": "\u003Cdiv class = \"content-horizontal-center\"\u003E\n  \u003Ch1\u003E${this.parameters.item}\u003C\u002Fh1\u003E\n\u003C\u002Fdiv\u003E\n\u003Cdiv class = \"content-horizontal-space-between\"\u003E\n  \u003Cbutton id = \"oldBtn\"\u003E見た\u003C\u002Fbutton\u003E\u003Cbutton id = \"newBtn\"\u003E見ていない\u003C\u002Fbutton\u003E\n\u003C\u002Fdiv\u003E",
                "name": ""
              }
            ],
            "scrollTop": true,
            "submitButtonText": "Continue →",
            "submitButtonPosition": "hidden",
            "files": {},
            "responses": {
              "click button#oldBtn": "old",
              "click button#newBtn": "new"
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "TestItem",
            "correctResponse": "${this.parameters.itemType}"
          }
        ]
      }
    }
  ]
})

// Let's go!
study.run()