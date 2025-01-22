'use client'

import {
  Container,
  Text,
  Button,
  Textarea,
  VStack,
  Image,
  useToast,
  Box,
  Spinner,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const toast = useToast()

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast({
        title: 'Please enter some text',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setShowImage(true)
    }, 2000)
  }

  return (
    <Container maxW="container.sm" py={20}>
      <VStack spacing={6} align="stretch">
        <Textarea
          placeholder="Beautiful chinese mountains"
          value={text}
          onChange={e => setText(e.target.value)}
          size="lg"
          height="200px"
          fontSize="xl"
          padding="6"
          bg="whiteAlpha.100"
          _hover={{ bg: 'whiteAlpha.200' }}
          _focus={{ bg: 'whiteAlpha.200' }}
          resize="vertical"
        />

        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          loadingText="Generating image..."
          bg="#8c1c84"
          color="white"
          _hover={{
            bg: '#6d1566',
          }}
          size="lg"
          disabled={!text.trim()}
        >
          Generate image
        </Button>

        {isLoading && (
          <Box textAlign="center" py={8}>
            <Spinner size="md" color="#8c1c84" />
          </Box>
        )}

        {showImage && !isLoading && (
          <Box pt={4}>
            <Image
              src="/huangshan.png"
              alt="Generated image"
              borderRadius="md"
              w="full"
              fallback={<Text>Failed to load image</Text>}
            />
          </Box>
        )}
      </VStack>
    </Container>
  )
}
