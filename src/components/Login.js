import { Box, Button, Container, FormControl, FormLabel, Img, Input, InputGroup, InputRightElement, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmail, registerWithEmail } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [show, setShow] = useState(false);
  const [uname, setUname] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate();

  useEffect(() => {
    if(user) navigate('/dashboard')
  }, [user, loading])

  return (
    <Box height='100vh' display='flex'>
      <Box width='100%' p='16' height='100vh' overflow='hidden'>
        <Img src={require('../images/bannerImage.png')} objectFit="cover" />
      </Box>
      <Box width='100%' display='flex' flexDirection='column' justifyContent='center' back='true'>
        <div>
          <Text fontSize='2xl' color='rgb(0,0,0,0.7)' fontWeight='bold'>Get more things done with us!</Text>
        </div>
        <div style={{marginTop: 16}}>
          <Tabs onChange={() => {setUname(); setPassword(); setName();}} variant='soft-rounded' colorScheme='blue' >
            <TabList>
              <Tab>Sign In</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <FormControl>
                  <div style={{marginTop:16}}>
                    <FormLabel htmlFor='uname'>Username</FormLabel>
                    <Input id='uname' value={uname} type='email' maxW='sm' onChange={(e) => setUname(e.target.value)} />
                  </div>
                  <div style={{marginTop:16}}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <InputGroup size='md' maxW='sm'>
                      <Input id='password' value={password} type={show ? 'text' : 'password'} maxW='sm' onChange={(e) => setPassword(e.target.value)} />
                      <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
                      </InputRightElement>
                    </InputGroup>
                  </div>
                </FormControl>
                <Button size='lg' marginTop='8' width='200px' colorScheme='blue' onClick={() => logInWithEmail(uname, password)}
                  isLoading={loading}
                  loadingText="Logging In"
                >Login</Button>
              </TabPanel>
              <TabPanel>
                <FormControl>
                  <div style={{marginTop:16}}>
                    <FormLabel htmlFor='uname'>Name</FormLabel>
                    <Input id='name' defaultValue={name} type='text' maxW='sm' onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div style={{marginTop:16}}>
                    <FormLabel htmlFor='uname'>Username</FormLabel>
                    <Input id='uname' value={uname} type='email' maxW='sm' onChange={(e) => setUname(e.target.value)} />
                  </div>
                  <div style={{marginTop:16}}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <InputGroup size='md' maxW='sm'>
                      <Input id='password' value={password} type={show ? 'text' : 'password'} maxW='sm' onChange={(e) => setPassword(e.target.value)} />
                      <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
                      </InputRightElement>
                    </InputGroup>
                  </div>
                </FormControl>
                <Button size='lg' marginTop='8' width='200px' colorScheme='green' onClick={() => registerWithEmail(name, uname, password)}>Register</Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </Box>
    </Box>
  )
}

export default Login