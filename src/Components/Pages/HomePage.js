import React,{useEffect} from 'react'
import LoginPage from '../Authentication/LoginPage'
import SignUpPage from '../Authentication/SignUpPage'

import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
//Box-->same like div
const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user){
      navigate("/chats"); //iif user loged in then push him to chats page.
    }
  }, [navigate]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3} //padding
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          color="violet"
          fontFamily="Work sans">Talk A Tive</Text>
      </Box>

      <Box
        d="flex"
        justifyContent="center"
        p={4} //padding
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidht="1px"
        color="black"
      >
{/*mb-->margin bottom */}
        <Tabs variant='soft-rounded' width="100%">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
               <LoginPage/>
            </TabPanel>
            <TabPanel>
               <SignUpPage/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage;