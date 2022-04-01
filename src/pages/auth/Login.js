import { Box, Button, FormControl, FormLabel, Img, Input, InputGroup, InputRightElement, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../configs/firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

const Login = () => {
  const [show, setShow] = useState(false);
  const [uname, setUname] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth)
  const toast = useToast()

  useEffect(() => {
    if(user) navigate('/dashboard')
    if(error) console.log(error)
  }, [user, loading, error])

    const handleLogin = () => {
      setLoginLoading(true)
      signInWithEmailAndPassword(auth, uname, password)
        .then((cred) => {
            setLoginLoading(false)
            return cred
        })
        .catch((error) => {
            setLoginLoading(false)
            toast({
                title: 'Error!',
                description: error.code,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        })
    }

    const handleSignup = () => {
        setLoginLoading(true)
        createUserWithEmailAndPassword(auth, uname, password)
            .then((cred) => {
                setLoginLoading(false)
                toast({
                    title: 'User Registered',
                    description: 'user registration success',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
                let user = cred.user
                addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name,
                    authProvider: 'local',
                    uname
                })
            })
            .catch((error) => {
                setLoginLoading(false)
                toast({
                    title: 'Error:',
                    description: error.code,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                })
            })
    }

  return (
    <Box height='100vh' display='flex'>
      <Box width={['0%', '100%']} p='16' height='100vh' overflow='hidden'>
        <Img src={'https://user-images.githubusercontent.com/83634694/160562616-aeadf42d-2385-4da8-bba1-bfa4301499bd.png'} objectFit="cover"/>
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
                <Button size='lg' marginTop='8' width='200px' colorScheme='blue' onClick={handleLogin}
                  isLoading={loginLoading}
                  loadingText="Logging In..."
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
                <Button size='lg' marginTop='8' width='200px' colorScheme='green' onClick={handleSignup} isLoading={loginLoading} loadingText="Registering...">Register</Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </Box>
    </Box>
  )
}

export default Login