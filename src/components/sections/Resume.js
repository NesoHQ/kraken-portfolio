"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Briefcase } from "lucide-react";

const ARTICLE = "active bg-card sketch-border paper-pattern p-6 lg:p-8 transition-all duration-500 relative z-10 block animate-[fadeIn_0.4s_ease_forwards]";
const SECTION_TITLE = "text-3xl lg:text-4xl font-signature font-bold mb-6 text-foreground flex items-center gap-3";

const STATIC = {
  infraProjects: [
    { title: "Private Hybrid Cloud — NesoHQ", period: "2022 — Present", text: "Designed and operated private hybrid cloud using self-hosted Headscale and Caddy reverse proxy for cost-efficient, secure networking." },
    { title: "Multi-node K3s Kubernetes Clusters", period: "2023 — Present", text: "Deployed and managed multi-node K3s clusters across geographically distributed nodes for production-grade lightweight Kubernetes." },
    { title: "Infrastructure-as-Code Pipeline", period: "2024 — Present", text: "Implemented complete IaC pipeline using Terraform and Kustomization for declarative infrastructure management and automated provisioning." },
    { title: "Observability Platform", period: "2024 — Present", text: "Built Prometheus and Grafana observability platform for real-time metrics, visualization, and alerting across distributed workloads." },
  ],
  experience: [
    { title: "Senior Software Engineer & Backend Lead", company: "Zalmi Technology", period: "Jan 2026 — Present", points: ["Leading backend engineering team and infrastructure architecture for a platform serving 1M+ users.", "Architecting cloud-native infrastructure with Docker and Kubernetes, ensuring 99.9% uptime.", "Implementing infrastructure-as-code with Terraform for reproducible deployments.", "Driving DevOps culture and CI/CD automation for rapid, reliable releases."] },
    { title: "Software Engineer", company: "Technonext (US-Bangla Airlines Concern)", period: "Apr 2025 — Dec 2025", points: ["Architected Geo Finder Service — a geo-distributed REST API with sub-100ms latency via Redis caching.", "Containerized microservices with Docker & Kubernetes, implementing zero-downtime rolling updates.", "Built CI/CD pipelines with GitHub Actions and Jenkins, reducing deployment time by 70%."] },
    { title: "Software Engineer", company: "ShareTrip Ltd.", period: "Feb 2024 — Mar 2025", points: ["Managed infrastructure for large-scale travel platform with load balancing and auto-scaling.", "Built automated scheduling service using containerized workloads, reducing manual ops by 60%.", "Refactored monolithic workflows into cloud-native microservices."] },
    { title: "Junior Software Engineer", company: "Axiata Digital Agency Asia", period: "Dec 2022 — Jan 2024", points: ["Built omnichannel communication platform handling high-volume transactional messages.", "Developed real-time survey platform serving 10,000+ daily users."] },
  ],
  skills: [
    { category: "Languages", tags: ["Golang", "TypeScript", "Python", "Bash"] },
    { category: "Containers & Orchestration", tags: ["Docker", "Kubernetes", "K3s", "Helm", "EKS", "Kustomization"] },
    { category: "Infrastructure & IaC", tags: ["Terraform", "AWS CDK", "Load Balancing", "Infrastructure Automation"] },
    { category: "Cloud Platforms", tags: ["AWS", "DigitalOcean", "Hetzner", "EC2", "S3", "Route53", "Lambda"] },
    { category: "CI/CD & DevOps", tags: ["GitHub Actions", "Jenkins", "GitLab CI"] },
    { category: "Observability", tags: ["Prometheus", "Grafana", "Alerting", "Metrics Collection"] },
    { category: "Databases & Caching", tags: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "ElasticSearch"] },
    { category: "Networking", tags: ["Caddy", "Nginx", "Tailscale", "Headscale", "TLS/SSL"] },
    { category: "Frontend", tags: ["React.js", "Next.js", "Tailwind CSS"] },
  ],
};

export function Resume() {
  const [data, setData] = useState(STATIC);

  useEffect(() => {
    fetch('/api/resume')
      .then(r => r.json())
      .then(j => {
        if (j.data) {
          setData({
            infraProjects: j.data.infraProjects?.length ? j.data.infraProjects : STATIC.infraProjects,
            experience:    j.data.experience?.length    ? j.data.experience    : STATIC.experience,
            skills:        j.data.skills?.length        ? j.data.skills        : STATIC.skills,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <article className={ARTICLE}>
      <header className="mb-8">
        <h2 className="text-4xl lg:text-5xl font-signature font-bold capitalize relative pb-3 text-foreground flex items-center gap-4">
          Resume
          <div className="flex-1 h-[3px] bg-foreground mt-2" />
        </h2>
      </header>

      {/* Cloud & Infra Projects */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-card sketch-border flex items-center justify-center text-foreground"><GraduationCap size={24} /></div>
          <h3 className="text-3xl lg:text-4xl font-signature font-bold text-foreground">Cloud & Infra Projects</h3>
        </div>
        <ol className="ml-6 border-l-2 border-foreground border-dashed pl-8 space-y-10">
          {data.infraProjects.map((item, idx) => (
            <li key={idx} className="relative group">
              <div className="absolute -left-[41px] top-[6px] w-[18px] h-[18px] bg-background border-[3px] border-foreground group-hover:bg-foreground transition-all duration-300" />
              <h4 className="font-signature font-bold text-2xl text-foreground mb-1">{item.title}</h4>
              <span className="text-muted text-xs lg:text-sm font-bold tracking-widest block mb-2 uppercase">{item.period}</span>
              <p className="text-muted font-light leading-relaxed text-sm lg:text-base">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-card sketch-border flex items-center justify-center text-foreground"><Briefcase size={24} /></div>
          <h3 className="text-3xl lg:text-4xl font-signature font-bold text-foreground">Experience</h3>
        </div>
        <ol className="ml-6 border-l-2 border-foreground border-dashed pl-8 space-y-10">
          {data.experience.map((item, idx) => (
            <li key={idx} className="relative group">
              <div className="absolute -left-[41px] top-[6px] w-[18px] h-[18px] bg-background border-[3px] border-foreground group-hover:bg-foreground transition-all duration-300" />
              <h4 className="font-signature font-bold text-2xl text-foreground mb-0.5">{item.title}</h4>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-foreground text-sm font-bold">{item.company}</span>
                <span className="text-muted text-xs">·</span>
                <span className="text-muted text-xs lg:text-sm font-bold tracking-widest uppercase">{item.period}</span>
              </div>
              <ul className="space-y-1">
                {item.points.filter(Boolean).map((p, i) => (
                  <li key={i} className="text-muted font-light leading-relaxed text-sm lg:text-base flex gap-2">
                    <span className="text-foreground shrink-0 mt-1">—</span>{p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section>
        <h3 className={SECTION_TITLE}><span className="text-2xl">✦</span> My skills</h3>
        <div className="space-y-4">
          {data.skills.map((group, idx) => (
            <div key={idx} className="sketch-border bg-card p-4 hover:bg-primary-light transition-colors duration-200">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-3">{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-bold px-3 py-1 border-2 border-foreground text-foreground bg-background hover:bg-foreground hover:text-background transition-all duration-200 cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
