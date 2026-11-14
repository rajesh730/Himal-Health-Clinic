import type { Metadata } from "next";
import { BlogArticle } from "@/components/blog-article";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("prepare-for-doctor-visit");

export const metadata: Metadata = {
  title: "How to Prepare for a Doctor Visit",
  description: post.description,
  alternates: { canonical: post.href },
};

export default function PrepareForDoctorVisitPage() {
  return (
    <BlogArticle post={post}>
      <p className="blog-lead">A little preparation can make a short consultation more focused. You do not need to write a medical report—just organise the facts that will help the clinician understand what has changed.</p>

      <h2>Write down the main concern</h2>
      <p>Note when the symptoms started, whether they are becoming better or worse, and anything that seems to trigger or relieve them. If several concerns are involved, decide which two or three are most important to discuss first.</p>

      <h2>Bring medicines and relevant information</h2>
      <p>Take a current list of prescription medicines, over-the-counter products, vitamins and supplements. Medicine packets or clear photographs can also help. Include known allergies and bring recent reports, prescriptions or test results related to the concern.</p>

      <h2>Prepare questions before you arrive</h2>
      <ul>
        <li>What could be causing the symptoms?</li>
        <li>Do I need a test, medicine or follow-up appointment?</li>
        <li>What warning signs should make me seek help sooner?</li>
        <li>What should I do if the treatment does not help?</li>
      </ul>

      <p>During the consultation, ask for an explanation when a word or instruction is unclear. Before leaving, make sure you understand the next step and when to return.</p>

      <div className="article-sources"><strong>Reference</strong><a href="https://www.nhs.uk/nhs-services/gps/what-to-ask-your-doctor/" target="_blank" rel="noopener noreferrer">NHS: What to ask your doctor or healthcare professional</a></div>
    </BlogArticle>
  );
}
