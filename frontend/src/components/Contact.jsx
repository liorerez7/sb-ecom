// import { useState } from "react";
// import { Button } from "@headlessui/react";
// import placeHolderForImage from "../assets/sliders/1.jpg";
// import { FaPhone } from "react-icons/fa";

// const Contact = () => {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         message: ""
//     });

//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Submitted:", form);
//         setForm({
//             name: "",
//             email: "",
//             message: ""
//         });
//     };

//     return (
//         <div>
//             Contact us
            
            

//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>
//                         Name
//                     </label>
//                     <input 
//                         type="text"
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         required
//                     />

//                     <label>
//                         Email
//                     </label>
//                     <input 
//                         type="email"
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         required
//                     />

//                     <label>
//                         Message
//                     </label>
//                     <input 
//                         type="text"
//                         name="message"
//                         value={form.message}
//                         onChange={handleChange}
//                         required
//                     />

//                     <Button type="submit">
//                         Submit
//                     </Button>

//                     <div>
//                         <h2>Contact information</h2>
//                         <FaPhone />
//                         <h3>phone number: 050-1234567</h3>
//                         <h3>Email: lior@gmail.com</h3>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Contact;

import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton
} from '@mui/material';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import toast from 'react-hot-toast';
import placeHolderForImage from "../assets/sliders/1.jpg";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // TODO: Replace with your actual contact information
    const contactInfo = {
      phone: "050-1234567", // Replace with your phone number
      email: "lior@gmail.com", // Replace with your email
      address: "Tel Aviv, Israel", // Replace with your location
      availability: "Available for opportunities", // Customize message
      github: "https://github.com/yourusername", // Your GitHub
      linkedin: "https://linkedin.com/in/yourusername" // Your LinkedIn
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            console.log("Submitted:", form);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            toast.success("Message sent successfully! I'll get back to you soon.");
            setForm({
                name: "",
                email: "",
                message: ""
            });
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="lg" className="py-8 md:py-16">
            {/* Page Header */}
            <Box className="text-center mb-12">
                <Typography 
                    variant="h2" 
                    component="h1" 
                    className="font-bold text-gray-800 mb-4"
                >
                    Get In Touch
                </Typography>
                <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    className="max-w-2xl mx-auto"
                >
                    Have a question about this project or interested in discussing opportunities? 
                    I'd love to hear from you!
                </Typography>
            </Box>

            <Grid container spacing={6}>
                {/* Contact Form */}
                <Grid item xs={12} md={8}>
                    <Card className="shadow-lg">
                        <CardContent className="p-6 md:p-8">
                            <Typography 
                                variant="h4" 
                                component="h2" 
                                className="font-semibold mb-6 text-gray-800"
                            >
                                Send Me a Message
                            </Typography>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <TextField
                                    fullWidth
                                    label="Your Name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    placeholder="Enter your full name"
                                    disabled={isSubmitting}
                                    className="bg-gray-50"
                                    InputLabelProps={{
                                        className: "text-gray-700"
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    placeholder="your.email@example.com"
                                    disabled={isSubmitting}
                                    className="bg-gray-50"
                                    InputLabelProps={{
                                        className: "text-gray-700"
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    multiline
                                    rows={6}
                                    placeholder="Tell me about your project, questions, or opportunities..."
                                    disabled={isSubmitting}
                                    className="bg-gray-50"
                                    InputLabelProps={{
                                        className: "text-gray-700"
                                    }}
                                />

                                <Button 
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={isSubmitting}
                                    startIcon={<FaPhone />}
                                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                                        '&:hover': {
                                            boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
                                        }
                                    }}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Contact Information */}
                <Grid item xs={12} md={4}>
                    <Card className="shadow-lg">
                        <CardContent className="p-6">
                            <Typography 
                                variant="h5" 
                                component="h2" 
                                className="font-semibold mb-6 text-gray-800"
                            >
                                Contact Information
                            </Typography>

                            <Box className="space-y-6">
                                {/* Phone */}
                                <Box className="flex items-start">
                                    <Box className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <FaPhone className="text-blue-600" />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" className="font-medium mb-1">
                                            Phone
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {contactInfo.phone}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Email */}
                                <Box className="flex items-start">
                                    <Box className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <FaEnvelope className="text-green-600" />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" className="font-medium mb-1">
                                            Email
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            color="text.secondary"
                                            className="break-all"
                                        >
                                            {contactInfo.email}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Location */}
                                <Box className="flex items-start">
                                    <Box className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <FaMapMarkerAlt className="text-purple-600" />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" className="font-medium mb-1">
                                            Location
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {contactInfo.address}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Availability */}
                                <Box className="flex items-start">
                                    <Box className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <FaClock className="text-orange-600" />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" className="font-medium mb-1">
                                            Status
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {contactInfo.availability}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Divider className="my-6" />

                            {/* Social Links */}
                            <Box>
                                <Typography 
                                    variant="h6" 
                                    className="font-medium mb-4 text-gray-800"
                                >
                                    Connect With Me
                                </Typography>
                                
                                <Box className="flex space-x-4">
                                    <IconButton
                                        href={contactInfo.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-100 hover:bg-gray-800 hover:text-white transition-all duration-200"
                                        aria-label="GitHub Profile"
                                    >
                                        <FaGithub size={20} />
                                    </IconButton>
                                    
                                    <IconButton
                                        href={contactInfo.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-200"
                                        aria-label="LinkedIn Profile"
                                    >
                                        <FaLinkedin size={20} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Response Time Card */}
                    <Card className="shadow-lg mt-4">
                        <CardContent className="p-6 text-center">
                            <Typography 
                                variant="h6" 
                                className="font-medium mb-2 text-gray-800"
                            >
                                Quick Response
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                I typically respond to messages within 24 hours. 
                                Looking forward to connecting with you!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Contact;