import React from 'react'
import { useState } from 'react'
import { VStack, Select, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from 'react-router';

const SignUpPage = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const navigate = useNavigate();

    const postDetails = (pics) => {
        //https://api.cloudinary/v1_1/dmg3dovnj/image/upload

        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }


        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "Team_5");
            data.append("cloud_name", "dmg3dovnj");

            fetch("https://api.cloudinary.com/v1_1/dmg3dovnj/image/upload", {
                method: "post",
                body: data
            }).then((resp) => {
                console.log("JSON")
                return resp.json();
            }).then((data) => {
                setPic(data.url.toString());
                setLoading(false);
                //   console.log(data);
            }).catch((error) => {
                setLoading(false);
                console.log("ERROR IN FRONT END " + error);
            })

        }else{
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    }

    const submitHandler = async () => {
        setLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            toast({
              title: "Please Fill all the Feilds",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
              title: "Passwords Do Not Match",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
        }


        try{
            //headers for the request..
            const config = {
                headers: {
                  "Content-type": "application/json",
                }
            }

            const {data} = await axios.post("/api/user",{name,email,password,pic}
            ,config)

            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              localStorage.setItem("userInfo", JSON.stringify(data));
              
              navigate('/chats') //navigate to chats route
        }catch(error){
              
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              setLoading(false);
        }

    }

    const handleClick = () => {
        setShow(!show)
    }


    return (
        <VStack
            spacing="5px"
        >
            <FormControl isRequired>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input
                    id="name"
                    placeholder="Enter your name"
                    onChange={(e) => { setName(e.target.value) }}
                ></Input>
            </FormControl>

            <FormControl isRequired>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                    id="email"
                    placeholder="Enter your email"
                    onChange={(e) => { setEmail(e.target.value) }}
                ></Input>
            </FormControl>

            <FormControl isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>

                <InputGroup>
                    <Input
                        id="password"
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />

                    <InputRightElement width="4.5rem">
                        <Button
                            h="1.5rem"
                            size="sm"
                            onClick={handleClick}
                        >
                            {show ? "Hide" : "show"}
                        </Button>
                    </InputRightElement>

                </InputGroup>
            </FormControl>


            <FormControl isRequired>
                <FormLabel htmlFor='confrpassword'>Confirm Password</FormLabel>

                <InputGroup>
                    <Input
                        id="confrpassword"
                        type={show ? "text" : "password"}
                        placeholder="confirm your password"
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                    />

                    <InputRightElement width="4.5rem">
                        <Button
                            h="1.5rem"
                            size="sm"
                            onClick={handleClick}
                        >
                            {show ? "Hide" : "show"}
                        </Button>
                    </InputRightElement>

                </InputGroup>
            </FormControl>

            <FormControl isRequired>
                <FormLabel htmlFor='picture'>Upload your profile picture</FormLabel>
                <Input
                    type="file"
                    id="picture"
                    accept="image/*"
                    p={1.5}
                    onChange={(e) => { postDetails(e.target.files[0]) }}
                ></Input>
            </FormControl>

            <Button
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >SignUp</Button>

        </VStack>
    )
}

export default SignUpPage