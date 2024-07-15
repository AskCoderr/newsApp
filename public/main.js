// setting minimum height for bootstrap list-group-item
const listGroupItems = document.querySelectorAll(".list-group-item");
listGroupItems.forEach(i => {
    i.style.minHeight = window.getComputedStyle(i).getPropertyValue("height");
});

// adjusting parent height
const navbar = document.querySelector(".navbar")
const parent = document.querySelector(".parent");
let viewportHeight = null;
let navHeight = null;
let action = null;

function adjustingParent() {
    viewportHeight = window.innerHeight;
    navHeight = navbar.clientHeight;
    parent.style.height = `${viewportHeight - navHeight}px`;
}

window.addEventListener("resize", () => {
    clearTimeout(action);
    action = setTimeout(adjustingParent, 100);
})

adjustingParent();


// setting height and border-radius of content-display
const contentDisplay = document.querySelector(".content-display");
const listGroup = document.querySelector(".list-group");
contentDisplay.style.height = `${listGroup.clientHeight}px`;
contentDisplay.style.borderRadius = window.getComputedStyle(listGroup).getPropertyValue("border-radius");


// adding functionalities to list group items
let response = null;
async function addFunctionality() {
    response = await axios.get("/response");
    const heading = document.querySelector(".header");
    const body = document.querySelector(".body");
    const footer = document.querySelector(".footer");
    const dateTime = document.querySelector(".date-time");
    const button = document.querySelector(".btn");
    for (let i = 0; i < response.data.articles.length; i++) {
        document.querySelector(`.b${i}`).addEventListener("click", () => {
            footer.style.display = "flex";
            const article = response.data.articles[i];
            heading.textContent = article.title;
            body.textContent = article.description;
            dateTime.textContent = article.publishedAt.replace("T", " || ").replace("Z", "");
            button.href = article.url;
        })
    }
}
addFunctionality();
 