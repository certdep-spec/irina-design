import { describe, expect, it } from "vitest";
import { usefulArticleContent } from "../data/usefulArticleContent";
import { publishedUsefulArticles, usefulArticles } from "../data/usefulArticles";
import { getArticleSeoDescription, getArticleSeoTitle } from "../lib/articleSeo";

describe("Бібліотека корисних матеріалів", () => {
  it("містить рівно 100 опублікованих статей з унікальними адресами", () => {
    expect(usefulArticles).toHaveLength(100);
    expect(publishedUsefulArticles).toHaveLength(100);
    expect(new Set(publishedUsefulArticles.map(article => article.slug)).size).toBe(100);
  });

  it("кожна стаття має повний структурований контент", () => {
    for (const article of publishedUsefulArticles) {
      const content = usefulArticleContent[article.id];
      expect(content, `Відсутній контент статті №${article.id}`).toBeDefined();
      expect(content.intro.length).toBeGreaterThanOrEqual(2);
      expect(content.sections.length).toBeGreaterThanOrEqual(3);
      expect(content.checklist.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("створює придатні для сніпетів унікальні SEO-метадані", () => {
    const titles = publishedUsefulArticles.map(article =>
      getArticleSeoTitle(article.id, article.title)
    );
    const descriptions = publishedUsefulArticles.map(article =>
      getArticleSeoDescription(article.excerpt)
    );

    expect(new Set(titles).size).toBe(100);
    expect(new Set(descriptions).size).toBe(100);
    expect(Math.max(...titles.map(title => title.length))).toBeLessThanOrEqual(70);
    expect(Math.min(...descriptions.map(description => description.length))).toBeGreaterThanOrEqual(
      130
    );
    expect(Math.max(...descriptions.map(description => description.length))).toBeLessThanOrEqual(
      158
    );
  });

  it("поглиблює 20 пріоритетних матеріалів окремими FAQ", () => {
    const enhanced = Object.values(usefulArticleContent).filter(content => content.faq?.length);
    expect(enhanced).toHaveLength(20);
    for (const content of enhanced) {
      expect(content.sections.length).toBeGreaterThanOrEqual(5);
      expect(content.faq).toHaveLength(3);
    }
  });
});
