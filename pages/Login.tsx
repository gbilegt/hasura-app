import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Flex,
    Heading,
    Input,
    Button,
    useColorMode,
    useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import { signIn, signOut, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
    const { toggleColorMode } = useColorMode()
    const formBackground = useColorModeValue("gray.100", "gray.700")
   
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
       try {
           const result = signIn("credentials", {
               redirect: false,
               'username' : username,
               'password' : password,
            });

            console.log("res ------->" + result); 
            
        } catch (error) {
            console.log('error ---> ', error);
       }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Flex direction="column" bgColor={formBackground} p={12} rounded={6}>
                    <Heading mb={6}>Sign in</Heading>
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input name="username" mb={3} placeholder="test.t@render.mn" variant="filled" type="email" 
                        onChange={event => setUsername(event.currentTarget.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input name="password" mb={6} placeholder="*******" variant="filled" type="password" 
                        onChange={event => setPassword(event.currentTarget.value)}/>
                    </FormControl>
                    <Button type="submit" mb={2} colorScheme="teal">Log in</Button>
                    <Button mb={3} colorScheme="blue">Sign up</Button>
                    <Button onClick={toggleColorMode}>Mode</Button>
                </Flex>
            </Flex>
        </form>
    );
}