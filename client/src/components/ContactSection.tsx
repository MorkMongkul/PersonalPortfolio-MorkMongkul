import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { socialLinks, contactInfo } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import SplineScene from "./SplineScene";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    try {
      // Send email using a service like EmailJS or your own backend
      const emailData = {
        to_email: contactInfo.email,
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      };

      // Send data to your backend API
      await apiRequest('POST', '/api/contact', emailData);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting me. I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative min-h-screen bg-[#E8E9F3] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <SplineScene />
      </div>
      
      {/* Social Icons - centered on the page */}
      <div className="absolute top-[45%] left-[52.5%] transform -translate-x-1/2 z-20">
        <div className="flex gap-6">
          <a 
            href={`mailto:${contactInfo.email}`}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all transform hover:scale-110 shadow-lg"
            aria-label="Email"
          >
            <i className="fa-solid fa-envelope text-xl"></i>
          </a>
          <a 
            href={contactInfo.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-[#0088cc] hover:text-white transition-all transform hover:scale-110 shadow-lg"
            aria-label="Telegram"
          >
            <i className="fa-brands fa-telegram text-xl"></i>
          </a>
          <a 
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all transform hover:scale-110 shadow-lg"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin-in text-xl"></i>
          </a>
          <a 
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-[#333] hover:text-white transition-all transform hover:scale-110 shadow-lg"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github text-xl"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
