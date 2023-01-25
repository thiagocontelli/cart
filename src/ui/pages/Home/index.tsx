import { Badge, Box, Button, Container, Grid, InputAdornment, TextField } from '@mui/material'
import { MagnifyingGlass, ShoppingCart } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { ProductRepository } from '../../../data/ProductRepository'
import { GetAllProducts } from '../../../domain/useCases/implementation/GetAllProducts'
import { Product } from '../../../model/Product'
import { HttpService } from '../../../services/http'
import { ProductCard } from '../../components/ProductCard'

const http = new HttpService()
const repo = new ProductRepository(http)
const useCase = new GetAllProducts(repo)

export function Home () {
  const [products, setProducts] = useState<Product[]>([])
  const [searchInput, setSearchInput] = useState('')

  async function getAll () {
    try {
      const products = await useCase.execute()
      setProducts(products)
    } catch (error) {
      alert('deu erro')
    }
  }

  const filtered = products.filter(it => {
    if (searchInput.trim() === '') return it

    return it.title.toLowerCase().trim().match(searchInput.toLowerCase().trim())
  })

  useEffect(() => {
    getAll()
  }, [])

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextField
            label="Search Product"
            placeholder='Search product by name . . .'
            InputProps={{
              startAdornment:
                <InputAdornment position='start'>
                  <MagnifyingGlass size={24} color="#828282" />
                </InputAdornment>
            }}
            sx={{ margin: '2rem 0' }}
            onChange={(e) => { setSearchInput(e.target.value) }}
          />
          <Button variant='outlined'>
            <Badge badgeContent={1} color='error'>
              <ShoppingCart size={32} color="#1976d2" weight="fill" />
            </Badge>
          </Button>
      </Box>
      <Grid justifyContent='center' alignItems='flex-start' container rowSpacing={8} columnSpacing={2}>
        {filtered.map((it, i) => (
          <Grid item key={i} xs={12} sm={6} md={4}>
            <ProductCard
              brand={it.brand}
              price={it.price}
              rating={it.rating}
              thumbnail={it.thumbnail}
              title={it.title}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
