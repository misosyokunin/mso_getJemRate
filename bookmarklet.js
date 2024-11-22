javascript:(async() => {const Wait = {waits : [],num : -1,add(){return new Promise((resolve) =>{this.num++;this.waits[this.num] = resolve;});},release(){this.waits[this.num]();this.waits[this.num] = "";this.num--;},time(sec){return new Promise((resolve) =>{setTimeout(function(){resolve();}, sec * 1000);});},};const REFF = "https://minesweeper.online";const TAR_URL = "https://minesweeper.online/ja/economy";const TAR_TITLE = "ゲーム内経済画面";if(location.href.includes(REFF)){}else{if(!location.href.includes(TAR_URL)){const result = window.confirm(`${TAR_TITLE}ではありません。\n${TAR_TITLE}へ飛びますか？\n（ページ遷移後に再度このスクリプトを実行してください。）`);if(result){location.href = TAR_URL;}else{alert(`${TAR_TITLE}（${TAR_URL}）を表示させてください。`);}return;}}const div = document.createElement("div");div.addEventListener("click", async() => {div.remove();observer?.disconnect();});div.textContent = "閉じる";div.style = "position: fixed; top: 0px; left: 0px; height: 100vh; width: 100vw; z-index: 9999; background-color: rgba(0, 0, 0, 0.5); margin: 10px;";const iframe = document.createElement("iframe");iframe.setAttribute("src", TAR_URL);iframe.style = "height: 100%; width: 100%;";div.append(iframe);document.body.append(div);iframe.addEventListener("load", () => {const target = iframe.contentWindow.document.body;const observer = new MutationObserver(function (mutations) {const tar = mutations[0].target;if(tar.id === "richest_coins_price"){observer.disconnect();main(iframe.contentWindow.document);}});observer.observe(target, {attributes: true,/*属性変化の監視*/characterData: true,/*テキストノードの変化を監視*/childList: true,/*子ノードの変化を監視*/subtree: true,/*子孫ノードも監視対象に含める*/});});async function main(document){/*■初期処理*/const EXTRACTIONS = [["トパーズ", 1],["ルビー", 2],["サファイア", 3],["アメジスト", 4],["オニキス", 5],["アクアマリン", 6],["エメラルド", 7],["ガーネット", 8],["翡翠", 9],["ダイヤモンド", 10],["平均", 0],];const today = new Date();if(today.getHours() < 9){/*日度は09:00から始まる*/today.setDate(today.getDate() - 1);}const dateStr = `${today.getMonth() + 1}/${today.getDate()}`;let isLooping = true;const bk = document.createElement("div");bk.style = "position:fixed; top: 0px; left: 0px; background-color: rgba(0, 0, 0, 0.5); width: 100vw; height: 100vh; font-size: 2em; z-index: 100; display: flex; justify-content: center; align-items: center; flex-direction: column;";bk.innerHTML = "";bk.innerText = `${dateStr}の宝石レートを取得しています…\nしばらくお待ちください…`;const breakButton = document.createElement("button");breakButton.type = "button";breakButton.textContent = "終了する";breakButton.addEventListener("click", () => {isLooping = false;observer.disconnect();bk.remove();});bk.append(breakButton);const progress = document.createElement("progress");progress.max = EXTRACTIONS.length;progress.value = 0;bk.append(progress);{const label = document.createElement("label");label.style = "cursor: pointer;";bk.append(label);const chkShowHeader = document.createElement("input");chkShowHeader.type = "checkbox";chkShowHeader.checked = false;chkShowHeader.id = "_chkShowHeader";chkShowHeader.style = "transform: scale(1.5); margin: 5px;";label.append(chkShowHeader);const span = document.createElement("span");span.textContent = "見出しも取得する";span.style = "font-size: 16px";label.append(span);}{const label = document.createElement("label");label.style = "cursor: pointer;";bk.append(label);const chkShowHeader = document.createElement("input");chkShowHeader.type = "checkbox";chkShowHeader.checked = true;chkShowHeader.id = "_chkCopyDataWhenJumpToSheet";chkShowHeader.style = "transform: scale(1.5); margin: 5px;";label.append(chkShowHeader);const span = document.createElement("span");span.textContent = "シート遷移時にデータをコピーする";span.style = "font-size: 16px";label.append(span);}document.body.append(bk);/*■データ取得*/const putDatas = [];putDatas.push(dateStr);const VAILD_DATA_STR = "XXXXX";let i = 0;const target = document.body;/*本来ならtableをターゲットにしたいが、テーブルそのものを書き換えているのでbodyから取得*/const observer = new MutationObserver(function (mutations) {const tar = mutations[0].target;if(tar.id === "EconomyBlock"){const td = tar.querySelector(":scope > table > tbody > tr:nth-of-type(2) > td:nth-of-type(2)");const observer = new MutationObserver(function (mutations) {const tar = mutations[0].target;putDatas[i + 1] = tar.textContent || VAILD_DATA_STR;Wait.release();observer.disconnect();});observer.observe(td, {characterData: true,/*テキストノードの変化を監視*/childList: true,/*子ノードの変化を監視*/subtree: true,/*子孫ノードも監視対象に含める*/});}});observer.observe(target, {attributes: true,/*属性変化の監視*/characterData: true,/*テキストノードの変化を監視*/childList: true,/*子ノードの変化を監視*/subtree: true,/*子孫ノードも監視対象に含める*/});const Wait = {waits : [],num : -1,add(){return new Promise((resolve) =>{this.num++;this.waits[this.num] = resolve;});},release(){this.waits[this.num]();this.waits[this.num] = "";this.num--;},time(sec){return new Promise((resolve) =>{setTimeout(function(){resolve();}, sec * 1000);});},};while(isLooping){const jemname = EXTRACTIONS[i][0];const jemargu = EXTRACTIONS[i][1];await Wait.time(1);document.querySelectorAll("#EconomyBlock table:nth-of-type(1) > tbody > tr:nth-child(2) > td:nth-of-type(1) ul > li > a")[jemargu].click();/*データの追加・awaitの解決はobserverでおこなう*/await Wait.add();i++;progress.value = i;if(i === EXTRACTIONS.length){break;}}observer.disconnect();/*■データ表示*/const isShowHeader = document.getElementById("_chkShowHeader").checked;const isCopyDataWhenJumpToSheet = document.getElementById("_chkCopyDataWhenJumpToSheet").checked;bk.innerHTML = "";const textarea = document.createElement("textarea");if(isShowHeader){textarea.value += "日付\t";textarea.value += EXTRACTIONS.map((arr) => arr[0]).join("\t");textarea.value += "\n";}textarea.value += putDatas.join("\t");textarea.style = "font-size: 16px; width: 90%; height: 50%;";bk.append(textarea);const wrapper = document.createElement("div");wrapper.style = "height: 20%; width: 90%; font-size: 16px; display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr); gap: 0px;";bk.append(wrapper);const copyButton = document.createElement("button");copyButton.type = "button";copyButton.textContent = "📃コピーする";copyButton.addEventListener("click", () => {textarea.select();document.execCommand("copy");window.getSelection?.().removeAllRanges();textarea.blur();copyButton.textContent = "📃コピーしました！";setTimeout(() => {copyButton.textContent = "📃コピーする";}, 3000);});copyButton.style = "grid-column: span 2 / span 2;";wrapper.append(copyButton);const closeButton = document.createElement("button");closeButton.type = "button";closeButton.textContent = "閉じる";closeButton.addEventListener("click", () => {bk.remove();div.remove();});closeButton.style = "grid-column-start: 1; grid-row-start: 2;";wrapper.append(closeButton);const jumpButton = document.createElement("button");jumpButton.type = "button";jumpButton.style = "grid-column-start: 2; grid-row-start: 2;";wrapper.append(jumpButton);const anc = document.createElement("a");anc.innerText = "コピペしにいく\n（スプレッドシートへ飛びます）";anc.href = "https://docs.google.com/spreadsheets/d/1FgpjiyNmgBRkSSh9dH7BykKiNvOFu5-yATCETNO4pt4/edit?gid=0#gid=0";anc.setAttribute("target", '_blank');if(isCopyDataWhenJumpToSheet){anc.addEventListener("click", () => {textarea.select();document.execCommand("copy");window.getSelection?.().removeAllRanges();textarea.blur();});}anc.style = "display: block;";jumpButton.append(anc);{let str = "";for(let i = 0; i < putDatas.length; i++){if(putDatas[i] === VAILD_DATA_STR){str += `${EXTRACTIONS[i][0]}\n`;}}if(str){alert(`次のデータを取得できませんでした。\n${str}`);}}}/*そこで思ったのですが、宝石レートを取得するスクリプトをMSOのメニューに追加してしまうのはどうでしょうか？こうすればブックマークレットをいちいち実行しなくて済みます（ただ、MSOにアクセスする必要があるのが短所…）。nagaoさんのプログラムと同じようなことをすれば実現できると算段しております。*/})();