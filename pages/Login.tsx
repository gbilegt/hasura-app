import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Flex,
    Heading,
    Input,
    Button,
    useColorMode,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginPage() {
    const { toggleColorMode } = useColorMode()
    const formBackground = useColorModeValue("gray.100", "gray.700")
    const toast = useToast()
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [susername, setSUsername] = useState('');
    const [spassword, setSPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [register, setRegister] = useState(false);


    async function onSubmit(values:any) {
        console.log('orjil bn daa ---> ');
        const result:any = await signIn("credentials", {
            redirect: false,
            'email' : username,
            'password' : password,
         });
        console.log('error ---> ', result.status);
        
        if(result.status === 401) {
            toast({
                title: 'Анхааруулга',
                description: 'Та бүртгэлгүй байна.',
                status: 'warning',
                position: 'top-right',
                isClosable: true,
              })
        }
    }

    async function onRegister() {
        setRegister(false);
    }

    async function onSignIn() {
        setRegister(true);
    }

    async function onSignUp() {
        toast({
            title: 'Анхааруулга',
            description: 'Та бүртгүүлэх гэж байна уу?.',
            status: 'warning',
            position: 'top-right',
            isClosable: true,
          })
    }

    return (
         <form onSubmit={handleSubmit(onSubmit)}>
            <Flex height="100vh" alignItems="center" justifyContent="center">
                <Flex direction="column" bgColor={formBackground} p={12} rounded={6} hidden={register}>
                    <Heading mb={6}>Log in</Heading>
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
                    <Button type="button" mb={3} colorScheme="blue" onClick={onRegister}>Sign up</Button>
                    <Button onClick={toggleColorMode}>Mode</Button>
                </Flex>
                
                <Flex direction="column" bgColor={formBackground} p={12} rounded={6} hidden={!register}>
                    <Heading mb={6}>Sign up</Heading>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input name="susername" mb={3} placeholder="test.t@render.mn" variant="filled" type="email" 
                        onChange={event => setSUsername(event.currentTarget.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input name="spassword" mb={6} placeholder="*******" variant="filled" type="password" 
                        onChange={event => setSPassword(event.currentTarget.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input name="confirmPassword" mb={6} placeholder="*******" variant="filled" type="password"
                        onChange={event => setConfirmPassword(event.currentTarget.value)}/>
                    </FormControl>
                    <Button type="button" mb={2} colorScheme="teal" onClick={onSignUp}>Submit</Button>
                    <Button type="button" mb={3} colorScheme="blue" onClick={onSignIn}>Log in</Button>
                    <Button onClick={toggleColorMode}>Mode</Button>
                </Flex>

            </Flex>
        </form>
    );
}