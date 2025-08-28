<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>門市快速開啟頁</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/framer-motion/dist/framer-motion.umd.js"></script>
  </head>
  <body class="bg-gradient-to-b from-white to-slate-50 min-h-screen p-4 md:p-8">
    <div id="app" class="mx-auto max-w-6xl"></div>

    <script>
      const items = [
        { id: "ana-nrt-t1", title: "ANA成田機場 T1", type: "image", url: "" },
        { id: "ana-hnd-t2", title: "ANA羽田機場 T2", type: "image", url: "" },
        { id: "ana-hnd-t3", title: "ANA羽田機場 T3", type: "image", url: "" },
        { id: "biccamera", title: "Biccamera", type: "image", url: "" },
        { id: "cocokara", title: "COCOKARA FINE藥妝", type: "image", url: "" },
        { id: "fasola-nrt-df", title: "Fa-So-La成田机场免税店", type: "image", url: "" },
        { id: "sugi", title: "SUGI杉藥局", type: "image", url: "" },
        { id: "sundrug", title: "Sundrug尚都樂客", type: "image", url: "" },
        { id: "daimaru-matsuzakaya", title: "大丸松坂屋", type: "image", url: "" },
        { id: "ooga", title: "大賀藥局", type: "image", url: "" },
        { id: "sapporo-drug", title: "札幌藥妝", type: "image", url: "" },
        { id: "seibu", title: "西武百貨", type: "image", url: "" },
        { id: "keio-shinjuku", title: "京王百貨新宿店", type: "image", url: "" },
        { id: "tobu-ikebukuro", title: "東武百貨池袋本店", type: "image", url: "" },
        { id: "matsumoto-kiyoshi", title: "松本清藥妝", type: "image", url: "" },
        { id: "tsuruha", title: "鶴羽藥妝", type: "image", url: "" },
        { id: "donki-coupon", title: "唐吉诃德 優惠券頁", type: "link", url: "https://japanportal.donki-global.com/coupon/?ptcd=0076002003" }
      ];

      function render() {
        const container = document.getElementById("app");
        container.innerHTML = `
          <header class="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 class="text-2xl md:text-4xl font-bold">門市／機場 快速開啟面板</h1>
              <p class="text-slate-600 mt-1">點一下即可開啟圖片或外部網站。</p>
            </div>
            <input id="searchBox" placeholder="搜尋店名..." class="border rounded-xl px-3 py-2 w-72" />
          </header>
          <h2 class="text-xl font-bold mb-2">圖片</h2>
          <div id="images" class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
          <h2 class="text-xl font-bold mt-6 mb-2">網頁</h2>
          <div id="links" class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
          <div id="preview" class="fixed inset-0 bg-black/70 hidden items-center justify-center p-4">
            <div class="bg-white rounded-xl max-w-3xl w-full p-4">
              <div class="flex justify-between items-center mb-2">
                <h3 id="previewTitle" class="font-bold"></h3>
                <button onclick="closePreview()" class="text-red-500">關閉</button>
              </div>
              <img id="previewImg" class="w-full h-auto rounded" />
            </div>
          </div>
        `;

        const imagesDiv = document.getElementById("images");
        const linksDiv = document.getElementById("links");

        items.forEach((item) => {
          const card = document.createElement("div");
          card.className = "p-4 border rounded-xl bg-white shadow flex flex-col gap-2";
          card.innerHTML = `
            <h3 class="font-semibold">${item.title}</h3>
            <div class="flex gap-2">
              <button class="bg-blue-500 text-white px-3 py-1 rounded-xl">開啟</button>
              ${item.type === "image" ? `<button class="bg-gray-200 px-3 py-1 rounded-xl">設定圖片網址</button>` : ""}
            </div>
          `;

          const openBtn = card.querySelector("button");
          openBtn.onclick = () => {
            if (item.type === "image") {
              if (!item.url) {
                alert("尚未設定圖片網址");
              } else {
                openPreview(item);
              }
            } else if (item.type === "link") {
              window.open(item.url, "_blank");
            }
          };

          if (item.type === "image") {
            const setBtn = card.querySelectorAll("button")[1];
            setBtn.onclick = () => {
              const newUrl = prompt("請輸入圖片網址", item.url || "");
              if (newUrl !== null) item.url = newUrl.trim();
            };
            imagesDiv.appendChild(card);
          } else {
            linksDiv.appendChild(card);
          }
        });

        document.getElementById("searchBox").addEventListener("input", (e) => {
          const q = e.target.value.toLowerCase();
          document.querySelectorAll("#images div, #links div").forEach((card) => {
            const title = card.querySelector("h3").innerText.toLowerCase();
            card.style.display = title.includes(q) ? "block" : "none";
          });
        });
      }

      function openPreview(item) {
        document.getElementById("previewTitle").innerText = item.title;
        document.getElementById("previewImg").src = item.url;
        document.getElementById("preview").classList.remove("hidden");
        document.getElementById("preview").classList.add("flex");
      }

      function closePreview() {
        document.getElementById("preview").classList.add("hidden");
        document.getElementById("preview").classList.remove("flex");
      }

      render();
    </script>
  </body>
</html>
