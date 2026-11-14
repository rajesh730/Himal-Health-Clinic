import type { Metadata } from "next";
import { BlogArticle } from "@/components/blog-article";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("medicine-safety-questions");

export const metadata: Metadata = {
  title: "Medicine Safety Questions to Ask",
  description: post.description,
  alternates: { canonical: post.href },
};

export default function MedicineSafetyQuestionsPage() {
  return (
    <BlogArticle post={post}>
      <p className="blog-lead">A medicine is easier to use safely when its purpose and instructions are clear. Ask questions before leaving the clinic or pharmacy, especially when the medicine is new or the dose has changed.</p>

      <h2>Understand the medicine</h2>
      <ul>
        <li>What is this medicine called and what is it intended to treat?</li>
        <li>How much should I take, how often and for how long?</li>
        <li>Should it be taken with food, water or at a particular time?</li>
        <li>What should I do if I miss a dose?</li>
      </ul>

      <h2>Discuss allergies and other medicines</h2>
      <p>Tell the pharmacist or doctor about known allergies and every medicine, supplement or herbal product you already use. Ask whether anything should be avoided while taking the new medicine.</p>

      <h2>Know the precautions</h2>
      <p>Ask about common side effects, warning signs and when to contact a health professional. Check how the medicine should be stored and keep it away from children. Do not share prescription medicines or change the dose without appropriate advice.</p>

      <p>If the label, packaging or instruction is unclear, pause and confirm it with a qualified pharmacist or prescriber. Guessing is not a safe solution.</p>

      <div className="article-sources"><strong>Reference</strong><a href="https://www.who.int/initiatives/medication-without-harm" target="_blank" rel="noopener noreferrer">World Health Organization: Medication Without Harm</a></div>
    </BlogArticle>
  );
}
