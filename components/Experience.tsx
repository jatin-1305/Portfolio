"use client";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const experiences = [
  {
    company: "Salesforce",
    role: "Associate Software Engineer — Proactive Monitoring",
    period: "Aug 2023 – Present",
    location: "Bengaluru, India",
    color: "#00dc82",
    logo: "🤖",
    highlights: [
      "Built AI-powered case summarization & response generation using GenAI, reducing average handling time by 25–30% and improving SLA adherence by 20%.",
      "Built production RAG-based AI chatbot (LangChain, FAISS, Groq LLM) for context-aware product queries, cutting ticket resolution time by 30%.",
      "Deployed an LLM-based conversation intent classifier using Llama 3.1 to analyze Engineer–Manager Slack interactions, reducing case resolution TTR by 35%.",
      // "Designed & maintained 4+ Superset dashboards using Trino, Splunk & Huron, tracking KPIs for proactive org monitoring.",
      "Built proactive alerting mechanisms and KPI dashboards on Grafana and Argus, reducing mean time to detect (MTTD) incidents by 20%.",
      // "Implemented ML-based anomaly detection systems that proactively identified 90%+ of anomalies in org request rate trends.",
      "Migrated legacy dashboards to Trino-based queries, improving performance and data processing efficiency by∼30%.",
      "Led technical health reviews translating system metrics into actionable insights — improved org health score by 20% in one month, renewing a $14M contract.",
      "Mentored 5+ new hires, reducing ramp-up time by 25% and improving overall team productivity.",
      "Hackathon finalist for developing an AI agentic prototype using Salesforce Agentforce APIs and LLM pipelines."
    ],
    tags: ["Python", "GenAI", "Llama 3.1", "RAG", "Claude", "Splunk", "Grafana","Tableau"]
  },
  {
    company: "Capgemini",
    role: "Senior Software Developer Intern",
    period: "Jan 2023 – Apr 2023",
    location: "Pune, India",
    color: "#06b6d4",
    logo: "⚡",
    highlights: [
      "Built full-stack banking app using Java, Spring Boot, and RESTful APIs for secure financial transactions",
      "Built modular microservices using SOLID principles for independent deployment and scalability.",
      "Implemented Jenkins CI/CD pipelines for automated build and deployment, cutting regression testing time by 40%",
      "Containerized services with Docker, hosted images on AWS, and managed code with Git in Agile/Scrum workflows"
    ],
    tags: ["Java", "Spring Boot", "RESTful APIs", "Docker", "AWS", "Jenkins", "Git", "Agile/Scrum"],
  },
  {
    company: "Walmart Global Tech India",
    role: "Software Developer Intern",
    period: "Jun 2022 – Aug 2022",
    location: "Bengaluru, India",
    color: "#ED65F0",
    logo: "✨",
    highlights: [
      "Built Python ML-based ad optimization algorithm improving targeting accuracy by 20% using CTR and CPC signals",
      "Trained ML models for real-time ad allocation to optimize CTR, cost-efficiency, and ROAS (Return on Ad Spend)",
      "Conducted EDA using Pandas and NumPy on large-scale ad datasets, driving ML feature selection insights",
    ],
    tags: ["Python", "Machine Learning", "Pandas", "NumPy", "EDA", "Jira"],
  },
  {
    company: "HighRadius Corporation",
    role: "Full Stack Developer Intern",
    period: "Jan 2022 – Apr 2022",
    location: "Remote",
    color: "#F7A534",
    logo: "📚",
    highlights: [
      "Built end-to-end AI-enabled FinTech B2B Invoice web app using Java, Servlets, ReactJS and REST APIs, reducing manual invoice processing effort by ~40%",
      "Trained and integrated an ML model on historical transaction data (after EDA & data cleaning) to predict customer payment dates with ~85% accuracy",
      "Designed MySQL database schemas and optimized queries to manage invoice and transaction records, improving data retrieval speed by ~30%",
    ],
    tags: ["Python", "Java", "JavaScript", "ReactJS" ,"Machine Learning", "EDA", "REST APIs", "MySQL"],
  },
];

export default function Experience() {
  const { dark } = useTheme();
  const bg = dark ? "#0d1117" : "#f8fafc";
  const cardBg = dark ? "#0f1923" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textMain = dark ? "#ffffff" : "#0f172a";
  const textMuted = dark ? "#94a3b8" : "#64748b";
  const pillBg = dark ? "rgba(255,255,255,0.05)" : "#f1f5f9";

  return (
    <section id="experience" className="spotlight-section section-pad" style={{ background: bg, position: "relative" }}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ color: "#00dc82", fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>02.</span>
            <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, rgba(0,220,130,0.3), transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 56, color: textMain }}>
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 22, top: 0, bottom: 0, width: 1, background: dark ? "rgba(255,255,255,0.06)" : "#e2e8f0" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {experiences.map((exp, i) => (
              <motion.div key={exp.company} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                className="exp-item">
                {/* Timeline dot */}
                <div style={{ position: "absolute", left: 0, top: 24, width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: `${exp.color}12`, border: `1px solid ${exp.color}30` }}>
                  {exp.logo}
                </div>

                <div className="glow-card" style={{ padding: 32, borderRadius: 20, background: cardBg, border: `1px solid ${cardBorder}`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />

                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
                    <div>
                      <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 6, color: textMain }}>{exp.role}</h3>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: exp.color }}>{exp.company}</span>
                        <span style={{ fontSize: 12, color: textMuted }}>{exp.location}</span>
                      </div>
                    </div>
                    <span style={{ padding: "5px 13px", borderRadius: 8, fontSize: 12, fontFamily: "monospace", fontWeight: 600, background: pillBg, color: textMuted, whiteSpace: "nowrap" }}>
                      {exp.period}
                    </span>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                    {exp.highlights.map((h, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, fontSize: 14, lineHeight: 1.65, color: textMuted }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: exp.color, flexShrink: 0, marginTop: 8 }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {exp.tags.map(tag => (
                      <span key={tag} style={{ padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: `${exp.color}10`, color: exp.color, border: `1px solid ${exp.color}22` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
