import { Button, Container, Text } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase'

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth)
    const [userData, setUserData] = useState()

    const getUserInfo = async () => {
        try{
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setUserData(data)
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        if(!user) navigate('/')
        getUserInfo();
    }, [user, loading])

  return (
      <Container centerContent>
          <Text fontSize='4xl'>Welcome Back, {userData?.name}!</Text>
          <Button onClick={() => signOut(auth)}>SignOut</Button>
      </Container>
  )
}

export default Dashboard