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
  const [imageUrl, setImageUrl] = useState('')
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
    setImageUrl('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: text }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const data = await response.json()
      setImageUrl(data.imageUrl)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate image. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
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
          disabled={!text.trim() || isLoading}
        >
          Generate image
        </Button>

        {isLoading && (
          <Box textAlign="center" py={8}>
            <Spinner size="md" color="#8c1c84" />
          </Box>
        )}

        {imageUrl && !isLoading && (
          <Box pt={4}>
            <Image
              src={imageUrl}
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
