// nextjsapp/src/components/Books.jsx
import { SimpleGrid, Card, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Card key={id} my={4} p={4} cursor="pointer" bg="teal.500" rounded="xl" shadow="2xl" _hover={{ opacity: "70%" }}>
        <VStack>
          <Heading size={"md"} color="white">
            {title} ({year})
          </Heading>
          <Text>{author}</Text>
          <Image w={24} h={24} src={`/uploads/${image}`} /> {/* Updated image source */}
          <Text>
            <span>Publisher: </span>
            {publisher}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}
