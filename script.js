const form = document.getElementById("form");
const newsSection = document.querySelector(".news");
const LoadingElement = document.createElement("h2");

const getData = async (e) => {
  e.preventDefault();
  newsSection.innerHTML = "";
  LoadingElement.classList.add("loading");
  LoadingElement.innerHTML = `Loading... Please Wait <span class="spinner-border" role="status">
  <span class="sr-only"></span>
</span>`;
  newsSection.appendChild(LoadingElement);
  const categoryData = new FormData(e.target);
  const category = categoryData.get("category");
  console.log(category);
  try {
    const response = await fetch(
      `https://inshorts.deta.dev/news?category=${category}`
    );
    const data = await response.json();
    console.log(data);
    insertData(data);
  } catch (e) {
    console.log(e);
  }
};

const insertData = (data) => {
  newsSection.innerHTML = "";
  let newsArray = data["data"];
  for (let news of newsArray) {
    const newsBlock = document.createElement("div");
    newsBlock.classList.add("news-blocks");
    const newsInfoSection = document.createElement("div");
    newsInfoSection.classList.add("info");
    const newsHeader = document.createElement("h4");
    newsHeader.textContent = news["title"];
    newsInfoSection.appendChild(newsHeader);
    const AuthorInfo = document.createElement("p");
    AuthorInfo.innerHTML = `<b>Author : </b> ${news["author"]}   <b>Date : </b> ${news["date"]}`;
    newsInfoSection.appendChild(AuthorInfo);
    const newsContent = document.createElement("p");
    newsContent.classList.add("newscontent");
    newsContent.textContent = news["content"];
    const readMoreContent = document.createElement("a");
    readMoreContent.innerHTML = "Read More";
    readMoreContent.setAttribute("href", news["readMoreUrl"]);
    readMoreContent.setAttribute("target", "_blank");
    const inShortsContent = document.createElement("a");
    inShortsContent.innerHTML = "InShorts";
    inShortsContent.setAttribute("href", news["url"]);
    inShortsContent.setAttribute("target", "_blank");
    const buttonSection = document.createElement("div");
    buttonSection.classList.add("buttonsec");
    readMoreContent.classList.add("readmore");
    inShortsContent.classList.add("inshorts");
    buttonSection.appendChild(readMoreContent);
    buttonSection.appendChild(inShortsContent);
    newsContent.appendChild(buttonSection);
    newsInfoSection.appendChild(newsContent);
    const newsImage = document.createElement("img");
    newsImage.setAttribute("src", news["imageUrl"]);
    newsBlock.appendChild(newsImage);
    newsBlock.appendChild(newsInfoSection);
    newsSection.appendChild(newsBlock);
  }
};

form.addEventListener("submit", getData);
