import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack
} from '@merajut-asa/ui';
import Link from 'next/link';

export default function Home() {
  return (
    <Box as="main" bg="bg-secondary" minH="100vh">
      <Container maxW="7xl" py={16}>
        <VStack spacing={12} align="center">
          {/* Hero Section */}
          <VStack spacing={6} textAlign="center" maxW="4xl">
            <Heading level={1} size="3xl" color="text-primary">
              Merajut <Text as="span" color="brand.500">ASA</Text>
            </Heading>
            <Text size="xl" color="text-secondary" lineHeight="tall">
              Platform kolaborasi digital untuk membangun masa depan yang inklusif,
              berkelanjutan, dan berdampak di Jawa Barat
            </Text>
          </VStack>

          {/* CTA Buttons */}
          <HStack spacing={4} flexWrap="wrap" justify="center">
            <Link href="/campaigns">
              <Button
                size="lg"
                variant="solid"
                aria-label="Jelajahi kampanye yang tersedia"
              >
                Jelajahi Kampanye
              </Button>
            </Link>
            <Link href="/community">
              <Button
                size="lg"
                variant="outline"
                aria-label="Bergabung dengan komunitas Merajut ASA"
              >
                Bergabung Komunitas
              </Button>
            </Link>
          </HStack>

          {/* Feature Cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full" maxW="6xl">
            <Card elevation="md" role="article" aria-labelledby="feature-1-title">
              <CardContent>
                <VStack spacing={4} align="start">
                  <Heading level={2} size="lg" id="feature-1-title" color="brand.500">
                    Kolaborasi Inklusif
                  </Heading>
                  <Text color="text-secondary">
                    Membangun platform yang dapat diakses oleh semua kalangan dengan
                    prinsip gotong royong digital yang mendorong partisipasi aktif.
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card elevation="md" role="article" aria-labelledby="feature-2-title">
              <CardContent>
                <VStack spacing={4} align="start">
                  <Heading level={2} size="lg" id="feature-2-title" color="secondary.500">
                    Berkelanjutan
                  </Heading>
                  <Text color="text-secondary">
                    Mengembangkan solusi jangka panjang yang berkelanjutan dengan
                    mempertimbangkan dampak sosial dan lingkungan.
                  </Text>
                </VStack>
              </CardContent>
            </Card>

            <Card elevation="md" role="article" aria-labelledby="feature-3-title">
              <CardContent>
                <VStack spacing={4} align="start">
                  <Heading level={2} size="lg" id="feature-3-title" color="brand.500">
                    Berdampak Nyata
                  </Heading>
                  <Text color="text-secondary">
                    Menciptakan perubahan positif yang terukur dan dapat dirasakan
                    langsung oleh masyarakat Jawa Barat.
                  </Text>
                </VStack>
              </CardContent>
            </Card>
          </SimpleGrid>

          {/* Statistics Section */}
          <Box w="full" maxW="4xl" textAlign="center">
            <Heading level={2} size="xl" mb={8} color="text-primary">
              Platform yang Terpercaya
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={8}>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="brand.500">
                  95%+
                </Text>
                <Text color="text-secondary">
                  Aksesibilitas WCAG 2.1 AA
                </Text>
              </VStack>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="secondary.500">
                  &lt;1.5s
                </Text>
                <Text color="text-secondary">
                  Kecepatan Loading
                </Text>
              </VStack>
              <VStack>
                <Text fontSize="3xl" fontWeight="bold" color="brand.500">
                  100%
                </Text>
                <Text color="text-secondary">
                  Progressive Web App
                </Text>
              </VStack>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}