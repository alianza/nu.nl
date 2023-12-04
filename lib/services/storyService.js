import styles from "../../components/storyDialog/storyDialog.module.scss";

export const StoryService = {
    baseUrl: "https://everyorigin.jwvbremen.nl/",

    removeSelectors: [
        '[data-type="video"]',
        '[data-type="call.to.action"]',
        "div.timeline-footer",
        "div.consent_required",
        'div[data-type="followtag"]',
        "div.timeline-block-wrapper.banner_block",
        "div.timeline-block-wrapper.video_block",
        'div.component_container[data-component="article_login_wall"]',
        "header.article-meta",
        "footer.article-meta",
        "hr.app-divider",
        "section.linked-tags",
        "aside",
        "h2.header-block",
        "ul.contentlist",
        "#nujij",
        "#comments",
        "div.featured-comments",
    ],

    transformSelectors: [
        { selector: "div.timeline-block-wrapper", transform: (e) => (e.style.marginTop = "1em") },
        {
            selector: "span.date",
            transform: (e) => {
                e.style.fontStyle = "italic";
                e.parentElement.style.textAlign = "right";
            },
        },
        {
            selector: 'img[data-src*="media.nu.nl"]',
            transform: (e) => {
                e.src = e.getAttribute("data-src");
            },
        },
        {
            selector: 'img[src*="media.nu.nl"]',
            transform: (e) => {
                e.style.margin = "1em auto";
            },
        },
        {
            selector: 'a[href^="/"]',
            transform: (e) => {
                e.setAttribute("href", `https://nu.nl${e.getAttribute("href")}`);
            },
        },
        { selector: "div.twitter>:not(div.twitter)", transform: (e) => e.classList.add(styles.twitter) },
        { selector: "div.space-reserver", transform: (e) => (e.style = "") },
    ],

    async fetchStory(url) {
        const response = await fetch(`${this.baseUrl}api/get?url=${url}`);
        return await response.json();
    },

    transformStory(story, storyObj) {
        this.removeSelectors.forEach((selector) => story.querySelectorAll(selector).forEach((el) => el.remove()));
        this.transformSelectors.forEach((selector) =>
            story.querySelectorAll(selector.selector).forEach((el) => selector.transform(el)),
        );

        if (story?.firstElementChild) {
            story.firstElementChild.insertAdjacentHTML(
                "afterend",
                `<a class='${styles.readFullStory}' href="${storyObj.link}" target="_blank" rel="noreferrer">Lees volledig bericht...</a>`,
            );
            story.firstElementChild.insertAdjacentHTML(
                "beforebegin",
                `<h1 class='${styles.title}' style="background-image: url('${storyObj.enclosure._attributes.url}')">${storyObj.title}</h1>`,
            );
        }
        return story;
    },
};
