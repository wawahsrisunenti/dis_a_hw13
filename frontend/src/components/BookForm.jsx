import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "The book got a makeover without a single bad hair day! Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Well, that plan went south faster than a penguin on a water slide! Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "The book was born like a champ, not a wrinkle in sight! Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Well, that plan went south faster than a penguin on a water slide! Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input name="title" required defaultValue={bookData?.title} borderColor="#647a88" />
        </FormControl>
        <FormControl>
          <FormLabel>Author</FormLabel>
          <Input name="author" required defaultValue={bookData?.author} borderColor="#647a88" />
        </FormControl>
        <FormControl>
          <FormLabel>Publisher</FormLabel>
          <Input name="publisher" required defaultValue={bookData?.publisher} borderColor="#647a88" />
        </FormControl>
        <FormControl>
          <FormLabel>Year</FormLabel>
          <Input name="year" type="number" required defaultValue={bookData?.year} borderColor="#647a88" />
        </FormControl>
        <FormControl>
          <FormLabel>Pages</FormLabel>
          <Input name="pages" type="number" required defaultValue={bookData?.pages} borderColor="#647a88" />
        </FormControl>
        {selectedImage && (
          <Image w={64} src={selectedImage} alt="Selected Image" />
        )}
        {!bookData?.image && (
        <FormControl>
          <FormLabel htmlFor="image">Choose Picture</FormLabel>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedImage(URL.createObjectURL(file));
            }}
            display="none"
          />
          <Center>
            <Button fontSize="sm" as="label" bg="green.600" color="white" htmlFor="image" cursor="pointer">
              Upload
            </Button>
          </Center>
        </FormControl>
        
        )}

        <Button fontSize="sm" as="samp" bg="blue.900" color="white" type="submit">{bookData ? "Edit Book" : "Create Book"}</Button>
      </VStack>
    </form>
  );
}