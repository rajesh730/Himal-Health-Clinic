import type { Metadata } from "next";
import { BlogArticle } from "@/components/blog-article";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("everyday-health-habits");

export const metadata: Metadata = {
  title: "Everyday Habits for Long-Term Health",
  description: post.description,
  alternates: { canonical: post.href },
};

export default function EverydayHealthHabitsPage() {
  return (
    <BlogArticle post={post}>
      <p className="blog-lead">Long-term health is influenced by ordinary routines repeated over time. The aim is not perfection. It is to build practical habits that suit your health, ability, culture and daily responsibilities.</p>

      <h2>Move regularly</h2>
      <p>The World Health Organization recommends regular physical activity for adults and encourages people to reduce long periods of sitting. Walking, cycling, household activity, sport and planned exercise can all contribute. People with health conditions, pain or limited mobility should ask a qualified professional what level is appropriate.</p>

      <h2>Build variety into meals</h2>
      <p>A healthy diet can take many forms. WHO highlights adequacy, balance, moderation and diversity as core principles. Practical choices include a variety of vegetables, fruits, legumes, whole grains and other minimally processed foods while limiting excess salt, free sugars and unhealthy fats.</p>

      <h2>Choose changes that can last</h2>
      <ul>
        <li>Start with one realistic change instead of changing everything at once.</li>
        <li>Choose movement you can repeat safely and enjoyably.</li>
        <li>Plan simple meals around locally available foods.</li>
        <li>Discuss persistent symptoms or major health concerns with a qualified clinician.</li>
      </ul>

      <p>General recommendations are not a personal treatment plan. Individual needs differ according to age, pregnancy, medical conditions, medicines and activity level.</p>

      <div className="article-sources"><strong>References</strong><a href="https://www.who.int/news-room/fact-sheets/detail/physical-activity" target="_blank" rel="noopener noreferrer">WHO: Physical activity</a><a href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet" target="_blank" rel="noopener noreferrer">WHO: Healthy diet</a></div>
    </BlogArticle>
  );
}
