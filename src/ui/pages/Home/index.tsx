import { Badge, Box, Button, Container, Grid, InputAdornment, TextField } from '@mui/material'
import { MagnifyingGlass, ShoppingCart } from 'phosphor-react'
import { useEffect } from 'react'
import { ProductCard } from '../../components/ProductCard'
import { Path } from '../../enum/Path'
import { useCart } from '../../hooks/useCart'
import { useNavigation } from '../../hooks/useNavigation'
import { useHome } from './useHome'

export function Home () {
  const h = useCart()
  const { getAll, products, searchInput, setSearchInput } = useHome()
  const { navigate } = useNavigation()

  const filtered = products.filter(it => {
    if (searchInput.trim() === '') return it

    return it.title.toLowerCase().trim().match(searchInput.toLowerCase().trim())
  })

  useEffect(() => {
    getAll()
  }, [])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: 'white',
          padding: '1rem 0',
          zIndex: 10,
          borderBottom: '1px solid lightgray',
          paddingX: '3rem'
        }}
      >
        <TextField
          label="Search Product"
          placeholder='Search product by name . . .'
          InputProps={{
            startAdornment:
              <InputAdornment position='start'>
                <MagnifyingGlass size={24} color="#828282" />
              </InputAdornment>
          }}
          onChange={(e) => { setSearchInput(e.target.value) }}
        />
        <Button variant='outlined' onClick={() => { navigate(Path.Cart) }}>
          <Badge badgeContent={h.cart.length} color='error'>
            <ShoppingCart size={32} color="#1976d2" weight="fill" />
          </Badge>
        </Button>
      </Box>
      <Container sx={{ marginTop: '2rem' }}>
        <Grid
          justifyContent='center'
          alignItems='flex-start'
          container
          rowSpacing={8}
          columnSpacing={2}
        >
          {filtered.map((it, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <ProductCard
                brand={it.brand}
                price={it.price}
                rating={it.rating}
                thumbnail={it.thumbnail}
                title={it.title}
                onClick={() => {
                  h.addToCart(it)
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
