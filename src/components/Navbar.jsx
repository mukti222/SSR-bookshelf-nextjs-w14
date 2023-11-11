// src/components/Navbar.js
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios"; 

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []); // Gunakan dependensi kosong agar useEffect hanya dijalankan sekali saat komponen dipasang

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      window.localStorage.setItem("token", token);
      setIsLogin(true);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Link to="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" fontWeight="bold">
            Bookshelf App with NEXT
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLogin && (
          <Link to="/newbook">
            {/* <Button colorScheme="blackAlpha">Create New Book</Button> */}
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="blue">
            Login
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            onClick={() => {
              window.localStorage.removeItem("token");
              setIsLogin(false);
            }}
          >
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                const email = document.getElementsByName("email")[0].value;
                const password = document.getElementsByName("password")[0]
                  .value;
                handleLogin(email, password);
              }}
              colorScheme="blue"
              mr={3}
            >
              Login
            </Button>
            <Link to="/register" onClick={onClose}>
              <Button variant="ghost">
                Doesn't Have Account? Click here
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;