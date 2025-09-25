import {
    Container,
    Typography,
    Box,
    Avatar,
    Grid,
    Card,
    CardContent,
    Button,
    Stack,
    Paper
} from '@mui/material';
import { FaGithub, FaLinkedin, FaEnvelope, FaServer, FaReact, FaDatabase, FaCloud, FaDocker } from 'react-icons/fa';
import placeHolderForImage from "../assets/images/linkedIn image.jpeg";

const About = () => {
    const personalInfo = {
        name: "Lior Erez",
        title: "Full-Stack Developer",
        email: "liorerez6@gmail.com",
        github: "https://github.com/liorerez7/sb-ecom",
        linkedin: "https://www.linkedin.com/in/liorerez100/"
    };
    const techStack = {
        backend: {
            title: "Backend & APIs",
            icon: <FaServer />,
            color: "#4F46E5",
            technologies: [
                { name: "Java 21" },
                { name: "Spring Boot 3.x" },
                { name: "Spring Security + JWT" },
                { name: "JPA/Hibernate" },
                { name: "Swagger/OpenAPI" }
            ]
        },
        frontend: {
            title: "Frontend & UI",
            icon: <FaReact />,
            color: "#06B6D4",
            technologies: [
                { name: "React.js + Vite" },
                { name: "Redux Toolkit" },
                { name: "Material-UI" },
                { name: "Tailwind CSS" },
                { name: "Axios" }
            ]
        },
        database: {
            title: "Database",
            icon: <FaDatabase />,
            color: "#DC2626",
            technologies: [
                { name: "MySQL" }
            ]
        },
        deployment: {
            title: "Deployment & Infrastructure",
            icon: <FaCloud />,
            color: "#059669",
            technologies: [
                { name: "AWS EC2" },
                { name: "Docker + Compose" },
                { name: "Nginx" },
                { name: "GitHub Actions" },
                { name: "Playwright" }
            ]
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Avatar
                    src={placeHolderForImage}
                    alt={`${personalInfo.name} - Developer`}
                    sx={{
                        width: { xs: 120, md: 150 },
                        height: { xs: 120, md: 150 },
                        mx: 'auto',
                        mb: 3,
                        border: 3,
                        borderColor: 'primary.main',
                        boxShadow: 3
                    }}
                />
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
                        fontSize: { xs: '1.2rem', md: '1.5rem' }
                    }}
                >
                    {personalInfo.title}
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

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid container spacing={4} sx={{ maxWidth: 1400 }}>
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

                                        <Stack spacing={1.5}>
                                            {section.technologies.map((tech, idx) => (
                                                <Typography
                                                    key={idx}
                                                    variant="subtitle2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: 'text.primary'
                                                    }}
                                                >
                                                    {tech.name}
                                                </Typography>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            {/* Docker Containerization */}
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
                    Multi-Service Docker Deployment
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            maxWidth: 800,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                elevation: 4,
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >
                        <Box sx={{ color: 'primary.main', fontSize: '3rem', mb: 3 }}>
                            <FaDocker />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                color: 'text.primary'
                            }}
                        >
                            Containerized Full-Stack Application
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                fontSize: '1rem',
                                lineHeight: 1.6
                            }}
                        >
                            Built individual Dockerfiles for Frontend (React), Backend (Spring Boot), and MySQL database.
                            Orchestrated all services using Docker Compose for seamless deployment on AWS EC2 with automated container management.
                        </Typography>
                    </Paper>
                </Box>
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