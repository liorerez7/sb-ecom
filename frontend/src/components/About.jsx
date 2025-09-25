// import {
//   Container,
//   Typography,
//   Box,
//   Avatar,
//   Chip,
//   Grid,
//   Card,
//   CardContent,
//   Divider,
//   Button,
//   Stack
// } from '@mui/material';
// import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
// import placeHolderForImage from "../assets/images/linkedIn image.jpeg"
//
// const About = () => {
//   const personalInfo = {
//     name: "Lior Erez",
//     title: "Computer Science Graduate",
//     email: "liorerez6@gmail.com",
//     github: "https://github.com/liorerez7/sb-ecom",
//     linkedin: "https://www.linkedin.com/in/liorerez100/",
//     bio:
//       "I built a full E-Commerce web application with both backend and frontend. On the backend, I used Java with Spring Boot, Spring Security, and JWT for authentication, along with MySQL and JPA/Hibernate for database management. On the frontend, I developed with React, Redux Toolkit for state management, TailwindCSS for responsive design, and Axios for API integration. I also integrated Stripe for payments and created separate interfaces for customers and administrators (User Panel and Admin Panel).",
//     skills: [
//       "Java", "Spring Boot", "Spring Security", "JWT",
//       "MySQL", "JPA/Hibernate",
//       "React", "Redux Toolkit", "TailwindCSS", "Axios",
//       "Stripe", "REST APIs"
//     ]
//   };
//
//   return (
//     <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
//       {/* Hero Section */}
//       <Box sx={{ textAlign: 'center', mb: 6 }}>
//         <Avatar
//           src={placeHolderForImage}
//           alt={`${personalInfo.name} - Developer`}
//           sx={{
//             width: { xs: 120, md: 150 },
//             height: { xs: 120, md: 150 },
//             mx: 'auto',
//             mb: 3,
//             border: 3,
//             borderColor: 'primary.main',
//             boxShadow: 3
//           }}
//         />
//         <Typography
//           variant="h3"
//           component="h1"
//           sx={{
//             fontWeight: 'bold',
//             color: 'text.primary',
//             mb: 1,
//             fontSize: { xs: '2rem', md: '2.5rem' }
//           }}
//         >
//           {personalInfo.name}
//         </Typography>
//         <Typography
//           variant="h5"
//           color="text.secondary"
//           sx={{
//             fontWeight: 400,
//             fontSize: { xs: '1.2rem', md: '1.5rem' }
//           }}
//         >
//           {personalInfo.title}
//         </Typography>
//       </Box>
//
//       <Grid container spacing={4} justifyContent="center">
//         {/* About Me Card */}
//         <Grid item xs={12} lg={8}>
//           <Card
//             elevation={2}
//             sx={{
//               height: '100%',
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 elevation: 6,
//                 transform: 'translateY(-2px)'
//               }
//             }}
//           >
//             <CardContent sx={{ p: 4 }}>
//               <Typography
//                 variant="h4"
//                 component="h2"
//                 align="center"
//                 sx={{
//                   fontWeight: 600,
//                   mb: 3,
//                   color: 'text.primary',
//                   fontSize: { xs: '1.8rem', md: '2.1rem' }
//                 }}
//               >
//                 About Me
//               </Typography>
//
//               <Typography
//                 variant="body1"
//                 sx={{
//                   color: 'text.secondary',
//                   lineHeight: 1.7,
//                   mb: 4,
//                   textAlign: 'justify',
//                   fontSize: '1.1rem'
//                 }}
//               >
//                 {personalInfo.bio}
//               </Typography>
//
//               <Divider sx={{ my: 3 }} />
//
//               <Typography
//                 variant="h5"
//                 component="h3"
//                 align="center"
//                 sx={{
//                   fontWeight: 600,
//                   mb: 3,
//                   color: 'text.primary',
//                   fontSize: { xs: '1.4rem', md: '1.6rem' }
//                 }}
//               >
//                 Technical Skills
//               </Typography>
//
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexWrap: 'wrap',
//                   gap: 1.5,
//                   justifyContent: 'center',
//                   mt: 2
//                 }}
//               >
//                 {personalInfo.skills.map((skill, index) => (
//                   <Chip
//                     key={index}
//                     label={skill}
//                     variant="outlined"
//                     sx={{
//                       borderColor: 'primary.main',
//                       color: 'primary.main',
//                       fontWeight: 500,
//                       fontSize: '0.9rem',
//                       py: 2,
//                       transition: 'all 0.2s ease',
//                       '&:hover': {
//                         backgroundColor: 'primary.main',
//                         color: 'white',
//                         transform: 'scale(1.05)'
//                       }
//                     }}
//                   />
//                 ))}
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//
//         {/* Contact Card */}
//         <Grid item xs={12} lg={4}>
//           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//             <Card
//               elevation={2}
//               sx={{
//                 width: '100%',
//                 maxWidth: 400,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   elevation: 6,
//                   transform: 'translateY(-2px)'
//                 }
//               }}
//             >
//               <CardContent sx={{ p: 4 }}>
//                 <Typography
//                   variant="h5"
//                   component="h2"
//                   align="center"
//                   sx={{
//                     fontWeight: 600,
//                     mb: 3,
//                     color: 'text.primary',
//                     fontSize: { xs: '1.4rem', md: '1.6rem' }
//                   }}
//                 >
//                   Get In Touch
//                 </Typography>
//
//                 <Stack spacing={2.5}>
//                   <Button
//                     variant="outlined"
//                     startIcon={<FaEnvelope />}
//                     component="a"
//                     href={`mailto:${personalInfo.email}`}
//                     fullWidth
//                     sx={{
//                       textTransform: 'none',
//                       py: 1.5,
//                       fontSize: '0.95rem',
//                       fontWeight: 500,
//                       borderColor: 'primary.main',
//                       color: 'primary.main',
//                       transition: 'all 0.2s ease',
//                       '&:hover': {
//                         backgroundColor: 'primary.main',
//                         color: 'white',
//                         transform: 'translateY(-1px)',
//                         boxShadow: 2
//                       }
//                     }}
//                   >
//                     {personalInfo.email}
//                   </Button>
//
//                   <Button
//                     variant="outlined"
//                     startIcon={<FaGithub />}
//                     component="a"
//                     href={personalInfo.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     fullWidth
//                     sx={{
//                       textTransform: 'none',
//                       py: 1.5,
//                       fontSize: '0.95rem',
//                       fontWeight: 500,
//                       borderColor: 'primary.main',
//                       color: 'primary.main',
//                       transition: 'all 0.2s ease',
//                       '&:hover': {
//                         backgroundColor: 'primary.main',
//                         color: 'white',
//                         transform: 'translateY(-1px)',
//                         boxShadow: 2
//                       }
//                     }}
//                   >
//                     GitHub Repository
//                   </Button>
//
//                   <Button
//                     variant="outlined"
//                     startIcon={<FaLinkedin />}
//                     component="a"
//                     href={personalInfo.linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     fullWidth
//                     sx={{
//                       textTransform: 'none',
//                       py: 1.5,
//                       fontSize: '0.95rem',
//                       fontWeight: 500,
//                       borderColor: 'primary.main',
//                       color: 'primary.main',
//                       transition: 'all 0.2s ease',
//                       '&:hover': {
//                         backgroundColor: 'primary.main',
//                         color: 'white',
//                         transform: 'translateY(-1px)',
//                         boxShadow: 2
//                       }
//                     }}
//                   >
//                     LinkedIn Profile
//                   </Button>
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };
//
// export default About;

import {
    Container,
    Typography,
    Box,
    Avatar,
    Grid,
    Card,
    CardContent,
    Divider,
    Button,
    Stack,
    Paper
} from '@mui/material';
import { FaGithub, FaLinkedin, FaEnvelope, FaServer, FaReact, FaDatabase, FaCloud, FaShieldAlt, FaCreditCard } from 'react-icons/fa';
import { SiSpringboot, SiMysql, SiRedux, SiTailwindcss, SiDocker, SiAmazonaws, SiNginx } from 'react-icons/si';

const About = () => {
    const personalInfo = {
        name: "Lior Erez",
        title: "Full-Stack Developer",
        email: "liorerez6@gmail.com",
        github: "https://github.com/liorerez7/sb-ecom",
        linkedin: "https://www.linkedin.com/in/liorerez100/",
        bio: "Computer Science graduate with hands-on experience in building complete web applications. This e-commerce platform demonstrates proficiency in modern development practices, from secure backend APIs to responsive frontend interfaces and cloud deployment."
    };

    const techStack = {
        backend: {
            title: "Backend & APIs",
            icon: <FaServer />,
            color: "#4F46E5",
            technologies: [
                { name: "Java 21", desc: "Core backend language" },
                { name: "Spring Boot 3.x", desc: "REST API framework" },
                { name: "Spring Security + JWT", desc: "Authentication & authorization" },
                { name: "JPA/Hibernate", desc: "Database ORM" },
                { name: "Swagger/OpenAPI", desc: "API documentation" }
            ]
        },
        frontend: {
            title: "Frontend & UI",
            icon: <FaReact />,
            color: "#06B6D4",
            technologies: [
                { name: "React.js + Vite", desc: "Modern UI framework" },
                { name: "Redux Toolkit", desc: "State management" },
                { name: "Material-UI", desc: "Component library" },
                { name: "Tailwind CSS", desc: "Utility-first styling" },
                { name: "Axios", desc: "HTTP client" }
            ]
        },
        database: {
            title: "Database",
            icon: <FaDatabase />,
            color: "#DC2626",
            technologies: [
                { name: "MySQL", desc: "Relational database" },
                { name: "JPA Repositories", desc: "Data access layer" }
            ]
        },
        deployment: {
            title: "Deployment & DevOps",
            icon: <FaCloud />,
            color: "#059669",
            technologies: [
                { name: "AWS EC2", desc: "Cloud hosting" },
                { name: "Docker + Compose", desc: "Containerization" },
                { name: "Nginx", desc: "Reverse proxy & static files" },
                { name: "GitHub Actions", desc: "CI/CD pipeline" },
                { name: "Playwright", desc: "E2E testing" }
            ]
        }
    };

    const projectHighlights = [
        { icon: <FaShieldAlt />, title: "Secure Authentication", desc: "JWT-based auth system with Spring Security" },
        { icon: <FaCreditCard />, title: "Payment Integration", desc: "Stripe API for secure transactions" },
        { icon: <SiDocker />, title: "Full Containerization", desc: "Docker setup for all services" },
        { icon: <FaCloud />, title: "Cloud Deployment", desc: "Production-ready AWS deployment" }
    ];

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Avatar
                    alt={`${personalInfo.name} - Developer`}
                    sx={{
                        width: { xs: 120, md: 150 },
                        height: { xs: 120, md: 150 },
                        mx: 'auto',
                        mb: 3,
                        border: 3,
                        borderColor: 'primary.main',
                        boxShadow: 3,
                        bgcolor: 'primary.main',
                        fontSize: '3rem',
                        fontWeight: 'bold'
                    }}
                >
                    LE
                </Avatar>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                        mb: 1,
                        fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                >
                    {personalInfo.name}
                </Typography>
                <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{
                        fontWeight: 400,
                        fontSize: { xs: '1.2rem', md: '1.5rem' },
                        mb: 3
                    }}
                >
                    {personalInfo.title}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        maxWidth: 600,
                        mx: 'auto',
                        fontSize: '1.1rem',
                        lineHeight: 1.6
                    }}
                >
                    {personalInfo.bio}
                </Typography>
            </Box>

            {/* Project Architecture */}
            <Box sx={{ mb: 8 }}>
                <Typography
                    variant="h4"
                    component="h2"
                    align="center"
                    sx={{
                        fontWeight: 600,
                        mb: 6,
                        color: 'text.primary'
                    }}
                >
                    E-Commerce Platform Architecture
                </Typography>

                <Grid container spacing={4}>
                    {Object.entries(techStack).map(([key, section]) => (
                        <Grid item xs={12} md={6} lg={3} key={key}>
                            <Card
                                elevation={2}
                                sx={{
                                    height: '100%',
                                    border: 2,
                                    borderColor: 'transparent',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        elevation: 8,
                                        borderColor: section.color,
                                        transform: 'translateY(-4px)'
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Box
                                            sx={{
                                                color: section.color,
                                                fontSize: '1.5rem',
                                                mr: 2
                                            }}
                                        >
                                            {section.icon}
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: section.color
                                            }}
                                        >
                                            {section.title}
                                        </Typography>
                                    </Box>

                                    <Stack spacing={2}>
                                        {section.technologies.map((tech, idx) => (
                                            <Box key={idx}>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: 'text.primary',
                                                        mb: 0.5
                                                    }}
                                                >
                                                    {tech.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    {tech.desc}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Project Highlights */}
            <Box sx={{ mb: 8 }}>
                <Typography
                    variant="h5"
                    component="h3"
                    align="center"
                    sx={{
                        fontWeight: 600,
                        mb: 4,
                        color: 'text.primary'
                    }}
                >
                    Key Features Implemented
                </Typography>

                <Grid container spacing={3}>
                    {projectHighlights.map((highlight, idx) => (
                        <Grid item xs={12} sm={6} md={3} key={idx}>
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    height: '100%',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        elevation: 4,
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                <Box sx={{ color: 'primary.main', fontSize: '2rem', mb: 2 }}>
                                    {highlight.icon}
                                </Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 1,
                                        fontSize: '1rem'
                                    }}
                                >
                                    {highlight.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: '0.9rem' }}
                                >
                                    {highlight.desc}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Contact Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                    elevation={2}
                    sx={{
                        maxWidth: 400,
                        width: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            elevation: 6,
                            transform: 'translateY(-2px)'
                        }
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            align="center"
                            sx={{
                                fontWeight: 600,
                                mb: 3,
                                color: 'text.primary'
                            }}
                        >
                            Connect & Explore
                        </Typography>

                        <Stack spacing={2}>
                            <Button
                                variant="outlined"
                                startIcon={<FaEnvelope />}
                                component="a"
                                href={`mailto:${personalInfo.email}`}
                                fullWidth
                                sx={{
                                    textTransform: 'none',
                                    py: 1.5,
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    justifyContent: 'flex-start',
                                    borderRadius: 2,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        transform: 'translateX(4px)'
                                    }
                                }}
                            >
                                {personalInfo.email}
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<FaGithub />}
                                component="a"
                                href={personalInfo.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                fullWidth
                                sx={{
                                    textTransform: 'none',
                                    py: 1.5,
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    justifyContent: 'flex-start',
                                    borderRadius: 2,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        transform: 'translateX(4px)'
                                    }
                                }}
                            >
                                View Source Code
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={<FaLinkedin />}
                                component="a"
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                fullWidth
                                sx={{
                                    textTransform: 'none',
                                    py: 1.5,
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    justifyContent: 'flex-start',
                                    borderRadius: 2,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        transform: 'translateX(4px)'
                                    }
                                }}
                            >
                                LinkedIn Profile
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default About;