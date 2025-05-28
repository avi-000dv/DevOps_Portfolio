"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import SkillBadge from "@/components/skill-badge"
import ProjectCard from "@/components/project-card"
import { ThemeToggle } from "@/components/theme-toggle"
import HexagonBackground from "@/components/hexagon-background"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Code2, Database, Facebook, Github, Gitlab, Globe, Layers, Linkedin, Mail, Server, Twitter } from "lucide-react"
import ContactForm from "@/components/contact-forn"
import Image from "next/image"


const Home = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0.2])

  // Refs for sections to detect when they're in view
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  const aboutInView = useInView(aboutRef, { amount: 0.3 })
  const skillsInView = useInView(skillsRef, { amount: 0.3 })
  const projectsInView = useInView(projectsRef, { amount: 0.3 })
  const contactInView = useInView(contactRef, { amount: 0.3 })

  // Update active section based on scroll position
  useEffect(() => {
    if (contactInView) setActiveSection("contact")
    else if (projectsInView) setActiveSection("projects")
    else if (skillsInView) setActiveSection("skills")
    else if (aboutInView) setActiveSection("about")
    else setActiveSection("hero")
  }, [aboutInView, skillsInView, projectsInView, contactInView])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  }

  const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 },
    },
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      <HexagonBackground />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50 dark:border-white/10 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ opacity }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              ChyDev
            </motion.span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: "About", href: "#about", section: "about" },
              { name: "Skills", href: "#skills", section: "skills" },
              { name: "Projects", href: "#projects", section: "projects" },
              { name: "Contact", href: "#contact", section: "contact" },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className={`text-sm transition-colors relative ${activeSection === item.section ? "text-cyan-400" : "hover:text-cyan-400"
                    }`}
                >
                  {item.name}
                  {activeSection === item.section && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div
            className="items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </motion.header>

      <section className="relative z-10 container pt-20 pb-16 md:pt-32 md:pb-24 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div
              variants={itemFadeIn}
              className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-xs font-medium"
            >
              DevOps Engineer & Entrepreneur
            </motion.div>
            <motion.h1 variants={itemFadeIn} className="text-4xl md:text-6xl font-bold leading-tight">
              Building{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500">
                infrastructure
              </span>{" "}
              for the decentralized future
            </motion.h1>
            <motion.p variants={itemFadeIn} className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
              Specializing in cloud architecture, CI/CD pipelines, and scalable infrastructure for Web3 projects.
            </motion.p>
            <motion.div variants={itemFadeIn} className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  View Projects
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div className="relative" variants={scaleUp} initial="hidden" animate="visible">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur-3xl opacity-30"></div>
            <motion.div
              className="relative aspect-square rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm overflow-hidden"
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image height={600} width={600} src="/avi.jpg" alt="Profile" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        ref={aboutRef}
        id="about"
        className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-purple-950/20"
      >
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              About Me
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 80, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            ></motion.div>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              I'm a DevOps Engineer and Entrepreneur with over 5 years of experience building and scaling infrastructure
              for startups and enterprises. My passion lies at the intersection of cloud architecture, automation, and
              blockchain technology.
            </motion.p>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              After leading DevOps teams at several tech companies, I founded my own consulting firm specializing in
              infrastructure solutions for Web3 projects. I help teams build reliable, secure, and scalable systems that
              can handle the demands of decentralized applications.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Server className="h-10 w-10 text-purple-500 mb-4" />,
                title: "Infrastructure",
                description:
                  "Designing and implementing cloud-native infrastructure using AWS, GCP, and Azure with a focus on security and scalability.",
              },
              {
                icon: <Code2 className="h-10 w-10 text-cyan-400 mb-4" />,
                title: "Automation",
                description:
                  "Building CI/CD pipelines and implementing Infrastructure as Code (IaC) using Terraform, Ansible, and Kubernetes.",
              },
              {
                icon: <Layers className="h-10 w-10 text-blue-500 mb-4" />,
                title: "Web3",
                description:
                  "Deploying and maintaining blockchain nodes, smart contract infrastructure, and decentralized storage solutions.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm"
                variants={itemFadeIn}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
                  borderColor: "rgba(147, 51, 234, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {item.icon}
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section ref={skillsRef} id="skills" className="relative z-10 py-16 md:py-24">
        <div className="container">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical Skills
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-16"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          ></motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Server className="mr-2 h-5 w-5 text-purple-500" />,
                title: "Cloud & Infrastructure",
                skills: [
                  "AWS",
                  "Google Cloud",
                  "Azure",
                  "Kubernetes",
                  "Docker",
                  "Linux",
                  "Proxmox",
                  "Prometheus",
                  "Grafana",
                ],
              },
              {
                icon: <Code2 className="mr-2 h-5 w-5 text-cyan-400" />,
                title: "CI/CD & Automation",
                skills: ["Jenkins", "GitHub Actions", "GitLab CI", "CircleCI", "Bash", "n8n", "Python", "Go"],
              },
              {
                icon: <Database className="mr-2 h-5 w-5 text-blue-500" />,
                title: "Databases & Storage",
                skills: ["PostgreSQL", "MongoDB", "Redis", "S3", "MariaDB", "SQLite", "MySQL", "Cassandra"],
              },
              {
                icon: <Globe className="mr-2 h-5 w-5 text-purple-500" />,
                title: "Frameworks",
                skills: ["Next.js", "React.js", "Vue.js", "Electron.js", "Tauri", "React Native", "Discord.js"],
              },
            ].map((category, index) => (
              <motion.div key={category.title} variants={itemFadeIn}>
                <motion.h3
                  className="text-xl font-bold mb-6 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  {category.icon}
                  {category.title}
                </motion.h3>
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          transition: { delay: 0.05 * skillIndex },
                        },
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SkillBadge name={skill} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={projectsRef}
        id="projects"
        className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-purple-950/20 dark:to-black"
      >
        <div className="container">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Project & Collaborations
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-16"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          ></motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {[
              {
                title: "iChico Solutions",
                description:
                  "​iChico Solutions is a company that offers advanced enterprise software solutions aimed at transforming business operations.",
                tags: ["AWS", "Docker", "Kubernetes", "MongoDB", "Next.js", "Tauri", "Nodejs", "Golang", "Rust", "SaaS", "Web", "Software"],
                image: "/iChico_400x600.jpg",
              },
              {
                title: "Codebility",
                description:
                  "Codebility is a leading web development startup offering innovative digital solutions and staff augmentation services to clients worldwide.",
                tags: ["Next.js", "Supabase", "Web"],
                image: "/Codebility_400x600.jpg",
              },
              {
                title: "Go Digital",
                description:
                  "Go Digital is a future-focused company turning ideas into smart digital solutions. We help businesses streamline operations, enhance customer experiences.",
                tags: ["Next.js", "Nodejs", "Web"],
                image: "/placeholder.svg?height=400&width=600",
              },
              {
                title: "Next Nexus App",
                description:
                  "Next Nexus App is a comprehensive production-ready application starter template designed for rapid development.",
                tags: ["Next.js", "Express.js", "Docker", "Web"],
                image: "/placeholder.svg?height=400&width=600",
              },
              {
                title: "CapybaraBOT",
                description: "All Purpose Discord BOT",
                tags: ["Discord.js", "SQLite", "Lavalink", "System"],
                image: "/placeholder.svg?height=400&width=600",
              },
              {
                title: "Kaalaman AI",
                description: "Kaalaman AI is an open source web app chat system that use GPT-Generated Unified Format",
                tags: ["Next.js", "Fastify", "LLM", "GPT", "GGUF"],
                image: "/placeholder.svg?height=400&width=600",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemFadeIn}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section ref={contactRef} id="contact" className="relative z-10 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Get In Touch
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-16"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 80, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            ></motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.div className="space-y-6" variants={itemFadeIn}>
                <h3 className="text-xl font-bold">Contact Information</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  I'm currently available for freelance work and consulting. If you have a project that needs
                  infrastructure expertise, let's talk!
                </p>

                <motion.div className="space-y-4" variants={staggerContainer}>
                  {[
                    { icon: <Mail className="h-5 w-5 text-purple-500 mr-3" />, text: "Johnlayda92@gmail.com" },
                    { icon: <Globe className="h-5 w-5 text-cyan-400 mr-3" />, text: "chysev.cloud" },
                  ].map((item, index) => (
                    <motion.div key={index} className="flex items-center" variants={itemFadeIn} whileHover={{ x: 5 }}>
                      {item.icon}
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div className="flex gap-4 pt-4" variants={staggerContainer}>
                  {[
                    { icon: <Github className="h-5 w-5" />, label: "GitHub", url: "https://github.com/Chysev" },
                    { icon: <Facebook className="h-5 w-5" />, label: "Facbook", url: "https://www.facebook.com/Chysev" },
                  ].map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.url}
                      className="p-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                      variants={itemFadeIn}
                      whileHover={{
                        scale: 1.2,
                        rotate: 5,
                        backgroundColor: "rgba(147, 51, 234, 0.1)",
                        borderColor: "rgba(147, 51, 234, 0.5)",
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {item.icon}
                      <span className="sr-only">{item.label}</span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <ContactForm />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="relative z-10 border-t border-gray-200 dark:border-white/10 py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="mb-4 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/" className="text-xl font-bold tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500">
                  ChyDev
                </span>
              </Link>
            </motion.div>
            <motion.div
              className="text-sm text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              © {new Date().getFullYear()} All rights reserved.
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Home

