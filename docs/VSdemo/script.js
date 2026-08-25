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
      "filePrefix": "visual-search-demo2",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "visual search demo2",
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
          "title": "視覚探索課題",
          "content": "この実験では，たくさんのアルファベット文字の中に一つだけ「H」または「U」が含まれています。どちらが呈示されたかを判断して下さい。「H」があった場合は「fキー」を，「U」があった場合は「jキー」を押してください。"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "始める→",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "instruction"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "resp": "H",
          "target": "H",
          "setSize": 5
        },
        {
          "resp": "H",
          "target": "H",
          "setSize": 5
        },
        {
          "resp": "H",
          "target": "H",
          "setSize": 5
        },
        {
          "resp": "H",
          "target": "H",
          "setSize": 5
        },
        {
          "resp": "H",
          "target": "H",
          "setSize": 5
        },
        {
          "resp": "H",
          "target": "H",
          "setSize": 5
        },
        {
          "resp": "H",
          "target": "H",
          "setSize": 5
        },
        {
          "resp": "H",
          "target": "H",
          "setSize": 5
        },
        {
          "resp": "H",
          "target": "H",
          "setSize": 5
        },
        {
          "resp": "H",
          "target": "H",
          "setSize": 5
        },
        {
          "resp": "U",
          "target": "U",
          "setSize": 5
        },
        {
          "resp": "U",
          "target": "U",
          "setSize": 5
        },
        {
          "resp": "U",
          "target": "U",
          "setSize": 5
        },
        {
          "resp": "U",
          "target": "U",
          "setSize": 5
        },
        {
          "resp": "U",
          "target": "U",
          "setSize": 5
        },
        {
          "resp": "U",
          "target": "U",
          "setSize": 5
        },
        {
          "resp": "U",
          "target": "U",
          "setSize": 5
        },
        {
          "resp": "U",
          "target": "U",
          "setSize": 5
        },
        {
          "resp": "U",
          "target": "U",
          "setSize": 5
        },
        {
          "resp": "U",
          "target": "U",
          "setSize": 5
        }
      ],
      "sample": {
        "mode": "draw-shuffle"
      },
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "visualSearchTask",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {
          "": ""
        },
        "parameters": {},
        "messageHandlers": {},
        "title": "trial",
        "content": [
          {
            "type": "lab.canvas.Screen",
            "content": [
              {
                "type": "i-text",
                "left": 0,
                "top": 0,
                "angle": 0,
                "width": 32,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "＋",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              }
            ],
            "viewport": [
              800,
              600
            ],
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "fixation",
            "timeout": "500"
          },
          {
            "type": "lab.canvas.Screen",
            "content": [],
            "viewport": [
              800,
              600
            ],
            "files": {},
            "responses": {
              "keypress(f)": "H",
              "keypress(j)": "U"
            },
            "parameters": {},
            "messageHandlers": {
              "before:prepare": function anonymous(
) {
const xloc = [-300, 0, 300];
const yloc = [-150, 0, 150];
const setSize = this.parameters.setSize;

// 呈示位置をランダムにする
const positionList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const sampleList = this.random.shuffle(positionList);

// 妨害刺激をランダムにする
const distractors = ['A', 'C', 'E', 'F', 'O', 'P', 'S'];
const shuffledDistractors = this.random.shuffle(distractors);

for (let i = 0; i < setSize; i++) {
  let stimText;

  if (i == 0) {
    // ターゲット
    stimText = this.parameters.target;
  } else {
    // 妨害刺激
    stimText = shuffledDistractors[i - 1];
  }

  const position = sampleList[i];
  const xp = position % 3;
  const yp = Math.floor(position / 3);

  this.options.content.push({
    type: 'i-text',
    left: xloc[xp], top: yloc[yp], angle: 0,
    text: stimText, fill: 'black',
    fontSize: 48, fontFamily: 'sans-serif'
  });
}
}
            },
            "title": "stimulus",
            "correctResponse": "${this.parameters.resp}"
          },
          {
            "type": "lab.canvas.Screen",
            "content": [
              {
                "type": "i-text",
                "left": 0,
                "top": 0,
                "angle": 0,
                "width": 554.11,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "${this.state.correct? \"正解\" : \"不正解\"}",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              }
            ],
            "viewport": [
              800,
              600
            ],
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "feedback",
            "timeout": "1000",
            "tardy": true
          },
          {
            "type": "lab.canvas.Screen",
            "content": [],
            "viewport": [
              800,
              600
            ],
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "blank",
            "timeout": "500"
          }
        ]
      }
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "ありがとうございました。",
          "content": "これで実験は終了です。以下の「結果のダウンロード」ボタンを押すと結果をダウンロードできます。"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "結果のダウンロード→",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "thanks"
    }
  ]
})

// Let's go!
study.run()