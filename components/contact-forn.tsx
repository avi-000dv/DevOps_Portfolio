"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { sendEmail } from "@/app/actions/sendEmail"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, Send, Loader2 } from "lucide-react"

const ContactForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await sendEmail({ name, email, message })
            setStatus(res.success ? "success" : "error")

            if (res.success) {
                setName("")
                setEmail("")
                setMessage("")
            }
        } catch (error) {
            setStatus("error")
        } finally {
            setIsSubmitting(false)

            // Reset status after 5 seconds
            setTimeout(() => {
                setStatus(null)
            }, 5000)
        }
    }

    const inputVariants = {
        focus: { scale: 1.02, borderColor: "#9333ea", transition: { duration: 0.2 } },
        blur: { scale: 1, borderColor: "", transition: { duration: 0.2 } },
    }

    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    }

    const statusVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 500, damping: 30 },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.2 },
        },
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold">Send a Message</h3>
            <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                variants={formVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                    </label>
                    <motion.input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your name"
                        required
                        whileFocus="focus"
                        whileTap="focus"
                        variants={inputVariants}
                        disabled={isSubmitting}
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                    </label>
                    <motion.input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your email"
                        required
                        whileFocus="focus"
                        whileTap="focus"
                        variants={inputVariants}
                        disabled={isSubmitting}
                    />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                    </label>
                    <motion.textarea
                        id="message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your message"
                        required
                        whileFocus="focus"
                        whileTap="focus"
                        variants={inputVariants}
                        disabled={isSubmitting}
                    ></motion.textarea>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 relative overflow-hidden"
                        disabled={isSubmitting}
                    >
                        <AnimatePresence mode="wait">
                            {isSubmitting ? (
                                <motion.div
                                    key="submitting"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center"
                                >
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="send"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center"
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Message
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>
                </motion.div>

                <AnimatePresence>
                    {status && (
                        <motion.div
                            variants={statusVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`p-3 rounded-lg flex items-center ${status === "success"
                                ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                                : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                                }`}
                        >
                            {status === "success" ? (
                                <>
                                    <CheckCircle className="h-5 w-5 mr-2" />
                                    <span>Message sent successfully!</span>
                                </>
                            ) : (
                                <>
                                    <XCircle className="h-5 w-5 mr-2" />
                                    <span>Failed to send message. Please try again.</span>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.form>
        </div>
    )
}

export default ContactForm

