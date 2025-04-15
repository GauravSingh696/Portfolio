"use client";

import { Button, Input, Text, Background, Column, Heading } from "@/once-ui/components";
import { useState } from "react";
import emailjs from "@emailjs/browser";

// Initialize EmailJS
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    query: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.query) {
      setError("Please fill in all required fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.query,
        to_name: formData.name,
        to_email: formData.email, // your own email
        user_email: formData.email     // for auto-reply to user
      };

      if (
        !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
        !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      ) {
        throw new Error("Email service configuration is missing");
      }

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setSuccess(true);
        setFormData({ name: "", phone: "", email: "", query: "" });
      } else {
        setError("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred while sending the message. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  return (
    <Column
      overflow="hidden"
      position="relative"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-medium"
    >
      <Background
        mask={{ cursor: false, x: 100, y: 0, radius: 100 }}
        gradient={{
          display: true,
          x: 100,
          y: 50,
          width: 100,
          height: 100,
          tilt: -45,
          colorStart: "accent-background-strong",
          colorEnd: "static-transparent",
          opacity: 100
        }}
        grid={{
          display: true,
          color: "neutral-alpha-weak",
          opacity: 100
        }}
      />
      <Heading style={{ position: "relative" }} marginBottom="s" variant="display-strong-xs">
        Contact Me
      </Heading>
      <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)"
        }}
        wrap="balance"
        marginBottom="l"
        onBackground="neutral-medium"
      >
        Feel free to reach out for collaboration, questions, or just a friendly tech chat.
      </Text>
      <form
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
        onSubmit={handleSubmit}
      >
        <Column fillWidth maxWidth={24} gap="8">
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} required disabled={loading} id="" />
          <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} type="tel" disabled={loading} id="" />
          <Input label="Email" name="email" value={formData.email} onChange={handleChange} type="email" required disabled={loading} id="" />
          <Input label="Query" name="query" value={formData.query} onChange={handleChange} required disabled={loading} id="" />
          {error && (
            <Text variant="body-default-s" onBackground="danger-strong">
              {error}
            </Text>
          )}
          {success && (
            <Text variant="body-default-s" onBackground="success-strong">
              Thank you! Your message has been sent successfully.
            </Text>
          )}
          <Button type="submit" size="m" fillWidth disabled={loading}>
            {loading ? "Sending..." : "Contact Us"}
          </Button>
        </Column>
      </form>
    </Column>
  );
};
