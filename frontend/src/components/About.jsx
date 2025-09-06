// import placeHolderForImage from "../assets/sliders/1.jpg";

// const About = () => {
//     return (
//         <div>
//             About
//             <div>
                
//             </div>
//         </div>
//     )
// }

// export default About;
import { 
  Container, 
  Typography, 
  Box, 
  Avatar, 
  Chip, 
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  Stack
} from '@mui/material';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import placeHolderForImage from "../assets/images/linkedIn image.jpeg"

const About = () => {
  const personalInfo = {
    name: "Lior Erez",
    title: "Computer Science Graduate",
    email: "liorerez6@gmail.com",
    github: "https://github.com/liorerez7/sb-ecom",
    linkedin: "https://www.linkedin.com/in/liorerez100/",
    bio:
      "I built a full E-Commerce web application with both backend and frontend. On the backend, I used Java with Spring Boot, Spring Security, and JWT for authentication, along with MySQL and JPA/Hibernate for database management. On the frontend, I developed with React, Redux Toolkit for state management, TailwindCSS for responsive design, and Axios for API integration. I also integrated Stripe for payments and created separate interfaces for customers and administrators (User Panel and Admin Panel).",
    skills: [
      "Java", "Spring Boot", "Spring Security", "JWT",
      "MySQL", "JPA/Hibernate",
      "React", "Redux Toolkit", "TailwindCSS", "Axios",
      "Stripe", "REST APIs"
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
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

      <Grid container spacing={4} justifyContent="center">
        {/* About Me Card */}
        <Grid item xs={12} lg={8}>
          <Card 
            elevation={2}
            sx={{ 
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': { 
                elevation: 6,
                transform: 'translateY(-2px)'
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography 
                variant="h4" 
                component="h2" 
                align="center" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3, 
                  color: 'text.primary',
                  fontSize: { xs: '1.8rem', md: '2.1rem' }
                }}
              >
                About Me
              </Typography>

              <Typography
                variant="body1"
                sx={{ 
                  color: 'text.secondary', 
                  lineHeight: 1.7, 
                  mb: 4,
                  textAlign: 'justify',
                  fontSize: '1.1rem'
                }}
              >
                {personalInfo.bio}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography 
                variant="h5" 
                component="h3" 
                align="center" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3, 
                  color: 'text.primary',
                  fontSize: { xs: '1.4rem', md: '1.6rem' }
                }}
              >
                Technical Skills
              </Typography>

              <Box
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1.5, 
                  justifyContent: 'center',
                  mt: 2
                }}
              >
                {personalInfo.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    variant="outlined"
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      py: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        backgroundColor: 'primary.main', 
                        color: 'white',
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Card */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card 
              elevation={2}
              sx={{ 
                width: '100%', 
                maxWidth: 400,
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
                    color: 'text.primary',
                    fontSize: { xs: '1.4rem', md: '1.6rem' }
                  }}
                >
                  Get In Touch
                </Typography>

                <Stack spacing={2.5}>
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
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-1px)',
                        boxShadow: 2
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
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-1px)',
                        boxShadow: 2
                      }
                    }}
                  >
                    GitHub Repository
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
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-1px)',
                        boxShadow: 2
                      }
                    }}
                  >
                    LinkedIn Profile
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;