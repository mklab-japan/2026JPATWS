// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "responses": {
    "": ""
  },
  "messageHandlers": {
    "before:prepare": function anonymous(
) {
window.autobiographicalKeywords = { happy: '', door: '' }
window.labEscapeText = function(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
}
  },
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.Download",
      "filePrefix": "",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "自伝的記憶：手がかり―キーワード連合学習",
    "description": "キーワード入力段階と手がかり―キーワード学習段階をLoopで構成した課題",
    "repository": "",
    "contributors": ""
  },
  "files": {},
  "content": [
    {
      "type": "lab.html.Page",
      "title": "Instructions",
      "items": [
        {
          "type": "text",
          "title": "自伝的記憶と連合学習",
          "content": "\u003Cp\u003Eこれから、画面に表示される手がかりから、ご自身の過去の出来事を1つ思い出していただきます。\u003C\u002Fp\u003E\u003Cp\u003Eそれぞれの出来事について、後でその記憶を思い出せるような\u003Cstrong\u003E短いキーワード\u003C\u002Fstrong\u003Eを入力してください。\u003C\u002Fp\u003E\u003Cp\u003E2つの入力が終わると、手がかりと入力したキーワードのペアが1つずつ5秒間表示されます。表示された組み合わせを覚えてください。\u003C\u002Fp\u003E\u003Cp style=\"margin-top: 2rem; color: #555;\"\u003E準備ができたら下のボタンを押してください。\u003C\u002Fp\u003E"
        }
      ],
      "submitButtonText": "開始する →",
      "submitButtonPosition": "right",
      "width": "l",
      "responses": {},
      "messageHandlers": {},
      "parameters": {},
      "files": {}
    },
    {
      "type": "lab.flow.Loop",
      "title": "Keyword Entry Phase",
      "templateParameters": [
        {
          "cue": "幸せな",
          "slot": "happy"
        },
        {
          "cue": "ドア",
          "slot": "door"
        }
      ],
      "sample": {
        "mode": "sequential"
      },
      "responses": {
        "": ""
      },
      "messageHandlers": {},
      "parameters": {},
      "files": {},
      "shuffleGroups": [],
      "template": {
        "type": "lab.html.Page",
        "title": "Keyword Entry",
        "items": [
          {
            "type": "text",
            "title": "記憶を思い出してください",
            "content": "\u003Cp\u003E次の手がかりから、自伝的記憶を1つ思い出してください。\u003C\u002Fp\u003E"
          },
          {
            "type": "html",
            "content": "\u003Cdiv class=\"text-center\" style=\"font-size: 3rem; font-weight: 600; margin: 2rem 0;\"\u003E${ window.labEscapeText(parameters.cue) }\u003C\u002Fdiv\u003E",
            "name": ""
          },
          {
            "type": "input",
            "label": "キーワード",
            "help": "その記憶を後で思い出せる、短いキーワードを入力してください。",
            "name": "keyword",
            "required": true,
            "attributes": {
              "type": "text",
              "maxlength": "80",
              "autocomplete": "off",
              "autofocus": "autofocus"
            }
          }
        ],
        "submitButtonText": "次へ →",
        "submitButtonPosition": "right",
        "width": "l",
        "responses": {},
        "messageHandlers": {
          "end": function anonymous(
) {
const value = String(this.data.keyword || '').trim()
const cue = this.aggregateParameters.cue
const slot = this.aggregateParameters.slot
window.autobiographicalKeywords[slot] = value
this.data.cue = cue
this.data.slot = slot
this.data.saved_keyword = value
}
        },
        "parameters": {},
        "files": {}
      }
    },
    {
      "type": "lab.flow.Loop",
      "title": "Cue–Keyword Learning Phase",
      "templateParameters": [
        {
          "cue": "幸せな",
          "slot": "happy"
        },
        {
          "cue": "ドア",
          "slot": "door"
        }
      ],
      "sample": {
        "mode": "sequential"
      },
      "responses": {
        "": ""
      },
      "messageHandlers": {},
      "parameters": {},
      "files": {},
      "shuffleGroups": [],
      "template": {
        "type": "lab.html.Page",
        "title": "Cue–Keyword Pair",
        "items": [
          {
            "type": "text",
            "title": "連合学習",
            "content": "\u003Cp class=\"text-center\"\u003Eこの組み合わせを覚えてください（5秒間）。\u003C\u002Fp\u003E"
          },
          {
            "type": "html",
            "content": "\u003Ctable class=\"table-plain w-100 text-center\" style=\"font-size: 2.25rem; table-layout: fixed; margin-top: 2rem;\"\u003E\u003Ctr\u003E\u003Ctd style=\"width: 45%; font-weight: 600;\"\u003E${ window.labEscapeText(parameters.cue) }\u003C\u002Ftd\u003E\u003Ctd style=\"width: 10%;\"\u003E&mdash;\u003C\u002Ftd\u003E\u003Ctd style=\"width: 45%; font-weight: 600;\"\u003E${ window.labEscapeText(window.autobiographicalKeywords[parameters.slot]) }\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftable\u003E",
            "name": ""
          }
        ],
        "submitButtonPosition": "hidden",
        "width": "l",
        "timeout": "5000",
        "tardy": true,
        "responses": {
          "": ""
        },
        "messageHandlers": {
          "before:prepare": function anonymous(
) {
const cue = this.aggregateParameters.cue
const slot = this.aggregateParameters.slot
const keyword = window.autobiographicalKeywords[slot]
this.data.cue = cue
this.data.slot = slot
this.data.keyword = keyword
this.data.pair = cue + ' — ' + keyword
this.data.presentation_ms = 5000
}
        },
        "parameters": {},
        "files": {}
      }
    },
    {
      "type": "lab.html.Page",
      "title": "End",
      "items": [
        {
          "type": "text",
          "title": "終了",
          "content": "\u003Cdiv class=\"text-center\"\u003E\u003Cp style=\"font-size: 1.5rem;\"\u003Eこれで課題は終了です。\u003C\u002Fp\u003E\u003Cp\u003Eご参加ありがとうございました。\u003C\u002Fp\u003E\u003Cp\u003Eこの画面を閉じてください。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E"
        }
      ],
      "submitButtonPosition": "hidden",
      "width": "l",
      "timeout": "100",
      "responses": {
        "": ""
      },
      "messageHandlers": {},
      "parameters": {},
      "files": {}
    }
  ]
})

// Let's go!
study.run()