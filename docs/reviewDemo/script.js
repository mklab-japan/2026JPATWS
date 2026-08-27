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

// 初回再認で誤答した項目を保存する配列
window.incorrectItems = []
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
            "messageHandlers": {
              "after:end": function anonymous(
) {
// 正誤判定はCorrect responseと実際のresponseから自動的に作られます
if (this.data.correct === false) {
  window.incorrectItems.push({
    item: this.parameters.item,
    itemType: this.parameters.itemType
  })
}
}
            },
            "title": "TestItem",
            "correctResponse": "${this.parameters.itemType}"
          }
        ]
      }
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "required": true,
          "type": "html",
          "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cdiv\u003E\n  \u003Ch2\u003E誤答した項目を復習します\u003C\u002Fh2\u003E\n  \u003Cp\u003E初回の記憶テストで誤答した項目は \u003Cstrong\u003E${window.incorrectItems.length}項目\u003C\u002Fstrong\u003E でした。\u003C\u002Fp\u003E\n  \u003Cp\u003Eこれから，誤答した項目だけについて正しい答えを確認します。\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E",
          "name": ""
        }
      ],
      "scrollTop": true,
      "submitButtonText": "復習を始める",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "ReviewInstruction",
      "skip": "${window.incorrectItems.length === 0}"
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
// 初回再認で誤答した項目だけを復習に使います
const reviewItems = []

for (const item of window.incorrectItems) {
  reviewItems.push({
    item: item.item,
    itemType: item.itemType,
    correctLabel: item.itemType === "old" ? "見た" : "見ていない"
  })
}

this.options.templateParameters = reviewItems
}
      },
      "title": "ReviewPhase",
      "tardy": true,
      "skip": "${window.incorrectItems.length === 0}",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {
          "": ""
        },
        "parameters": {},
        "messageHandlers": {},
        "title": "ReviewTrial",
        "content": [
          {
            "type": "lab.html.Page",
            "items": [
              {
                "required": true,
                "type": "html",
                "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cdiv style=\"text-align:center;\"\u003E\n  \u003Ch1\u003E${this.parameters.item}\u003C\u002Fh1\u003E\n  \u003Cp style=\"margin-top:2rem; font-size:1.4rem;\"\u003E正しい答え：\u003Cstrong\u003E${this.parameters.correctLabel}\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E",
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
            "title": "ReviewItem",
            "timeout": "1800"
          }
        ]
      }
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "required": true,
          "type": "html",
          "content": "\u003Cdiv class=\"content-horizontal-center\"\u003E\u003Cdiv style=\"text-align:center;\"\u003E\n  \u003Ch2\u003E終了です\u003C\u002Fh2\u003E\n  \u003Cp\u003E${window.incorrectItems.length === 0 ? \"初回の記憶テストは全問正解でした。\" : \"誤答した項目だけを自動的に選び，復習と再テストを行いました。\"}\u003C\u002Fp\u003E\n  \u003Cp\u003EScriptsを使うと，参加者の反応に応じて後の課題内容を変えることができます。\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E",
          "name": ""
        }
      ],
      "scrollTop": true,
      "submitButtonText": "終了",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "Finish"
    }
  ]
})

// Let's go!
study.run()