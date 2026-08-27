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
      "filePrefix": "checkfs",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "checkFs",
    "description": "",
    "repository": "",
    "contributors": "Masanori Kobayashi"
  },
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.flow.Sequence",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "grobalSequence",
      "plugins": [
        {
          "type": "fullscreen",
          "message": "フルスクリーンで実施していただきます。\u003Cbr\u003Eボタンをクリックしてください。",
          "hint": "\u003Cbutton\u003Eフルスクリーンにする\u003C\u002Fbutton\u003E",
          "path": "lab.plugins.Fullscreen"
        }
      ],
      "content": [
        {
          "type": "lab.flow.Loop",
          "templateParameters": [
            {
              "number": "1"
            },
            {
              "number": "2"
            },
            {
              "number": "3"
            },
            {
              "number": "4"
            },
            {
              "number": "5"
            },
            {
              "number": "6"
            },
            {
              "number": "7"
            },
            {
              "number": "8"
            },
            {
              "number": "9"
            },
            {
              "number": "10"
            }
          ],
          "sample": {
            "mode": "sequential"
          },
          "files": {},
          "responses": {
            "": ""
          },
          "parameters": {},
          "messageHandlers": {},
          "title": "block",
          "shuffleGroups": [],
          "template": {
            "type": "lab.flow.Sequence",
            "files": {},
            "responses": {
              "": ""
            },
            "parameters": {},
            "messageHandlers": {
              "run": async function anonymous(
) {
// ====== 各ブロック開始時のフルスクリーンチェック ======

// 既存オーバーレイ削除（念のため）
const old = document.getElementById('fs-overlay');
if (old) old.remove();

// フルスクリーンでない場合のみ表示
if (!document.fullscreenElement) {
  const overlay = document.createElement('div');
  overlay.id = 'fs-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.85);
    color:white;font-size:20px;display:flex;flex-direction:column;
    align-items:center;justify-content:center;z-index:9999;text-align:center;
  `;
  overlay.innerHTML = `
    <div>
      <p>現在フルスクリーンではありません。<br>
      このブロックを始めるには全画面表示にしてください。</p>
      <button id="fs-reenter" style="padding:10px 20px;font-size:18px;margin-top:20px;">
        フルスクリーンにする
      </button><br>
      <button id="fs-quit" style="padding:8px 16px;font-size:16px;margin-top:30px;background:#900;color:white;border:none;border-radius:6px;">
        途中終了する
      </button>
    </div>
  `;

  // フルスクリーン再要求ボタン
  overlay.querySelector('#fs-reenter').addEventListener('click', async () => {
    try {
      await document.documentElement.requestFullscreen({ navigationUI: 'hide' });
      overlay.remove(); // 成功したら消す
    } catch (e) {
      console.warn('[FS] フルスクリーン要求失敗:', e.message);
    }
  });

  // 🔴 途中終了ボタン
  overlay.querySelector('#fs-quit').addEventListener('click', () => {
      document.body.innerHTML = `
    <div style="
      position:fixed;inset:0;background:#000;
      color:white;font-size:24px;
      display:flex;align-items:center;justify-content:center;
      text-align:center;line-height:1.6;">
      <div>
        <p>途中終了しました。</p>
        <p>このウィンドウを閉じてください。</p>
      </div>
    </div>
  `;

    study.end()
  });
  document.body.appendChild(overlay);
}

}
            },
            "title": "trialWithCheckFs",
            "content": [
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "required": true,
                    "type": "html",
                    "content": "\u003Cdiv class = \"content-horizontal-center\"\u003E\n  \u003Ch1\u003E${this.parameters.number}\u003C\u002Fh1\u003E\n\u003C\u002Fdiv\u003E\n\u003Cdiv class = \"content-horizontal-space-around\"\u003E\n  \u003Cbutton id = \"odd\"\u003E奇数\u003C\u002Fbutton\u003E\u003Cbutton id = \"even\"\u003E偶数\u003C\u002Fbutton\u003E\n\u003C\u002Fdiv\u003E",
                    "name": ""
                  }
                ],
                "scrollTop": true,
                "submitButtonText": "Continue →",
                "submitButtonPosition": "hidden",
                "files": {},
                "responses": {
                  "click button#odd": "odd",
                  "click button#even": "even"
                },
                "parameters": {},
                "messageHandlers": {},
                "title": "item",
                "correctResponse": "${this.parameters.number % 2 == 0? \"even\" : \"odd\"}"
              },
              {
                "type": "lab.html.Page",
                "items": [
                  {
                    "required": true,
                    "type": "html",
                    "content": "\u003Cdiv class = \"content-horizontal-center\"\u003E\n  \u003Ch1\u003E${this.state.correct? \"〇\" : \"×\"}\u003C\u002Fh1\u003E\n\u003C\u002Fdiv\u003E",
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
                "title": "fb",
                "timeout": "1000",
                "tardy": true
              }
            ]
          }
        }
      ]
    }
  ]
})

// Let's go!
study.run()