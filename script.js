//　具材リスト
let potContents = [];

// Enterキーで具材投入可にする 参考:https://qiita.com/michieru/items/7d95b7b012f741d26732
const input = document.getElementById("ingredient-input");
input.addEventListener("keydown", pushEnter);
function pushEnter(event) {
    if (event.key === "Enter") {
      addIngredient();
    }
}


// 具材を鍋に入れる
function addIngredient() {
    const input = document.getElementById("ingredient-input");
    const ingredient = input.value;

    // 空っぽだったらアラート
    if (ingredient === "") {
        alert("具材名を入れてください！空気は美味しくないです！");
        return;
    }

    // 入力を具材リストに追加
    potContents.push(ingredient);

    // 画面に"入れたよ"と表示
    const logArea = document.getElementById("log-area");
    logArea.innerHTML += `『${ingredient}』を投入しました…<br>`;

    // 入力欄を空にする
    input.value = "";
}

// 料理開始（画面切り替え）
function finishCooking() {
    // 具材が1つも入ってなかったらアラート
    if (potContents.length === 0) {
        alert("具材が入っていません！ただのお湯です！");
        return;
    }

    // こっそり"プレゼント箱"を混ぜる
    potContents.push("🎁謎のプレゼント箱🎁");

    // 画面を切り替える
    document.getElementById("kitchen-screen").style.display = "none";
    document.getElementById("eat-screen").style.display = "block";
}

// 具材を取り出して食べる
function eatIngredient() {
    const resultArea = document.getElementById("result-area");
    const eatBtn = document.getElementById("eat-btn");

    // 鍋が空っぽになったら終了
    if (potContents.length === 0) {
        resultArea.innerHTML = "完食！ごちそうさまでした🙏<br>（お腹壊さないでね…）";
        document.getElementById("eat-btn").style.display = "none"; // 食べるボタンを消す
        document.getElementById("reset-btn").style.display = "inline-block"; // リセットボタンを出す
        return;
    }

    // ランダムに選ぶ　参考:https://www.1ft-seabass.jp/memo/2022/08/23/javascript-array-random-look-back/
    const randomIndex = Math.floor(Math.random() * potContents.length);
    const selectedFood = potContents[randomIndex];

    // "プレゼント箱"が出た際の処理
    if (selectedFood === "🎁謎のプレゼント箱🎁") {
        eatBtn.style.display = "none";// 食べるボタンを隠す
        resultArea.innerHTML = `
            <p>おや…？鍋の底から箱が出てきました！</p>
            <p style="font-size:3em;">🎁</p>
            <button class="main-btn" style="background-color:#ff00de; color:white;" onclick="openSecretGift()">
                箱を開けてみる 👀
            </button>
          `;
    } else {
        // 普通の具材なら表示
        resultArea.innerHTML = `あなたの具材は…<br><span style="font-size:2em; color:#ff00de;">${selectedFood}</span><br>です！召し上がれ！`;
    }

    // 選ばれた具材をリストから削除
    potContents.splice(randomIndex, 1);
}

// プレゼント箱を開く
function openSecretGift() {
    document.getElementById("gift-window").style.display = "flex";
}

// サプライズ画面を閉じる
function closeSecretGift() {
    document.getElementById("gift-window").style.display = "none";
    
    // 画面にも食べたことを表示
    document.getElementById("result-area").innerHTML = "プレゼント箱を開けました！";

    // 隠していた"食べる"ボタンを再表示
    document.getElementById("eat-btn").style.display = "inline-block";
}